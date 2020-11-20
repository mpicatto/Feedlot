import React,{useState,useEffect} from 'react';
import Axios from 'axios';
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
import {connect} from 'react-redux';

//------------------------------Table Functions-------------------------------------------------------------------
let rows=[]
let query=[]
let establecimiento=""
let rodeo=""
let pesoMin=""
let pesoMax=""
let currentCat=""



const columns = [
  {id: 'index', label: 'Index', minWidth: 50 },
  {id: 'caravana', label: 'Caravana', minWidth: 100 },
  {id: 'pesoActual', label: 'Peso Actual', minWidth: 50,align: 'right'},
  {id: 'establecimiento',label: 'Establecimiento',minWidth: 50,align: 'right'},
  {id: 'rodeo',label: 'Rodeo',minWidth: 50,align: 'right'},
  {id: 'editar',label: 'Mover a',minWidth: 50, align: 'right',},
];

function createData(index,caravana, pesoActual,establecimiento,rodeo,editar) {
  return {index,caravana, pesoActual,establecimiento,rodeo,editar};
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

export function Movimientos(props) {
    const classes = useStyles()

    useEffect(()=>{
      setMoveTo(false)
      setCaravanaSelect(false)
      getInfo()
      parametroCategoria()
    },[])

    const [moveTo, setMoveTo] = useState("")
    const [caravanaSelect,setCaravanaSelect]=useState("")
    const [pesoPromedio, setPesoPromedio]=useState("")
    const [newRodeo, setNewRodeo]=useState({nuevoEstablecimiento:"", nuevoRodeo:""})
    const [open, setOpen] = React.useState(false);
    const [queryIndex, setQueryIndex]=useState(0)
    const [newDatos, setNewDatos]=useState({pesoCaravana:'',fechaPesaje:''})
    const [sobrePeso, setSobrePeso]=useState(false)
    const [bajoPeso, setBajoPeso]=useState(false)

 
    const getInfo = function(){
      query=[]
      Axios.get('http://localhost:3001/rodeo/caravanas/'+props.rodeoId)
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

    const parametroCategoria = function(){
      let rodeoCat
      props.rodeos.map(rodeos=>{
        if(rodeos.id==props.rodeoId){
          rodeoCat=rodeos.categoriumId
         }
      })
      props.categorias.map(cat=>{
        if(cat.id==rodeoCat){
          currentCat=cat.nombre
          pesoMin=cat.peso_min
          pesoMax=cat.peso_max
         }
      })
      if (pesoPromedio>pesoMax){
        setSobrePeso(true)
      }
      if (pesoPromedio<pesoMin){
        setBajoPeso(true)
      }
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
        props.rodeos.map(rodeos=>{
          if(rodeos.id==item.rodeoId){
           rodeo=rodeos.nombre
          }
        })
        props.establecimientos.map(establecimientos=>{
          if (item.establecimientoId==establecimientos.id){
            establecimiento=establecimientos.nombre
          }
        })  

        if(rows.includes(item)===false){
          rows.unshift(
            createData(
            data.indexOf(item),
            item.caravana,
            item.peso_actual,
            establecimiento,
            rodeo,
            <IconButton variant="outlined" color="secondary" onClick={()=>handleClickOpen(data.indexOf(item))}>
              <EditIcon color="black" />
            </IconButton>,
          
            ))
          }  
        })
      } 
// ---------------------------------------------------------------------------------------------------------

    const handleMoveTo = function(e) {
        setMoveTo(true)
        setCaravanaSelect(false)
      }

      const handleCaravanaSelect = function(e) {
        setCaravanaSelect(true)
        setMoveTo(false)
        populate(query)
      }

      const handleMove = function (e){
        setNewRodeo({
          ...newRodeo,
          [e.target.name]:e.target.value
        })
        console.log(newRodeo)
      }

      const handleMoveAllAccept = async function(e){
        console.log(newRodeo)
        let category
        let categoryMin
        let categoryMax
        props.rodeos.map(item=>{
          if (item.id===newRodeo.nuevoRodeo){
            category=item.categoriumId
          }
        })
        console.log(category)
        props.categorias.map(cat=>{
          if(cat.id==category){
            categoryMin=cat.peso_min
            categoryMax=cat.peso_max
          }
        })
        console.log(categoryMin)
        console.log(categoryMax)
        if (categoryMin<=pesoPromedio&&categoryMax>pesoPromedio){
        await Axios.put('http://localhost:3001/rodeo/caravanas/move_to/'+props.rodeoId,newRodeo)
        .then(res=>{
          alert('Peso promedio modificado con exito')
        })
        return
        }
        return alert("El peso promedio de los animales no se ajusta a los parametros de la categoria del rodeo de destino.\nPeso minimo: "+categoryMin+"Kg.\nPeso maximo: "+categoryMax+"Kg.\nPor favor seleccione otro rodeo de destino")
      }

      const handleCancel=()=>{
        setMoveTo(false)
      }

      const handleClickOpen = (index) => {
        setOpen(true);
        setQueryIndex(index)
      };

      const handleAcceptMove=async(e)=>{
        let category
        let categoryMin
        let categoryMax
        props.rodeos.map(item=>{
          if (item.id===newRodeo.nuevoRodeo){
            category=item.categoriumId
          }
        })
        console.log(category)
        props.categorias.map(cat=>{
          if(cat.id==category){
            categoryMin=cat.peso_min
            categoryMax=cat.peso_max
          }
        })
        console.log(categoryMin)
        console.log(categoryMax)
        
        if (categoryMin<=query[queryIndex].peso_actual&&categoryMax>query[queryIndex].peso_actual){
          query[queryIndex].establecimientoId=newRodeo.nuevoEstablecimiento
          query[queryIndex].rodeoId=newRodeo.nuevoRodeo
          console.log(query[queryIndex])
          populate(query)
  
          await Axios.put('http://localhost:3001/rodeo/move/caravanas/'+query[queryIndex].caravana,newRodeo)
          .then(res=>{
            if (res.status===200){
            return  alert("Caravana "+query[queryIndex].caravana+" modificada con exito")
            }
            alert("Error al modificar datos")
          })
          setOpen(false)
          return
        }
          alert("El peso promedio de los animales no se ajusta a los parametros de la categoria del rodeo de destino.\nPeso minimo: "+categoryMin+"Kg.\nPeso maximo: "+categoryMax+"Kg.\nPor favor seleccione otro rodeo de destino")
          setOpen(false)
          return
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
                        Peso Promedio del Rodeo {props.rodeo}:{pesoPromedio} Kg.
                    </Typography>
                  </Grid>
                  {sobrePeso ? 
                    <Grid className={classes.container} direction="column" justify="center"> 
                   <Typography component="h1" variant="h5">
                        Peso Promedio del Rodeo supera el peso maximo:{pesoMax} Kg.
                    </Typography>
                    <Typography component="h1" variant="h5">
                        Mover los animales a Rodeo con categoria de mayor peso
                    </Typography>
                  </Grid>
                  :null}

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button  
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e)=>handleMoveTo(e)}
                            >
                            Mover Todos 
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
                            Mover Caravana/s
                        </Button>
                    </Grid>
                  </Grid>
              </Grid>
              <Grid>
              {moveTo ? 
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography component="h1" variant="h6">
                          Mover a :
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <label>Establecimiento:</label>
                            <Select
                                labelId="label"
                                id="nuevoEstablecimiento"
                                name="nuevoEstablecimiento"
                                onChange={(e)=>handleMove(e)}
                                label="Rodeo"
                                displayEmpty
                                >
                                  <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                                {props.establecimientos.map(item =>{
                                    return <MenuItem value={item.id}>{item.nombre}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={2}>

                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <label>Rodeo:</label>
                            <Select
                                labelId="label"
                                id="nuevoRodeo"
                                name="nuevoRodeo"
                                // value={rodeo}
                                onChange={(e)=>handleMove(e)}
                                label="Rodeo"
                                displayEmpty
                                >
                                  <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                                {props.rodeos.map(item =>{
                                    return <MenuItem value={item.id}>{item.nombre}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={3}>
                        <Button  
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e)=>handleMoveAllAccept(e)}
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
                            onClick={(e)=>handleCancel(e)}
                            >
                            Cancelar
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                  </Grid>:null}
{/* -----------------------------Comienza Tabla de Caravanas----------------------------------------------------------------- */}
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
{/* -----------------------------Termina Tabla de Caravanas----------------------------------------------------------------- */}

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
                <DialogTitle id="form-dialog-title" style={{backgroundColor:'#66bb6a'}} >Mover a...</DialogTitle>
                <DialogContent style={{backgroundColor:'#66bb6a'}}>
                  <DialogContentText>
                    Ingrese establecimiento y rodeo de destino.
                  </DialogContentText>
                  
                  <Grid container direction='row' justify='space-around'>
                    <Grid item xs={12} sm={5}>
                      <FormControl variant="filled" className={classes.formControl}>
                        <label>Establecimiento:</label>
                            <Select
                                labelId="label"
                                id="nuevoEstablecimiento"
                                name="nuevoEstablecimiento"
                                onChange={(e)=>handleMove(e)}
                                label="Rodeo"
                                displayEmpty
                                >
                                  <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                                {props.establecimientos.map(item =>{
                                    return <MenuItem value={item.id}>{item.nombre}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <FormControl variant="filled" className={classes.formControl}>
                        <label>Rodeo:</label>
                            <Select
                                labelId="label"
                                id="nuevoRodeo"
                                name="nuevoRodeo"
                                // value={rodeo}
                                onChange={(e)=>handleMove(e)}
                                label="Rodeo"
                                displayEmpty
                                >
                                  <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                                {props.rodeos.map(item =>{
                                    return <MenuItem value={item.id}>{item.nombre}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
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
                  <Button onClick={()=>handleAcceptMove()}                
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
    categorias:state.rodeo.categoria
  }		
}

    
export default connect(mapStateToProps)(Movimientos);