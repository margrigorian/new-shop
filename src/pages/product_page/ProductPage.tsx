import React, { useState, useEffect } from 'react';
import style from './ProductPage.module.css';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';
import { useAppDispatch } from '../../store/hook';
import { NavLink } from 'react-router-dom';
import { isOpenBasketNavBar } from '../../store/slices/slice-manage';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import request from '../../store/request/request';
import { links } from '../../store/request/links';
import { RequestProductType } from '../../store/slices/slice-basket';
// import { requestAddProductToBasket } from '../../store/slices/slice-basket';
import { addProductToLoсalBasket } from '../../store/slices/slice-basket';
import Reviews from '../../components/reviews/Reviews';
// import AnchorLink from "react-anchor-link-smooth-scroll-v2"; // НЕ НАХОДИТСЯ ЯКОРЬ В МОДУЛЕ


const ProductPage: React.FC = () => {
    const [currentProduct, setCurrentProduct] = useState<RequestProductType | null>(null);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const manage = useAppSelector(state => state.manage);
    const basket = useAppSelector(state => state.basket);
    const basketProduct = basket.products.find(item => item.id === id);
  
    useEffect(() => {
        function getProduct() {
          requestCurrentProduct();
          if(currentProduct) {
            if(currentProduct.reactions.yourReaction === "like") {
              setLike(true);
            }else if(currentProduct.reactions.yourReaction === "dislike") {
              setDislike(true);
            }
          }

          console.log(1);
        }
  
        getProduct();
  
    }, [id, manage.token]) // если указываю currentProduct, запускает бесконечный повтор
  
    console.log(basket.products);

    async function requestCurrentProduct() {
      const product = await request("GET", links.currentProductLink(id), undefined, manage.token);
      setCurrentProduct(product.data.data);
    }
  
    async function addProduct(productId: string) {
      const add = await request("POST", links.addOrRemoveProductLink, {"product_id": productId}, manage.token);
      console.log(add);
    }

  
    // async function switchingArrows(id: string) { // ДЛЯ ПЕРЕКЛЮЧЕНИЯ СТРЕЛОК
      
    // }

    async function sendRaiting(yourRate: string, action: string) {
      if(currentProduct) { // ругается, вдруг currentProduct === null
        const rate = await request("POST", links.rateLink, {product_id: currentProduct.id, type: yourRate, action: action}, manage.token);
        console.log(rate); // ИНОГДА ВЫХОДИТ ОШИБКА 403, FORBIDDEN
      }
    }

    console.log(currentProduct);
    
    return (
      <div className={style.container}>
        <div className={style.navigate}>
          <NavLink to={"/"} className={`${style.buttonBack} ${style.hover}`}>
            <p>Back</p>
          </NavLink>
  
          <div className={style.arrows}>
            {/* ЛОГИКА ПЕРЕКЛЮЧЕНИЯ СТРЕЛОК НЕ ПРОПИСАНА. КОД СТАРЫЙ */}
            {/* <NavLink 
              to={`/product/${product.id !== 1 ? product.id - 1 : product.id}`} 

              // to={`/product/${product.id.length === 1 ? (product.id !== 1 ? product.id - 1 : product.id) : ...}`} 
              // ДЛЯ РАБОТЫ С ЗАПРОШЕННЫМ МАССИВОМ
              // to={`/product/${productIndex !== 0 ? productIndex - 1 : productIndex}`} 
              
              style={{color: "rgb(52, 51, 51)"}}
            > */}
              <button className={style.arrowButton}> 
              {/* DISABLED НЕ СДЕЛАН, НУЖНО РАЗБИРАТЬСЯ ОТДЕЛЬНО */}
              {/* disabled={product.id === 1 ? "disabled" : undefined} */}
                <KeyboardArrowLeftIcon className={`${style.leftArrows} ${style.hover}`} />
              </button>
            {/* </NavLink> */}

            {/* <NavLink 
              to={`/product/${product.id !== allProducts.massimoProducts.length ? product.id + 1 : product.id}`}
              style={{color: "rgb(52, 51, 51)"}}
            > */}
              <button className={style.arrowButton}> 
                {/* disabled={product.id === allProducts.massimoProducts.length ? "disabled" : undefined}  */}
                <KeyboardArrowRightIcon className={style.hover}/>
              </button>
            {/* </NavLink> */}
          </div>
        </div>
  
        <div className={style.contentContainer}>
          <div className={style.imageContainer}>
            <div style={{backgroundImage: `url(${currentProduct ? currentProduct.src : undefined})`}} className={style.productImage}></div>
            <div style={{backgroundImage: `url(${currentProduct ? currentProduct.src : undefined})`}} className={style.productImage}></div>
          </div>
  
          <div className={style.productInfo}>
            <div className={style.titleContainer}>
              <p className={style.title}>{currentProduct ? currentProduct.title : undefined}</p>
              <div className={style.priceContainer}>
                <p className={style.price}>{currentProduct ? currentProduct.price : undefined} AMD</p>
              </div>
            </div>
  
            <div className={style.gradeContainer}>
              <div className={style.grade}>
                  <StarIcon sx={{fontSize: "18px", marginRight: "4px"}} />
                  <p>0</p>
                  <FiberManualRecordIcon sx={{fontSize: "5px", margin: "0 20px"}} />
                  {/* СТАРОЕ НЕ РАБОТАЕТ, НЕ РАЗБИРАЛАСЬ С ЯКОРЕМ */}
                  {/* <AnchorLink href='#review' style={{color: "grey", textDecoration: "none"}}> */}
                    <p className={style.reviewText}>
                        {currentProduct ? currentProduct.comments.length : 0} 
                        <span style={{fontSize: "13px"}}> reviews</span>
                    </p>
                  {/* </AnchorLink> */}
              </div>
  
              {
                like ? 
                  <div className={style.likeCountContainer}>
                    <p className={style.likeCount}>{currentProduct ? currentProduct.reactions.likes ? +currentProduct.reactions.likes + 1 : 1 : undefined}</p>
                    <ThumbUpIcon 
                      sx={{color: "rgb(52, 51, 51)", fontSize: "18px", cursor: "pointer"}} 
                      onClick={() => {
                        setLike(false);
                        sendRaiting("like", "remove");
                      }}
                    /> 
                  </div> :
                  <div className={style.likeCountContainer}>
                    <p className={style.likeCount}>{currentProduct ? currentProduct.reactions.likes ? currentProduct.reactions.likes : 0 : undefined}</p>
                    <ThumbUpOffAltIcon 
                      sx={{fontSize: "18px", cursor: "pointer"}} 
                      onClick={() => {
                        setLike(true);
                        setDislike(false);
                        sendRaiting("like", "add");
                      }}
                    />
                  </div>
              }
  
              {
                dislike ? 
                  <div className={style.dislikeCountContainer}>
                      <p className={style.likeCount}>{currentProduct ? currentProduct.reactions.dislikes ? +currentProduct.reactions.dislikes + 1 : 1 : undefined}</p>
                      <ThumbDownIcon 
                        sx={{color: "rgb(52, 51, 51)", fontSize: "18px", cursor: "pointer"}} 
                        onClick={() => {
                          setDislike(false);
                          sendRaiting("dislike", "remove");
                        }}
                      /> 
                  </div> : 
                  <div className={style.dislikeCountContainer}>
                    <p className={style.likeCount}>{currentProduct ? currentProduct.reactions.dislikes ? currentProduct.reactions.dislikes : 0 : undefined}</p>
                    <ThumbDownOffAltIcon 
                      sx={{fontSize: "18px", cursor: "pointer"}} 
                      onClick={() => {
                        setDislike(true);
                        setLike(false);
                        sendRaiting("dislike", "add");
                      }}
                    />
                  </div>
              }
                
              {/* <p className={style.rateText}>Rate</p> */}
            </div>
  
            <div className={style.sizeContainer}>
              <p className={style.sizeText}>Size</p>
              <ul className={style.sizeList}>
                <li>XS</li>
                <li >S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
              </ul>
            </div>
  
            <div className={style.guideContainer}>
              <div className={`${style.sizeGuideTextContainer} ${style.guideHover}`}>
                <CheckroomIcon sx={{fontSize: "20px"}} />
                <p className={style.sizeGuideText}>Size guide</p>
              </div>
              <BookmarkBorderOutlinedIcon sx={{fontSize: "20px"}} className={style.hover} />
            </div>
  
            <button 
              className={!basketProduct ? style.button : `${style.button} ${style.addButton}`}
              onClick={() => {
                if(currentProduct) {
                  // НЕ СРАБАТЫВАЕТ
                  // dispatch(requestAddProductToBasket({id: currentProduct.id, token: manage.token}));

                  addProduct(currentProduct.id);
                  dispatch(addProductToLoсalBasket(currentProduct));
                }
              }}
            >
              Add to basket
            </button>
  
            {
              basketProduct && 
                <NavLink to="/basket-page">
                  <button 
                    className={`${style.button} ${style.orderButton}`}
                    onClick={() => dispatch(isOpenBasketNavBar(true))}
                  >
                    Process order
                  </button>
                </NavLink>
            }
  
            <div className={`${style.storeAvailabilityContainer} ${style.guideHover}`}>
              <RoomOutlinedIcon sx={{fontSize: "20px"}} />
              <p className={style.storeAvailabilityText}>In-store availability</p>
            </div>
          </div>
        </div>
         {
          currentProduct &&
            <section id="review">
              <Reviews product={currentProduct} />
            </section>
         }
      </div>
    )
}

export default ProductPage;
