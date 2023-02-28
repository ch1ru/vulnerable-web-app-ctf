import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/header.css';
import Cookies from 'js-cookie';

export default function Header(props) {
    return (
        <header className="header">
            <div className="left">
                <img className="logo" src={'https://www.pinclipart.com/picdir/big/59-595234_civilization-mesopotamian-gods-symbols-clipart.png'} />
                <h2>{props.title}</h2>
            </div>
            <div className="right">
                <NavLink to={'/home'}>
                    <a>Home</a>
                </NavLink>
                {Cookies.get('jwt') ?
                    <NavLink to={'/account'}>
                    <a>Account</a>
                    </NavLink>
                    :
                    <></>
                }
                
                {Cookies.get('jwt') ?
                    <NavLink to={'/logout'}>
                    <a>Logout</a>
                    </NavLink>
                    :
                    <NavLink to={'/login'}>
                    <a>Login</a>
                    </NavLink>
                }
            </div>
                
        </header>
    )
}