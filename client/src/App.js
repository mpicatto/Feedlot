//libraries
import React from 'react'
import {Route} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import globalTheme from './themes/globalTheme'

//Components
import NavBar from './feedlot/components/Navigation/navBar'
import Home from './feedlot/components/index/index'
import SitRep from './feedlot/components/Dashboards/sitRep'
import Rodeos from './feedlot/components/Rodeos/Rodeos'
import Register from './feedlot/components/login/Register'
import NuevoEstablecimiento from './feedlot/components/Establecimientos/newEstablecimiento'
import menuEstablecimientos from './feedlot/components/Establecimientos/campoMenu'



const App = () => (
  <ThemeProvider theme={globalTheme}>
    <CssBaseline />
    <div>
     <Route path ='/' component={NavBar} />
     <Route exact path='/' component={Home}/>
     <Route exact path='/register' component={Register}/>
     <Route exact path='/establecimientos' component={menuEstablecimientos}/>
     <Route exact path='/nuevo_establecimiento'component={NuevoEstablecimiento} />
     <Route exact path='/feedlot/sitrep'component={SitRep} />
     <Route exact path='/feedlot/rodeos'component={Rodeos} />
    </div>
  </ThemeProvider>

)

export default App