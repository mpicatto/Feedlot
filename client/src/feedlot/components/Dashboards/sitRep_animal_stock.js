import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    Width: '90%',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.alternate,
    },
  },
});

let id = 0;
function createData(title, qty, variation ) {
  id += 1;
  return { id, title, qty, variation };
}

const rows = [
  createData('Total de Rodeos', 3, "="),
  createData('Stock Animales', 275, "+ "+20),
  createData('Ganancia Peso Diaria Promedio',1.1+'kg', '-'+12.1+'%' ),
  createData('Animales en Peso de Faena (+ '+350+'kg)', 112, "- "+40),
  createData('Ingreso estimado (precio venta aprox. $'+106+'/kg)','$'+ 4511360, "+ "+2240150)

];

function SitRep_Animal_Stock(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Stock de Animales</CustomTableCell>
            <CustomTableCell align="right">Cantidad</CustomTableCell>
            <CustomTableCell align="right">Variación</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.title}
              </CustomTableCell>
              <CustomTableCell align="right">{row.qty}</CustomTableCell>
              <CustomTableCell align="right">{row.variation}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SitRep_Animal_Stock.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SitRep_Animal_Stock);