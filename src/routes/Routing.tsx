import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Preloader from '../pages/preloader/preloader';
import AddCategories from '../pages/category/add/categories/addCategories';
import AdminLayout from '../components/Layout/AdminLayout';
import AddProduct from '../pages/product/add/addProduct';
import Dashboard from '../pages/dashboard/dashboard';
import AllCategories from '../pages/category/all/product/allCategories';
import AddPost from '../pages/blog/add/addPost';
import AddPostCategories from '../pages/category/add/blog/addBlogCategories';
import EditPost from '../pages/blog/edit/editPost';
import EditCategories from '../pages/category/edit/product/editCategories';
import AllBlogCategories from '../pages/category/all/blog/allBlogCategories';
import EditBlogCategories from '../pages/category/edit/blog/editBlogCategories';
import AllSubcategories from '../pages/category/all/subcategories/allSubcategory';
import AllPost from '../pages/blog/all/allPosts';
import AllProducts from '../pages/product/all/allProducts';
import EditProduct from '../pages/product/edit/editProduct';
import AddAttributes from '../pages/attributes/add/addAttributes';
import AllAttributes from '../pages/attributes/all/allAttributes';

const Routing = (): JSX.Element => {
    return (
        <AdminLayout>
            <Suspense fallback={<Preloader isLoading={true} />}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Dashboard />} />

                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/all-product" element={<AllProducts />} />
                        <Route path="/edit-product/:id" element={<EditProduct />} />

                        <Route path="/add-categories" element={<AddCategories />} />
                        <Route path="/all-categories" element={<AllCategories />} />
                        <Route path="/edit-category/:id" element={<EditCategories />} />

                        <Route path="/all-subcategories" element={<AllSubcategories />} />
                        <Route path="/add-subcategories/:id" element={<AllSubcategories />} />

                        <Route path="/add-post" element={<AddPost />} />
                        <Route path="/all-post" element={<AllPost />} />
                        <Route path="/edit-post/:id" element={<EditPost />} />

                        <Route path="/add-post-categories" element={<AddPostCategories />} />
                        <Route path="/all-post-categories" element={<AllBlogCategories />} />
                        <Route path="/edit-post-categories/:id" element={<EditBlogCategories />} />

                        <Route path="/add-attributes" element={<AddAttributes />} />
                        <Route path="/all-attributes" element={<AllAttributes />} />
                        <Route path="/edit-attributes/:id" element={<AddAttributes />} />
                    </Route>
                </Routes>
            </Suspense>
        </AdminLayout>
    );
}

export default Routing;
