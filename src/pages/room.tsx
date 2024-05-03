import { Helmet } from 'react-helmet-async';
import RoomView from '../sections/room/roomview';

// ----------------------------------------------------------------------

export default function RoomPage() {
    return (
        <>
            <Helmet>
                <title>Room</title>
            </Helmet>

            <RoomView />
        </>
    );
}
