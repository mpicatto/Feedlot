import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {setList,clearList,setTableAll, setTable,selectAll,deselectAll} from '../../../actions/ventas'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
//-------------------TABLE IMPORTS---------------------------------------------------------
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';


//------------------------------Table Functions-------------------------------------------------------------------
let rows=[]
let caravanArray=[]

const columns = [
  {id: 'index', label: 'Index', minWidth: 50 },
  {id: 'caravana', label: 'Caravana', minWidth: 100 },
  {id: 'raza', label: 'Raza', minWidth: 50,align: 'right'},
  {id: 'peso',label: 'Peso(kg)',minWidth: 50,align: 'right'},
  {id: 'select',label: 'Seleccionar',minWidth: 50, align: 'right',},
];

function createData(index,caravana, raza, sexo,peso, select) {
  return {index,caravana, raza, sexo,peso, select};
}


//------------------------------Table Functions-------------------------------------------------------------------


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:"space-around"
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export function StickyHeadTable(props) {
  const classes = useStyles()
  useEffect(()=>{
    clearArray()
    props.clearList()
    setData(props.caravanas)
    handleSelectAll(data)
  },[props.caravanas,])

const [data, setData]=useState(props.caravanas)
const [checked, setChecked]=useState(true)

//-------------function to add data to table-----------------------------------
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

const handleSelect = (index) =>{  
let array = caravanArray
let flag = true
array.forEach((item,i)=>{
  if(item.caravana==props.caravanas[index].caravana){
    array.splice(i,1)
    flag=false
    props.setList(array.length)
    return
  }
})
  if(flag){		
    caravanArray.push(props.caravanas[index])
    props.setList(caravanArray.length)	
  }	
  console.log(caravanArray)
}

const clearArray = ()=>{
  caravanArray=[]
}

const handleSelectAll= (data) =>{
// props.setTable(false)
// props.setTableAll(true)
  data.map(item=>{
    caravanArray.push(item)
  })
  props.setList(caravanArray.length)
}

const crearOrden = function(){

}


function populate(data){
  rows =[]
  data.map(item=>{
    if(rows.includes(item)===false){
      rows.unshift(
        createData(
        data.indexOf(item),
        item.caravana,
        item.raza,
        item.sexo,
        item.peso_actual,
          <Checkbox color="secundary" checked={checked} onChange= {()=>handleSelect(data.indexOf(item))} />,
        ))
      }  
    })
  }


  populate(data)

  return (
  <React.Fragment>
    <CssBaseline />
    <Container className={classes.container}>
      <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      >
        <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Typography component="p"  align='right'>
        {props.lista}/{props.caravanas.length} seleccionadas
      </Typography>
    </Paper>
    <Grid container spacing={2} >
    <Grid item xs={12} sm={2}></Grid>      
        <Grid item xs={12} sm={4}>
          <Button 
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e)=>handleSelectAll(e)} >
              Seleccionar Todo 
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button 
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e)=>crearOrden(e)} >
              Crear Orden 
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}></Grid>  
      </Grid> 
    </Grid>
    </Container>
  </React.Fragment>

  );
}

const mapStateToProps = state => {		
  return{
    caravanas:state.ventas.array,
    lista:state.ventas.list,
    table1:state.ventas.table1,
    table2:state.ventas.table2,
    selected:state.ventas.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
  setList:(array)=>dispatch(setList(array)),
  clearList:()=>dispatch(clearList()),
  setTable:(status)=>dispatch(setTable(status)),
  setTableAll:(status)=>dispatch(setTableAll(status)),
  selectAll:(array)=>dispatch(selectAll(array)),
  deselectAll:()=>dispatch(deselectAll())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(StickyHeadTable);