import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Preloader from '../pages/preloader/preloader';
import AddCategories from '../pages/category/addCategories';
import AdminLayout from '../components/Layout/AdminLayout';
import AddProduct from '../pages/product/addProduct';
import Dashboard from '../pages/dashboard/dashboard';

const Routing = (): JSX.Element => {
    return (
        <AdminLayout>
            <Suspense fallback={<Preloader />}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/add-categories" element={<AddCategories />} />
                        {/* <Route path="/edit-products" element={<EditAllProducts />} />
                        <Route path="/edit-products/:id" element={<EditProduct />} /> */}
                    </Route>
                </Routes>
            </Suspense>
        </AdminLayout>
    );
}

export default Routing;
