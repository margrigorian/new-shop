import React from 'react';
import style from "./NavBar.module.css";
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';
import { useAppDispatch } from '../../store/hook';
import { isOpenLoginDrawer } from '../../store/slices/slice-manage';
import { isOpenBasketDrawer } from '../../store/slices/slice-manage';
import { IconButton, Typography } from "@mui/material";
import { Search, MenuOutlined } from "@mui/icons-material"; 

const NavBar: React.FC = () => {
    const manage = useAppSelector(state => state.manage);
    const basket = useAppSelector(state => state.basket.products);
    const dispatch = useAppDispatch();

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
                        to={manage.token !== "" ? '/collection/' : '/'}
                        className={style.navBarElement} 
                        onClick={() => manage.token === "" ? dispatch(isOpenLoginDrawer(true)) : dispatch(isOpenLoginDrawer(false))}
                    >
                        COLLECTION
                    </NavLink>
                    <NavLink 
                        to={manage.token !== "" ? '/limited-edition-page/' : '/'} 
                        className={style.navBarElement}
                        onClick={() => manage.token === "" ? dispatch(isOpenLoginDrawer(true)) : dispatch(isOpenLoginDrawer(false))}
                    >
                        LIMITED EDITION
                    </NavLink>
                </div>

                <div className={style.iconContainer}>
                    <NavLink 
                        to={manage.token !== "" ? "/search" : '/'} 
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
                    <p 
                        className={style.iconHover}
                        onClick={() => dispatch(isOpenLoginDrawer(true))}
                    >
                        Log in
                    </p>
                    <p 
                        // onClick={() => manage.token !== "" ? dispatch(isOpenBasketDrawer(true)) : dispatch(isOpenLoginDrawer(true))}
                        onClick={() => dispatch(isOpenBasketDrawer(true))}
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

export default NavBar;