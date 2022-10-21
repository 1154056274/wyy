import React, {  useEffect, useState } from 'react'
import {  Swiper } from 'antd-mobile'
import './index.scss'
import {recommend,getSongUrl} from '../../../request/api'
import _ from 'lodash'
import {connect} from 'react-redux'
const TabsList = (props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [dataSource,setDataSource] = useState({})

    useEffect(()=>{
        recommend().then(res=>{
            if(res.code==200){
                const arr = []
                res.result.forEach(item=>{
                    arr.push({id:item.id,img:item.picUrl,title:item.name,singer:item.song.artists[0].name,duration:item.song.duration})
                })
                
                setDataSource({arr1:arr.splice(0,3),arr2:arr.splice(0,3),arr3:arr.splice(0,3)})
            }
        })
    },[])

    const play = (item)=>{
        props.setPlayList([item])
        props.play(item)
        props.changePlayStatus(true)
    }

  return (
    <>
      
        <Swiper
          direction='horizontal'
        //   loop
          indicator={() => null}
          defaultIndex={activeIndex}
          onIndexChange={index => {
            setActiveIndex(index)
          }}
          className='swiper-wrapper'
        //   stuckAtBoundary={false} 
          slideSize={95}
        >
          <Swiper.Item>
            <ul className='ul-list'>
                {
                     !_.isEmpty(dataSource)&&dataSource.arr1.map(item=><li onClick={()=>{play(item)}}>
                       <img src={`${item.img}?param=300x300`} alt=""/>
                        <div className='contents'>
                            <div className='top'>
                                <span className='title'>{item.title}</span>
                                <span className='line'>-</span>
                                <span className='singer'>{item.singer}</span>
                            </div>
                            <div className='bot'>
                                  {item.tag&&<span className='tag'>{item.tag}</span>}
                                  {item.another&&<span className='another'>{item.another}</span>}
                            </div>
                        </div>
                    </li>)
                }
            </ul>
          </Swiper.Item>
          <Swiper.Item>
            <ul className='ul-list'>
                {
                     !_.isEmpty(dataSource)&&dataSource.arr2.map(item=><li onClick={()=>{play(item)}}>
                        <img src={`${item.img}?param=300x300`} alt=""/>
                        <div className='contents'>
                            <div className='top'>
                                <span className='title'>{item.title}</span>
                                <span className='line'>-</span>
                                <span className='singer'>{item.singer}</span>
                            </div>
                            <div className='bot'>
                                  {item.tag&&<span className='tag'>{item.tag}</span>}
                                  {item.another&&<span className='another'>{item.another}</span>}
                            </div>
                        </div>
                    </li>)
                }
            </ul>
          </Swiper.Item>
          <Swiper.Item>
            <ul className='ul-list'>
                {
                     !_.isEmpty(dataSource)&&dataSource.arr3.map(item=><li onClick={()=>{play(item)}}>
                         <img src={`${item.img}?param=300x300`} alt=""/>
                        <div className='contents'>
                            <div className='top'>
                                <span className='title'>{item.title}</span>
                                <span className='line'>-</span>
                                <span className='singer'>{item.singer}</span>
                            </div>
                            <div className='bot'>
                                  {item.tag&&<span className='tag'>{item.tag}</span>}
                                  {item.another&&<span className='another'>{item.another}</span>}
                            </div>
                        </div>
                    </li>)
                }
            </ul>
          </Swiper.Item>
        </Swiper>
    </>
  )
}

const mapStateToProps = (state) => {
    return state
}


const mapDispatchToProps = (dispatch)=>{
    return {
        play(value){
            const action = {
                type: 'changePlayMusic',
                value
            }
            dispatch(action)
        },
        changePlayStatus(value){
            const action = {
                type: 'changePlayStatus',
                value
            }
            dispatch(action)
        },
        setPlayList(list){
            const action = {
                type:'setPlayList',
                value:list
            }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TabsList)