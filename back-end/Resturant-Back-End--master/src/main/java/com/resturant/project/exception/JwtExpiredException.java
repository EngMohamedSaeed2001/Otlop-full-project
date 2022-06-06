package com.resturant.project.exception;

public class JwtExpiredException
  extends RuntimeException {
    public JwtExpiredException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }
}