import React from 'react';
import style from "./Menu.module.css";
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { isOpenMenu } from '../../store/slices/slice-manage';
import { isOpenSearchNavBar } from '../../store/slices/slice-manage';
import { NavLink } from 'react-router-dom';
import { Divider, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Menu: React.FC = () => {
    const manage = useAppSelector(state => state.manage);
    const dispatch = useAppDispatch();

  return (
    <Modal open={manage.isActiveMenu}>
        <div className={style.menuContainer}>
            <div className={style.menuHeader}>
                <p 
                    className={style.menuHeaderText}
                    onClick={() => dispatch(isOpenMenu(false))}
                >
                    BACK
                </p>
                <div className={style.searchContainer}>
                    <SearchIcon 
                        sx={{
                            marginRight: "10px",
                            color: "lightgrey"
                        }}
                    />
                    <NavLink to='/search' style={{width: "100%"}}>
                        <input 
                            type="search" 
                            placeholder='WHAT ARE YOU LOOKING FOR?'
                            className={style.searchInput}
                            onClick={() => {
                                dispatch(isOpenMenu(false));
                                dispatch(isOpenSearchNavBar(true));
                            }}
                        />
                    </NavLink>
                </div>
                        
            </div>

            <div className={style.menuContentContainer}>
                <div className={style.menuList}>
                    <NavLink to="/limited-edition-page" style={{textDecoration: "none"}} onClick={() => dispatch(isOpenMenu(false))}>
                        <p className={`${style.menuListItem} ${style.listItemMarginBottom}`}>LIMITED EDITION</p>
                    </NavLink>
                    <p className={`${style.menuListItem} ${style.listItemMarginBottom}`}>NEW IN</p>
                    <div className={style.listItemMarginBottom}>
                        <NavLink to="/collection" style={{textDecoration: "none"}} onClick={() => dispatch(isOpenMenu(false))}>
                            <p 
                                className={`${style.menuListItem} ${style.collectionListItem} ${style.listItemPadding}`}
                            >
                                COLLECTION
                            </p>
                        </NavLink>
                        {/* <NavLink to="/accessorias" style={{textDecoration: "none"}} onClick={() => dispatch(isOpenMenu(false))}> */}
                            <p className={`${style.menuListItem} ${style.listItemPadding}`}>ACCESSORIAS</p>
                        {/* </NavLink> */}
                        <p className={`${style.menuListItem} ${style.listItemPadding}`}>SHOES</p>
                    </div>
                    <div className={style.listItemMarginBottom}>
                        <p className={`${style.menuListItem} ${style.listItemPadding}`}>JOIN LIFE</p>
                        <p className={`${style.menuListItem} ${style.listItemPadding}`}>EDITORIAL</p>
                        <p className={`${style.menuListItem} ${style.listItemPadding}`}>PAPER</p>
                    </div>
                </div>
                <Divider 
                    orientation="vertical" 
                    sx={{border: "2px solid rgb(231, 228, 228)"}}
                />
                <div className={style.menuImageContainer}>
                    <div className={style.gif}></div>
                    <div className={style.image}></div>
                </div>
            </div>
        </div>
    </Modal>
  )
}

export default Menu;