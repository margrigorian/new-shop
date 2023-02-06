import React, { useEffect, useState } from 'react';
import style from "./SearchPage.module.css";
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { NavLink } from 'react-router-dom';
import { links } from '../../store/request/links';
import request from '../../store/request/request';
import { isOpenSearchNavBar } from '../../store/slices/slice-manage';
import { Divider } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type ProductType = {
  title: string,
  id: string,
  price: number,
  src: string,
  dislike?: string,
  likes?: string
}

type SearchProductType = {
  title: string,
  items: ProductType[]
}

const SearchPage: React.FC = () => {
  const manage = useAppSelector(state => state.manage);
  const dispatch = useAppDispatch();
  const [popularProducts, setPopularProducts] = useState<SearchProductType[]>([]);
  const [randomProducts, setRandomProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function getPopProducts() {
      const popProducts = await request("GET", links.popProductsLink, undefined, manage.token);
      const random = popProducts.data.data.filter((item: SearchProductType, i: number) => i > 0).map((item: SearchProductType) => item.items[Math.floor(Math.random() * item.items.length)]);
      setPopularProducts(popProducts.data.data);
      setRandomProducts(random);
    }
    
    getPopProducts();
    
  }, [manage.token])

  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(8);
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const representedProducts = manage.searchProduct.slice(firstProductIndex, lastProductIndex);

  useEffect(() => {
    if(manage.searchProduct.length === 0) {
        setCurrentPage(1);
      }
  }, [manage.searchProduct])

  return (
    <div className={style.container}>
      {
        manage.searchProduct.length === 0 ? 
            popularProducts.length > 0 &&
              <div className={style.topTrendsContainer}>
                <p className={style.topTrendsText}>&mdash; TOP TRENDS SEARCHES</p>
                <div className={style.topProducts}>
                    {
                      popularProducts[0].items.map(item =>
                        <NavLink 
                          to={`/product/${item.id}`} 
                          key={`ProductId-${item.id}`} 
                          style={{textDecoration: "none", color: "rgb(52, 51, 51)"}}
                          onClick={() => dispatch(isOpenSearchNavBar(false))}
                        >
                          <div 
                            className={style.currentProductContainer} 
                          >
                              <img src={item.src} alt="product" style={{width: "130px", height: "200px"}} />
                              <p className={style.productTitle}>{item.title}</p>
                              <p>{item.price} $</p>
                          </div>  
                        </NavLink>
                      )
                    }
                </div>
                <Divider sx={{color: "lightGrey"}} />
                <p className={style.topTrendsText}>&mdash; SIMILAR SEARCHES</p>
                <div className={style.randomProducts}>
                  {
                    randomProducts.map(item => 
                      <NavLink 
                          to={`/product/${item.id}`} 
                          key={`ProductId-${item.id}`}
                          style={{textDecoration: "none", color: "rgb(52, 51, 51)"}}
                          onClick={() => dispatch(isOpenSearchNavBar(false))}
                        >
                        <div className={style.randomProductContainer}>
                          <img src={item.src} alt="product" style={{width: "130px", height: "200px"}} />
                          <p className={style.productTitle}>{item.title}</p>
                          <p>{item.price} $</p>
                        </div> 
                      </NavLink>
                    )
                  }
                </div>
              </div> : 
              
              <div>
                <Stack spacing={2}>
                  <Pagination 
                    // variant="outlined" 
                    // shape="rounded" 
                    page={currentPage}
                    count={Math.ceil(manage.searchProduct.length / productPerPage)} 
                    onChange={(evt, num) => setCurrentPage(num)}
                    sx={{margin: "20px 0 0 74%"}}
                  />
                </Stack>
                <div className={style.searchProductContainer}>
                    {
                      representedProducts.map(item =>
                        <NavLink 
                          to={`/product/${item.id}`} 
                          key={`ProductId-${item.id}`} 
                          style={{textDecoration: "none", color: "rgb(52, 51, 51)"}}
                          onClick={() => dispatch(isOpenSearchNavBar(false))}
                        >
                          <div 
                            className={style.currentSearchProductContainer} 
                          >
                              <img src={item.src} alt="product" style={{width: "130px", height: "200px"}} />
                              <p className={style.productTitle}>{item.title}</p>
                              <p>{item.price} $</p>
                          </div>  
                        </NavLink>
                      )
                    }
                </div>
              </div>
      }
    </div>
  )
}

export default SearchPage;
