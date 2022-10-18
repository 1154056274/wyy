import {ProgressBar,Button} from 'antd-mobile'
import React,{useState} from 'react'
import './index.scss'
export default ({percent=0})=>{
    // const [percent, setPercent] = useState(10)
    
    return <div className='progressbar'>
       

        <ProgressBar  percent={percent} />

    </div>
}