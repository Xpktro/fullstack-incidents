import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import dynamic from 'next/dynamic';

import IncidentList from '../components/IncidentList';
// Next will try to render this before serving which makes
// Leaflet break since it relies on window
const IncidentMap = dynamic(
  () => import('../components/IncidentMap'),
  { ssr: false }
);

const styles = theme => ({
  root: {
    width: '98%',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    margin: '0 auto'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
});

class Index extends React.Component {
  state = { incidents: null };

  componentDidMount() {
    fetch('/api/incidents')
      .then(response => response.json())
      .then(incidents => this.setState({ incidents }))
  }

  render() {
    const { classes } = this.props;
    const { incidents } = this.state;
    return (
      <div className={classes.root}>
        {!incidents && <CircularProgress />}
        {incidents && (
          <Grid container spacing={3}>
            <Grid item md xs={12}>
              <IncidentList incidents={incidents} />
            </Grid>
            <Grid item md xs={12}>
              <IncidentMap incidents={incidents} />
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Index);
