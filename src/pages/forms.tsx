import { Helmet } from 'react-helmet-async';
import FormsView from '../sections/forms/formsview';

// ----------------------------------------------------------------------

export default function FormsPage() {
    return (
        <>
            <Helmet>
                <title>Đặt phòng | Best Booking</title>
                <link rel="icon" type="image/png" href="https://png.pngtree.com/png-vector/20221020/ourmid/pngtree-colorful-book-now-sticker-offer-design-free-vector-download-png-image_6350741.png" />
            </Helmet>

            <FormsView />
        </>
    );
}
