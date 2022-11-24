import React from 'react';
import style from "./LoginDrawer.module.css";
import { Drawer } from '@mui/material';
import { useAppSelector } from '../../store/hook';
import { useAppDispatch } from '../../store/hook';
import { isOpenLoginDrawer } from '../../store/slices/slice-manage';
import LoginForm from '../login_form/LoginForm';

const LoginDrawer: React.FC = () => {
    const manage = useAppSelector(state => state.manage);
    const dispatch = useAppDispatch();
    
    return (
        <div
            onClick={() => manage.token !== "" ? dispatch(isOpenLoginDrawer(false)) : dispatch(isOpenLoginDrawer(true))}
        >
            <Drawer
                anchor='right'
                // onClose={closeCart} // закрытие при клике в любое пространство
                open={manage.isActiveLoginDrawer}
                // hideBackdrop // перекрывает все страницу и нет скролла
            >
                <LoginForm 
                    // closeCart={closeCart} 
                    // changeRegistrationMode={changeRegistrationMode} 
                    // openRegistrationForm={openRegistrationForm}
                />
            </Drawer>
        </div>
    )
}

export default LoginDrawer;