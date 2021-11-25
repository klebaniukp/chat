import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '../routes/index';
import { Main } from './Main';
import { Chat } from './Chat';
import { Auth } from './Auth';
import { Profile } from './Profile';

export const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={routes.home} component={Main} />
                <Route exact path={routes.chat} component={Chat} />
                <Route exact path={routes.auth} component={Auth} />
                <Route exact path={routes.profile} component={Profile} />
            </Switch>
        </BrowserRouter>
    );
};
