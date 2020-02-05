import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Photo } from "../models/Photo";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class PhotoService {
  API_URI = "https://frameworks4-spring.herokuapp.com/api";

  constructor(private http: HttpClient) {}

  getPhotos() {
    return this.http.get(`${this.API_URI}/photos`);
  }

  getPhoto(id: string) {
    return this.http.get(`${this.API_URI}/photos/${id}`);
  }

  savePhoto(photo: Photo) {
    return this.http.post(`${this.API_URI}/photos`, photo);
  }

  deletePhoto(id: string) {
    return this.http.delete(`${this.API_URI}/photos/${id}`);
  }

  updatePhoto(id: string|Number, updatePhoto: Photo): Observable<Photo> {
    return this.http.put(`${this.API_URI}/photos/${id}`, updatePhoto);
  }
}
