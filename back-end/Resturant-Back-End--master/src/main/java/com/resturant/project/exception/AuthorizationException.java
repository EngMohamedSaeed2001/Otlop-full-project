package com.resturant.project.exception;

public class AuthorizationException
  extends RuntimeException {
    public AuthorizationException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }
}