import React, { useEffect, useState } from 'react'
import './index.scss'
import {connect} from 'react-redux'
import {PlayOutline,AppstoreOutline,MinusCircleOutline,DownOutline,LeftOutline,RightOutline } from 'antd-mobile-icons'
import { CSSTransition } from "react-transition-group";
import Progressbar from '../../components/ProgressBar'
import {Popup} from 'antd-mobile'
const Player = (props)=>{
    console.log(props);
    const [visible,setVisible] = useState(false)
    const {currentPlayMusic,playStatus,playList}  = props
    const [status,setStatus] = useState(false)
    const [currentTime,setCurrentTime] = useState(0)

    const next = ()=>{
        playList.length&&playList.forEach((item,index)=>{
            if(item.id==currentPlayMusic.id&&playList[index+1]){
                props.play(playList[index+1])
                props.changePlayStatus(true)

            }
        })
    }
    const prev = ()=>{
        playList.length&&playList.forEach((item,index)=>{
            if(item.id==currentPlayMusic.id&&playList[index-1]){
                props.play(playList[index-1])
                props.changePlayStatus(true)
            }
        })
    }
    const play = (item)=>{
        props.play(item)
        props.changePlayStatus(true)
    }
    const formatPlayTime = (interval) => {
        interval = interval | 0;
        const minute = (interval / 60) | 0;
        const second = (interval % 60).toString().padStart(2, '0');
        return `${minute}:${second}`;
      };
    const  percent = isNaN(currentTime / (currentPlayMusic?.duration/1000)) ? 0 : currentTime / (currentPlayMusic?.duration/1000);
    const updateTime = (e) => {
        setCurrentTime(e.target.currentTime);
      };
    const handleEnd = ()=>{
        document.getElementById('audio').currentTime = 0;
        setCurrentTime(0)
        document.getElementById('audio').play()
    }
    useEffect(()=>{
            currentPlayMusic&& currentPlayMusic?.id&&playStatus&& document.getElementById('audio').play()
            currentPlayMusic&& currentPlayMusic?.id&&!playStatus&& document.getElementById('audio').pause()
       
        
      
    },[currentPlayMusic?.id,playStatus])
    return (
        <>
        {
            currentPlayMusic&&currentPlayMusic?.id?
            <>
            <CSSTransition in={!status} timeout={500} classNames="mini" 
             onExited={() => (document.getElementsByClassName('player-wrapper')[0].style.display = 'none')}
            >
                    <div className='player-wrapper' onClick={()=>{setStatus(true)}}>
                        <div className='img-wrapper'>
                            <img className={`play ${playStatus ? '' : 'pause'}`} src={`${currentPlayMusic&&currentPlayMusic?.img}?param=300x300`} alt=""/>
                        </div>
                        <div className='center'>
                            <p className='song'>{currentPlayMusic&&currentPlayMusic?.title}</p>
                            <p className='singer'>{currentPlayMusic&&currentPlayMusic?.singer}</p>
                        </div>
                        <div className='icons' onClick={e=>{e.stopPropagation()}}>
                            {
                                playStatus?<MinusCircleOutline className='stop' onClick={()=>{props.changePlayStatus(false)}} />: <PlayOutline className='play' onClick={()=>{props.changePlayStatus(true)}} />
                            }
                        
                            <AppstoreOutline className='app' onClick={()=>{setVisible(true)}} />
                        </div>
                        <Popup
                            className='popup'
                            visible={visible}
                            onMaskClick={() => {
                                setVisible(false)
                            }}
                            bodyClassName='popup-inner'
                            bodyStyle={{ height: '60vh',borderRadius:'10px 10px 0 0' }}
                            >
                              <ul className='popup-ul'>
                                  {
                                      playList.length&&playList.map(item=><li onClick={()=>{play(item)}}>
                                          {
                                              item.id==currentPlayMusic.id&& 
                                              <span className='show'>
                                              <PlayOutline  style={{color:'red'}}/>
                                            </span>
                                          }
                                         
                                          <span>{item.title}</span> - <span>{item.singer}</span>
                                          </li>)
                                  }
                              </ul>
                        </Popup>
                        <audio id='audio' onEnded={handleEnd} onTimeUpdate={updateTime} src={`https://music.163.com/song/media/outer/url?id=${currentPlayMusic&&currentPlayMusic?.id}.mp3`} />
                        
                     </div>
            </CSSTransition>

            <CSSTransition in={status} timeout={500} classNames="normal" unmountOnExit onExited={()=>{document.getElementsByClassName('player-wrapper')[0].style.display = 'flex'} }  >
                <div className='big-player'>
                <div className='background'>
                    <img
                    src={`${currentPlayMusic&&currentPlayMusic?.img}?param=300x300`}
                    width='100%'
                    height='100%'
                    alt='歌曲图片'
                    />
                 </div>
                <div className='top'>
                    <DownOutline className='down' onClick={()=>{setStatus(false)}} />
                    <div className='right'>
                        <p className='title'>{currentPlayMusic&&currentPlayMusic?.title}</p>
                        <p className='singer'>
                            {currentPlayMusic&&currentPlayMusic?.singer}
                        </p>
                    </div>
                </div>
                <div className='cd-wrapper'>
                    <img  className={`image play ${playStatus ? '' : 'pause'}`} src={`${currentPlayMusic&&currentPlayMusic?.img}?param=300x300`} alt=""/>
                </div>
                <div  className='btm'>
                    <div className='progess'>
                            <span>{formatPlayTime(currentTime)}</span>
                            <Progressbar className='progessbar' percent={percent*100} />
                            <span>{formatPlayTime(currentPlayMusic?.duration/1000)}</span>
                    </div>
                    <div className='actions-wrapper'>
                    <div className='actions'>
                            <LeftOutline className='left' onClick={()=>{prev()}} />
                            {
                                playStatus?<MinusCircleOutline className='stop' onClick={()=>{props.changePlayStatus(false)}} />: <PlayOutline className='play' onClick={()=>{props.changePlayStatus(true)}} />
                            }
                            <RightOutline className='right' onClick={()=>{next()}}  />
                    </div>
                    </div>
                    
                    


                </div>
                </div>
            </CSSTransition>
         </>
            
    
            :null
        }
        </>
    )
    
    
}

const mapStateToProps = (state) => {
    return state
}


const mapDispatchToProps = (dispatch)=>{
    return {
        changePlayStatus(value){
            const action = {
                type:'changePlayStatus',
                value
            }
            dispatch(action)
        },
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
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Player)