import { Helmet } from 'react-helmet-async';
import FormsView from '../sections/forms/formsview';

// ----------------------------------------------------------------------

export default function FormsPage() {
    return (
        <>
            <Helmet>
                <title>Forms | Best Booking</title>
            </Helmet>

            <FormsView />
        </>
    );
}
