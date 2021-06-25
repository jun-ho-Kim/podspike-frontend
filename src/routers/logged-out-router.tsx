import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CreateAccount } from '../pages/create-account';
import { Login } from '../pages/login';
import { NotFound } from '../pages/404';
import { Footer } from '../components/footer';

export const LoggedOutRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Login />
                </Route>
                <Route exact path='/create-account'>
                    <CreateAccount />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}
