import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Step1 from './nuevaVenta/ventaStep1'
import Step2 from './nuevaVenta/ventaStep2'
import Step3 from './nuevaVenta/ventaStep3'

export function NuevaVenta(props) {

    return (
      <Grid>
        {props.step==="1"?<Step1 />:null}
        {props.step==="2"?<Step2 
                    rodeoElegido={props.rodeo}
                    establecimiento={props.establecimiento}
                    data={props.data} />:null}
         {props.step==="3"?<Step3 
                    rodeoElegido={props.rodeo}
                    establecimiento={props.establecimiento}
                    data={props.data} />:null}                   
      </Grid>
      
    )
 }

const mapStateToProps = state => {		
  return {		
    step:state.compras.step
  }		
}

export default connect(mapStateToProps)(NuevaVenta);


