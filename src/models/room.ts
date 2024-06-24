export interface Room {
    _id: string;
    quantity: number;
    price: number;
    roomType: string;
    status: boolean;
    image: string;
    description: string;
    maxPeople: number
    quantityAvailable: number;
    serviceIds: string[];
}

export interface ServiceRoom {
    _id: string;
    serviceName: string;
}