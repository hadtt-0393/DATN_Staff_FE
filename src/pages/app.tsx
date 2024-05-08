import { Helmet } from 'react-helmet-async';
import HomeView from '../sections/home/homeview';

// ----------------------------------------------------------------------

export default function AppPage() {
    return (
        <>
            <Helmet>
                {/* <link rel="icon" href="https://png.pngtree.com/png-vector/20221020/ourmid/pngtree-colorful-book-now-sticker-offer-design-free-vector-download-png-image_6350741.png" type="image/png" /> */}
                <title>Dashboard | Best Booking</title>
                <link rel="icon" type="image/png" href="https://png.pngtree.com/png-vector/20221020/ourmid/pngtree-colorful-book-now-sticker-offer-design-free-vector-download-png-image_6350741.png" />
            </Helmet>

            <HomeView />
        </>
    );
}
