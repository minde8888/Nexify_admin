import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Preloader from '../pages/preloader/preloader';
import AddCategories from '../pages/category/add/addCategories';
import AdminLayout from '../components/Layout/AdminLayout';
import AddProduct from '../pages/product/addProduct';
import Dashboard from '../pages/dashboard/dashboard';
import AllCategories from '../pages/category/all/allCategories';
import AddPost from '../pages/blog/addPost';
import AddPostCategories from '../pages/category/add/addBlogCategories';
import EditPostCategories from '../pages/category/all/allBlogCategories';
import EditPost from '../pages/blog/editPost';
import EditCategories from '../pages/category/edit/editCategories';

const Routing = (): JSX.Element => {
    return (
        <AdminLayout>
            <Suspense fallback={<Preloader isLoading={true} />}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/add-categories" element={<AddCategories />} />
                        <Route path="/all-categories" element={<AllCategories />} />
                        <Route path="/edit-category/:id" element={<EditCategories />} />
                        <Route path="/add-post" element={<AddPost />} />
                        <Route path="/all-post" element={<EditPost />} />
                        <Route path="/add-post-categories" element={<AddPostCategories />} />
                        <Route path="/edit-post-categories" element={<EditPostCategories />} />       
                    </Route>
                </Routes>
            </Suspense>
        </AdminLayout>
    );
}

export default Routing;
