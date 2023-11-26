import React from 'react';
import style from './layout.module.scss';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';

type AdminLayoutProps = {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }: AdminLayoutProps) => {
    return (
        <div className={style.layout}>
            <Sidebar />
            <div className={style.content}>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default AdminLayout;