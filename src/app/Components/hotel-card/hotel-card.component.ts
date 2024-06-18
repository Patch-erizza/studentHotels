//- Каждый вариант проживания должен отражать основную для номера информацию:
// название номера, питание, количество дополнительных мест,
// стоимость, количество свободных номеров данного типа и фотографию.

import {Component, Input} from '@angular/core';
import {HotelsServiceTsService} from "../../services/hotels.service.ts.service";
import {map, Observable, switchMap} from "rxjs";
import {IHotel} from "../../models/IHotel";
import {IHotelRoom} from "../../models/IHotelRoom";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {HotelRoomsComponent} from "../hotel-rooms/hotel-rooms.component";

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    HotelRoomsComponent,
    AsyncPipe
  ],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.css'
})
export class HotelCardComponent {

  // @ts-ignore
  @Input() hotel: IHotel;

  constructor(private hotelAddressService: HotelsServiceTsService, private activatedRoute: ActivatedRoute) {
  }
  // @ts-ignore
  hotel$: Observable<IHotel>;
  ngOnInit() {

  }
}
