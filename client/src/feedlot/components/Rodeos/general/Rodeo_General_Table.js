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
  createData('Categoria', "Novillitos/Vaquillonas Livianas"),
  createData('Cantidad de Animales', 112),
  createData('Peso Promedio',350+'kg'),
  createData('Peso Diaria Promedio',1.1+'kg'),
  createData('Animales Enfermos', 5),
  createData('Animales Muertos',3)

];

function Rodeo_General_Table(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
       
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.title}
              </CustomTableCell>
              <CustomTableCell align="right">{row.qty}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

Rodeo_General_Table.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rodeo_General_Table);