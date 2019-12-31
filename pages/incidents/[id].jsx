import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import dynamic from 'next/dynamic';

import IncidentDetails from '../../components/IncidentDetails';
const IncidentMap = dynamic(
  () => import('../../components/IncidentMap'),
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
});

class Incident extends React.Component {
  state = { incident: null };

  componentDidMount() {
    const { router: { query: { id } } } = this.props;

    fetch(`/api/incidents/${id}`)
      .then(response => response.json())
      .then(incident => this.setState({ incident }))
  }

  render() {
    const { classes } = this.props;
    const { incident } = this.state;

    return (
      <div className={classes.root}>
        {!incident && <CircularProgress />}
        {incident && (
          <Grid container spacing={3}>
            <Grid item md xs={12}>
              <IncidentDetails incident={incident} />
            </Grid>
            <Grid item md xs={12}>
              <IncidentMap incidents={[incident]} />
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

// Not enough functions to compose
export default withRouter(withStyles(styles)(Incident));
