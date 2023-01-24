import React from 'react';
import style from "./BasketContent.module.css";
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { NavLink } from 'react-router-dom';
import { changeProductCountInBasket } from '../../store/slices/slice-basket';
import { removeProductFromBasket } from '../../store/slices/slice-basket';
import { isOpenBasketNavBar } from '../../store/slices/slice-manage';
import request from '../../store/request/request';
import { links } from '../../store/request/links';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const BasketContent: React.FC = () => {
    const manage = useAppSelector(state => state.manage);
    const basketProducts = useAppSelector(state => state.basket.products);
    const dispatch = useAppDispatch();

    function selectQuantity() {
        const quantity = [];

        for(let i = 1; i <= 10; i++) {
            quantity.push(i);
        }

        return quantity;
    }

    async function updateCount(productId: string, prevCount: number | undefined, newCount: number) {
        if(prevCount === undefined || prevCount < newCount) {
            const update = await request("PUT", links.updateCountLink, {"product_id": productId, "action": "increase"}, manage.token);
            console.log(update);
        }else {
            const update = await request("PUT", links.updateCountLink, {"product_id": productId, "action": "decrease"}, manage.token);
            console.log(update);
        }
    }

    async function deteteProductOnServer(productId: string) {
        const remove = await request("DELETE", links.addOrRemoveProductLink, {"product_id": productId}, manage.token);
        console.log(remove);
      }

    return (
        <div className={style.container}>
                {
                    basketProducts.map((item, i) => 
                        <div 
                            key={`ProductId-${item.id}`} 
                            className={style.productContainer}
                            style={{
                                borderBottom: (i+1) === basketProducts.length ? "none" : undefined
                                // НЕ МОГУ ЧЕРЕЗ ПРОПСЫ ПЕРЕДАТЬ РАЗМЕР КАРТИНКИ, КОНТЕЙНЕРОВ... 
                                // width: imgSize, 
                                // height: imgSize 
                            }}
                        >
                            <div className={style.productInfo}>
                                <NavLink to={`/product/${item.id}`} 
                                    onClick={() => dispatch(isOpenBasketNavBar(false))}
                                >
                                    <div 
                                        style={{backgroundImage: `url(${item.src})`}} 
                                        className={style.productImg}>
                                    </div>
                                </NavLink>
                                <div className={style.titleContainer}>
                                    <NavLink 
                                        to={`/product/${item.id}`} 
                                        style={{textDecoration: "none", color: 'inherit'}}
                                        onClick={() => dispatch(isOpenBasketNavBar(false))}
                                    >
                                        <div style={{fontWeight: "500"}} className={style.title}>{item.title}</div>
                                    </NavLink>
                                    <div className={style.quantityContainer}>
                                        <p>Quantity</p>
                                        <select 
                                            value={item.count}
                                            onChange={
                                                (evt) => {
                                                    updateCount(item.id, item.count, +evt.target.value);
                                                    dispatch(changeProductCountInBasket({id: item.id, count: evt.target.value}))
                                                }
                                            }
                                        >
                                            {
                                                selectQuantity().map(el =>
                                                    <option key={`OptionId-${el}`}>{el}</option>
                                                )
                                            }
                                        </select>
                                        <p>Size</p>
                                        <select defaultValue="S">
                                            <option>XS</option>
                                            <option>S</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                    </div> 
                                </div>
                            </div>
                            <div className={style.priceContainer}>
                                <div className={style.price}>{item.price} AMD</div>
                                <div className={style.iconsContainer}>
                                    <div className={style.icons}>
                                        <BookmarkBorderOutlinedIcon 
                                            sx={{fontSize: "18px", color: "rgb(128, 128, 128)"}}
                                        />
                                        <DeleteOutlineIcon 
                                            sx={{fontSize: "19px"}}
                                            onClick={() => {
                                                    deteteProductOnServer(item.id);
                                                    dispatch(removeProductFromBasket(item.id));
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>    
                    )
                }
        </div>
    )
}

export default BasketContent;