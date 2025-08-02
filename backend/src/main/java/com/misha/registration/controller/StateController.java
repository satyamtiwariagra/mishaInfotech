package com.misha.registration.controller;

import com.misha.registration.model.City;
import com.misha.registration.model.State;
import com.misha.registration.repository.CityRepository;
import com.misha.registration.repository.StateRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/states")
@CrossOrigin(origins = "*")
public class StateController {

    private final StateRepository stateRepo;
    private final CityRepository cityRepo;

    public StateController(StateRepository stateRepo, CityRepository cityRepo) {
        this.stateRepo = stateRepo;
        this.cityRepo = cityRepo;
    }

    @GetMapping
    public List<State> getStates() {
        return stateRepo.findAll();
    }

    @GetMapping("/{stateId}/cities")
    public List<City> getCities(@PathVariable Long stateId) {
        return cityRepo.findByStateId(stateId);
    }
}

