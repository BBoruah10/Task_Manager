package com.taskManager.backend.service;

import com.taskManager.backend.model.Role;
import com.taskManager.backend.model.User;
import com.taskManager.backend.repository.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepo repo;
    private final BCryptPasswordEncoder encoder;

    public DataInitializer(UserRepo repo) {
        this.repo = repo;
        this.encoder = new BCryptPasswordEncoder(12);
    }

    @Override
    public void run(String... args) {

        if (!repo.existsByEmail("admin@task.com")) {

            User admin = User.builder()
                    .name("Admin")
                    .email("admin@task.com")
                    .password(encoder.encode("admin123"))
                    .role(Role.LEADER)
                    .build();

            repo.save(admin);

            System.out.println("Default LEADER created.");
        }
    }
}
