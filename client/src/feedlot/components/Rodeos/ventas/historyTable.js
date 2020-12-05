
import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import { ListItem } from '@material-ui/core';
import {connect} from 'react-redux';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(op_num,proveedor,consignatario,fechaCompra,cantAnimales,estado,guias,costo) {
  return {
    op_num,
    proveedor,
    consignatario,
    fechaCompra,
    cantAnimales,
    estado,
    guias,
    costo};
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.op_num}
        </TableCell>
        <TableCell align="center">{row.proveedor}</TableCell>
        <TableCell align="center">{row.consignatario}</TableCell>
        <TableCell align="center">{row.fechaCompra}</TableCell>
        <TableCell align="center">{row.cantAnimales}</TableCell>
        <TableCell align="center">{row.estado}</TableCell>
        <TableCell align="center">{"detalle"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Guias
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell >Nº GUIA</TableCell>
                    <TableCell align="right">Cantidad Animales</TableCell>
                    <TableCell align="right">Fecha de Carga</TableCell>
                    <TableCell align="right">Fecha de Descarga</TableCell>
                    <TableCell align="right">Peso Carga</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.guias.map((guia) => (
                    <TableRow key={guia.numero}>
                      <TableCell component="th" scope="row">
                        {guia.numero}
                      </TableCell>
                      <TableCell align="right">{guia.cantAnimales}</TableCell>
                      <TableCell align="right">{guia.fechaCarga}</TableCell>
                      <TableCell align="right">{guia.fechaDescarga}</TableCell>
                      <TableCell align="right">{guia.peso+'Kg'}</TableCell>               
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles de Costos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Razon Social</TableCell>
                    <TableCell align="right">Nº Factura</TableCell>
                    <TableCell align="right">Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.costo.map((costo) => (
                    <TableRow key={costo.numeroFactura}>
                      <TableCell component="th" scope="row" align="center">
                        {costo.razon_social}
                      </TableCell>
                      <TableCell align="right">{costo.numeroFactura}</TableCell>
                      <TableCell align="right">{"$"+costo.totalFactura}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     cug: PropTypes.string.isRequired,
//     num_manejo: PropTypes.string.isRequired,
//     verificador: PropTypes.string.isRequired,
//     ingreso: PropTypes.string.isRequired,
//     egreso: PropTypes.string.isRequired,
//     estado: PropTypes.string.isRequired,
//     margen: PropTypes.number.isRequired,
//     detalle: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//   }).isRequired,
// };

let rows = []


function CollapsibleTable(props) {
  useEffect(()=>{
    populate()
  },[])
 
  function populate(){

  rows=[]
    props.history.data.map(item=>{
    rows.push(
      createData(
      item.id,
      item.cliente,
      item.consig,
      item.fechaCompra,
      item.cantAnimales,
      item.estado,
      item.guias,
      item.costos
      ))
    })
console.log(rows)
}



  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{backgroundColor:"black"}}>
            <TableCell />
            <TableCell style={{color:"white",}} >Operacion Nº</TableCell>
            <TableCell style={{color:"white",}} align="center">Proveedor</TableCell>
            <TableCell style={{color:"white",}} align="center">Consignatario</TableCell>
            <TableCell style={{color:"white",}} align="center">Fecha de Compra</TableCell>
            <TableCell style={{color:"white",}} align="center">Cantidad de Animales</TableCell>
            <TableCell style={{color:"white",}} align="center">Estado</TableCell>
            <TableCell style={{color:"white",}} align="center">Detalle</TableCell>         
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.op_num} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
const mapStateToProps = state => {
  return{
    user:state.user.user,
    rodeo:state.rodeo,
    history:state.historialCompras
  }				
}



export default connect(mapStateToProps)(CollapsibleTable);