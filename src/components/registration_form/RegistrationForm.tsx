import React from 'react';
import style from "./RegistrationForm.module.css";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useAppSelector } from '../../store/hook';
import { useAppDispatch } from '../../store/hook';
import { isOpenRegistationForm } from '../../store/slices/slice-manage';
import { requestToken } from '../../store/slices/slice-manage';

interface IRegistrationForm {
    fullname: string,
    email: string,
    password: string 
}

const RegistrationForm: React.FC = () => {
    const manage = useAppSelector(state => state.manage);
    const dispatch = useAppDispatch();
    const { register, formState: { errors }, reset, handleSubmit} = useForm<IRegistrationForm>({
        mode:"onBlur"
    });

    const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
        console.log(data);
        
        reset();

        dispatch(requestToken(data));
    };
    
    return (
        <Modal 
            open={manage.isActiveRegistrationForm} 
            className={style.modalRegistrationWindow}
            sx={{top: 0}}
            onClick={() => dispatch(isOpenRegistationForm(false))}
        >
            <div className={style.registrationFormContainer} onClick={(event) => event.stopPropagation()}>
                <p className={style.closeIcon} onClick={() => dispatch(isOpenRegistationForm(false))}>&#x2717;</p>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <p className={style.registrationHeaderText}>Create Account</p>
                    
                    <div className={style.radioContainer}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <div className={style.radioFemale}>
                                <FormControlLabel 
                                    // {...register("gender")} 
                                    value="female" 
                                    control={<Radio />} 
                                    label="Female"
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 30,
                                            color: "rgb(211, 211, 211)"
                                        },
                                        '& .MuiFormControlLabel-label': {
                                            fontSize: 14,
                                            letterSpacing: "0.5px"
                                        }
                                    }}
                                    />
                            </div>

                            <FormControlLabel 
                                // {...register("gender")} 
                                value="male" 
                                control={<Radio />} 
                                label="Male" 
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 30,
                                        color: "rgb(211, 211, 211)"
                                    },
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: 14,
                                        letterSpacing: "0.5px"
                                    }
                                }}
                            />
                        </RadioGroup>
                    </div>

                    <div className={style.inputContainer}>
                        <input {...register("fullname", {
                            required: true,
                            })} 
                            className={style.input}
                            placeholder='Name'
                            style={{ borderColor: errors?.fullname && "rgb(212, 31, 31)" }}
                            />
                        <div className={style.error}>
                            {errors?.fullname && <p>This field is required</p>}
                        </div>
                    </div>
                    
                    <div className={style.inputContainer}>
                        <input 
                            // {...register("surname", {
                                // required: true,
                                // })} 
                            className={style.input}
                            placeholder='Surname'
                            // style={{ borderColor: errors?.surname && "rgb(212, 31, 31)" }}
                        />
                        <div className={style.error}> 
                            {/* без указания ...register("surname" нельзя использовать? */}
                            {/* {errors?.surname && <p>This field is required</p>} */} 
                        </div>
                    </div>

                    <div className={style.inputContainer}>
                            <input {...register("email", {
                                required: true,
                                pattern: {
                                    value: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/,
                                    message: "Please enter a valid email address"
                                }
                            })} 
                            className={style.input}
                            placeholder='Email address'
                            style={{ borderColor: errors?.email && "rgb(212, 31, 31)" }}
                            />
                            <div className={style.error}>
                                {errors?.email && <p>{errors?.email?.message || "This field is required"}</p>}
                            </div>
                        </div>

                        <div className={style.inputContainer}>
                            <input {...register("password", {
                                required: true,
                                minLength: {
                                    value: 8,
                                    message: "Minimum of 8 characters"
                                }
                            })} 
                                type="Password"
                                className={style.input}
                                placeholder='Password'
                                style={{ borderColor: errors?.password && "rgb(212, 31, 31)" }}
                            />
                            <div className={style.error}>
                                {errors?.password && <p>{errors?.password?.message || "This field is required"}</p>}
                            </div>
                        </div>

                        <FormGroup>
                            <div className={style.checkboxPolicyContainer}>
                                <FormControlLabel 
                                    //  {...register("privacyPolicy")} 
                                    control={<Checkbox />}
                                    label=""
                                    // ПОСЛЕ ОТПРАВКИ ФОРМЫ ОСТАЕТСЯ ВЫДЕЛЕННЫМ. ПОЧЕМУ НЕ РАБОТАЕТ RESET?
                                    // менять значение через onchange и state?  

                                    // id="privacyPolicy" не связывает с <label> 
                                    sx={{ 
                                        '& .MuiSvgIcon-root': { 
                                            fontSize: 30, 
                                            // color: errors?.privacyPolicy ? "rgb(212, 31, 31)" : "rgb(192, 190, 190)"
                                            color:  "rgb(192, 190, 190)"
                                        },
                                        // '& .MuiFormControlLabel-label': {
                                            //     fontSize: 12,
                                        //     letterSpacing: "0.5px"
                                        // } 
                                    }}
                                />
                                <label className={style.checkboxLabel}>
                                    I accept the <span className={style.policySpan}>Privacy Policy</span>
                                </label>
                            </div>

                            <div className={style.checkboxReceiveNewsContainer}>
                                <FormControlLabel 
                                    // {...register("recieveNews")} 
                                    control={<Checkbox />} 
                                    label="" 
                                    sx={{ 
                                        '& .MuiSvgIcon-root': { 
                                            fontSize: 30, 
                                            color: "rgb(192, 190, 190)"
                                        },
                                        // '& .MuiFormControlLabel-label': {
                                        //     fontSize: 12,
                                        //     letterSpacing: "0.5px"
                                        // }     
                                    }}
                                    />
                                <label className={style.checkboxLabel}>
                                    I agree to receive news, notifications and offers from Michellelin
                                </label>
                            </div>
                        </FormGroup>
                        {/* {error && <h2>An error occered: {error}</h2>} */}
                        <button 
                            type="submit" 
                            className={style.submitButton}
                            // onClick={() => getSuccessRegistrationMessage()} // не использовать при этом button
                            // менять state в случае положительного ответа иначе
                            >
                            Create Account
                        </button>
                </form>
            </div>
        </Modal>
    )
}

export default RegistrationForm;