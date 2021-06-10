import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { Header } from '../components/header';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { Categories } from '../pages/categories';
import { Podcast } from '../pages/Detailpodcast';
import { Episodes } from '../pages/episodes';
import Home from '../pages/home';
import { CreateEpisode } from '../pages/Host/create-episode';
import { CreatePodcast } from '../pages/Host/create-podcast';
import { DeletePodcast } from '../pages/Host/delete-podcast';
import { UpdatePodcast } from '../pages/Host/update-podcast';

export const LoggedInRouter = () => {
    const handleOnClick = () => {
        isLoggedInVar(false);
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
    }
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/categories'>
                    <Categories />
                </Route>
                <Route exact path='/create-podcast'>
                    <CreatePodcast />
                </Route>
                <Route exact path='/:id/create-episode'>
                    <CreateEpisode />
                </Route>
                <Route exact path='/:id'>
                    <Podcast />
                </Route>
                <Route exact path='/:id/update-podcast'>
                    <UpdatePodcast />
                </Route>
                <Route exact path='/:id/delete-podcast'>
                    <DeletePodcast />
                </Route>          
                <Route exact path='/:id/episodes'>
                    <Episodes />
                </Route>         
            </Switch>
            <div className={'flex items-center justify-center absolute top-0 right-0'}>
                <span onClick={handleOnClick}
                className={"bg-blue-100 text-sm"}>
                    로그아웃
                </span>
            </div>
        </Router>
    )



}