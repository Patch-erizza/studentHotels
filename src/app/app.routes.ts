import { Routes } from '@angular/router';
import {HotelsLayoutComponent} from "./Components/hotels-layout/hotels-layout.component";
import {HotelCardComponent} from "./Components/hotel-card/hotel-card.component";

export const routes: Routes = [
  {
    path: "",
    component: HotelsLayoutComponent
  },
  {
    path: "hotel/:address",
    component: HotelCardComponent
  }
];
