package com.misha.registration.repository;

import com.misha.registration.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE " +
            "(:name IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:gender IS NULL OR u.gender = :gender) AND " +
            "(:state IS NULL OR u.state.name = :state)")
    Page<User> filterUsers(String name, String gender, String state, Pageable pageable);
}
