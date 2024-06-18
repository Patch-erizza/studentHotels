import { IHotelRoom } from "./IHotelRoom";

export interface IHotel {
  hotelTitle: string,
  description: string,
  defaultArrivalTime: string,
  defaultDepartureTime: string,
  address: string,
  imageUrl: string,
  thumbnailUrl: string,
  bigImageUrl: string,
  stars: number,
  railwayDistances: string,
  cityCentreDistance: string,
  airportsDistance: string,
  undergroundDistances: string,
  longitude: number,
  latitude: number,
  offers: IHotelRoom[]
}
