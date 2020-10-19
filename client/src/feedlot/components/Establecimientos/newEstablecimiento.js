import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {Select, FormControl,MenuItem, IconButton} from '@material-ui/core'

import {connect} from 'react-redux';
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

//------------------------------Table Functions-------------------------------------------------------------------
let rows=[]

const columns = [
  {id: 'index', label: 'Index', minWidth: 50 },
  {id: 'nombre', label: 'Nombre', minWidth: 100 },
  {id: 'categoria', label: 'categoria', minWidth: 50,align: 'right'},
  {id: 'editar',label: 'Editar',minWidth: 50, align: 'right',},
  {id: 'eliminar',label: 'Eliminar',minWidth: 50, align: 'right', },
];

function createData(index,nombre, categoria, editar ,eliminar) {
  return {index,nombre, categoria, editar ,eliminar};
}


//------------------------------Table Functions-------------------------------------------------------------------


//ESTILOS DE MATERIAL UI
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:"space-around",
      width:"70%"
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

export function NuevoEstablecimiento(props) {
    const classes = useStyles()

    const [establecimiento, setEstablecimiento] = useState({})
    const [rodeo, setRodeo] = useState({})
    const [categoria,setCategoria]=useState(true)
    const [rodeoDetail, setRodeoDetail]=useState()
    const [rodeoArray, setRodeoArray] = useState()
    const [ifTable, setIfTable]=useState(false)
    const [ifNewCategoria, setIfNewCategoria]=useState(false)

    const handleEstablecimiento = function(e) {
        setEstablecimiento({
          ...establecimiento,
          [e.target.name]:e.target.value
        })
        console.log(establecimiento)
      }

      const handleRodeo = function(e) {
        setRodeo({
          ...rodeo,
          [e.target.name]:e.target.value
        })
        console.log(rodeo)
      }

      const handleCategoria = function(e) {
        setRodeo({
          ...rodeo,
          [e.target.name]:e.target.value
        })
        console.log(categoria)
      }

      const newCategory = function(e){
        e.preventDefault()
    }

      const cancelFunc = function(e){
          e.preventDefault()
      }

      const continueFunc = function(e){
          e.preventDefault()
          
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

    const handleEdit = (index) =>{
    //   setRodeoDetail({
    // //     cug:animalArray[index].cug,
    // //     manejo:animalArray[index].manejo,
    // //   })
    // // animalArray.splice(index,1)  
    }

    const handleDelete = (index) =>{ 
      alert("Se eliminara de la lista la caravana en la posición "+index)
      rodeoArray.splice(index,1)
      setIfTable(false)
      rows=[]
      if(rodeoArray.length>0){
        populate(rodeoArray)
        alert("Se eliminó el registro") 
        setIfTable(true)
      }
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
            item.frame,
            item.establecimientoId,
            item.rodeoId,
            <IconButton onClick={()=>handleEdit(data.indexOf(item))}>
              <EditIcon color="secundary" />
            </IconButton>,
            <IconButton onClick={()=>handleDelete(data.indexOf(item))}>
              <DeleteIcon color="secundary" />
            </IconButton>
          
            ))
          }  
        })
      } 

 
    return (

        <React.Fragment>
          <CssBaseline />
          <Container className={classes.container}  >
          <Grid
           container
           direction="row"
           justify="space-around"
           alignItems="center"
           pa>
            <Grid >
            <form className={classes.form} noValidate>
                <Grid className={classes.container}> 
                    <Typography component="h1" variant="h5">
                    Nuevo Establecimiento
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="nombre"
                        label="Nombre"
                        name="nombre"
                        onChange={(e)=>handleEstablecimiento(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="cp"
                        label="Cod. Postal Establecimiento"
                        name="cp"
                        onChange={(e)=>handleEstablecimiento(e)}
                    />
                    </Grid>
                <Grid className={classes.container}> 
                  <Typography component="h1" variant="h5">
                  Agregar Rodeos
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="rodeo_nombre"
                          label="Nombre"
                          name="rodeo_nombre"
                          onChange={(e)=>handleRodeo(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl variant="filled" className={classes.formControl}>
                        <label>categoria:</label>
                            <Select
                                labelId="label"
                                id="demo-simple-select-outlined"
                                name="categoria"
                                onChange={handleRodeo}
                                label="categoria"
                                displayEmpty
                                >
                                  <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                                {/* {rodeo.map(item =>{
                                    return <MenuItem value={item.nombre}>{item.nombre}</MenuItem>
                                })} */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button                        
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>newCategory(e)} >
                        Crear Nueva Categoria
                      </Button>
                    </Grid>
                  </Grid>
              <Grid container spacing={2}>

                <Grid className={classes.container}> 
                  <Typography component="h1" variant="h5">
                  Crear Nueva Categoria
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="categoria_nombre"
                          label="Nombre"
                          name="categoria_nombre"
                          onChange={(e)=>handleCategoria(e)}
                      />  
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="p_min"
                          label="Peso Mínimo"
                          name="p_min"
                          onChange={(e)=>handleCategoria(e)}
                      />  
                  </Grid>
                  <Grid item xs={12} sm={3}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="p_max"
                          label="Peso Máximo"
                          name="p_max"
                          onChange={(e)=>handleCategoria(e)}
                      />  
                  </Grid>
                  <Grid item xs={12} sm={7}></Grid>
                  <Grid item item xs={12} sm={2}>
                    <FormControlLabel
                        control={<Switch color="primary" />}
                        label="Terminación"
                        value={true}
                        onChange={(e)=>handleCategoria(e)}
                        />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button                        
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>newCategory(e)} >
                        Guardar Categoria
                    </Button>
                </Grid>

              </Grid>

                
{/* //-------------------------MaterialUI-Table---------------------------------------------------------------------- */}

            {ifTable?    <Paper className={classes.root}>
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

{/* //-------------------------MaterialUI-Table---------------------------------------------------------------------- */}

                 </Grid>
                </Grid>               
                  <Grid container spacing={2} >
                    <Grid item xs={12} sm={6}></Grid>
                        <Grid item xs={12} sm={3}>
                            <Button   
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>cancelFunc(e)} >
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>continueFunc(e)} >
                                Guardar
                            </Button>
                    </Grid>
                </Grid>
                    
            </form>
           </Grid>
          </Grid>
     
          </Container>
        </React.Fragment>
    
      )
 
 }

const mapStateToProps = state => {
  return{user:state.user}				
}

const mapDispatchToProps = dispatch => {

}
    
export function validateVendor(vendedor) {
  let errors = {};
if(vendedor.vendor_razon_social===""){
  errors.vendor_razon_social= "Por favor introduzca la razón social del vendedor"

}else if(vendedor.vendor_addressFiscal===""){
  errors.vendor_addressFiscal= "Por favor introduzca la dirección fiscal del vendedor"

}else if(vendedor.vendor_cp===""){
  errors.vendor_cp= "Por favor introduzca el Cód Postal del Vendedor"

  if (!vendedor.vendor_email) {
    errors.vendor_email = 'Por favor introduzca el email del vendedor';
  } else if (!/\S+@\S+\.\S+/.test(vendedor.vendor_email)) {
    errors.vendor_email = 'El email del vendedor es invalido'
  }

}else if(vendedor.vendor_celular===""){
  errors.vendor_celular= "Por favor introduzca el número del telefono celular del vendedor"

}
  return errors;
};

export function validateConsignatario(consignatario) {
    let errors = {};
  if(consignatario.razon_social===""){
    errors.razon_social= "Por favor introduzca la razón social del consignatario"
  
}else if(consignatario.cuit===""){
    errors.cuit= "Por favor introduzca el CUIT del consignatario"


  }else if(consignatario.addressFiscal===""){
    errors.addressFiscal= "Por favor introduzca la dirección fiscal del consignatario"
  
  }else if(consignatario.cp===""){
    errors.cp= "Por favor introduzca el Cód Postal del consignatario"
  
    if (!consignatario.email) {
      errors.email = 'Por favor introduzca el email del consignatario';
    } else if (!/\S+@\S+\.\S+/.test(consignatario.email)) {
      errors.email = 'El email del consignatario es invalido'
    }
  
  }else if(consignatario.celular===""){
    errors.celular= "Por favor introduzca el número del telefono celular del consignatario"
  
  }
    return errors;
  };

export default connect(mapStateToProps, mapDispatchToProps)(NuevoEstablecimiento);