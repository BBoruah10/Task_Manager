package com.taskManager.backend.controller;

import com.taskManager.backend.dto.TaskRequest;
import com.taskManager.backend.dto.TaskResponse;
import com.taskManager.backend.model.TaskStatus;
import com.taskManager.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequiredArgsConstructor
public class TaskController {

    @Autowired
    private TaskService service;

    @PreAuthorize("hasAuthority('LEADER')")
    @PostMapping("/leader/tasks")
    public ResponseEntity<TaskResponse> createTasks(@Valid @RequestBody TaskRequest req, Authentication authentication){
        var task=service.createTasks(req,authentication.getName());
        return ResponseEntity.ok(task);
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<TaskResponse>>  getTasks(Authentication authentication){
        var res=service.getTasks(authentication.getName());
        return ResponseEntity.ok(res);
    }

    @PutMapping("/tasks/{id}")
    public TaskResponse updateStatus(@PathVariable int id,
                                     @RequestParam TaskStatus status) {
        return service.updateStatus(id, status);
    }
}
