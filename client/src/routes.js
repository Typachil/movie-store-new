import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Cartoon from "./pages/Cartoon";
import Collections from "./pages/Collections";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import Movies from "./pages/Movies";
import Profile from "./pages/Profile";
import Series from "./pages/Series";
import { ADMIN_ROUTE, CARTOON_ROUTE, COLLECTIONS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, MOVIES_ROUTE, MOVIE_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SERIES_ROUTE } from "./utils/consts";

export const authRoutes = [
   {
       path: ADMIN_ROUTE,
       Component: Admin
   },
   {
        path: PROFILE_ROUTE,
        Component: Profile
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MOVIE_ROUTE + '/:id',
        Component: MoviePage
    },
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: CARTOON_ROUTE,
        Component: Cartoon
    },
    {
        path: MOVIES_ROUTE,
        Component: Movies
    },
    {
        path: SERIES_ROUTE,
        Component: Series
    },
    {
        path: COLLECTIONS_ROUTE,
        Component: Collections
    },
]