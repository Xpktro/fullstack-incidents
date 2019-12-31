import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const styles = {
  popup: { cursor: 'pointer' }
};

class IncidentMap extends Component {
  goToDetails() {
    alert('details');
  }

  render() {
    const { incidents, classes } = this.props;
    const positions = incidents.map(
      incident => [incident.address.latitude, incident.address.longitude]
    );

    return (
      <Map
        bounds={positions}
        style={{ height: '50rem' }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map((position, index) => {
          const {
            description: { type, subtype, incident_number },
            address,
            apparatus
          } = incidents[index];

          return (
            <Marker key={incident_number} position={position}>
              <Popup closeButton className={classes.popup}>
                <div onClick={this.goToDetails}>
                  <h2>No. {incident_number}</h2>
                  <h3>{address.address_line1}, {address.city}</h3>
                  <h4>{type}: {subtype}</h4>
                  <h4>Apparatus: {apparatus.length}</h4>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </Map>
    );
  }
}

export default withStyles(styles)(IncidentMap);
