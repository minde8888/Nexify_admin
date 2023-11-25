import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';;
import Preloader from '../pages/preloader/preloader';
import AddCategories from '../pages/category/addCategories';
import AdminLayout from '../components/Layout/AdminLayout';

const Routing = (): JSX.Element => {
    return (
        <AdminLayout>
            <Suspense fallback={<Preloader />}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/add-categories" element={<AddCategories />} />
                        {/* <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/edit-products" element={<EditAllProducts />} />
                        <Route path="/edit-products/:id" element={<EditProduct />} /> */}
                    </Route>
                </Routes>
            </Suspense>
            {/* <Footer /> */}
        </AdminLayout>
    );
}

export default Routing;