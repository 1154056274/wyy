import React, { useEffect, useRef, useState } from 'react'
import { NavBar, Button } from 'antd-mobile'
import './index.scss'
import { sentVcodeRequest, vcodeVerify, } from '../../../../request/api'
import { useHistory } from 'react-router-dom'
const sentPeriod = 60;
let theTimer: any;
export default (props: { setInPhone: any, phoneNumber: any, onChangePhone: any }) => {
    const trimPhone = (val: string) => val.replace(/(^\s+)|(\s+$)|\s+/g, "");
    const { setInPhone, phoneNumber, onChangePhone, } = props
    const [loginStatus, setLoginStatus] = useState<string>('phone')  //phone vcode
    const inputRef = useRef<HTMLInputElement>(null);
    const inputRef1 = useRef<HTMLInputElement>(null);
    const [timer, setTimer] = useState(sentPeriod);
    const [vcode, setVcode] = useState<any>('')
    const [cursorIndex, setCursorIndex] = useState(0);
    const history = useHistory()
    const back = () => {
        setInPhone(false)
    }
    const next = async () => {
        const res: any = await sentVcodeRequest({ phone: Number(trimPhone(phoneNumber)), ctcode: 86 })
        if (res.code == 200) {
            setLoginStatus('vcode')
        }

    }

    useEffect(() => {
        inputRef.current && inputRef.current!.focus();
    })
    useEffect(() => {
        inputRef1.current && inputRef1.current!.focus();
    })
    useEffect(() => {
        if (vcode.length == 4) {
            vcodeVerify({ phone: Number(trimPhone(phoneNumber)), captcha: vcode }).then((result: any) => {
                if (result.code == 200) {
                    history.push('/layout')
                }
            })
        }
    }, [vcode])

    console.log()

    useEffect(() => {
        if (loginStatus == 'vcode') {
            if (timer === 0) {
                clearInterval(theTimer);
            }
            if (timer === sentPeriod) {
                theTimer = setInterval(() => {
                    setTimer(timer => timer - 1);
                }, 1000);
            }
        }
    }, [timer, loginStatus]);



    const Step1 = () => {
        return (
            <>
                <div className='phone-input'>
                    +86
                    <input type='text' value={phoneNumber} ref={inputRef} onChange={onChangePhone} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button disabled={trimPhone(phoneNumber).length < 11} color='danger' shape='rounded' className='btn-login' onClick={() => { next() }}>下一步</Button>
                </div>

            </>
        )
    }

    const Step2 = () => {
        return (
            <>
                <p className="tips">&emsp;&emsp;验证码已发送至</p>
                <p className="vphone">
                    <span>
                        {phoneNumber.replace(/(\d{3})\s(\d{4})\s(\d{4})/g, "+86 $1 **** $3")}
                    </span>
                    {timer ? (
                        <span className='timer'>{timer}S</span>
                    ) : (
                            <span className="sentBtn" >
                                重新发送
                            </span>
                        )}
                </p>
                <div className='vcode-box'>
                    <p className='heading-2 '>验证码：</p>
                    <div className='v-code'>

                        <input
                            id="vcode"
                            type="tel"
                            maxLength={4}
                            ref={inputRef1}
                            value={vcode}
                            onChange={onChangeVcode}
                        />
                        {[...Array(4)].map((_, idx) => (
                            <label
                                htmlFor="vcode"
                                key={idx}
                                className={`line ${cursorIndex === idx ? "animated" : ""}`}
                            >
                                {vcode[idx]}
                            </label>
                        ))}
                    </div>
                </div>
            </>
        )
    }

    const onChangeVcode = (e: React.ChangeEvent<HTMLInputElement>) => {

        const val = e.target.value;
        setVcode(val);
        setCursorIndex(val.split("").length);
    };

    return <div className='phone-login-wrapper'>
        <NavBar onBack={back}>手机号登录</NavBar>
        {
            loginStatus === 'phone' ? <Step1 /> : <Step2 />

        }


    </div>
}