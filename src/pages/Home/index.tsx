import { Box, Container, Grid } from "@material-ui/core";
import { ReactNode } from "react";
import SideNav from "../../components/SideNav";

const Home = ({ children }: { children: ReactNode }) => {
  return (
    <Container style={{ marginTop: 30 }}>
      <Grid container spacing={10}>
        <Grid container item xs={4} direction="column">
          <SideNav />
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" justifyContent="center" flexDirection="column">
            {children}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
