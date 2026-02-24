package com.taskManager.backend.service;

import com.taskManager.backend.dto.TaskRequest;
import com.taskManager.backend.dto.TaskResponse;
import com.taskManager.backend.model.TaskStatus;
import com.taskManager.backend.model.Tasks;
import com.taskManager.backend.model.User;
import com.taskManager.backend.repository.TaskRepo;
import com.taskManager.backend.repository.UserRepo;
import jakarta.validation.Valid;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepo repo;

    @Autowired
    private UserRepo userRepo;


    public TaskResponse createTasks(@Valid TaskRequest req, String name) {

        User assignedUser = userRepo.findByEmail(req.getAssignedEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        User creator = userRepo.findByEmail(name)
                .orElseThrow(() -> new RuntimeException("Creator not found"));


        Tasks task=Tasks.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .status(TaskStatus.TODO)
                .assignedTo(assignedUser)
                .createdBy(creator)
                .createdAt(LocalDateTime.now())
                .build();

        repo.save(task);

        return mapToResponse(task);

    }
    private TaskResponse mapToResponse(Tasks task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus().name())
                .assignedTo(task.getAssignedTo().getEmail())
                .createdBy(task.getCreatedBy().getEmail())
                .createdAt(task.getCreatedAt())
                .build();
    }

    public List<TaskResponse> getTasks(String name) {

        return repo.findByAssignedTo_Email(name)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

    }


    public TaskResponse updateStatus(int id, TaskStatus status) {

        Tasks task = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);
        repo.save(task);

        return mapToResponse(task);
    }

    public @Nullable List<TaskResponse> getTasksCreatedBy(String leaderEmail) {
        User leader = userRepo.findByEmail(leaderEmail)
                .orElseThrow(() -> new RuntimeException("Leader not found"));

        return repo.findByCreatedBy(leader)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}
