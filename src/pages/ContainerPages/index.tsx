import { Container, Grid, Box } from "@material-ui/core";
import { ReactNode } from "react";
import SideNav from "../../components/SideNav";

const ContainerPages = ({ children }: { children: ReactNode }) => (
  <Container style={{ marginTop: 30 }}>
    <Grid container spacing={10}>
      <Grid container item xs={4} direction="column">
        <SideNav />
      </Grid>
      <Grid item xs={8}>
        <Box display="flex" justifyContent="center" flexDirection="column"></Box>
        {children}
      </Grid>
    </Grid>
  </Container>
);

export default ContainerPages;
