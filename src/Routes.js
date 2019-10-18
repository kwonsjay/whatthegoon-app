import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewPost from "./containers/NewPost";
import Posts from "./containers/Posts";
import Settings from "./containers/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
			<UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
			<UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
			<AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />
			<AuthenticatedRoute path="/posts/new" exact component={NewPost} appProps={appProps} />
			<AuthenticatedRoute path="/posts/:id" exact component={Posts} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}
