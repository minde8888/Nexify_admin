import { FunctionComponent, MouseEventHandler } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import { useAppDispatch } from '../../redux/store';
import { userLogout } from '../../redux/slice/authSlice';
// import { getProducts } from '../../redux/slice/productsSlice';
// import { logout } from '../../services/auth.services/auth.services';
// import { getAllProducts } from '../../services/products.services/products.services';
import './sidebar.scss';

interface SidebarProps { }

const Sidebar: FunctionComponent<SidebarProps> = () => {
    const dispatch = useAppDispatch();
    let { isLoggedIn } = useAppSelector((state) => state.data.auth);
    // let { surname, name, id } = useAppSelector((state) => state.data.user);

    const toggleClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        event.currentTarget.classList.toggle('open');
    };

    const onLogout = () => {
        dispatch(userLogout());
        // logout();

        (async () => {
            // const data = await getAllProducts();
            // dispatch(getProducts(data));
        })();
    };

    return (
        <div className="navBar">
            <button className="menu" onClick={toggleClickHandler}>
                {isLoggedIn ? (
                    <>
                        <div className="nav_button">
                            <NavLink className="nav_link" to={'/add-products'}></NavLink>
                        </div>
                        <span className="home2 nav">add products</span>
                        <div className="nav_button">
                            <NavLink className="nav_link" to={'/edit-products'}></NavLink>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="nav_button">
                            <NavLink className="nav_link" to={'/'}></NavLink>
                        </div>
                        <span className="home nav">home</span>
                        <div className="nav_button">
                            <NavLink className="nav_link" to={'/products'}></NavLink>
                        </div>
                        <span className="home1 nav">products</span>
                    </>
                )}
                <div className="nav_button"></div>
                <div className="nav_button"></div>
                <div className="nav_button"></div>
                <div className="nav_button"></div>
                <div className="nav_button"></div>
            </button>
            <NavLink to={'/'} className="logo">
                LOGO
            </NavLink>
            <div className="links">
                {!isLoggedIn ? (
                    <>
                        <NavLink to={'/login'} className="login">
                            Login
                        </NavLink>
                        <NavLink to={'/signup'} className="signup">
                            Sign Up
                        </NavLink>
                    </>
                ) : (
                    <>
                        {/* <NavLink to={`profile/${id}`} className="profile">
                            {name} {surname}
                        </NavLink> */}
                        <button onClick={onLogout} className="userLogout">
                            Logout
                        </button>
                    </>
                )}
            </div>
            <Outlet />
        </div>
    );
};

export default Sidebar;