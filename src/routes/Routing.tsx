import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Preloader from '../pages/preloader/preloader';
import AddCategories from '../pages/category/addCategories';
import AdminLayout from '../components/Layout/AdminLayout';
import AddProduct from '../pages/product/addProduct';
import Dashboard from '../pages/dashboard/dashboard';
import EditCategories from '../pages/category/editCategories';
import AddPost from '../pages/blog/addPost';
import AddPostCategories from '../pages/category/addBlogCategories';
import EditPostCategories from '../pages/category/editPostCategories';

const Routing = (): JSX.Element => {
    return (
        <AdminLayout>
            <Suspense fallback={<Preloader isLoading={true} />}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/add-categories" element={<AddCategories />} />
                        <Route path="/edit-categories" element={<EditCategories />} />
                        <Route path="/add-post" element={<AddPost />} />
                        <Route path="/add-post-categories" element={<AddPostCategories />} />
                        <Route path="/edit-post-categories" element={<EditPostCategories />} />
                        {/* <Route path="/edit-products/:id" element={<EditProduct />} /> */}
                    </Route>
                </Routes>
            </Suspense>
        </AdminLayout>
    );
}

export default Routing;
