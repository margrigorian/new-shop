import React from 'react';
import style from "./BasketDrawer.module.css";
import { useState } from 'react';
import { useAppSelector } from '../../store/hook';
import { useAppDispatch } from '../../store/hook';
import { isOpenBasketDrawer } from '../../store/slices/slice-manage';
import { NavLink } from 'react-router-dom';
import { Drawer, Divider } from '@mui/material';
// import BasketContent from '../basket_content/BasketContent';
// import OrderSummary from '../order_summary/OrderSummary';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

const BasketDrawer: React.FC = () => {
  const [activeBasketChapter, setActiveBasketChapter] = useState(true); 
  const manage = useAppSelector(state => state.manage);
  const basket = useAppSelector(state => state.basket.products);
  const dispatch = useAppDispatch();

  return (
      <Drawer
          anchor='right'
          open={manage.isActiveBasketDrawer}
          onClick={() => {
            setActiveBasketChapter(true)
            dispatch(isOpenBasketDrawer(false))}
          }
        //   hideBackdrop={true} // серая область
      >
        <div className={style.wrapper} onClick={(event) => event.stopPropagation()}>
          <div className={style.content}>
            <div className={style.headerDrawerContainer}>
              <div 
                className={`${style.drawerHeader} ${style.basketContainer}`}
                style={{borderColor: activeBasketChapter ? "rgb(52, 51, 51)" : undefined, 
                        color: activeBasketChapter ? "rgb(52, 51, 51)" : undefined}}
                onClick={() => setActiveBasketChapter(true)}
              >
                Basket ({basket.length})
              </div>
              <div 
                className={`${style.drawerHeader} ${style.wishListContainer}`}
                style={{borderColor: !activeBasketChapter ? "rgb(52, 51, 51)" : undefined,
                        color: !activeBasketChapter ? "rgb(52, 51, 51)" : undefined}}
                onClick={() => setActiveBasketChapter(false)}
              >
                <p className={style.wishListHeaderText}>Wish list</p>
                <p 
                  className={style.closeIcon} 
                  onClick={(event) => {
                    event.stopPropagation() // чтобы не срабатывало измнение Chapter из-за клика в области контейнера
                    setActiveBasketChapter(true) // сработают именно прописанные здесь функции
                    dispatch(isOpenBasketDrawer(false))
                  }}
                >
                  &#x2717;
                </p>
              </div>
            </div>
            <Divider />

            {
              activeBasketChapter ? 
                 basket.length === 0 ?
                    <div className={style.basketContent}>
                      <div className={style.iconContainer}>
                        <ShoppingBagOutlinedIcon sx={{fontSize: 40}} />
                      </div>
                      <p className={`${style.textCentral} ${style.textAboutEmptyBasket}`}>Your shopping basket is empty</p>
                      <p className={`${style.textCentral} ${style.textAboutFavourites}`}>See if your favourites are in your basket or add items from the new collection</p>
                      <div className={style.buttonContainer}>
                        <button className={style.button}>See new collection</button>
                      </div> 
                    </div> : <div className={style.basketDrawerContent}>
                                {/* ПЕРЕАДЕТ changeStatusOfBasketNavBar, ИНАЧЕ ВЫДАЕТ ПУСТУЮ КОРЗИНУ */}
                                
                                {/* <BasketContent // ОТРИСУЮТСЯ ТОВАРЫ ИЗ КОРЗИНЫ
                                  closeBasketNavBar={changeStatusOfBasketNavBar} 
                                  
                                  // ПРОПСЫ РАЗМЕРОВ НЕ СЧИТЫВАЮТСЯ
                                  // imgSize={"80px"} 
                                  // productInfoContainerSize={"80px"}
                                /> */}
                            </div> :
                    
                    <div className={style.basketContent}>
                      <div className={style.iconContainer}>
                        <BookmarkBorderOutlinedIcon sx={{fontSize: 40}} />
                      </div>
                      <p className={`${style.textCentral} ${style.textAboutSeeWishList}`}>DO YOU WANT TO SEE YOUR WISHLIST?</p>
                      <p className={`${style.textCentral} ${style.textAboutSignUpOrLogin}`}>
                        <span className={style.textSpan}>Sign up</span> &nbsp;or&nbsp; <span className={style.textSpan}>Log in</span>
                      </p>
                    </div>
            }
          </div>

          {
            basket.length !== 0 && activeBasketChapter ? 
                <div>
                  {/* <OrderSummary /> */}
                  <NavLink 
                    to="/basket" style={{textDecoration: "none"}} 
                    onClick={() => {
                    //   closeCart()
                    //   changeStatusOfBasketNavBar(true)
                    }}
                  >
                    <div className={style.buttonContainer}>
                      <button className={style.orderButton}>Go to your shopping basket</button>
                    </div>
                  </NavLink>
                </div> : undefined
          }

        </div>
      </Drawer>
  )
}

export default BasketDrawer;