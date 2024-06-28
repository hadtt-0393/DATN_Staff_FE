export interface Hotel {
    hotelName: string;
    city: string;
    address: string;
    distance: number;
    description: string;
    highestPrice: number;
    cheapestPrice: number;
    featured: string;
    discount: number;
    serviceIds: string[];
    services: string[];
    images: any[]
}

export interface ServiceHotel {
    _id: string;
    serviceName: string;
}