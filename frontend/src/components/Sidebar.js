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
        }
    ]

    return (
        <div>
            <Menu model={items} className="sidebar" />
        </div>
    )
}

export default Sidebar;