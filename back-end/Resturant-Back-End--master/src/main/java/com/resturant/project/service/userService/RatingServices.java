package com.resturant.project.service.userService;

import com.resturant.project.HelperMessage;
import com.resturant.project.model.entity.Opinion;
import com.resturant.project.model.requestBody.OpinionRequest;
import com.resturant.project.repository.OpinionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RatingServices {
    @Autowired
    private OpinionRepo opinionRepo ;

    public void addOpinion(OpinionRequest request){
        if (request.getRate()>5 || request.getRate()<0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, HelperMessage.OUT_OF_RANGE) ;

        opinionRepo.save(Opinion.builder()
                .opinion(request.getOpinion())
                .userEmail(request.getUserEmail())
                .rate(request.getRate())
                .build()) ;
    }

    public List<Opinion> getAllOpinion(){
        return opinionRepo.findAll() ;
    }
}
