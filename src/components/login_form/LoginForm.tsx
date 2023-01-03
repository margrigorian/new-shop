import React from 'react';
import style from "./LoginForm.module.css";
import { useAppSelector } from '../../store/hook';
import { useAppDispatch } from '../../store/hook';
import { useForm, SubmitHandler } from "react-hook-form";
import Checkbox from '@mui/material/Checkbox';
import { isOpenLoginDrawer } from '../../store/slices/slice-manage';
import { isOpenRegistationForm } from '../../store/slices/slice-manage';
import { requestToken } from '../../store/slices/slice-manage';

interface ILoginForm {
    email: string,
    password: string 
}

const LoginForm: React.FC = () => {
    const manage = useAppSelector(state => state.manage);
    const dispatch = useAppDispatch();
    // useForm - это метод, который возварщает объект

    const { register, formState: { errors }, reset, handleSubmit} = useForm<ILoginForm>({
        mode:"onBlur"
    });

    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        console.log(data);
        reset();
        dispatch(requestToken(data));
    };

    return (
            <div className={style.formContainer} onClick={(event) => event.stopPropagation()}>
                <p 
                    className={style.closeIcon} 
                    onClick={() => manage.token !== "" ? dispatch(isOpenLoginDrawer(false)) : dispatch(isOpenLoginDrawer(true)) }
                >
                    &#x2717;
                </p>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)} >
                    <p className={style.loginHeaderText}>Log in</p>
                    <p className={style.enterYourDataText}>Enter your email and password to enter</p>

                    <div className={style.loginInputContainer}>
                        <input {...register("email", {
                            required: true,
                            pattern: {
                                value: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/,
                                message: "Please enter a valid email address"
                            }
                        })} 
                            className={style.input}
                            placeholder='Email address *'
                            style={{ borderColor: errors?.email && "rgb(212, 31, 31)" }}
                        />
                        <div className={style.error}>
                            {errors?.email && <p>{errors?.email?.message || "This field is required"}</p>}
                        </div>
                    </div>

                    <div className={style.passwordInputContainer}>
                        <input {...register("password", {
                            required: true,
                            minLength: {
                                value: 8,
                                message: "Minimum of 8 characters"
                            }
                        })} 
                            type="Password"
                            className={style.input}
                            placeholder='Password *'
                            style={{ borderColor: errors?.password && "rgb(212, 31, 31)" }}
                        />
                        <div className={style.error}>
                            {errors?.password && <p>{errors?.password?.message || "This field is required"}</p>}
                        </div>
                    </div>
                        
                    <p className={style.forgottenPasswordText}>Forgotten your password?</p>
                    <div className={style.checkboxContainer}>
                        <Checkbox 
                            sx={{ 
                                '& .MuiSvgIcon-root': { 
                                    fontSize: 30, 
                                    color: "rgb(192, 190, 190)"
                                }
                            }}
                        />
                        <label htmlFor='session' className={style.checkboxLabel}>Keep session open</label>
                    </div>
                    <button type="submit" className={`${style.button} ${style.submitButton}`}>Log in</button>
                </form>
                
                <div className={style.createButtonContainer}>
                    <p>Don't have an account?</p>
                    <button 
                        className={`${style.button} ${style.createButton}`}
                        style={{backgroundColor: manage.isActiveRegistrationForm ? "rgb(137, 136, 136)" : undefined}}
                        onClick={() => dispatch(isOpenRegistationForm(true))}
                    >
                        Create Account
                    </button>
                </div>
            </div>
    )
}

export default LoginForm;
