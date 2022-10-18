import React, { useState } from 'react'
import './index.scss'
import LoginComponent from './components/Login'
import PhoneLogin from './components/PhoneLogin'
import { CSSTransition } from "react-transition-group";
const Login: React.FC = () => {
    const trimPhone = (val: string) => val.replace(/(^\s+)|(\s+$)|\s+/g, "");
    const [inPhone, setInPhone] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState<any>('')
    const onChangePhone = (e: any) => {
        const newValue = e.target.value
        const oldValue = phoneNumber
        const result = newValue.length > oldValue.length ? newValue
            .replace(/[^\d]/gi, "")
            .replace(/(\d{3})(\d{0,4})(\d{0,4})/, "$1 $2 $3")
            : newValue
        if (result && trimPhone(result).length > 11) {
            return;
        }
        setPhoneNumber(result);
    }

    return (
        <>
            <CSSTransition in={!inPhone} timeout={500} classNames="push-out">
                <div className='login-wrapper'>
                    <div className='login-box'>
                        <LoginComponent setInPhone={setInPhone} />
                    </div>
                </div>
            </CSSTransition>
            <CSSTransition in={inPhone} timeout={500} classNames="push-in" unmountOnExit >
                <div className='phone-wrapper'>
                    <PhoneLogin setInPhone={setInPhone} phoneNumber={phoneNumber} onChangePhone={onChangePhone} />
                </div>
            </CSSTransition>
        </>
    )

}

export default Login