import React,{useEffect} from 'react';
// import { makeStyles } from '@material-ui/styles'
import {Container, CssBaseline, Grid} from '@material-ui/core'
import {connect} from 'react-redux';
import HistoryTable from './historyTable'
import Axios from 'axios';
import {getHistory} from '../../../actions/comprasHistory';

let query=[]
let dataObject={}
let guiaObject={}
let costosObject={}

const ComprasHistory = (props) =>{
    // const classes = useStyles();
    useEffect(()=>{
      getInfo()
    },[])

    const getInfo = function(){
      query=[]
      Axios.get('http://localhost:3001/operaciones/history/'+props.user.cuit)
      .then(res=>{
          res.data.map(item=>{
            dataObject={}
            dataObject.id=item.id
            dataObject.cliente=item.cliente[0].razon_social
            if(item.consig.length>0){
              dataObject.consig=item.consig[0].razon_social
            }else{
              dataObject.consig="No Actua"
            }
            dataObject.fechaCompra=item.factura_cliente[0].fecha
            dataObject.cantAnimales=item.cant_animales
            dataObject.estado=item.estado
            dataObject.guias=[]
            item.guias.map(guia=>{
              guiaObject={}
              guiaObject.numero=guia.numero
              guiaObject.cantAnimales=guia.cantAnimales
              guiaObject.fechaCarga=""
              guiaObject.fechaDescarga=""
              guiaObject.peso=guia.peso_neto

              dataObject.guias.push(guiaObject)
            })
            dataObject.costos=[]
            costosObject={}
            costosObject.numeroFactura=item.factura_cliente[0].numero
            costosObject.totalFactura=item.factura_cliente[0].total
            costosObject.razon_social=item.cliente[0].razon_social
            dataObject.costos.push(costosObject)
            if(item.factura_consig.length>0){
              costosObject={}
              costosObject.numeroFactura=item.factura_consig[0].numero
              costosObject.totalFactura=item.factura_consig[0].total
              costosObject.razon_social=item.consig[0].razon_social
              dataObject.costos.push(costosObject)
            }else{
              costosObject={}
              costosObject.numeroFactura="No"
              costosObject.totalFactura="0"
              costosObject.razon_social="No "
              dataObject.costos.push(costosObject)
            }
            item.factura_transporte.map(function(transport,index){
              costosObject={}
              costosObject.numeroFactura=transport.numero
              costosObject.totalFactura=transport.total
              costosObject.razon_social=item.transporte[index].razon_social
              dataObject.costos.push(costosObject)
            })
           
            query.push(dataObject)
           
          }) 
          props.getHistory(query)
      })
      .catch(err =>{
        alert("Error en la base de datos, intente nuevamente")
      })

    }

    return(

        <Container component="main" maxWidth="90%">
            <CssBaseline />
                <Grid container >
                    
                </Grid>     
                <Grid>          
                <HistoryTable />
   
                </Grid>
        </Container>
        
    )
}

const mapStateToProps = state => {
  return{
    user:state.user.user,
    rodeo:state.rodeo,
    history:state.historialCompras
  }				
}

const mapDispatchToProps = dispatch => {
  return{getHistory:(data)=>dispatch(getHistory(data))}
}

export default connect(mapStateToProps,mapDispatchToProps)(ComprasHistory);
