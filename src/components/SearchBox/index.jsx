import React, { useState } from 'react'
import {SearchBar} from 'antd-mobile'
import { CSSTransition } from "react-transition-group";
import './index.scss'
import {LeftOutline} from 'antd-mobile-icons'
export default (props)=>{
    const [status,setStatus] = useState(false)
    const onFocus  = ()=>{
        setStatus(true)
    }
    return <>
        <CSSTransition in={!status} timeout={500} classNames="search-out"  >
            <div className='search-outer-wrapper'>
                <SearchBar {...props} onFocus={()=>{onFocus()}} />
            </div>
        </CSSTransition>
        <CSSTransition in={status} timeout={500} unmountOnExit classNames="search-in">
            <div className='search-in-wrapper'>
                <div className='top'>
                <div className='back' onClick={()=>{setStatus(false)}}>
                    <LeftOutline className='icon'/>
                </div>
                <SearchBar {...props} className='bar'   />
                <span>搜索</span>
                </div>
              
            </div>
        </CSSTransition>
    </>
}