import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Brands from "../pages/Brands";
import Vehicles from "../pages/Vehicles";
import VehiclesSummary from "../components/VehiclesSummary";
import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import Loading from "../components/Loading";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  const { isLoading } = useContext(LoadingContext);
  if (isLoading) return <Loading />;
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <ProtectedRoute exact path="/home" component={Home}></ProtectedRoute>
        <Route exact path="/brands">
          <Home>
            <Brands />
          </Home>
        </Route>
        <Route exact path="/vehicles">
          <Home>
            <Vehicles />
          </Home>
        </Route>
        <Route exact path="/dashboard">
          <Home>
            <VehiclesSummary />
          </Home>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
