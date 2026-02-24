package com.taskManager.backend.repository;

import com.taskManager.backend.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepo extends JpaRepository<Tasks,Integer> {
    List<Tasks> findByAssignedTo_Email(String email);
    List<Tasks> findByCreatedBy(String createdBy);
}
