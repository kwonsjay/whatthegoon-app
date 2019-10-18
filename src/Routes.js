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

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/posts/new" exact component={NewPost} appProps={appProps} />
      <AppliedRoute path="/posts/:id" exact component={Posts} appProps={appProps} />
      <AppliedRoute path="/settings" exact component={Settings} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}
