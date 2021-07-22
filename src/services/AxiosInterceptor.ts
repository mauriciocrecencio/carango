// WithAxios.js

import { useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { LoadingContext } from "../context/LoadingContext";
import { API, APIAuth } from "./apiService";

const AxiosInterceptor = ({ children }: { children: JSX.Element }) => {
  const { setIsLoading } = useContext(LoadingContext);
  const history = useHistory();
  useMemo(() => {
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
  }, [setIsLoading]);
  useMemo(() => {
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
  }, [setIsLoading]);
  useMemo(() => {
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
  }, [setIsLoading]);

  useMemo(() => {
    APIAuth.interceptors.response.use(
      function (config) {
        setIsLoading(false);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(config.data));

        if (config.statusText === "OK" && config.config.url === "/usuario") {
          history.push("/login");
        }
        if (config.statusText === "Created" && config.config.url === "/usuario/login") {
          history.push("/home");
        }
        return config;
      },
      function (error) {
        setIsLoading(false);
        // history.push("/login");

        // Do something with request error
        return Promise.reject(error);
      }
    );
  }, [setIsLoading, history]);
  return children;
};

export default AxiosInterceptor;
