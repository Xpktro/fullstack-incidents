import React from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({ row: { cursor: 'pointer' } });

export default ({ incidents }) => {
  const goToDetails = id => () => Router.push('/incidents/[id]', `/incidents/${id}`);
  const styles = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="incidents">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>Apparatus</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Subtype</TableCell>
            <TableCell>Fire Dept.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incidents.map(incident => (
            <TableRow
              key={incident.description.event_id}
              className={styles.row}
              hover
              onClick={goToDetails(incident.description.incident_number)}
            >
              <TableCell>{incident.address.city}</TableCell>
              <TableCell align="right">{incident.apparatus.length}</TableCell>
              <TableCell>{incident.description.type}</TableCell>
              <TableCell>{incident.description.subtype}</TableCell>
              <TableCell>{incident.fire_department.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
