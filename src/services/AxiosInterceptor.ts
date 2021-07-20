// WithAxios.js

import { ReactNode, useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { LoadingContext } from "../context/LoadingContext";
import { API, APIAuth } from "./apiService";

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  const { setIsLoading } = useContext(LoadingContext);
  const { setIsAuth } = useContext(AuthenticationContext);

  API.interceptors.request.use(
    function (config) {
      setIsLoading(true);
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  API.interceptors.response.use(
    function (config) {
      setIsLoading(false);
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  APIAuth.interceptors.request.use(
    function (config) {
      setIsLoading(true);
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  APIAuth.interceptors.response.use(
    function (config) {
      setIsLoading(false);
      if (config.status === 201) {
        // setIsAuth(true);
        localStorage.setItem("isAuthenticated", "true");
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return children;
};

export default AxiosInterceptor;
