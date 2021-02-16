import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Spaces from "./pages/Spaces";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { AuthProvider } from "./shared/context/authContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/hotels" exact component={Hotels} />
            <Route path="/spaces" exact component={Spaces} />
            <Route path="/contactus" exact component={AboutUs} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/results/" exact component={Results} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
