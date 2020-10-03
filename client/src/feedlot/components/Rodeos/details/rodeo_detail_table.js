import React from 'react';
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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(cug,num_manejo,verificador,ingreso,egreso,estado,margen,detalle_animal, detalle_costos,detalle_venta,eficiencia) {
  return {
    cug,
    num_manejo,
    verificador,
    ingreso,
    egreso,
    estado,
    margen,
    detalle_animal,
    detalle_costos,
    detalle_venta,
    eficiencia
  };
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
          {row.cug}
        </TableCell>
        <TableCell align="center">{row.num_manejo}</TableCell>
        <TableCell align="center">{row.verificador}</TableCell>
        <TableCell align="center">{row.ingreso}</TableCell>
        <TableCell align="center">{row.egreso}</TableCell>
        <TableCell align="center">{row.estado}</TableCell>
        <TableCell align="center">{"$"+row.margen}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles del Animal
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Raza</TableCell>
                    <TableCell align="right">Sexo</TableCell>
                    <TableCell align="right">Frame</TableCell>
                    <TableCell align="right">Peso Inicial(Kg)</TableCell>
                    <TableCell align="right">Peso Actual(Kg)</TableCell>
                    <TableCell align="right">Ganancia(Kg)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detalle_animal.map((animal) => (
                    <TableRow key={animal.raza}>
                      <TableCell component="th" scope="row">
                        {animal.raza}
                      </TableCell>
                      <TableCell align="right">{animal.sexo}</TableCell>
                      <TableCell align="right">{animal.frame}</TableCell>
                      <TableCell align="right">{animal.p_inicial}</TableCell>
                      <TableCell align="right">{animal.p_actual}</TableCell>
                      <TableCell align="right">{animal.ganancia}</TableCell>                  
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
                    <TableCell align="center">Precio de Compra</TableCell>
                    <TableCell align="right">Alimentos</TableCell>
                    <TableCell align="right">Veterinaria</TableCell>
                    <TableCell align="right">Otros</TableCell>
                    <TableCell align="right">costoTotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detalle_costos.map((costo) => (
                    <TableRow key={costo.precio_compra}>
                      <TableCell component="th" scope="row" align="center">
                        {"$"+costo.precio_compra}
                      </TableCell>
                      <TableCell align="right">{"$"+costo.total_alimento}</TableCell>
                      <TableCell align="right">{"$"+costo.veterinaria}</TableCell>
                      <TableCell align="right">{"$"+costo.otros}</TableCell>
                      <TableCell align="right">{"$"+costo.cost_total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles de Venta
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nº Orden de Venta</TableCell>
                    <TableCell align="right">CUIT Comprador</TableCell>
                    <TableCell align="right">CUIT consingnatario</TableCell>
                    <TableCell align="right">Precio ($/Kg vivo)</TableCell>
                    <TableCell align="right">Total Venta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detalle_venta.map((venta) => (
                    <TableRow key={venta.num_venta}>
                      <TableCell component="th" scope="row" align="center">
                      {venta.num_venta}
                      </TableCell>
                      <TableCell align="right">{venta.comprador}</TableCell>
                      <TableCell align="right">{venta.consingnatario}</TableCell>
                      <TableCell align="right">{"$"+venta.precio_venta}</TableCell>
                      <TableCell align="right">{"$"+venta.total_venta}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Eficiencia
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Dias Engorde</TableCell>
                    <TableCell align="right">Ganancia Diaria (Kg/dia)</TableCell>
                    <TableCell align="right">Cant. Diaria Alimento (Kg)</TableCell>
                    <TableCell align="right">Eficiencia de Conversión (Kg Alimento/Kg vivo)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.eficiencia.map((eficiencia) => (
                    <TableRow key={eficiencia.dias}>
                      <TableCell component="th" scope="row" align="center">
                      {eficiencia.dias}
                      </TableCell>
                      <TableCell align="right">{eficiencia.ganancia_diaria.toFixed(2)}</TableCell>
                      <TableCell align="right">{eficiencia.vol_alimento}</TableCell>
                      <TableCell align="right">{eficiencia.eficiencia_conversion.toFixed(2)}</TableCell>
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

Row.propTypes = {
  row: PropTypes.shape({
    cug: PropTypes.string.isRequired,
    num_manejo: PropTypes.string.isRequired,
    verificador: PropTypes.string.isRequired,
    ingreso: PropTypes.string.isRequired,
    egreso: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    margen: PropTypes.number.isRequired,
    detalle: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

let rows = []
let animalDetails=[]
let costsDetails=[]
let ventaDetails=[]
let eficiencia=[]
let ganancia = 0
let gananciaDiaria=0
let totalAlimento=0
let costoTotal=0
let totalVenta = 0
let margen = 0
let eficienciaConversion = 0
function populate (props,detailIcon){
  rows=[]
  props.data.map(item=>{
    ganancia=item.p_actual - item.p_inicial
    gananciaDiaria=ganancia/item.dias
    totalAlimento=item.costo_alimento*item.vol_alimento * item.dias
    costoTotal= totalAlimento + item.veterinaria + item.otros+item.precio_compra
    console.log(costoTotal)
    totalVenta = item.p_actual * item.precio_venta
    eficienciaConversion=item.vol_alimento / gananciaDiaria
    animalDetails = [{raza:item.raza,sexo:item.sexo, frame:item.frame, p_inicial:item.p_inicial, p_actual:item.p_actual, ganancia:ganancia}]
    costsDetails = [{precio_compra:item.precio_compra, total_alimento:totalAlimento, veterinaria:item.veterinaria, otros:item.otros, cost_total:costoTotal}]
    ventaDetails = [{num_venta:item.num_venta, comprador:item.comprador,consingnatario:item.consignatario, precio_venta:item.precio_venta, total_venta:totalVenta}]
    margen=totalVenta - costoTotal
    eficiencia = [{dias:item.dias, ganancia_diaria:gananciaDiaria, vol_alimento:item.vol_alimento, eficiencia_conversion:eficienciaConversion}]
    rows.push(
      createData(
      item.cug,
      item.num_manejo,
      item.verificador,
      item.ingreso,
      item.egreso,
      item.estado,
      margen,
      animalDetails,
      costsDetails,
      ventaDetails,
      eficiencia
      ))
  })
}

export default function CollapsibleTable(props) { 

  populate(props)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{backgroundColor:"black"}}>
            <TableCell />
            <TableCell style={{color:"white",}} >CUG</TableCell>
            <TableCell style={{color:"white",}} align="center">Nº Manejo</TableCell>
            <TableCell style={{color:"white",}} align="center">Verificador</TableCell>
            <TableCell style={{color:"white",}} align="center">Fecha Ingreso</TableCell>
            <TableCell style={{color:"white",}} align="center">Fecha Egreso</TableCell>
            <TableCell style={{color:"white",}} align="center">Estado</TableCell>
            <TableCell style={{color:"white",}} align="center">Margen Bruto</TableCell>         
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
