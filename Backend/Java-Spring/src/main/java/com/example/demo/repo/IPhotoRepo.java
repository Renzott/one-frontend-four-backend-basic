package com.example.demo.repo;

import com.example.demo.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPhotoRepo extends JpaRepository<Photo,Integer> {

}
