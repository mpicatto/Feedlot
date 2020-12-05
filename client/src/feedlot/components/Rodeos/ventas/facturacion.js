import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        maxWidth: "100%",
        minWidth:"100%"
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    background:{
      color:theme.palette.background.default
    }
  }));

export function NuevaOrden(props) {

    return (
      <Grid>
                  
      </Grid>
      
    )
 }

const mapStateToProps = state => {		

}

export default connect(mapStateToProps)(NuevaOrden);