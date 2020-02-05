package com.example.demo.controller;

import com.example.demo.repo.IPhotoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class DemoController {

    @Autowired
    private IPhotoRepo repo;

    @GetMapping("/greeting")
    public String greeting(@RequestParam(name = "name", required = false, defaultValue="World") String name, Model model){

        System.out.println(repo.findAll().size());

        model.addAttribute("name",name + " - " + repo.findAll().get(0).toString());

        return "greeting";
    }

    @GetMapping("/list")
    public String greeting(Model model){
        model.addAttribute("photos",repo.findAll());
        return "greeting";
    }


}
