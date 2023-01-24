import React from 'react';
import style from "./BasketNavBar.module.css";
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';
import { isOpenBasketNavBar } from '../../store/slices/slice-manage';
import WestIcon from '@mui/icons-material/West';
import { Typography } from '@mui/material';

const BasketNavBar: React.FC = () => {
    const manage = useAppSelector(state => state.manage);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    return (
        // Modal ВСЕ ФИКСИРУЕТ, НЕ ДАЕТ СКРОЛЛА, НЕ ВИДНО ФУТЕРА
        // <Modal
        //     open={manage.isActiveBasketNavBar}
        //     hideBackdrop={true}
        //     // Высоту модального окна он расчитывает отдельно от header, хотя тег находится в Modal
        //     // Без понятия...
        //     sx={{height: 0}}
        // >
            <header className={style.header}> 
                <WestIcon 
                    sx={{fontSize: "20px", color: "rgb(52, 51, 51)", cursor: "pointer"}} 
                    onClick={() => {
                        navigate(-1)
                        dispatch(isOpenBasketNavBar(false))
                    }}
                />
                <div>
                    <NavLink 
                        to={`/`} 
                        className={style.logo} 
                        style={{textDecoration: "none"}}
                        onClick={() => dispatch(isOpenBasketNavBar(false))}
                    >
                        <Typography
                            variant='h6'   
                            sx={{ 
                                fontFamily: "Segoe Script",
                                fontSize: "30px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                display: "inline" 
                            }}
                        >
                            mishellelin
                        </Typography>
                    </NavLink>
                </div>
                <p></p>
            </header>
        // </Modal>   
    )
}

export default BasketNavBar;