import {Component, Input} from '@angular/core';
import {IHotel} from "../../models/IHotel";
import {NgForOf} from "@angular/common";
import {HotelCardComponent} from "../hotel-card/hotel-card.component";

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [
    NgForOf,
    HotelCardComponent
  ],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css'
})
export class HotelListComponent {

  @Input() hotelList: IHotel[] = [];
}
