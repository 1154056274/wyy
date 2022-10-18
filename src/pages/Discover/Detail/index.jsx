import React, { useEffect, useState } from 'react'
import './index.scss'
import {DownCircleOutline,AddCircleOutline,AppstoreOutline,ArrowsAltOutline,LeftOutline,PlayOutline} from 'antd-mobile-icons'
import {useHistory} from 'react-router-dom'
import {getDetail} from '../../../request/api'
import {connect} from 'react-redux'

const Detail = (props)=>{

    const history = useHistory()
    const [title,setTitle] = useState('返回')
    const [cover,setCover]  = useState({})
    const [list,setList] = useState([])
    const play = (item)=>{
        props.play(item)
        props.changePlayStatus(true)
    }
    useEffect(()=>{
        window.addEventListener('scroll',(e)=>{
            const headerDom = document.getElementsByClassName('back')[0]
            let minScrollY = -45;
            let percent = Math.abs(-e.target.scrollTop / minScrollY);
            if (-e.target.scrollTop < minScrollY && headerDom) {
                headerDom.style.backgroundColor = 'rgb(212, 68, 57)'
                headerDom.style.opacity = '' + Math.min(1, (percent - 1) / 2);
                setTitle('[纯音乐]错落一身宁静，深海浮沉摘星')
              } else {
                headerDom.style.backgroundColor = '';
                headerDom.style.opacity = '1';
                setTitle('返回')
              }
        },true)
    })
    
    useEffect(()=>{

      getDetail({id:props.match.params?.id}).then(res=>{
            console.log(res);
            if(res.code==200){
                const list = []
                setCover({img:res.playlist.coverImgUrl,name:res.playlist.name})
                res.playlist.tracks.forEach(item=>{
                    let singer  = ''
                    item.ar.forEach((i)=>{
                        singer =   singer + '/' +i.name
                    })
                    list.push({title:item.name,singer:singer.replace('/',''),album:item.al.name,id:item.id,img:item.al.picUrl,duration:item.dt})
                })
                setList(list)
            }
         })
      
       
    },[props.match.params?.id])

    useEffect(()=>{
        // document.getElementsByClassName('layout-wrapper')[0].style.padding  = '0'
        // document.getElementsByClassName('player-wrapper')[0].style.bottom  = '0'
    },[])

    return <div className='detail-wrapper'>
        <div className='back' onClick={()=>{history.push('/layout/discover')}}>
            <LeftOutline className='icon'/>
           {title}
        </div>
        <div className='top'>
            <div className='filter' style={{backgroundImage:`url(${cover.img}?param=300x300)`}} />
            <div className='mid'>
                <img src={`${cover.img}?param=300x300`} alt=""/>
                <div className='desc'>
                {cover.name}
                </div>
            </div>
            <ul className='action'>
                <li>
                <DownCircleOutline />
                <p>评论</p>
                </li>
                <li>
                <AddCircleOutline />
                <p>点赞</p>
                </li>
                <li>
                <AppstoreOutline />
                <p>收藏</p>
                </li>
                <li>
                <ArrowsAltOutline />
                <p>更多</p>
                </li>
            </ul>
        </div>
        <div className='detail-content'>
            <div className='play-all'>
                        <PlayOutline className='play-icon' />
                    <div className='all'>
                        播放全部
                        <span className='sum'>
                            （共20首）
                        </span>
                    </div>
                    <div className='love'>
                        + 收藏(50.6万)
                    </div>
            </div>
            <ul className='songlist'>
                {
                    list.map((item,index)=>
                        <li key={index} onClick={()=>{play(item)}}>
                            <div className='index'>
                                {index+1}
                            </div>
                            <div className='right'>
                                <p className='name'>
                                    {item.title}
                                </p>
                                <p className='singer'>
                                   
                                    {item.singer} -  {item.album}
                                </p>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
        
       

    </div>
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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Detail)