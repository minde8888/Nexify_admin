import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import { useAppDispatch } from '../../redux/store';
import { userLogout } from '../../redux/slice/authSlice';
// import { getProducts } from '../../redux/slice/productsSlice';
// import { logout } from '../../services/auth.services/auth.services';
// import { getAllProducts } from '../../services/products.services/products.services';
import './sidebar.scss';
import home from '../../assets/svg/house_icon.svg';
import card from '../../assets/svg/shopping_cart_thin_icon.svg';
import category from '../../assets/svg/category_new_icon.svg';
import settings from '../../assets/svg/setting_smartphone_icon.svg';
import blog from '../../assets/svg/blog_web_article_articles_internet_icon.svg';
import order from '../../assets/svg/analytics_dollar_growth_growth traffic_business_icon.svg';

interface SidebarProps { }

const Sidebar: FunctionComponent<SidebarProps> = () => {
    const dispatch = useAppDispatch();
    let { isLoggedIn } = useAppSelector((state) => state.data.auth);
    // let { surname, name, id } = useAppSelector((state) => state.data.user);

    // const toggleClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    //     event.stopPropagation();
    //     event.currentTarget.classNameList.toggle('open');
    // };

    const onLogout = () => {
        dispatch(userLogout());
        // logout();

        (async () => {
            // const data = await getAllProducts();
            // dispatch(getProducts(data));
        })();
    };

    return (
        <>
            <section className="app">
                <aside className="sidebar">
                    <header>
                        Menu
                    </header>
                    <nav className="sidebar-nav">

                        <ul>
                            <li>
                                <NavLink to={'/'}>
                                    <i className="ion-bag">
                                        <img src={home} alt="imgAltText" />
                                    </i>
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/'}>
                                    <i className="ion-ios-settings">
                                        <img src={category} alt="imgAltText" />
                                    </i>
                                    <span className="">Categories</span>
                                </NavLink>
                                <ul className="nav-flyout">
                                    <li>
                                        <NavLink to={'/add-categories'}>
                                            <i className="ion-ios-flame-outline"></i>
                                            Add Categories
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/edit-categories'}>
                                            <i className="ion-ios-lightbulb-outline"></i>
                                            Edit Categories
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/add-post-categories'}>
                                            <i className="ion-ios-flame-outline"></i>
                                            Add Blog Categories
                                        </NavLink>
                                    </li>
                                    <li>
                                    <NavLink to={'/edit-post-categories'}>
                                            <i className="ion-ios-flame-outline"></i>
                                            Edit Blog Categories
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-navigate-outline"></i>Ghostface</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to={'/'}>
                                    <i className="ion-ios-settings">
                                        <img src={card} alt="imgAltText" />
                                    </i>
                                    <span className="">Products</span>
                                </NavLink>
                                <ul className="nav-flyout">
                                    <li>
                                        <NavLink to={'/add-product'}>
                                            <i className="ion-ios-alarm-outline"></i>
                                            Add Product
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-camera-outline"></i>Creeper</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-chatboxes-outline"></i>Hate</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-cog-outline"></i>Grinder</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to={'/'}>
                                    <i className="ion-ios-settings">
                                        <img src={blog} alt="imgAltText" />
                                    </i>
                                    <span className="">Blog</span>
                                </NavLink>
                                <ul className="nav-flyout">
                                    <li>
                                        <NavLink to={'/add-post'}>
                                            <i className="ion-ios-flame-outline"></i>
                                            Add Post
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-information-outline"></i>Edit Post</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-paperplane-outline"></i>Planes</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-android-star-outline"></i>Shop</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to={'/'}>
                                    <i className="ion-ios-settings">
                                        <img src={order} alt="imgAltText" />
                                    </i>
                                    <span className="">Orders</span>
                                </NavLink>
                                <ul className="nav-flyout">
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-timer-outline"></i>Timers</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-arrow-graph-down-left"></i>You Lose</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-partlysunny-outline"></i>Stormy</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-timer-outline"></i>Lookie Look</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-game-controller-a-outline"></i>Dork Mfer</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to={'/'}>
                                    <i className="ion-ios-settings">
                                        <img src={settings} alt="imgAltText" />
                                    </i>
                                    <span className="">Settings</span>
                                </NavLink> <NavLink to={'/'}><i className="ion-ios-navigate-outline"></i> <span className="">Ass Finder</span></NavLink>
                                <ul className="nav-flyout">
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-flame-outline"></i>Burn</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-lightbulb-outline"></i>Bulbs</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-location-outline"></i>Where You</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-locked-outline"></i>On Lock</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}><i className="ion-ios-navigate-outline"></i>Ghostface</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink to={'/'}><i className="ion-ios-medical-outline"></i> <span className="">Cocaine</span></NavLink>
                            </li>
                        </ul>
                    </nav>
                </aside>
            </section>
        </>

    );
};

export default Sidebar;