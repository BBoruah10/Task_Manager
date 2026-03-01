package com.taskManager.backend.controller;

import com.taskManager.backend.model.Role;
import com.taskManager.backend.model.User;
import com.taskManager.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@EnableMethodSecurity
@RequestMapping("/leader")
public class LeaderController {

    private final UserRepo repo;

    public LeaderController(UserRepo repo) {
        this.repo = repo;
    }

    @PreAuthorize("hasRole('LEADER')")
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return repo.findAll();
    }
    @PreAuthorize("hasRole('LEADER')")
    @PutMapping("/promote/{id}")
    public String promoteUser(@PathVariable int id) {

        User user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(Role.LEADER);
        repo.save(user);

        return "User promoted to LEADER";
    }
}
