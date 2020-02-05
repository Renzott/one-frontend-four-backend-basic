import { Router } from "express";

import {photosController} from "../controllers/photosController"

class PhotosRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", photosController.list);
    this.router.get("/:id", photosController.find);
    this.router.post("/", photosController.create);
    this.router.put("/:id", photosController.update);
    this.router.delete("/:id",photosController.delete);
  }
}

const photosRoutes = new PhotosRoutes();
export default photosRoutes.router;
