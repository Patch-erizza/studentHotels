import {Component, Input, Pipe} from '@angular/core';
import {HotelsServiceTsService} from "../../services/hotels.service.ts.service";
import {Observable} from "rxjs";
import {IHotel} from "../../models/IHotel";
import {IHotelRoom} from "../../models/IHotelRoom";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {PipeSymbol} from "@angular/compiler-cli/src/ngtsc/annotations/src/pipe";

@Component({
  selector: 'app-hotel-rooms',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
  ],
  templateUrl: './hotel-rooms.component.html',
  styleUrl: './hotel-rooms.component.css'
})
export class HotelRoomsComponent {

  @Input() hotelRooms: IHotelRoom[] = [];
}
