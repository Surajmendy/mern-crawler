/* eslint-disable no-console */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {},
  tableRightBorder: {
    borderWidth: 0,
    borderRightWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  table: {
    minWidth: 1000,
  },
});

export default function TableData({data}) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Url</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Meta description</TableCell>
            <TableCell>H1</TableCell>
            <TableCell>H2</TableCell>
            <TableCell>Links count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { data?.length < 1 ? (
                  <h4>No data scrapped.</h4>
                ) :
            data?.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.url}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.metaDescription}</TableCell>
              <TableCell>{row.h1}</TableCell>
              <TableCell>{row.h2}</TableCell>
              <TableCell>{row.links.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

