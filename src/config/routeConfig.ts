import { RouterLink } from "../types/routerLinkTypes";
import { HomePageLayout, DashBoard } from "../component/AppContainer/Home";
import { SignIn, SignUp } from "../component/AppContainer/Home/Login";

const routeConfig: RouterLink[] = [
    {
        name: 'home',
        path: '/',
        component: HomePageLayout
    },
    {
        name: 'signin',
        path: '/signin',
        component: SignIn
    },
    {
        name: 'signup',
        path: '/signup',
        component: SignUp
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: DashBoard
    }
];
export default routeConfig;