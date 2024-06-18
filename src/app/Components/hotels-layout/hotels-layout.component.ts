// В сервисе Командировок пользователи хотят искать отели,
// смотреть варианты номеров. Нужно дать такую возможность.
// Ещё пользователям очень нужно делиться своими результатами поиска.
// Ниже приведен скрин того как они хотят, чтобы это выглядело.
// Также пользователи не хотят видеть много отелей одним списком им достаточно 10.
// Для поиска отелей им достаточно всего лишь фильтров по названию и цене

// Требования к фильтрации:
//
// - Пользователь может фильтровать отели: по адресу и стоимости
// - Список отелей должен обновляться в соответствии с выбранными фильтрами, по мере ввода значений.

import {Component, OnInit} from '@angular/core';
import {HotelListComponent} from "../hotel-list/hotel-list.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {HotelCardComponent} from "../hotel-card/hotel-card.component";
import {combineLatest, filter, map, Observable, startWith} from "rxjs";
import {IHotel} from "../../models/IHotel";
import {HotelsServiceTsService} from "../../services/hotels.service.ts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {filterMinMaxPrice} from "../../../utils/filter.rooms";

// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-hotels-layout',
  standalone: true,
  imports: [
    HotelListComponent,
    NgIf,
    HotelCardComponent,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './hotels-layout.component.html',
  styleUrl: './hotels-layout.component.css'
})
export class HotelsLayoutComponent implements OnInit {

  searchQueryControl: FormControl<string | null> = new FormControl<string>("");
  sortMinPriceControl: FormControl<number | null> = new FormControl<number>(0);
  sortMaxPriceControl: FormControl<number | null> = new FormControl<number>(0);
  constructor(private hotelsService: HotelsServiceTsService, private router: Router, private activatedRoute: ActivatedRoute) {
  }
  // @ts-ignore
  hotels$: Observable<IHotel[]>;


  ngOnInit() {

    this.searchQueryControl.valueChanges.subscribe((searchAddress) => {
      if (!searchAddress) {
        this.router.navigate([], {queryParams: {search: null}, queryParamsHandling: "merge"})
      } else {
        this.router.navigate([], {queryParams: {search: searchAddress}, queryParamsHandling: "merge"})
      }
    })
    this.sortMinPriceControl.valueChanges.subscribe((minSelectedText) => {
      if (!minSelectedText) {
        this.router.navigate([], {queryParams: {minPrice: null}, queryParamsHandling: "merge"})
      } else {
        this.router.navigate([], {queryParams: {minPrice: minSelectedText}, queryParamsHandling: "merge"})
      }
    })
    this.sortMaxPriceControl.valueChanges.subscribe((maxSelectedText) => {
      if (!maxSelectedText) {
        this.router.navigate([], {queryParams: {maxPrice: null}, queryParamsHandling: "merge"})
      } else {
        this.router.navigate([], {queryParams: {maxPrice: maxSelectedText}, queryParamsHandling: "merge"})
      }
    })


    const searchQueryParam$ = this.activatedRoute.queryParams.pipe(
      map((queryParams) => {
        return queryParams["search"];
      }),
      startWith("")
    )
    searchQueryParam$.subscribe((searchQuery) => {
      this.searchQueryControl.setValue(searchQuery, {emitEvent: false})
    })

    const minPriceQueryParam$ = this.activatedRoute.queryParams.pipe(
      map((queryParams) => queryParams["minPrice"] ? parseInt(queryParams["minPrice"]) : null),
      startWith(null));

    minPriceQueryParam$.subscribe((minPriceQuery) => {
      this.sortMinPriceControl.setValue(minPriceQuery, {emitEvent: false})
    })

    const maxPriceQueryParam$ = this.activatedRoute.queryParams.pipe(
      map((queryParams) => queryParams["maxPrice"] ? parseInt(queryParams["maxPrice"]) : null),
      startWith(null));

    maxPriceQueryParam$.subscribe((maxPriceQuery) => {
      this.sortMaxPriceControl.setValue(maxPriceQuery, {emitEvent: false})
    })


    const allHotels$ = this.hotelsService.getHotels$();
    this.hotels$ = combineLatest([searchQueryParam$, allHotels$, minPriceQueryParam$, maxPriceQueryParam$])
      .pipe(
        map(([searchQuery, allHotels, sortMinPrice, sortMaxPrice]) => {
          console.log("searchQuery", searchQuery)
          console.log("sortMinPrice", sortMinPrice)
          console.log("sortMaxPrice", sortMaxPrice)
          const hotelsFilteredBySearchQuery = searchQuery ? allHotels.filter((hotel) => {
            const lowerCasedSearchQuery = searchQuery.toLowerCase();
            const hotelAddress = hotel.address.toLowerCase();
            const foundInAddress = hotelAddress.includes(lowerCasedSearchQuery);
            return foundInAddress;
          }) : allHotels;

          if (sortMinPrice===null && sortMaxPrice===null) {
            return hotelsFilteredBySearchQuery;
          }
          const hotelsFilteredByPrice = allHotels.map((hotel) => {
            const hotelOffers = hotel.offers;
            const filteredOffers = filterMinMaxPrice(hotelOffers, sortMinPrice, sortMaxPrice);
            return {...hotel, offers: filteredOffers};
          })
          return hotelsFilteredByPrice.filter((hotel) => {
            return !!hotel.offers?.length;
          })
        }),
        map((filteredHotels) => {
          return filteredHotels.slice(0,9);
        })
      )
  }

}
