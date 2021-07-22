import { CircularProgress } from "@material-ui/core";
import { ContainerLoading } from "./styles";

const Loading = () => (
  <ContainerLoading>
    <CircularProgress color="primary" size={140} />
  </ContainerLoading>
);

export default Loading;
