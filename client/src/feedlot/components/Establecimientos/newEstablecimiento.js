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
import {rodeoInicial} from './initialState'
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


let rodeoArray=[]
//------------------------------Table Functions-------------------------------------------------------------------
let rows=[]

const columns = [
  {id: 'index', label: 'Index', minWidth: 50 },
  {id: 'nombre', label: 'Nombre', minWidth: 100 },
  {id: 'categoria', label: 'categoria', minWidth: 50,align: 'right'},
  {id: 'peso_min', label: 'Peso Minimo(kg)', minWidth: 50,align: 'center'},
  {id: 'peso_max', label: 'Peso Maximo(kg)', minWidth: 50,align: 'center'},
  {id: 'editar',label: 'Editar',minWidth: 50, align: 'right',},
  {id: 'eliminar',label: 'Eliminar',minWidth: 50, align: 'right', },
];

function createData(index,nombre, categoria,peso_min,peso_max, editar ,eliminar) {
  return {index,nombre, categoria,peso_min,peso_max, editar ,eliminar};
}


//-------------------------------------------------------------------------------------------------------------------

//ESTILOS DE MATERIAL UI
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:"space-around",
      width:"100%"
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
    useEffect(()=>{
      getCategories()
    },[])
  
    const classes = useStyles()
    
    const [establecimiento, setEstablecimiento] = useState({})
    const [establecimientoId, setEstablecimientoId] = useState("")
    const [rodeo, setRodeo] = useState(rodeoInicial)
    const [categoria,setCategoria]=useState("")
    const [catArray, setCatArray]=useState([])
    const [ifTable, setIfTable]=useState(false)
    const [ifNewCategoria, setIfNewCategoria]=useState(false)
    const [terminacion, setTerminacion]=useState(false)

    

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

      const handleBorrar = function(){
        setRodeo("")
        window.location.reload()
      }

      const saveRodeo = function (){
        console.log(catArray)
        let data={}
        data.nombre=rodeo.rodeo_nombre
        data.categoria=rodeo.categoria
        catArray.map(item=>{
          if(item.id===rodeo.categoria){
            data.category_name=item.nombre
            data.peso_min=item.peso_min
            data.peso_max=item.peso_max
            data.terminacion=item.terminacion
          }
        })       
        rodeoArray.push(data)
        populate(rodeoArray)
        setRodeo(rodeoInicial)
        setIfTable(true)

        console.log(rodeoArray)

      }
        
      const newCategoryToggle = function(){
        setIfNewCategoria(true)
      }

      const handleCategoria = function(e) {
        setCategoria({
          ...categoria,
          [e.target.name]:e.target.value
        })
        console.log(categoria)
      }

      const handleTerminacion = async function(e) {
        setTerminacion(e.target.checked)
      }
      console.log(terminacion)

      const newCategory = function(e){
        e.preventDefault()
        let data = {
          nombre:categoria.categoria_nombre,
          peso_min:categoria.p_min,
          peso_max:categoria.p_max,
          terminacion:terminacion,
          userCuit:props.user.cuit
        }
        console.log(data)
        Axios.post('http://localhost:3001/categoria',data)
        .then( async res=>{
             await alert("Categoria "+ data.nombre + " creada")
             getCategories()
             setCategoria("")
             setTerminacion(false)
             window.location.reload()
        })
        .catch(err =>{
          alert("Error en la base de datos, intente nuevamente")
        })
       
    }

      const categoryCancel = function(e){
          setCategoria("")
          setIfNewCategoria(false)
          
      }

      const cancelFunc = function(e){
        e.preventDefault()
        setEstablecimiento("")
        setRodeo({})
        rodeoArray=[]
        setIfTable(false)
    }

      const saveFunc = async function(e){
          e.preventDefault()
          let data={
            nombre_establecimiento:establecimiento.nombre,
            establecimiento_cp:establecimiento.cp,
            userCuit:props.user.cuit,
            rodeoArray:rodeoArray  
          }

          await Axios.post('http://localhost:3001/establecimiento',data)
          .then( res=>{
            alert(res.data)
          })
          .catch(err =>{
            alert("Error en la base de datos, intente nuevamente")
          })
          window.location.reload()
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
       setRodeo({
        rodeo_nombre:rodeoArray[index].nombre,
        categoria:rodeoArray[index].cetegoria,
      })
     rodeoArray.splice(index,1)  
    }

    const handleDelete = (index) =>{ 
      alert("Se eliminara de la lista el rodeo en la posicion "+index)
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
            item.nombre,
            item.category_name,
            item.peso_min,
            item.peso_max,
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
    //------------------------------Get Categories Function-------------------------------------------------------------------
 
function getCategories(){
  
  Axios.get('http://localhost:3001/categoria/'+props.user.cuit)
  .then(res=>{
      setCatArray(res.data)
  })
  .catch(err =>{
    alert("Error en la base de datos, intente nuevamente")
  })

}  

 
    return (
        <React.Fragment>
          <CssBaseline />
          <Container className={classes.container} >
          
          {!ifNewCategoria?
          <Grid 
          container
          direction="row"
          justify="space-around"
          alignItems="center">
            <form className={classes.form} noValidate><hr></hr>
            
                <Grid className={classes.container}> 
                    <Typography component="h1" variant="h4">
                    Nuevo Establecimiento
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                  <FormControl variant="filled" className={classes.formControl}>
                  <label>Nombre:</label>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="nombre"
                          name="nombre"
                          onChange={(e)=>handleEstablecimiento(e)}
                      />
                  </FormControl>  
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <FormControl variant="filled" className={classes.formControl}>
                  <label>Codigo Postal:</label>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="cp"
                          name="cp"
                          onChange={(e)=>handleEstablecimiento(e)}
                      />
                    </FormControl>  
                  </Grid>
                </Grid>
                <Grid className={classes.container}> 
                  <Typography component="h1" variant="h5">
                  Agregar Rodeos
                  </Typography>
                </Grid>
                <Grid container spacing={2}
                direction="row"
                // justify="space-around"
                alignItems='center'>
                    <Grid item xs={12} sm={8}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <label>Nombre:</label>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="rodeo_nombre"
                          name="rodeo_nombre"
                          value={rodeo.rodeo_nombre}                         
                          onChange={(e)=>handleRodeo(e)}
                          />
                       </FormControl>   
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl variant="filled" className={classes.formControl}>
                        <label>categoria:</label>
                            <Select
                                labelId="label"
                                id="demo-simple-select-outlined"
                                name="categoria"
                                value={rodeo.categoria}
                                onChange={(e)=>handleRodeo(e)}
                                label="categoria"
                                displayEmpty
                                >
                                  <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                                  {catArray.map(item =>{
                                            return <MenuItem value={item.id}>{item.nombre}</MenuItem>
                                        })}
                            </Select>
                        </FormControl>
                    </Grid>
            
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}>
                      <Button                        
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>newCategoryToggle(e)} >
                        Nueva Categoria
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <Button                        
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>handleBorrar(e)} 
                        >
                        Borrar
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <Button                        
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>saveRodeo(e)} 
                        >
                        Agregar Rodeo
                      </Button>
                    </Grid>
                </Grid>
                
            </form>
          </Grid>
          :
          <Grid
           container
           direction="row"
           justify="space-around"
           alignItems="center"
           width="70%">
            <form className={classes.form} noValidate>
                <Grid className={classes.container}> 
                    <Typography component="h1" variant="h5">
                    Nueva Categoria
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}></Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl variant="filled" className={classes.formControl}>
                    <label>Nombre:</label>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="categoria_nombre"
                            name="categoria_nombre"
                            onChange={(e)=>handleCategoria(e)}
                        />
                    </FormControl>  
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    <FormControl variant="filled" className={classes.formControl}>
                    <label>Peso Minimo</label>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="p_min"
                            name="p_min"
                            onChange={(e)=>handleCategoria(e)}
                        />
                    </FormControl>  
                    </Grid>
         
                    <Grid item xs={12} sm={2}>
                    <FormControl variant="filled" className={classes.formControl}>
                    <label>Peso Maximo</label>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="p_max"
                            name="p_max"
                            onChange={(e)=>handleCategoria(e)}
                        />
                    </FormControl>

                    </Grid>
                    <Grid item xs={12} sm={2}></Grid>

                    <Grid item xs={12} sm={2}></Grid>
                    <Grid item item xs={12} sm={2}>
                    <FormControlLabel
                        control={<Switch color="primary" />}
                        label="Terminacion"
                        value="on"
                        onChange={(e)=>handleTerminacion(e)}
                        />
                    </Grid>  
                    <Grid item xs={12} sm={3}>
                      <Button                        
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>categoryCancel(e)} >
                        Cancelar
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button                        
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>newCategory(e)} >
                        Guardar
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={2}></Grid>
                </Grid>
            </form>
           </Grid>
          }
          <Grid container spacing={2} >
          <Grid item xs={12} sm={12}></Grid>
          <hr></hr><hr></hr>  
          </Grid>
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

                        <hr></hr>
               { ifTable? <Grid 
                container
                direction="row"
                justify='space-evenly'
                alignContent='center'
                alignItems="center">
                <Grid container spacing={2} >
                <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}>
                    <Button                        
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>cancelFunc(e)} 
                        >
                        Cancelar
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <Button                        
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>saveFunc(e)} 
                        >
                        Guardar Establecimiento
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    </Grid>
                    </Grid>
                    :null}
            
         
          </Container>
        </React.Fragment>
    
      )
 
 }

const mapStateToProps = state => {
  return{user:state.user.user}				
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