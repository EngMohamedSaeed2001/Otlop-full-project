package com.resturant.project.controller.commonController;

import com.resturant.project.model.entity.Category;
import com.resturant.project.model.entity.DatabaseFile;
import com.resturant.project.model.entity.Item;
import com.resturant.project.model.entity.User;
import com.resturant.project.model.requestBody.EmailRequest;
import com.resturant.project.service.AdminServices.CategoryService;
import com.resturant.project.service.AdminServices.CommonServices;
import com.resturant.project.service.AdminServices.ItemService;
import com.resturant.project.service.CustomUserDetailsService;
import com.resturant.project.service.storgeServices.DatabaseFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import payload.Response;

import java.util.List;

@RestController
@RequestMapping(value = "common/")

@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
public class CommonController {

    @Autowired
    CommonServices commonServices;

    @Autowired
    CategoryService categoryService;

    @Autowired
    ItemService itemService;
    @Autowired
    CustomUserDetailsService  userDetailsService;

    @PostMapping(value = "/getUser")
    public User getUser(@RequestBody EmailRequest email){return userDetailsService.findUserByEmail(email.getEmail());}

    @GetMapping(value = "/getItem/{itemName}")
    public Item getItem(@PathVariable String itemName){return itemService.getItem(itemName);}
    @GetMapping(value = "/getCategory/{categoryName}")
    public Category getCategory(@PathVariable String categoryName){return categoryService.getCategory(categoryName);}

    @Autowired
    private DatabaseFileService fileStorageService;

    @PostMapping("/uploadFile")
    public Response uploadFile(@RequestParam("file") MultipartFile file) {
        DatabaseFile fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName.getFileName())
                .toUriString();

        return new Response(fileName.getFileName(), fileDownloadUri,
                file.getContentType(), file.getSize());
    }
}
