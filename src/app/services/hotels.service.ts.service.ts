import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IHotelSearchResult} from "../models/IHotelSearchResult";
import {map, Observable} from "rxjs";
import {IHotel} from "../models/IHotel";

const HOTELS_URL = "http://localhost:3000/hotels";


@Injectable({
  providedIn: 'root'
})
export class HotelsServiceTsService {

  constructor(private http: HttpClient) {

  }
  getHotels$(): Observable<IHotel[]> {
    return this.http.get<IHotelSearchResult>(HOTELS_URL)
      .pipe(
        map(hotelSearchResult => hotelSearchResult.results)
      )
  }
}
