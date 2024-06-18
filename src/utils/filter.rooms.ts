import {IHotelRoom} from "../app/models/IHotelRoom";

export function filterMinMaxPrice(rooms: IHotelRoom[], minPrice: number | null, maxPrice: number | null) {
  const filteredRooms = rooms.filter((room)=> {
    const roomPrice = room.priceInRub;
    let isPriceOk = false;
    if (minPrice === null && maxPrice === null) {
      return true;
    } else if (minPrice === null) {
      isPriceOk = roomPrice <= (maxPrice as number);
    } else if (maxPrice === null){
      isPriceOk = roomPrice >= (minPrice as number);
    } else {
      isPriceOk = (roomPrice >= minPrice) && (roomPrice <= maxPrice);
    }
    return isPriceOk;
  });
  return filteredRooms;
}
