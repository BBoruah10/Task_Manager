package com.taskManager.backend.controller;

import com.taskManager.backend.dto.AuthResponse;
import com.taskManager.backend.dto.RegisterRequest;
import com.taskManager.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest req){
        var res=service.register(req);
        return ResponseEntity.ok(res);
    }
}
