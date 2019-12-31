import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import dynamic from 'next/dynamic';

const styles = {
  appBar: { marginBottom: '1rem' },
  title: { flexGrow: 1 },
};

const App = ({ Component, pageProps, classes }) => (
  <>
    <Head>
      <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
      <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossorigin="" />
    </Head>
    <CssBaseline />

    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          911 Incidents
        </Typography>
      </Toolbar>
    </AppBar>

    <Component {...pageProps} />
  </>
);

export default dynamic(
  // Enabling SSR will require additional boilerplate for integrating
  // material-ui that I'm not willing to write for this project timeline
  () => Promise.resolve(withStyles(styles)(App)),
  { ssr: false }
);
