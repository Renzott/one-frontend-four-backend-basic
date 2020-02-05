import { Component, OnInit, HostBinding } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Photo } from "./../../models/Photo";

import { PhotoService } from "../../services/photos.service";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: "app-photo-form",
  templateUrl: "./photo-form.component.html",
  styleUrls: ["./photo-form.component.css"]
})
export class PhotoFormComponent implements OnInit {
  @HostBinding("class") classes = "row";

  photo: Photo = {
    id: 0,
    title: "",
    description: "",
    image: "",
    create_at: new Date()
  };

  edit: boolean = false;

  constructor(
    private photoService: PhotoService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;

    if (params.id) {
      this.photoService.getPhoto(params.id).subscribe(
        res => {
          this.photo = res;
          this.edit = true;
        },
        err => console.error(err)
      );
    } else {
      this.photoService.getPhotos().subscribe(
        res => {
          this.photo.id =
            Object.values(res)
              .slice()
              .pop().id + 1;
        },
        err => console.error(err)
      );
      setInterval(() => {
        this.photo.create_at = new Date();
      }, 1000);
    }
  }

  saveNewPhoto() {
    this.photoService.savePhoto(this.photo).subscribe(
      res => {
        console.log(res);
        this.router.navigate(["/photos"]);
      },
      err => console.error(err)
    );
  }

  updatePhoto() {
    delete this.photo.create_at;
    this.photoService.updatePhoto(this.photo.id, this.photo).subscribe(
      res => {
        console.log(res);
        this.router.navigate(["/photos"]);
      },
      err => console.error(err)
    );
  }
}
