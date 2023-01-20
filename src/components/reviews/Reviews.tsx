import React, { useEffect, useState }  from 'react';
import style from "./Reviews.module.css";
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductType } from '../../store/slices/slice-manage';
import { RequestProductType } from '../../store/slices/slice-basket';
import request from '../../store/request/request';
import { links } from '../../store/request/links';
import { addCommentToProduct } from '../../store/slices/slice-basket';
import StarBorderIcon from '@mui/icons-material/StarBorder'; 

interface ReviewsProps {
    product: RequestProductType
}

interface IRewiewForm {
  body: string
}

const Reviews: React.FC<ReviewsProps> = ({product}) => {
  const basketProducts = useAppSelector(state => state.basket);
  const token = useAppSelector(state => state.manage.token);
  const [basketProduct, setBasketProduct] = useState<ProductType | RequestProductType | null>(null);
  const [alert, setAlert] = useState(false);
  const { register, formState: { errors }, reset, handleSubmit } = useForm<IRewiewForm>({
      mode:"onBlur"
  });
  const dispatch = useAppDispatch();
  const [openTextArea, setOpenTextArea] = useState(false);
  const date = new Date();
  const month = date.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"
                  ];
  const monthDay = date.getDate();
  const year = date.getFullYear();

  useEffect(() => {
      const currentProduct = basketProducts.products.find(item => item.id === product.id);
      if(currentProduct) {
        setBasketProduct(currentProduct);
      }
  }, [product.id, basketProducts])


  const onSubmit: SubmitHandler<IRewiewForm> = (data) => {
      if(basketProduct) {
          dispatch(addCommentToProduct({id: product.id, review: data.body}));
          reset();
          addComment(data.body);
      }else {
          setAlert(true);
      }
  };

  async function addComment(comment: string) {
      const addComment = await request("POST", links.addCommentLink, {"product_id": product.id, "body": comment}, token);
      console.log(addComment);
  }

  return (
      <div className={style.container}>
          <p className={style.reviewsText}>
              Reviews&nbsp; 
              <sup>
                  <span className={style.reviewsNumberSpan}>
                      {product.comments ? product.comments.length : 0}
                  </span>
              </sup>
          </p>
          <div className={style.starsContainer}>
              <div className={style.grade}>
                  <div>
                      <StarBorderIcon sx={{fontSize: "26px", marginRight: "5px"}} />
                      <StarBorderIcon sx={{fontSize: "26px", marginRight: "5px"}} />
                      <StarBorderIcon sx={{fontSize: "26px", marginRight: "5px"}} />
                      <StarBorderIcon sx={{fontSize: "26px", marginRight: "5px"}} />
                      <StarBorderIcon sx={{fontSize: "26px"}} />
                  </div>
                  <p className={style.averageRatingText}>Average rating</p>
                  <button 
                      className={style.buttonLeaveReviews}
                      onClick={() => {
                          if(basketProduct) {
                              setAlert(false);
                              setOpenTextArea(true);
                          }else {
                              setAlert(true);
                          }
                      }}
                  >
                      {
                          product.comments ? "Leave review" : "Be the first to review"
                      }
                  </button>
              </div>
              {
                  alert && <div className={style.alert}>Add product to Basket</div>
              }
          </div>

          {
              openTextArea &&
                  <form onSubmit={handleSubmit(onSubmit)} className={style.reviewForm}>
                      {/* <div className={style.nameInputContainer}>
                          <input {...register("name", { required: true })}
                              placeholder='Your name' 
                              className={style.input}
                              style={{ borderColor: errors?.name && "rgb(212, 31, 31)" }}
                          />
                          <div className={style.error}>
                              {errors?.name && <p>This field is required</p>}
                          </div>
                      </div> */}
                      <div className={style.commentInputContainer}>
                          <textarea {...register ("body", { required: true })}
                              placeholder='Your review' 
                              className={`${style.input} ${style.commentInput}`}
                              style={{ borderColor: errors?.body && "rgb(212, 31, 31)" }}
                          />
                          <div className={style.error}>
                              {errors?.body && <p>This field is required</p>}
                          </div>
                      </div>
                      <button type='submit' className={style.buttonAddReviews}>Add review</button>
                  </form>

                  // ДЛЯ РЕДАКТИРОВАНИЯ ОТЗЫВА ДОЛЖЕН ИСПОЛЬЗОВАТЬСЯ ОТДЕЛЬНЫЙ DISPATCH 
                  // + ДОЛЖЕН БЫТЬ ПЕРЕДАН ID ПОЛЬЗОВАТЕЛЯ ДЛЯ ПОИСКА СТАРОГО ОТЗЫВА В МАССИВЕ
          }

          {
              !basketProduct ? 
                  product.comments &&
                      product.comments.map((item, i) => 
                              <div key={`ReviewId-${i}`} className={style.reviewContainer}>
                                  <p className={style.name}>{item.author.fullname}</p>
                                  <div className={style.review}>
                                      <p 
                                          className={style.date}
                                      >
                                          {`${monthNames[month-1]} ${monthDay}, ${year}`}
                                      </p>
                                      <p>{item.body}</p>
                                  </div>
                              </div>
                      ) :

                      basketProduct.comments &&
                          basketProduct.comments.map((item, i) => 
                          <div key={`ReviewId-${i}`} className={style.reviewContainer}>
                              <p className={style.name}>
                                  {item.author !== undefined ? item.author.fullname : "Name"}
                              </p>
                              <div className={style.review}>
                                  <p 
                                      className={style.date}
                                  >
                                      {`${monthNames[month-1]} ${monthDay}, ${year}`}
                                  </p>
                                  <p>{item.body}</p>
                              </div>
                          </div>
                          )    
          }

      </div>
  )
}

export default Reviews;
