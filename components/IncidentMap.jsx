import React, { Component } from 'react';
import Router from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const styles = {
  popup: { cursor: 'pointer' }
};

class IncidentMap extends Component {
  goToDetails(id) {
    return () => Router.push('/incidents/[id]', `/incidents/${id}`);
  }

  render() {
    const { incidents, classes } = this.props;
    const positions = incidents.map(
      incident => [incident.address.latitude, incident.address.longitude]
    );

    return (
      <Map
        style={{ height: '50rem' }}
        {...(
          positions.length === 1
            ? { center: positions[0], zoom: 15 }
            : { bounds: positions }
        )}
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
                <div onClick={this.goToDetails(incident_number)}>
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
