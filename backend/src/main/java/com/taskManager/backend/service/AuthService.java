package com.taskManager.backend.service;

import com.taskManager.backend.dto.AuthResponse;
import com.taskManager.backend.dto.RegisterRequest;
import com.taskManager.backend.model.User;
import com.taskManager.backend.repository.UserRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepo repo;

    public AuthResponse register(@Valid RegisterRequest req) {

    }
}
