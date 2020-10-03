import React from 'react';
import {AppBar, Toolbar, Typography, IconButton, Button, makeStyles} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Select, FormControl,MenuItem} from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title:{
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}))

const NavBar = (props) => {
  const s = useStyles()
  const{location}=props
  let title = ""
  if (location.pathname==="/"||location.pathname==="/register"){
    return null;
  }
  if (location.pathname==="/feedlot/sitrep"){
    title="Resumen de Situación Feedlot"
  }
  if (location.pathname==="/feedlot/rodeos"){
    title="Administración de Rodeos"
  }
  return (
    <div>
      <AppBar position='fixed' color='secondary'>
        <Toolbar>
          <IconButton color='primary' className={s.menuButton}>
            <MenuIcon />
          </IconButton>
         <Typography variant='h6' className={s.title}>
          {title}
         </Typography>
         <div>
         <FormControl variant="filled" className={s.formControl}>
                         
                                    <Select
                                        labelId="label"
                                        id="demo-simple-select-outlined"
                                        name="rodeo"
                                        value="rodeo"
                                        // onChange={handleRodeo}

                                        displayEmpty
                                        >
                                        <MenuItem value="" color={"primary"} disabled>
                                        Elegir Opcion...
                                        </MenuItem>
                                        <MenuItem value={"Rodeo 1"}>Rodeo 1</MenuItem>
                                        <MenuItem value={"Rodeo 2"}>Rodeo 2</MenuItem>
                                        <MenuItem value={"Rodeo 3"}>Rodeo 3</MenuItem>
                                    </Select>
                                </FormControl>
         </div>
          <Button variant='text' color = 'primary'>
            Usuario
          </Button>
          <Button variant='text' color = 'primary'>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
      <div className={s.offset}></div>
    </div>
  )
}


export default NavBar;
