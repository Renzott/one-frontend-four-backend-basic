import { Component, OnInit, HostBinding } from '@angular/core';

import { PhotoService } from "../../services/photos.service";
import { Photo } from '../../models/Photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  @HostBinding('class') classes = 'row'

  photos: any = [];

  constructor(private PhotoService: PhotoService) { }

  ngOnInit() {
    this.getPhotos()
  }

  getPhotos(){
    this.PhotoService.getPhotos().subscribe(
      res => {
        this.photos = res;
      },
      err => console.log(err),  
    )
  }

  deletePhoto(id: string){
    this.PhotoService.deletePhoto(id).subscribe(
      res =>{
        console.log(res);
        this.getPhotos(); 
      },
      err => console.error(err)
    )
  }

}
