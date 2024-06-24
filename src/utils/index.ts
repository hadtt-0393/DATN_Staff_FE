const convertPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const convertDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB');
}

interface Rooms {
    roomName: string;
    quantity: number;
}

const convertRoomToString = (rooms: Rooms[]) => {
    return rooms.map(room => (`${room.quantity} x ${room.roomName}`)).join('')
}

export { convertPrice, convertDate, convertRoomToString }