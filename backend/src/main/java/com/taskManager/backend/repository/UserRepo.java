package com.taskManager.backend.repository;

import com.taskManager.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
    public Optional<User> findByEmail(String email);

    public boolean existsByEmail(String email);
}
