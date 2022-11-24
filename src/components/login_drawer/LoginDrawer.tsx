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
        <Drawer
            anchor='right'
            open={manage.isActiveLoginDrawer}
            onClick={() => manage.token !== "" ? dispatch(isOpenLoginDrawer(false)) : dispatch(isOpenLoginDrawer(true))}
            // hideBackdrop // перекрывает все страницу и нет скролла
        >
            <LoginForm 
                // changeRegistrationMode={changeRegistrationMode} 
                // openRegistrationForm={openRegistrationForm}
            />
        </Drawer>
    )
}

export default LoginDrawer;