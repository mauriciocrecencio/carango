// @ts-nocheck

import "./App.css";
import Routes from "./routes";
import ProviderContexts from "./context/ProviderContexts";
import AxiosInterceptor from "./services/AxiosInterceptor";
function App() {
  return (
    <ProviderContexts>
      <Routes />
    </ProviderContexts>
  );
}

export default App;
