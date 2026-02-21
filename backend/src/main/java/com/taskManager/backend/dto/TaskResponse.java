package com.taskManager.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TaskResponse {
    private int id;
    private String title;
    private String description;
    private String status;
    private String assignedTo;
    private String createdBy;
    private LocalDateTime createdAt;
}
