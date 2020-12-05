import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Select, FormControl,MenuItem, IconButton} from '@material-ui/core';
//-----------------------------Dialog Imports-------------------------------------------------------------------------
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//------------------------------MaterialUI Table Imports-------------------------------------------------------------------
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
//----------------------------------------------------------------------------------------------
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// import {connect} from 'react-redux';

//------------------------------Table Functions-------------------------------------------------------------------
let rows=[]
let query=[]


const columns = [
  {id: 'index', label: 'Index', minWidth: 50 },
  {id: 'caravana', label: 'Caravana', minWidth: 100 },
  {id: 'pesoActual', label: 'Peso Actual', minWidth: 50,align: 'right'},
  {id: 'fechaPesaje',label: 'Fecha Pesaje',minWidth: 50,align: 'right'},
  {id: 'editar',label: 'Editar Peso',minWidth: 50, align: 'right',},
];

function createData(index,caravana, pesoActual, fechaPesaje,editar) {
  return {index,caravana, pesoActual, fechaPesaje,editar};
}


//------------------------------Table Functions-------------------------------------------------------------------

//ESTILOS DE MATERIAL UI
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:"space-around"
    },
    formControl: {
        margin: theme.spacing(1),
        maxWidth: "100%",
        minWidth:"100%"
      },

    background:{
      color:theme.palette.background.default
    }
  }));

