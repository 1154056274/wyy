import React, { useEffect, useState } from 'react'
import './index.scss'
import {UnorderedListOutline,AudioFill,} from 'antd-mobile-icons'
import {Divider} from 'antd-mobile'
import Slicks from '../../components/Slicks'
import Tabs from './TabsList'
import {useHistory} from 'react-router-dom'
import {getHighquality,getDetail} from '../../request/api'
import SearchBox from '../../components/SearchBox'
const TabList = [
    {
        title:"每日推荐",
        icon:<UnorderedListOutline />
    },
    {
        title:"私人FM",
        icon:<AudioFill />
    },
    {
        title:"歌单",
        icon:<UnorderedListOutline />
    },
    {
        title:"排行榜",
        icon:<AudioFill />
    },
    {
        title:"一歌一遇",
        icon:<UnorderedListOutline />
    },
    {
        title:"数字专辑",
        icon:<AudioFill />
    },
    {
        title:"有声书",
        icon:<UnorderedListOutline />
    },
    {
        title:"关注听歌",
        icon:<AudioFill />
    },
    {
        title:"关注听歌",
        icon:<UnorderedListOutline />
    },
    {
        title:"游戏专区",
        icon:<AudioFill />
    },
]



export default ()=>{
    const history = useHistory()
    const introduceList = ['古风伤恋｜待到红颜消 杳杳无归期','是不是把所有委屈咽下，才显得懂事','[国电新势力] 网易电子音乐人精选','我爱你  第一句是假的  第二句也是假的']
    const [introduceSelect,setIntroduceSelect] = useState(0)
    const [dataSource,setDataSource] = useState([])
    const slickClick = (id)=>{
        history.push(`/layout/detail/${id}`)
    }

    useEffect(()=>{
        getHighquality({limit:6}).then(res=>{
            console.log(res);
            if(res.code==200){
                const data = []
                res.playlists.forEach(item=>{
                    data.push({id:item.id,title:item.name,img:item.coverImgUrl})
                })
                setDataSource(data)
            }
           
        })
    },[])
    return <div className='discover-wrapper' >
             <header style={{zIndex:1000}}>
                <span
                    className='user'
                    onClick={() => alert('用户中心正在开发中，敬请期待:)')}
                    >
                     <UnorderedListOutline />
                </span>
                <span className='search-bar' >
                    <SearchBox placeholder='请输入内容' />
                </span>
                <span className='audio' onClick={() => alert('用户中心正在开发中，敬请期待:)')}>
                    <AudioFill  />
                </span>
            </header>
        <div className='container'>
            <nav>
                <Slicks />
            </nav>
            <ul className='tab-list'>
                {
                    TabList.map(item=><li>
                        <p className='icon-wrapper'>
                            {item.icon}
                        </p>
                        <p className='title'>
                            {item.title}
                        </p>
                    </li>)
                }
            </ul>
            <Divider />
            <div className='recommend'>
                <h3>推荐歌单</h3>
                <ul className="recommend-list">
                    {/* <li>
                        <Slicks onClick={slickClick} setIntroduceSelect={setIntroduceSelect}   vertical={true} autoplaySpeed={3000} imgItems={['https://p1.music.126.net/4L--5jGuNNCdRxL10n_0-g==/19057835044326350.jpg?param=300x300','https://p1.music.126.net/omxC-mmwgGHbacIVBZYNkA==/109951163028873411.jpg?param=300x300','https://p1.music.126.net/SATl5PH1NpEPHsYaB24t5A==/109951166269856073.jpg?param=300x300','https://p1.music.126.net/gmpkCg7RfKftGEm45MLPUQ==/109951167464469991.jpg?param=300x300']} />
                        <p>
                            {introduceList[introduceSelect]}
                        </p>
                    </li> */}
                    {
                        dataSource.map(item=><li  onClick={()=>{slickClick(item.id)}} >
                            <img src={`${item.img}?param=300x300`} alt=""/>
                             <p>{item.title}</p>
                        </li>)
                    }
                </ul>
            </div>
            <div className='divider' />
            <div className='hobby'>
                <h3>每日推荐</h3>
                <Tabs />
            </div>
           
        </div>
    </div>
}