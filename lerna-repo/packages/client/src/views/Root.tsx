import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IUserData } from '../types/types';
import { routes } from '../routes/index';
import { auth } from '../services/auth';
import { setFriendList } from '../services/setFriendList';
import { Navbar } from '../components/organisms/Navbar';
import { Main } from './Main';
import { Chat } from './Chat';
import { Auth } from './Auth';
import { Profile } from './Profile';
import { SearchUser } from './SearchUser';
import { Friends } from './Friends';

export const Root = () => {
    const dispatch = useDispatch();

    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    useEffect(() => {
        auth().then(userData => {
            if (userData) {
                dispatch({ type: 'SET_USER_DATA', payload: userData });
            }
        });
        setFriendList().then(friendList => {
            dispatch({
                type: 'SET_FULFILLED_FRIENDLIST',
                payload: friendList,
            });
        });
    }, []);

    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Switch>
                    {userData.isUserLoggedIn && (
                        <>
                            <Route exact path={routes.chat} component={Chat} />
                            <Route exact path={routes.auth} component={Auth} />
                            <Route
                                exact
                                path={routes.profile}
                                component={Profile}
                            />
                            <Route
                                exact
                                path={routes.searchUser}
                                component={SearchUser}
                            />
                            <Route
                                exact
                                path={routes.friends}
                                component={Friends}
                            />
                        </>
                    )}
                    <Route exact path={routes.home} component={Main}>
                        <Redirect to={routes.auth} />
                    </Route>
                    <Route exact path={routes.auth} component={Auth} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};
