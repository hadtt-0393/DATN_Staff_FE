import { Helmet } from "react-helmet-async"
import ProfileView from '../sections/profile/profileview';

export default function ProfilePage(){
    return(
        <>
            <Helmet>
                <title>Khách sạn | Best Booking</title>
                <link rel="icon" type="image/png" href="https://png.pngtree.com/png-vector/20221020/ourmid/pngtree-colorful-book-now-sticker-offer-design-free-vector-download-png-image_6350741.png" />
            </Helmet>

            <ProfileView />
        </>
    )

} 