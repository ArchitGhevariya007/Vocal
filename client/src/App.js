import Users from "./components/Users";
import { Grid } from "@mui/material";

function App() {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={3} sm={12}>
          <Users />
        </Grid>
        <Grid item ms={9}>
          <p>xs=4</p>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
