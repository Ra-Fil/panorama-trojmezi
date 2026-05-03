export interface Apartment {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  images: string[];
}

export interface Booking {
  id?: string;
  apartmentId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  bookingNumber?: string;
}

export interface Content {
  id: string;
  key: string;
  value: string;
  lang: string;
}
