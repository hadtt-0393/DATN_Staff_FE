import { Helmet } from 'react-helmet-async';
import FormView from '../sections/product/productview';

// ----------------------------------------------------------------------

export default function FormPage() {
    return (
        <>
            <Helmet>
                <title>Form</title>
            </Helmet>

            <FormView />
        </>
    );
}
