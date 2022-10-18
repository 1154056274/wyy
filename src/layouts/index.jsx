import React, { useMemo } from 'react'
import { TabBar } from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    FileOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
import './index.scss'
import { useHistory } from 'react-router-dom'
import { renderRoutes } from 'react-router-config';
import Player from '../pages/Player'
const Layouts  = props => {

    const history = useHistory()
    const tabs = [
        {
            key: 'discover',
            title: '发现',
            icon: <AppOutline />,

        },
        {
            key: 'video',
            title: '播客',
            icon: <UnorderedListOutline />,

        },
        {
            key: 'mine',
            title: '我的',
            icon: <UserOutline />,
        },
        {
            key: 'guanzhu',
            title: '关注',
            icon: <FileOutline />,
        },
        {
            key: 'yuncun',
            title: '云村',
            icon: <MessageOutline />,

        }
    ]

    const setRouteActive = (value) => {
        history.push(`/layout/${value}`)

    }

    console.log(props.location.pathname.includes('/layout/detail'));



    return <div className={`${props.location.pathname.includes('/layout/detail')?'detail-wrapper':'' } layout-wrapper`}>

        <div className='content'>
            {renderRoutes(props.route.routes)}
        </div>

        <Player />
        {
            !props.location.pathname.includes('/layout/detail')&& 
            <TabBar className='tab-bar' onChange={value => setRouteActive(value)}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
        }
       
    </div>


}

export default Layouts