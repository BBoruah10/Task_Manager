package com.taskManager.backend.service;

import com.taskManager.backend.dto.AuthRequest;
import com.taskManager.backend.dto.AuthResponse;
import com.taskManager.backend.dto.RegisterRequest;
import com.taskManager.backend.exception.NotFoundException;
import com.taskManager.backend.model.Role;
import com.taskManager.backend.model.User;
import com.taskManager.backend.repository.UserRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

    public AuthResponse register(@Valid RegisterRequest req) {
        if(repo.existsByEmail(req.getEmail())){
            throw new NotFoundException("Email Already Exists");
        }

        User user=User.builder().name(req.getName())
                .email(req.getEmail())
                .password(encoder.encode(req.getPassword()))
                .role(Role.USER)
                .build();

        repo.save(user);
        var token=jwtService.generateToken(user.getEmail());
        return new AuthResponse(token,user.getRole().name(), user.getName());
    }

    public AuthResponse login(@Valid AuthRequest req) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        } catch (AuthenticationException ex) {
            throw new NotFoundException("Invalid credentials");
        }
        User user = repo.findByEmail(req.getEmail()).orElseThrow(() -> new NotFoundException("User not found"));
        var token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token,user.getRole().name(), user.getName());
    }
}
