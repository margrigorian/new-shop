import React from 'react';
import style from './ProductList.module.css';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../store/hook';
// import { add } from '../../store/slices/slice-products';
// import { addToBasket } from '../../store/slices/slice-basket';
import { ProductType } from '../../store/slices/slice-manage';
import AddIcon from '@mui/icons-material/Add';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';


interface ProductProps {
    products: ProductType[]
}

const ProductList: React.FC<ProductProps> = ({products}) => {
    const dispatch = useAppDispatch();

    return (
        <div className={style.container}>
        {
            products.map(item => 
                <div key={`productId-${item.id}`} className={style.productsContainer}>
                    <NavLink to={`/product/${item.id}`}>
                        <div 
                            style={{backgroundImage:  `url(${item.src !== '' ? item.src : 'https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg'}`}} 
                            className={style.productsImage}
                        >
                        </div>
                    </NavLink>
                    <div className={style.productsTitleContainer}>
                        <NavLink 
                            to={`/product/${item.id}`} 
                            className={style.productTitle}
                        >
                            {item.title}
                        </NavLink>
                        {/* <p className={style.productTitle}>{item.title}</p> */}
                        <div className={style.iconsContainer}>
                            <AddIcon 
                                sx={{fontSize: 20, cursor: "pointer", color: "rgb(73, 73, 39)"}}
                                onClick={() => {
                                    // dispatch(add(item.id))
                                    // dispatch(addToBasket(item))
                                }}
                            />
                            <BookmarkBorderOutlinedIcon sx={{fontSize: 20, cursor: "pointer", color: "lightGrey"}} />
                        </div>
                    </div>
                    <p className={style.price}>{item.price} AMD</p>
                </div>
            )
        }
    </div>
    )
}

export default ProductList;