export function Pesaje(props) {
    const classes = useStyles()

    useEffect(()=>{
      setNewPromedio(false)
      setCaravanaSelect(false)
      getInfo()
      
    },[props.currentRodeo.id])

    const [newPromedio, setNewPromedio] = useState("")
    const [caravanaSelect,setCaravanaSelect]=useState("")
    const [pesoPromedio, setPesoPromedio]=useState("")
    const [newPesoPromedio, setNewPesoPromedio]=useState({nuevoPromedio:"", fechaPesaje:""})
    const [open, setOpen] = React.useState(false);
    const [queryIndex, setQueryIndex]=useState(0)
    const [newDatos, setNewDatos]=useState({pesoCaravana:'',fechaPesaje:''})
 
    const getInfo = function(){
      query=[]
      Axios.get('http://localhost:3001/rodeo/caravanas/'+props.currentRodeo.id)
      .then(res=>{
        let suma = 0
        let promedio = 0 
        res.data.map(item=>{
          query.push(item)
          suma=suma+parseInt(item.peso_actual)
        })
        promedio=(suma/query.length).toFixed(2)
        setPesoPromedio(promedio)
      })
    }


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


    function populate(data){
      console.log(data)
      rows =[]
      data.map(item=>{
        if(rows.includes(item)===false){
          rows.unshift(
            createData(
            data.indexOf(item),
            item.caravana,
            item.peso_actual,
            item.fecha_pesaje,
            <IconButton variant="outlined" color="secondary" onClick={()=>handleClickOpen(data.indexOf(item))}>
              <EditIcon color="black" />
            </IconButton>,
          
            ))
          }  
        })
      } 
// ---------------------------------------------------------------------------------------------------------

    const handleNewPromedio = function(e) {
        setNewPromedio(true)
        setCaravanaSelect(false)
      }

      const handleCaravanaSelect = function(e) {
        setCaravanaSelect(true)
        setNewPromedio(false)
        populate(query)
      }

      const handleNewPeso = function (e){
        setNewPesoPromedio({
          ...newPesoPromedio,
          [e.target.name]:e.target.value
        })
      }

      const handlePromedioAccept = function(e){
        Axios.put('http://localhost:3001/rodeo/caravanas/peso_promedio/'+props.rodeoId,newPesoPromedio)
        .then(res=>{
          alert('Peso promedio modificado con exito')
        })
      }

      const handleClickOpen = (index) => {
        setOpen(true);
        setQueryIndex(index)
      };

      const handleEditPeso=(e)=>{
        setNewDatos({
          ...newDatos,
          [e.target.name]:e.target.value
        })
      }

      const handleAcceptPeso=async(e)=>{
        let suma = 0
        let promedio = 0 
        query[queryIndex].fecha_pesaje=newDatos.fechaPesaje
        query[queryIndex].peso_actual=newDatos.pesoCaravana
        console.log(query[queryIndex])
        populate(query)
        query.map(item=>{
          suma=suma+parseInt(item.peso_actual)
          promedio=(suma/query.length).toFixed(2)
          setPesoPromedio(promedio)
        })
        console.log(newDatos)
        await Axios.put('http://localhost:3001/rodeo/caravanas/'+query[queryIndex].caravana,newDatos)
        .then(res=>{
          if (res.status===200){
          return  alert("Caravana "+query[queryIndex].caravana+" modificada con exito")
          }
          alert("Error al modificar datos")
        })
          setOpen(false)
      }
    
      const handleClose = () => {
        setOpen(false);
      };
    return (
     
          <Container component="main" maxWidth='lg'  >
          <div >
          <CssBaseline />
            <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            >
              <Grid item xs={12}>
                  <Grid className={classes.container}> 
                   <Typography component="h1" variant="h5">
                        Peso Promedio del Rodeo {props.currentRodeo.nombre}:{pesoPromedio} Kg.
                    </Typography>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button  
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e)=>handleNewPromedio(e)}
                            >
                            Asignar Peso Promedio al Lote
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button  
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e)=>handleCaravanaSelect(e)}
                            >
                            Asignar Peso a Caravana/s
                        </Button>
                    </Grid>
                  </Grid>
              </Grid>
              <Grid>
              {newPromedio ? 
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography component="h1" variant="h6">
                          Nuevo Promedio :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="nuevoPromedio"
                          label="Kg"
                          name="nuevoPromedio"
                          onChange={(e)=>handleNewPeso(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography component="h1" variant="h6">
                          Fecha Pesaje :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField
                          autoComplete="pesaje"
                          name="fechaPesaje"
                          variant="outlined"
                          required
                          fullWidth
                          id="fechaPesaje"
                          label="Fecha Pesaje"
                          type="date"
                          InputLabelProps={{
                                              shrink: true,
                                            }}
                          autoFocus
                          onChange={(e) => handleNewPeso(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}>
                        <Button  
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e)=>handlePromedioAccept(e)}
                            >
                            Aceptar
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button  
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            // onClick={(e)=>handleCaravanaSelect(e)}
                            >
                            Cancelar
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                  </Grid>:null}
                  {caravanaSelect ?    
                  <Paper className={classes.root}>
                  <TableContainer className={classes.tableContainer}>
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
                </Paper>:null} 
              </Grid>
            </Grid>
            </div>
            <div>
              <Dialog 
              open={open} 
              onClose={handleClose} 
              aria-labelledby="form-dialog-title"
              maxWidth='sm'
              fullWidth
              
               >
                <DialogTitle id="form-dialog-title" style={{backgroundColor:'#66bb6a'}} >Editar Peso</DialogTitle>
                <DialogContent style={{backgroundColor:'#66bb6a'}}>
                  <DialogContentText>
                    Ingrese nuevo peso y fecha de pesaje.
                  </DialogContentText>
                  
                  <Grid container direction='row' justify='space-around'>
                    <Grid item xs={12} sm={5}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="pesoCaravana"
                      name='pesoCaravana'
                      label="Peso(Kg)"
                      onChange={(e)=>handleEditPeso(e)}
                      fullWidth
                    />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                    <TextField
                          autoComplete="pesaje"
                          name="fechaPesaje"
                          variant="outlined"
                          required
                          fullWidth
                          id="fechaPesaje"
                          name="fechaPesaje"
                          label="Fecha Pesaje"
                          type="date"
                          InputLabelProps={{
                                              shrink: true,
                                            }}
                          onChange={(e)=>handleEditPeso(e)}
                        />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions style={{backgroundColor:'#66bb6a'}} >
                  <Button 
                  onClick={handleClose} 
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                    Cancel
                  </Button>
                  <Button onClick={()=>handleAcceptPeso()}                  
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                    Aceptar
                  </Button>
                </DialogActions>
              </Dialog>
            </div>  
          </Container> 
      )
 }

 const mapStateToProps = state => {		
  return {		
    establecimientos:state.rodeo.establecimientos,
    rodeos:state.rodeo.rodeos,
    currentRodeo:state.rodeo.currentRodeo,
    currentEstablecimiento:state.rodeo.currentEstablecimiento
  }		
}

export default connect(mapStateToProps)(Pesaje);  

