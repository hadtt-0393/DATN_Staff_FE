import { Helmet } from "react-helmet-async"
import ProfileView from '../sections/profile/profileview';

export default function ProfilePage(){
    return(
        <>
            <Helmet>
                <title>Profile | Best Booking</title>
            </Helmet>

            <ProfileView />
        </>
    )

} 