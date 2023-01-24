import React, { useState } from 'react';
import style from "./BasketPage.module.css";
import { useAppSelector } from '../../store/hook';
import BasketContent from '../../components/basket_content/BasketContent';
import OrderSummary from '../../components/order_summary/OrderSummary';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import request from '../../store/request/request';
import { links } from '../../store/request/links';

const BasketPage: React.FC = () => {
    const [activeChapter, setActiveChapter] = useState(true); 
    const manage = useAppSelector(state => state.manage);
    const basketProducts = useAppSelector(state => state.basket.products);

    async function makePurchase() {
        const purchase = await request("POST", links.purchaseLink, undefined, manage.token);
        console.log(purchase);
    }

    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.basketNavBar}>
                    <div 
                        className={style.drawerHeader}
                        style={{
                                borderBottom: activeChapter ? "1.5px solid rgb(128, 128, 128)" : undefined,    
                                color: activeChapter ? "rgb(164, 162, 162)" : undefined}}
                        onClick={() => setActiveChapter(true)}
                    >
                        Basket  &nbsp;{basketProducts.length}
                    </div>
                    <div 
                        className={style.drawerHeader}
                        style={{
                                borderBottom: !activeChapter ? "1.5px solid rgb(128, 128, 128)" : undefined,  
                                color: !activeChapter ? "rgb(164, 162, 162)" : undefined}}
                        onClick={() => setActiveChapter(false)}
                    >
                        <p className={style.wishListHeaderText}>Wish list</p>
                    </div>
                </div>

                {
                    activeChapter ? 

                        basketProducts.length !== 0 ? 

                            <div className={style.basketContainer}>
                                <div className={style.productsContainer}>
                                    <BasketContent />
                                </div>
                                <div className={style.orderContainer}>
                                    <p className={style.orderSummaryText}>Order Summary</p>
                                    <OrderSummary />
                                    <div className={style.buttonContainer}>
                                        <button 
                                            className={`${style.button} ${style.buyButton}`}
                                            onClick={() => makePurchase()}
                                        >
                                            Pay for the order
                                        </button>
                                    </div>
                                </div>
                            </div> : 
                            
                            <div className={style.emptyBasketContainer}> 
                                <div className={style.emptyBasketContent}>
                                    <div className={style.textContainer}>
                                        <div className={style.iconContainer}>
                                            <ShoppingBagOutlinedIcon sx={{fontSize: 40}} />
                                        </div>
                                        <p className={`${style.textCentral} ${style.textAboutEmptyBasket}`}>
                                            Your shopping basket is empty
                                        </p>
                                        <p className={`${style.textCentral} ${style.textAboutFavourites}`}>
                                            See if your favourites are in your basket or add items from the new collection
                                        </p>
                                        <div className={style.buttonContainer}>
                                            <button className={`${style.button} ${style.seeCollectionButton}`}>
                                                See new collection
                                            </button>
                                        </div> 
                                    </div>
                                </div>
                                <div className={style.image}></div>
                            </div> :

                            <div className={style.emptyBasketContainer}> 
                                <div className={style.emptyBasketContent}>
                                    {/* <div className={style.containerPart}></div>
                                    <div className={style.containerPart}> */}

                                        <div className={style.textContainer}>
                                            <div className={style.iconContainer}>
                                                <BookmarkBorderOutlinedIcon sx={{fontSize: 40}} />
                                            </div>
                                            <p 
                                                className={`${style.textCentral} ${style.textAboutSeeWishList}`}
                                            >
                                                DO YOU WANT TO SEE YOUR WISHLIST?
                                            </p>
                                            <p className={`${style.textCentral} ${style.textAboutSignUpOrLogin}`}>
                                                <span className={style.textSpan}>
                                                    Sign up
                                                </span> &nbsp;or&nbsp; <span className={style.textSpan}>Log in</span>
                                            </p>
                                        </div>
                                        
                                    {/* </div> */}
                                </div>
                                <div className={style.image}></div>
                            </div>
                }
                
            </div> 
        </div>
    )
}

export default BasketPage;