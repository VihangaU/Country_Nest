package country.app.controller;

import country.app.exception.ResourceNotFoundException;
import country.app.model.*;
import country.app.repository.UserRepository;
import country.app.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/get")
public class GetController {
    private static final Logger logger = LoggerFactory.getLogger(GetController.class);

    private final UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public GetController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}/favorites")
    public ResponseEntity<Set<String>> getFavoriteCountries(@PathVariable String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user.getFavoriteCountries());
    }
}
