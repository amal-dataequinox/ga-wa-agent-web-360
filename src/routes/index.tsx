import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';

//import routes
import { authProtectedRoutes, publicRoutes } from './routes';

//import layouts
import NonAuthLayout from "../layouts/NonAuth";
import AuthLayout from "../layouts/AuthLayout";
import useAuth from '../pages/Auth/useAuth';
import Login from '../pages/Auth/Login';


type AppRouteFunction = {
    component: any,
    layout: any,
    isAuthProtected: boolean,
    path: string,
    key: number
}
// handle auth and authorization
const AppRoute = ({ component: Component, layout: Layout, isAuthProtected, ...rest }: AppRouteFunction) => {
    const { isAuthenticated } = useAuth();
    const history = useHistory();
    console.log("Is authenticated", isAuthenticated);
    return <Route {...rest} render={props => {
        console.log(props.location.pathname);
        
        console.log(isAuthProtected);
        console.log(localStorage.getItem("authUser"));

        if (!isAuthenticated && props.location.pathname!=='/register') {
            localStorage.removeItem("authUser");
            //localStorage.removeItem("accessToken");
           return <Login />
            // return (
            //     <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            // );
        }
        // authorised so return component
        return <Layout><Component {...props} /></Layout>
    }} />
}

/**
 * Main Route component
 */
const Routes = (props: any) => {

    return (
        // rendering the router with layout
        <BrowserRouter>
            <React.Fragment>
                <Suspense fallback={<div></div>} >
                    <Switch>
                        {/* public routes */}
                        {publicRoutes.map((route, idx) =>
                            <AppRoute path={route.path} layout={NonAuthLayout} component={route.component}
                                key={idx} isAuthProtected={false} />
                        )}

                        {/* private/auth protected routes */}
                        {authProtectedRoutes.map((route, idx) =>
                            <AppRoute path={route.path} layout={AuthLayout} component={route.component}
                                key={idx} isAuthProtected={true} />
                        )}
                    </Switch>
                </Suspense>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default Routes;