package com.misha.registration.service;

import com.misha.registration.model.User;
import com.misha.registration.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Page<User> getUsers(String name, String gender, String state, int page, int size) {
        if (name.isEmpty()) name = null;
        if (gender.isEmpty()) gender = null;
        if (state.isEmpty()) state = null;

        return userRepository.filterUsers(name, gender, state, PageRequest.of(page, size));
    }
}

