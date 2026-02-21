package com.taskManager.backend.service;

import com.taskManager.backend.exception.NotFoundException;
import com.taskManager.backend.model.User;
import com.taskManager.backend.model.UserPrincipal;
import com.taskManager.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=repo.findByEmail(username).orElseThrow(()->new NotFoundException("Email not found!"));

        return new UserPrincipal(user);
    }
}
