import Display from './Containers/Display.vue';
import Dashboard from './Containers/Dashboard.vue';
import DashHome from './Components/Dashboard/DashHome/dashHome.vue';
import Analytics from './Components/Dashboard/Analytics/Analytic.vue';
import Advisory from './Components/Dashboard/Advisory/Advisory.vue';
import Chc from './Components/Dashboard/CHC/Chc.vue';
import Phc from './Components/Dashboard/PHC/Phc.vue';
import {store} from './Containers/Store/Store';
import four from './Components/Extra/Extra.vue';
import Patient from './Components/Dashboard/Patient/Patient.vue';

export const routes=[
    {path:"/",component:Display,beforeEnter(to,from,next){
        if(to["path"]=="/")
        {
            store.state.idToken=null;
            store.state.userId=null;
            store.state.loginDetails.choice="chc";
            store.state.loginDetails.id="gov189";
        }
        next();
    }},
    {path:"/dashboard",component:Dashboard,
    beforeEnter(to,from,next){
        if(store.state.idToken && store.state.userId)
        {
            next();
        }
        else{
            next("/")
        }
    },
    children:[
        {path:"",component:DashHome},
        {path:"/dashboard/analytics",component:Analytics},
        {path:"/dashboard/advisory",component:Advisory},
        {path:"/dashboard/phc",component:Chc,beforeEnter(to,from,next){
            if(store.state.loginDetails.choice==="chc")
            {
                next();
            }
            else{
                next("/four");
            }
        }},
        {path:"/dashboard/mo",component:Phc},
        {path:"/dashboard/patient",component:Patient}
    ]},
    {path:"*",component:Display}
    
]
