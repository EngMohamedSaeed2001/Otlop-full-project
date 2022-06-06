package com.resturant.project.service.storgeServices;

import java.io.IOException;
import java.util.Objects;

import com.resturant.project.exception.FileNotFoundException;
import com.resturant.project.exception.FileStorageException;
import com.resturant.project.model.entity.DatabaseFile;
import com.resturant.project.repository.DatabaseFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DatabaseFileService {

    @Autowired
    private DatabaseFileRepository dbFileRepository;

    public DatabaseFile storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            DatabaseFile dbFile = new DatabaseFile(fileName, file.getContentType(), file.getBytes());

            return dbFileRepository.save(dbFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public DatabaseFile getFile(String fileName) {
        return dbFileRepository.findByFileName(fileName)
                .orElseThrow(() -> new FileNotFoundException("File not found with id " + fileName));
    }
}
