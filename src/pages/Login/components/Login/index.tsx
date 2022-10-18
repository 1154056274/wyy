import React, { useRef, useState } from 'react'
import './index.scss'
import { Button, Space, Radio } from 'antd-mobile'
import Mail from '../../../../assets/mail.svg'
import Sina from '../../../../assets/sina.svg'
import Wechat from '../../../../assets/wechat.svg'
import { useHistory } from 'react-router-dom'

export default (props: any) => {
    const history = useHistory()
    const { setInPhone } = props
    const ref = useRef<any>()
    const [checked, setChecked] = useState<Boolean>()
    const phoneLogin = () => {
        if (!checked) {
            ref.current!.classList.add('animated')
            setTimeout(() => {
                ref.current!.classList.add('animated')
                ref.current!.classList.remove("animated");
            }, 500);
        }
        else {
            setInPhone(true)
        }
    }
    const onChangeChecked = (e: any) => {
        setChecked(e.target.checked)
    }
    return (
        <div className='login-components-wrapper'>

            <Space direction='vertical' style={{ '--gap-vertical': '20px' }} className='space-wrapper'>
                <Button shape='rounded' onClick={() => { phoneLogin() }}>
                    手机号登录
                </Button>
                <Button shape='rounded' className='button-second' onClick={() => { history.push('/layout') }}>
                    立即体验
                </Button>
                <div className='checkbox-wrapper' ref={ref}>
                    <input
                        type="checkbox"
                        id="tiaokuan"
                        onChange={onChangeChecked}
                    />
                    <label htmlFor="tiaokuan"></label>
                    <span>
                        同意<a >{"<<服务条款>>"}</a>和
                             <a >{"<<隐私政策>>"}</a>
                    </span>
                </div>

            </Space>

            <div className='sanfang-login'>
                <img src={Mail} alt="" />
                <img src={Sina} alt="" />
                <img src={Wechat} alt="" />
            </div>
        </div>
    )

}