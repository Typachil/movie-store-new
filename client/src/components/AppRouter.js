import { observer } from "mobx-react-lite";
import React, { lazy, useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Context } from '../index';
import { authRoutes, publicRoutes, adminRoutes } from '../routes';
import { HOME_ROUTE } from '../utils/consts';

const AppRouter = observer(() => {
    const {user} = useContext(Context);
    return (
        <div>
            <Switch>
                {user._isAuth && authRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} component={Component} exact/>
                )}
                {user.user.role == "ADMIN" && adminRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )}
                {publicRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} component={Component} exact/>
                )}
                <Redirect to={HOME_ROUTE}/>
            </Switch>
        </div>
    )
})

export default AppRouter;