package com.resturant.project.exception;

public class AuthanticationException
  extends RuntimeException {
    public AuthanticationException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }
}