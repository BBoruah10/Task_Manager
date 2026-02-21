package com.taskManager.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskRequest {

    @NotBlank
    private String title;
    @NotBlank
    private String description;

    private String assignedEmail;
}
