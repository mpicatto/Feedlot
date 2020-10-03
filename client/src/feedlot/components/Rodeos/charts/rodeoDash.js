import React, { Component } from 'react';
import classes from "./Dashboard.module.css";
import CabezasGraph from "./rodeo_general_chart";
import { yearLabels} from "../mockData";

export default class Dashboard extends Component {

    render() {
      
        const { cabezas, pesos,muertes,enfermos } = this.props;
        const labels = yearLabels
        if(this.props.chart==="cabezas"){
            return (
                <div className={classes.container}>
                    <CabezasGraph
                        data={cabezas}
                        data2={pesos}
                        labels={labels}
                        chart={this.props.chart} />
                </div>
            )
        }
        if(this.props.chart==="enfermos"){
            return (
                <div className={classes.container}>
                    <CabezasGraph
                        data={muertes}
                        data2={enfermos}
                        labels={labels}
                        chart={this.props.chart} />
                </div>
            )
        }

       return null
  
    }
}

// handleButtonClick = e => {
//     const { value } = e.target;
//     const isAnnual = value === "annual";

//     const newData = isAnnual ? managerData : managerQuarterData;
//     const newLabels = isAnnual ? yearLabels : quarterLabels;
//     const newAverage = isAnnual ? nationalAverageData : nationalAverageQuarterData;

//     this.setState({
//         data: newData,
//         average: newAverage,
//         labels: newLabels
//     })
// }




