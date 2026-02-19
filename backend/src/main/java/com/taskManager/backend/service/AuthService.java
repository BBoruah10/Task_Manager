package com.taskManager.backend.service;

import com.taskManager.backend.dto.AuthResponse;
import com.taskManager.backend.dto.RegisterRequest;
import com.taskManager.backend.exception.NotFoundException;
import com.taskManager.backend.model.User;
import com.taskManager.backend.repository.UserRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

    public AuthResponse register(@Valid RegisterRequest req) {
        if(repo.existsByEmail(req.getEmail())){
            throw new NotFoundException("Email Already Exists");
        }

        User user=User.builder().name(req.getName())
                .email(req.getEmail())
                .password(encoder.encode(req.getPassword())).build();

        repo.save(user);
        var token=jwtService.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}
