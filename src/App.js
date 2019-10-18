import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// import { Nav, Navbar, NavItem } from "react-bootstrap";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Navbar, Container } from 'react-bulma-components/dist';
// import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import Routes from "./Routes";
import "./App.css";
import logo from "./assets/logo.png";

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  return (
    !isAuthenticating && 
    <div className="App">
      <Navbar className="is-spaced">
        <Container>
          <Navbar.Brand>
            <Navbar.Item renderAs="a" href="/">
              <img src={logo} alt="logo" />
            </Navbar.Item>
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Container position="end">
              {
                isAuthenticated ? (
                  <>
                    <Navbar.Item renderAs="div">
                      <div className="buttons">
                        <Button renderAs="a" href="/settings" className="is-primary is-outlined">Settings</Button>
                        <Button renderAs="a" onClick={handleLogout} className="is-danger is-outlined">Logout</Button>
                      </div>
                    </Navbar.Item>
                  </>
                ) : (
                  <>
                    <Navbar.Item renderAs="div">
                      <div className="buttons">
                        <Button renderAs="a" href="/signup" className="is-primary is-outlined">Signup</Button>
                        <Button renderAs="a" href="/login" className="is-primary is-outlined">Login</Button>
                      </div>
                    </Navbar.Item>
                  </>
                )
              }
            </Navbar.Container>
          </Navbar.Menu>
        </Container>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App);
