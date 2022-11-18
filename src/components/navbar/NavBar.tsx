import React from 'react';
import style from "./NavBar.module.css";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectManage } from '../../store/slices/slice-manage';
import { selectBasket } from '../../store/slices/slice-basket';
import { IconButton, Typography } from "@mui/material";
import { Search, MenuOutlined } from "@mui/icons-material"; 

export default function NavBar() {
    const manage = useSelector(selectManage);
    const basket = useSelector(selectBasket);
    const currentPageLink = window.location.pathname; // или сразу "/", т.к. ограничение действий на 1-й стр 

    console.log(currentPageLink);

    return (
        <div className={style.navBar}>
                <div className={style.logoContainer}>
                    <div
                        // onClick={() => {token.token === "" ? openLoginDrawer() : openMenu()}}
                    >
                        <IconButton
                            sx={{ marginRight: "10px"}}
                        >
                            <MenuOutlined />
                        </IconButton>
                    </div>
                    <div>
                        <NavLink to={`/`} className={style.logo}>
                            <Typography
                                variant='h6'   
                                sx={{ 
                                    fontFamily: "Segoe Script",
                                    fontSize: "30px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    display: "inline" // курсор сработает только на тексте
                                }}
                            >
                                mishellelin
                            </Typography>
                        </NavLink>
                    </div>
                </div>

                <div className={style.navBarElementContainer}>
                    <NavLink 
                        // to={manage.token !== "" ? '/collection/' : undefined}
                        to={manage.token !== "" ? '/collection/' : currentPageLink}
                        className={style.navBarElement} 
                        // onClick={() => manage.token === "" ? openLoginDrawer() : undefined} // переход на страницу
                    >
                        COLLECTION
                    </NavLink>
                    <NavLink 
                        // to={manage.token !== "" ? '/limited-edition-page/' : undefined} 
                        to={manage.token !== "" ? '/limited-edition-page/' : currentPageLink} 
                        className={style.navBarElement}
                        // onClick={() => manage.token === "" ? openLoginDrawer() : undefined}
                    >
                        LIMITED EDITION
                    </NavLink>
                </div>

                <div className={style.iconContainer}>
                    <NavLink 
                        // to={manage.token !== "" ? "/search" : undefined} 
                        to={manage.token !== "" ? "/search" : currentPageLink} 
                        style={{textDecoration: "none", color: "rgb(52, 51, 51)"}}
                        // onClick={() => {
                        //     if(manage.token === "") {
                        //         openLoginDrawer();
                        //     }else {
                        //         openSearchNavBar(true);
                        //     }
                        // }}
                    >
                        <div className={`${style.searchContainer} ${style.iconHover}`}>
                            <Search style={{color: "lightgrey"}} className={style.iconHover} />
                            <p>Search</p>
                        </div>
                    </NavLink>
                    <p className={style.iconHover}>Log in</p>
                    <p 
                        // onClick={() => {manage.token === "" ? openLoginDrawer() : openBasketDrawer()}}
                        className={`${style.myShoppingBasketContainer} ${style.iconHover}`}
                    >
                        My shopping basket <span>
                            <sup>
                                <button className={style.basketSup}>
                                    {basket.length}
                                </button>
                            </sup>
                        </span>
                    </p>
                </div>
            </div>
    )
}
