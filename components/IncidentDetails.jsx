import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const shortDate = timestamp => moment(timestamp).format('MM/DD/YYYY HH:mm:ss');

export default ({ incident: { address, apparatus, description, fire_department } }) => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Typography variant="h3">
        Incident: {description.incident_number}
      </Typography>
    </Grid>

    <Grid item sm={6} xs={12}>
      <Typography variant="h6">
        <strong>Type:</strong> {description.type}
      </Typography>
    </Grid>
    <Grid item sm={6} xs={12}>
      <Typography variant="h6">
        <strong>Subtype:</strong> {description.subtype}
      </Typography>
    </Grid>

    <Grid item sm={6} xs={12}>
      <Typography variant="h5">
        <strong>Opened:</strong> {shortDate(description.event_opened)}
      </Typography>
    </Grid>
    <Grid item sm={6} xs={12}>
      <Typography variant="h5">
        <strong>Closed:</strong> {shortDate(description.event_closed)}
      </Typography>
    </Grid>

    <Grid item xs={12}>
      <Typography variant="h5">
        <strong>Address:</strong> {address.address_line1}, {address.city}, {address.state}
      </Typography>
    </Grid>

    <Grid item sm={4} xs={12}>
      <Typography variant="h6" component="p">
        <strong>First unit dispatched:</strong>
      </Typography>
      <Typography variant="h6" component="p">
        {shortDate(description.first_unit_dispatched)}
      </Typography>
    </Grid>

    <Grid item sm={4} xs={12}>
      <Typography variant="h6" component="p">
        <strong>First unit en route:</strong>
      </Typography>
      <Typography variant="h6" component="p">
        {shortDate(description.first_unit_enroutes)}
      </Typography>
    </Grid>

    <Grid item sm={4} xs={12}>
      <Typography variant="h6" component="p">
        <strong>First unit arrived:</strong>
      </Typography>
      <Typography variant="h6" component="p">
        {shortDate(description.first_unit_arrived)}
      </Typography>
    </Grid>

    <Grid item xs={12}>
      <Typography variant="h4">
        <strong>Apparatus:</strong> {apparatus.length} unit(s)
      </Typography>
    </Grid>

    {apparatus.map(car => (
      <Grid item sm={4} xs={12}>
        <Typography variant="h6" component="p">
          <strong>{car.unit_type}</strong> #{car.car_id}
        </Typography>
        <Typography variant="h7" component="p">
          <strong>Dispatched:</strong> {shortDate(car.unit_status.dispatched.timestamp)}
        </Typography>
        <Typography variant="h7" component="p">
          <strong>En route:</strong> {shortDate(car.unit_status.dispatched.timestamp)}
        </Typography>
        <Typography variant="h7" component="p">
          <strong>Arrived:</strong> {shortDate(car.unit_status.arrived.timestamp)}
        </Typography>
        <Typography variant="h7" component="p">
          <strong>Available:</strong> {shortDate(car.unit_status.available.timestamp)}
        </Typography>
      </Grid>
    ))}

    <Grid item xs={12}>
      <Typography variant="h4">
        Fire Department: {fire_department.fd_id}
      </Typography>

      <Typography variant="h6" component="p">
        <strong>Name:</strong> {fire_department.name}
      </Typography>
      <Typography variant="h6" component="p">
        <strong>FireCARES:</strong> {fire_department.firecares_id}
      </Typography>
      <Typography variant="h6" component="p">
        <strong>State:</strong> {fire_department.state}
      </Typography>
    </Grid>

    <Grid item xs={12}>
      <Typography variant="h4">
        Comments
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="overline">
        {description.comments}
      </Typography>
    </Grid>
  </Grid>
);
