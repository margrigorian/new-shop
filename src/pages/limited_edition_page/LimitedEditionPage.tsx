import React, { useState, useEffect } from 'react';
import style from "./LimitedEditionPage.module.css";
import { useAppSelector } from '../../store/hook';
import { useAppDispatch } from '../../store/hook';
import { getProductsOfLimitedEdition } from '../../store/slices/slice-manage';
import { links } from '../../store/request/links';
import request from '../../store/request/request';
import ProductList from '../../components/product_list/ProductList';

const LimitedEditionPage: React.FC = () => {
  const manage = useAppSelector(state => state.manage);
  const dispatch = useAppDispatch();
  const [activePageNavBarElement, setActivePageNavBarElement] = useState(true);
 
  useEffect(() => {

    // dispatch(getProductList({link: links.collectionLink, token: manage.token}));
      
      async function getProducts() {
          const products = await request("GET", links.limitedEditionLink, undefined, manage.token);

          dispatch(getProductsOfLimitedEdition(products.data.data.items));
      }

      getProducts();

  }, [dispatch, manage.token])

  console.log(manage.limitedEditionProducts);
  
  return (
    <div className={style.container}>
      <div className={style.limitedEditionHeader}>
          <p className={`${style.limitedEditionText} ${style.cursor}`}>LIMITED EDITION</p>
          <div className={style.limitedEditionNavBarContainer}>
              <p 
                  className={`${style.limitedEditionNavBarEl} ${style.cursor} ${style.colorHover}`}
                  style={{
                      borderBottom: !activePageNavBarElement ? "1px solid" : undefined
                  }}
                  onClick={() => setActivePageNavBarElement(false)}
              >
                  LOOKBOOK
              </p>
              <p 
                  className={`${style.cursor} ${style.colorHover}`}
                  style={{borderBottom: activePageNavBarElement ? "1px solid" : undefined}}
                  onClick={() => setActivePageNavBarElement(true)}
              >
                  COLLECTION
              </p>
          </div>
          {/* <p></p> */}
      </div>

      <div className={style.largeTextContainer}>
          <div className={style.largeText}>
              <p>LIMITED</p>
              <p>EDITION</p>
          </div>
          <div className={`${style.largeText} ${style.secondLargeText}`}>
              <p>FALL AUTUMN</p>
              <p>2022</p>
          </div>
      </div>

      <p className={style.capsule}>CAPSULE</p>

      {
        manage.limitedEditionProducts !== null ?
          manage.limitedEditionProducts.length !== 0 ? <ProductList products={manage.limitedEditionProducts} /> : undefined 
            : <h1>Loading...</h1>
      }

  </div>
  )
}

export default LimitedEditionPage;
