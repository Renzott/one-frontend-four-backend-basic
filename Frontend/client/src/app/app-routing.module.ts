import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PhotoListComponent } from "./components/photo-list/photo-list.component";
import { PhotoFormComponent } from "./components/photo-form/photo-form.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/photos"
  },
  {
    path: "photos",
    component: PhotoListComponent
  },
  {
    path: "photos/add",
    component: PhotoFormComponent
  },
  {
    path: "photos/edit/:id",
    component: PhotoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
