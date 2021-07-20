import { CircularProgress } from "@material-ui/core";

const Loading = () => (
  <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
    <CircularProgress color="primary" size={140} />
  </div>
);

export default Loading;
