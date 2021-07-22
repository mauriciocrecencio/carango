import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import Home from "../pages/Home";
import Brands from "../pages/Brands";
import Vehicles from "../pages/Vehicles";
import VehiclesSummary from "../pages/Dashboard";
import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AxiosInterceptor from "../services/AxiosInterceptor";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Loading from "../components/Loading";

const Routes = () => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <Router>
      <AxiosInterceptor>
        <>
          {isLoading && <Loading />}
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <ProtectedRoute exact path="/home" component={Home}></ProtectedRoute>
            <ProtectedRoute exact path="/brands" component={Brands}></ProtectedRoute>
            <ProtectedRoute exact path="/vehicles" component={Vehicles} />
            <ProtectedRoute exact path="/dashboard" component={VehiclesSummary} />
          </Switch>
        </>
      </AxiosInterceptor>
    </Router>
  );
};

export default Routes;
