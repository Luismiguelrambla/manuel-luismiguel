import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import Results from "./pages/Results";
import ResultsPage from "./pages/ResultsPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Booking from "./pages/Booking";
import SignUpHotel from "./pages/SignUpHotel";
import ProfileHotel from "./pages/ProfileHotel";
import GestionHotel from "./pages/GestionHotel";
import { AuthProvider } from "./shared/context/authContext";
import ShowToLoggedInUserHotel from "./components/ShowToLoggedInUserHotel";
import ShowToLoggedInUsers from "./components/ShowToLoggedInUser";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/spaces/:idEspacio" exact component={ResultsPage} />
            <Route path="/contactus" exact component={AboutUs} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/sign-up/hotel" exact component={SignUpHotel} />
            <Route path="/results/" exact component={Results} />
            <Route path="/login" exact component={Login} />
            <ShowToLoggedInUserHotel>
              <Route path="/hotels/profile" exact component={ProfileHotel} />
              <Route path="/hotels/Gestion" exact component={GestionHotel} />
            </ShowToLoggedInUserHotel>
            <ShowToLoggedInUsers>
              <Route
                path="/spaces/:idEspacio/booking"
                exact
                component={Booking}
              />
              <Route path="/profile" exact component={Profile} />
            </ShowToLoggedInUsers>
          </Switch>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
