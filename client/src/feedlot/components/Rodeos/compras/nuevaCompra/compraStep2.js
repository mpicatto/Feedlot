import React,{useState,useEffect} from 'react';
// import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Select, FormControl,MenuItem, IconButton} from '@material-ui/core'
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import {cancelCompra,setStep,keepGuiaS,setSection} from '../../../../actions/compras'
import {connect} from 'react-redux';
import {guiaInicial,animalInicial,arrayInit,transporteInit,facturaTransportInit} from './initialState'
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
import TablaGuias from './guiasTable'


let rodeos=[]
let guiaControl=[]
let statusCompra=[]
//------------------------------Table Functions-------------------------------------------------------------------
let rows=[]

const columns = [
  {id: 'index', label: 'Index', minWidth: 50 },
  {id: 'caravana', label: 'Caravana', minWidth: 100 },
  {id: 'raza', label: 'Raza', minWidth: 50,align: 'right'},
  {id: 'sexo',label: 'Sexo',minWidth: 50,align: 'right'},
  {id: 'frame',label: 'Frame',minWidth: 50, align: 'right',},
  {id: 'establecimientoId',label: 'Establecimiento',minWidth: 100, align: 'right',},
  {id: 'rodeoId',label: 'Rodeo',minWidth: 75, align: 'right',},
  {id: 'editar',label: 'Editar',minWidth: 50, align: 'right',},
  {id: 'eliminar',label: 'Eliminar',minWidth: 50, align: 'right', },
];

function createData(index,caravana, raza, sexo,frame,establecimientoId,rodeoId, editar ,eliminar) {
  return {index, caravana, raza, sexo,frame,establecimientoId,rodeoId, editar,eliminar};
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
      root: {
        width: '100%',
      },
      tableContainer: {
        maxHeight: 440,
      }, 

    background:{
      color:theme.palette.background.default
    }
  }));

