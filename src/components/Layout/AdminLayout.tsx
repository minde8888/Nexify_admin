import React from 'react';
import style from './layout.module.scss';
import Sidebar from '../Sidebar/Sidebar';

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
            <footer>
                <p>Copyright 2023 GKM IT</p>
            </footer>
        </div>
    );
};

export default AdminLayout;