import Login from '../pages/Login'
import Layout from '../layouts'
import { Redirect } from 'react-router';
import Discover from '../pages/Discover'
import Guanzhu from '../pages/Guanzhu'
import Mine from '../pages/Mine'
import Video from '../pages/Video'
import Yuncun from '../pages/Yuncun'
import DiscoverDetail from '../pages/Discover/Detail'
const routes = [
    {
        path: '/',
        exact: true,
        render: () => {
            return <Redirect to='/login' />
        }
    },
    {
        path: '/login',
        component: Login
    },
   
    {
        path: '/layout',
        component: Layout,
        
        routes:[
            {
                exact: true,
                path:'/layout',
                render: () => {
                    return <Redirect to='/layout/discover' />
                }
            },
            {
                path:'/layout/discover',
                component:Discover,
               
            },
           
            {
                path:'/layout/guanzhu',
                component:Guanzhu
            },
            {
                path:'/layout/mine',
                component:Mine
            },
            {
                path:'/layout/video',
                component:Video
            },
            {
                path:'/layout/yuncun',
                component:Yuncun
            },
            {
                path:'/layout/detail/:id',
                component:DiscoverDetail
            },
        ]
    },
  
    
]

export default routes;