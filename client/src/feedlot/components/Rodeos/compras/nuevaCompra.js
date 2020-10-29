import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Step1 from './nuevaCompra/compraStep1'
import Step2 from './nuevaCompra/compraStep2'

export function NuevaCompra(props) {

    return (
      <Grid>
        {props.step==="1"?<Step1 />:null}
        {props.step==="2"?<Step2 
                    rodeoElegido={props.rodeo}
                    establecimiento={props.establecimiento}
                    data={props.data}  />:null}
      </Grid>
      
    )
 }

const mapStateToProps = state => {		
  return {		
    step:state.compras.step
  }		
}

export default connect(mapStateToProps)(NuevaCompra);


