package com.example.demo.rest;

import com.example.demo.model.Photo;
import com.example.demo.repo.IPhotoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping("/api/photos")
public class RestPhotoController {

    @Autowired
    private IPhotoRepo repo;

    @GetMapping
    public List<Photo> listar(){
        return repo.findAll();
    }

    @GetMapping(value = "/{id}")
    public Photo buscar(@PathVariable Integer id){
        return repo.findById(id).orElse(null);
    }

    @PostMapping
    public void insertar(@RequestBody Photo pho){
        repo.save(pho);
    }

    @PutMapping(value = "/{id}")
    public void modificar(@PathVariable Integer id, @RequestBody Photo pho){
        pho.setId(id);
        repo.save(pho);
    }

    @DeleteMapping(value = "/{id}")
    public void borrar(@PathVariable Integer id){
        repo.deleteById(id);
    }

}
