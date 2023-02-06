import React, { useEffect } from 'react';
import style from "./AccessoriasPage.module.css";
import { useAppSelector } from '../../store/hook';
import { useAppDispatch } from '../../store/hook';
// import { getProductList } from '../../store/slices/slice-basket'; // AsyncThunk
import { getProductsOfAccessorias } from '../../store/slices/slice-manage';
import { links } from '../../store/request/links';
import request from '../../store/request/request';
import ProductList from '../../components/product_list/ProductList';

const AccessoriasPage: React.FC = () => {
  const manage = useAppSelector(state => state.manage);
  const dispatch = useAppDispatch();
 
  useEffect(() => {

    // dispatch(getProductList({link: links.collectionLink, token: manage.token}));
      
      async function getProducts() {
          const products = await request("GET", links.accessoriasLink, undefined, manage.token);
          console.log(products.data.data.items);
          
          dispatch(getProductsOfAccessorias(products.data.data.items));
      }

      getProducts();

  }, [dispatch, manage.token])
  
  
  return (
    <div className={style.container}>
        <div className={style.headColorBlock}>ACCESSORIAS</div>
        {
          manage.accessoriasProducts !== null ?
            manage.accessoriasProducts.length !== 0 ? <ProductList products={manage.accessoriasProducts} /> : undefined 
              : <h1>Loading...</h1>
        }
        
    </div>
  )
}

export default AccessoriasPage;
