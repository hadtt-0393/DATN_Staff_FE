import { Helmet } from 'react-helmet-async';
import RoomsView from '../sections/rooms/roomsview';

// ----------------------------------------------------------------------

export default function RoomsPage() {
    return (
        <>
            <Helmet>
                <title>Rooms | Best Booking </title>
            </Helmet>

            <RoomsView />
        </>
    );
}
