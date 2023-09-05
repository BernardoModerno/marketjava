import React from 'react';

import { Badge } from 'antd';
import {
  Link,
  NavLink,
} from 'react-router-dom';

import { useCart } from '../auth/cart';
import { useAuth } from '../auth/useAuth';

const HeaderUser = () => {
  const { signout, user } = useAuth();
  const [cart] = useCart();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/user/dashboard" className="navbar-brand">
              🛒 Ecommerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>

              {!user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">
                      Registrar-se
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/signin" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {user?.nome}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`${
                            user?.role === "admin" ? "admin" : "user"
                          }/dashboard`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={signout}
                          to="/signin"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/user/cart" className="nav-link">
                    Cart
                  </NavLink>
                </Badge>
              </li>
              <li className="nav-item ml-5">
                  <NavLink
                    onClick={signout}
                    to="/signin"
                    className="dropdown-item"
                  >
                    Logout
                  </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeaderUser;
