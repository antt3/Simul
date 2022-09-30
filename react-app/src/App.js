import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import AllChannels from './components/AllChannels';
import PageNotFound from './components/PageNotFound';
import ChannelChat from './components/ChannelChat';
import DirectMessages from './components/DirectMessages';
import User from './components/User';
import SplashPage from './components/SplashPage';
import Search from './components/Search';
import { authenticate } from './store/session';
import * as channelsReducer from './store/channels';
import * as usersReducer from './store/users';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async() => {
      await dispatch(channelsReducer.thunkGetChannels());
      await dispatch(usersReducer.thunkGetUsers());
    })()
}, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AllChannels />
      <Switch>
        <Route path='/splash' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/channels/:channelId' exact={true} >
          <ChannelChat />
        </ProtectedRoute>
        <ProtectedRoute path='/direct-messages/:refId' exact={true} >
          <DirectMessages />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/search/:searchedTerm' exact={true} >
          <Search />
        </ProtectedRoute>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
