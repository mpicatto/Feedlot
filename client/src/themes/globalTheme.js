import {createMuiTheme} from "@material-ui/core/styles"
import {green, grey, yellow} from "@material-ui/core/colors"

const theme = createMuiTheme({
    palette: {
        primary:{
          main: yellow[400]
        },
        secondary:{
          main:'#000000'
        },
        background:{
         default:green[400],
         alternate:grey[300]
        }
    }
})

export default theme