export function Step2(props) {
    const classes = useStyles()
    useEffect(()=>{
      setGuiaS(props.guiass)
      getInfo()
    },[props.guiass,])


    const [guia, setGuia] = useState(guiaInicial)
    const [guiaS, setGuiaS] = useState([])
    const [transporte, setTransporte]=useState(transporteInit)
    const [facturaTransporte,setFacturaTransporte]=useState(facturaTransportInit)
    const [animalDetail, setAnimalDetail]=useState(animalInicial)
    const [animalArray, setAnimalArray] = useState(arrayInit)
    const [ifTable, setIfTable]=useState(false)
    const [ifTable2, setIfTable2]=useState(false)
    const [establecimiento, setEstablecimiento] = useState(props.establecimiento)
    const [rodeo,setRodeo] = useState(props.rodeoElegido)
    const [endOfGuia,setEndOfGuia] = useState(true)
    const [vendorErrors, setVendorErrors] = useState({})
 
    const getInfo = function(){
      rodeos=[]    
      for (let i=0;i<props.data.establecimientos.length;i++){
      if(props.data.establecimientos[i].nombre===establecimiento){
        let establecimientoId=props.data.establecimientos[i].id
        props.data.rodeos.map(item=>{
          if(item.establecimientoId===establecimientoId){
            rodeos.push(item)
          }
        })
      }console.log(rodeos)
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

    const handleEdit = (index) =>{
      setAnimalDetail({
        cug:animalArray[index].cug,
        manejo:animalArray[index].manejo,
        verificador:animalArray[index].verificador,
        caravana:animalArray[index].caravana,
        raza:animalArray[index].raza,
        sexo: animalArray[index].sexo,
        frame: animalArray[index].frame,
        pesoInicial:animalArray[index].pesoInicial ,
        pesoActual:animalArray[index].pesoActual,
        establecimientoId:animalArray[index].establecimientoId,
        rodeoId:animalArray[index].rodeoId,
        fechaIngreso:animalArray[index].fechaIngreso,
        fechaEgreso:animalArray[index].fechaEgreso,
        estado:animalArray[index].estado,
        costoCompra:animalArray[index].costoCompra,
      })
    animalArray.splice(index,1)  
    }

    const handleDelete = (index) =>{ 
      alert("Se eliminara de la lista la caravana en la posición "+index)
      animalArray.splice(index,1)
      setIfTable(false)
      rows=[]
      if(animalArray.length>0){
        populate(animalArray)
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


//----------------Form Handlers---------------------------------  


    const handleGUIA = function(e) {
        setGuia({
          ...guia,
          [e.target.name]:e.target.value
        })
      }

      const handleTransporte = function(e) {
        setTransporte({
          ...transporte,
          [e.target.name]:e.target.value
        })

      }
      
      const handleFacturaTransporte = function(e) {
        setFacturaTransporte({
          ...facturaTransporte,
          [e.target.name]:e.target.value
        })
 
      } 
      
      const handleAnimalDetail = function(e) {
        setAnimalDetail({
          ...animalDetail,
          [e.target.name]:e.target.value
        })

      }
      
      const saveAnimal = function(e) {
        if(guiaControl.includes(guia.guia)){
          alert("La guia Nº:"+guia.guia+" ya ha sido usada.\nPor favor verifique el número")
        }else{   
          if (guia.cantAnimales>0){
            console.log(animalArray)
            animalDetail.establecimientoId=establecimiento
            animalDetail.rodeoId=rodeo
            animalDetail.estado="Engorde"
            animalDetail.fechaIngreso=guia.fechaDescarga
            animalDetail.guia=guia.guia
            animalDetail.pesoInicial=parseFloat(guia.peso)/parseInt(guia.cantAnimales)
            animalDetail.costoCompra=(parseFloat(props.facturaVendor.totalVendedor)/parseInt(props.facturaVendor.animales))+(parseFloat(props.facturaConsig.totalConsig)/parseInt(props.facturaVendor.animales))+(parseFloat(facturaTransporte.totalFactura)/parseInt(guia.cantAnimales))
            animalDetail.caravana=animalDetail.cug+"-"+animalDetail.manejo+"-"+animalDetail.verificador
            animalArray.push(animalDetail)
            populate(animalArray)
            setAnimalDetail(animalInicial)
            setIfTable(true)
            if (animalArray.length==guia.cantAnimales&&animalArray.length>0){
              setEndOfGuia(false)
            }
          }else{
            alert("La cantidad de animales espefificada en la guia debe ser mayor a 0. Verifique la informacioón y vuelva a intentar")
          }
        } 
      }
      
      const deleteAnimal = function(){
        setAnimalDetail(animalInicial)
      }

      const saveGuia = function(){
        console.log(animalArray)
        guia.transporte=transporte
        guia.facturaTransporte=facturaTransporte
        guiaS.push(guia)
        animalArray.map(item=>{
        guiaS[guiaS.length-1].animales.push(item)
         })
        guiaControl.push(guia.guia) 
        while(animalArray.length>0){
          animalArray.pop()
        }
        setGuia(guiaInicial)
        setTransporte(transporteInit)
        setFacturaTransporte(facturaTransportInit)
        console.log(guiaS)
        setEndOfGuia(true)
        setIfTable(false)
        setIfTable2(true)
        props.cancelCompra()
      }

      const handleEstablecimiento = (event) => {
        rodeos=[]
        setEstablecimiento(event.target.value);
        setRodeo("Elija una opción...")
        for (let i=0;i<props.data.establecimientos.length;i++){
          if(props.data.establecimientos[i].nombre===event.target.value){
              let establecimientoId = props.data.establecimientos[i].id
              props.data.rodeos.map(item=>{
                  if (item.establecimientoId===establecimientoId){
                      rodeos.push(item)
                  }
              })
          }
      }
    }

    const handleRodeo = (event) => {
      setRodeo(event.target.value);
    };

    const volverFunc = function(e){
      e.preventDefault()
      props.setStep("1")
  }

    const cancelFunc = function(e){
        e.preventDefault()
        props.cancelCompra()
        setAnimalArray([])
    }

    const SaveFunc = function(e){
        e.preventDefault()
        if(props.facturaVendor.animales==guiaS[0].animales.length){
          alert("Se graban los datos aca. Orden Completa")
          statusCompra="completa"
        }else{
          alert("Se graban los datos aca. Orden Incompleta")
          statusCompra="incompleta"
        }
        props.setStep("1")
        props.setSection("")                
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
                    Detalle de la GUIA
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="guia"
                          label="GUIA Nº:"
                          name="guia"
                          value={guia.guia}
                          onChange={(e)=>handleGUIA(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                          autoComplete="descarga"
                          name="fechaDescarga"
                          variant="outlined"
                          required
                          fullWidth
                          id="fechaDescarga"
                          label="Fecha de Descarga"
                          type="date"
                          InputLabelProps={{
                                              shrink: true,
                                            }}
                          autoFocus
                          value={guia.fechaDescarga}
                          onChange={(e) => handleGUIA(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="transportista"
                        label="Transportista:"
                        name="transportista"
                        value={transporte.transportista}
                        onChange={(e)=>handleTransporte(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="cuiTransportista"
                        label="CUIT transportista:"
                        name="cuiTransportista"
                        value={transporte.cuiTransportista}
                        onChange={(e)=>handleTransporte(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="chasis"
                        label="Patente Chasis:"
                        name="chasis"
                        value={transporte.chasis}
                        onChange={(e)=>handleTransporte(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="acoplado"
                        label="Patente Acoplado:"
                        name="acoplado"
                        value={transporte.acoplado}
                        onChange={(e)=>handleTransporte(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="chofer"
                        label="Chofer:"
                        name="chofer"
                        value={transporte.chofer}
                        onChange={(e)=>handleTransporte(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="cuil"
                        label="CUIT/CUIL chofer"
                        name="cuil"
                        value={transporte.cuil}
                        onChange={(e)=>handleTransporte(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="pesajePlace"
                        label="Lugar de Pesada:"
                        name="pesajePlace"
                        value={guia.pesajePlace}
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="ticket"
                        label="Ticket Balanza Nº:"
                        name="ticket"
                        value={guia.ticket}
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="peso"
                        label="Peso Neto:"
                        name="peso"
                        value={guia.peso}
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="cantAnimales"
                        label="Animales:"
                        name="cantAnimales"
                        value={guia.cantAnimales}
                        onChange={(e)=>handleGUIA(e)}
                    />
                    </Grid>
                    <Grid item item xs={12} sm={6}>             
                    </Grid>
                    <Grid item item xs={12} sm={3}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="numFactura"
                        label="Factura Flete. Nº:"
                        name="numFactura"
                        onChange={(e) => handleFacturaTransporte(e)}
                        value={facturaTransporte.numFactura}
                    />
                    </Grid>
                    <Grid item item xs={12} sm={3}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="totalFactura"
                        label="Total Flete ($)"
                        name="totalFactura"
                        value={facturaTransporte.totalFactura}
                        onChange={(e) => handleFacturaTransporte(e)}
                    />
                    </Grid>
                </Grid>
                <Grid className={classes.container}> 
                  <Typography component="h1" variant="h5">
                  Detalle de los Animales
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="cug"
                          label="CUG:"
                          name="cug"
                          value={animalDetail.cug}
                          onChange={(e)=>handleAnimalDetail(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="manejo"
                          label="Nº de Manejo:"
                          name="manejo"
                          value={animalDetail.manejo}
                          onChange={(e)=>handleAnimalDetail(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="verificador"
                          label="Verificador:"
                          name="verificador"
                          value={animalDetail.verificador}
                          onChange={(e)=>handleAnimalDetail(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="raza"
                          label="Raza:"
                          name="raza"
                          value={animalDetail.raza}
                          onChange={(e)=>handleAnimalDetail(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="sexo"
                          label="Sexo:"
                          name="sexo"
                          value={animalDetail.sexo}
                          onChange={(e)=>handleAnimalDetail(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="frame"
                          label="Frame:"
                          name="frame"
                          value={animalDetail.frame}
                          onChange={(e)=>handleAnimalDetail(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}
                    >
                    <Typography component="h1" variant="h6" align="left">
                    Asignar Animal a:
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                    <FormControl 
                             variant="filled"
                             className={classes.formControl}
                             >
                                <label>Establecimiento:</label>
                                    <Select
                                        labelId="label"
                                        id="establecimiento"
                                        name="establecimiento"
                                        value={establecimiento}
                                        onChange={handleEstablecimiento}
                                        label="establecimiento"
                                        displayEmpty
                                        >
                                        <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                                        {props.data.establecimientos.map(item =>{
                                            return <MenuItem value={item.nombre}>{item.nombre}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <FormControl variant="filled" className={classes.formControl}>
                                <label>Rodeo:</label>
                                    <Select
                                        labelId="label"
                                        id="demo-simple-select-outlined"
                                        name="rodeo"
                                        value={rodeo}
                                        onChange={handleRodeo}
                                        label="Rodeo"
                                        displayEmpty
                                        >
                                         <MenuItem value={"Elija una opción..."} disabled >Elija una opción...</MenuItem>
                                        {rodeos.map(item =>{
                                            return <MenuItem value={item.nombre}>{item.nombre}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}></Grid>
                        {endOfGuia?<Grid item xs={12} sm={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>deleteAnimal(e)} >
                               Borrar Datos
                            </Button>
                        </Grid>:null}
                        {endOfGuia?<Grid item xs={12} sm={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>saveAnimal(e)} >
                                Agregar Animal
                            </Button>
                    </Grid>:null}
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
                    <Grid item xs={12} sm={7}></Grid>
                    {endOfGuia?null:<Grid item xs={12} sm={5}>
                    Animales registrados:{animalArray.length}/{guia.cantAnimales}
                    </Grid>}

                    <Grid item xs={12} sm={6}></Grid>
                    {endOfGuia?null:<Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>saveGuia(e)} >
                               Guardar GUIA Nº:{guia.guia}
                            </Button>
                        </Grid>}
                  </Grid>
                    
                    <Grid container spacing={2} >
                    {ifTable2?<Grid container spacing={2} ><TablaGuias data={guiaS}/></Grid>:null}
                    <Grid item xs={12} sm={3}></Grid><Grid item xs={12} sm={3}></Grid><Grid item xs={12} sm={3}></Grid><Grid item xs={12} sm={3}></Grid>
                      <Grid item xs={12} sm={3}></Grid>
                      <Grid item xs={12} sm={3}>
                          <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e)=>volverFunc(e)} >
                                Volver
                            </Button>
                        </Grid>
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
                                onClick={(e)=>SaveFunc(e)} >
                                Guardar Compra
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
  return {		
    guiass:state.compras.guias,
    vendedor:state.compras.vendedor,
    consignatario:state.compras.consignatario,
    facturaVendor:state.compras.facturaVendor,
    facturaConsig:state.compras.facturaConsig
  }		
}

const mapDispatchToProps = dispatch => {
  return {
    cancelCompra:()=>dispatch(cancelCompra()),
    setStep:(number)=>dispatch(setStep(number)),
    keepGuiaS:(guiaSS)=>dispatch(keepGuiaS(guiaSS)),
    setSection:(section)=>dispatch(setSection(section))
  }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Step2);