import React from 'react';

import { Menu } from 'primereact/menu';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const items = [
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
            label: "Produtos",
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
        }
    ]

    return (
        <div className="sidebar">
            <h3>Sidebar</h3>
            <Menu model={items} />
        </div>
    )
}

export default Sidebar;