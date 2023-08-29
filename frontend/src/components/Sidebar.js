import React from 'react';

import { Menu } from 'primereact/menu';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { useAuth } from '../auth/useAuth';

const Sidebar = () => {
    
    const navigate = useNavigate();
    const { signout, user } = useAuth();

    const userMenus = [
        {
            label: "Dashboard",
            icon: "pi pi-th-large",
            template: (item, options) => {
                return (
                    <Link to="/user/dashboard" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Sign Out",
            icon: "pi pi-sign-out",
            command: () => signout()
        }
    ]

    const adminMenus = [
        {
            label: "Dashboard",
            icon: "pi pi-th-large",
            template: (item, options) => {
                return (
                    <Link to="/admin/dashboard" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Ordens",
            icon: "pi pi-shopping-cart",
            template: (item, options) => {
                return (
                    <Link to="/admin/ordem" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Categorias",
            icon: "pi pi-tags",
            template: (item, options) => {
                return (
                    <Link to="/admin/categoria" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Produto",
            icon: "pi pi-box",
            template: (item, options) => {
                return (
                    <Link to="/admin/produto" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Usuário",
            icon: "pi pi-users",
            template: (item, options) => {
                return (
                    <Link to="/admin/usuario" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Sign Out",
            icon: "pi pi-sign-out",
            command: () => signout()
        }
    ]

    return (
        <div className="sidebar">
            <h3>Sidebar</h3>
            <Menu model={user.role === "admin" ? adminMenus : navigate("/user/dashboard")} />
        </div>
    )
}

export default Sidebar;