import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { PhotoFormComponent } from "./components/photo-form/photo-form.component";
import { PhotoListComponent } from "./components/photo-list/photo-list.component";

import { PhotoService } from "./services/photos.service";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PhotoFormComponent,
    PhotoListComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
