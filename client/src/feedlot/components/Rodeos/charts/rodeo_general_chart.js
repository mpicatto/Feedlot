import React, { PureComponent } from 'react'
import Chart from "chart.js";
import classes from "./LineGraph.module.css";
import { green, grey } from '@material-ui/core/colors';

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = true;
// Chart.defaults.global.elements.line.tension = 0;

export default class LineGraph extends PureComponent {
    chartRef = React.createRef();

    newChart={}

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.newChart.destroy()
        this.buildChart();
    }
    
    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const { data,data2,labels,chart } = this.props;
        let type1={}
        let type2={}
        if (chart==="cabezas"){
            type1={
                label: "Peso Promedio (kg)",
                data: data2,
                yAxisID:'A',
                fill: false,
                type:"line",
                borderColor: green[400],
                backgroundColor:green[400]
            }
            type2={
                label: "Cabezas",
                yAxisID:'B',
                data: data,
                fill: false,
                type: "bar",
                borderColor: green[400],
                backgroundColor: grey[300]
            }
        }
        if (chart==="enfermos"){
            type1={
                label: "Animales Enfermos",
                data: data2,
                yAxisID:'A',
                fill: false,
                type:"bar",
                borderColor: green[400],
                backgroundColor:green[400]
            }
            type2={
                label: "Animales Muertos",
                yAxisID:'B',
                data: data,
                fill: false,
                type: "bar",
                borderColor: green[400],
                backgroundColor: grey[300]
            }
        }
        
       this.newChart= new Chart(myChartRef, {
            
            data: {
                //Bring in data
                labels: labels.length === data.length ? labels : new Array(data.length).fill("Data"),
                datasets: [
                    {
                        label:type1.label,
                        data: type1.data,
                        yAxisID:type1.yAxisID,
                        fill: type1.fill,
                        type:type1.type,
                        borderColor:type1.borderColor,
                        backgroundColor:type1.backgroundColor
                    },
                    {
                        label:type2.label,
                        data: type2.data,
                        yAxisID:type2.yAxisID,
                        fill: type2.fill,
                        type:type2.type,
                        borderColor:type2.borderColor,
                        backgroundColor:type2.backgroundColor
                    }
                ]
            },
            options: {
                //Customize chart options
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgba(0,0,0,0.8)",
                    bodyAlign: "left",
                    bodyFontColor: "#fff",
                    bodySpacing: 2,
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    // callbacks: {beforeTitle: ƒ, title: ƒ, afterTitle: ƒ, beforeBody: ƒ, beforeLabel: ƒ},
                    caretPadding: 2,
                    caretSize: 5,
                    cornerRadius: 6,
                    custom: null,
                    displayColors: true,
                    enabled: true,
                    footerAlign: "left",
                    footerFontColor: "#fff",
                    footerFontStyle: "bold",
                    footerMarginTop: 6,
                    footerSpacing: 2,
                    intersect: true,
                    mode: "nearest",
                    multiKeyBackground: "#fff",
                    position: "average",
                    titleAlign: "left",
                    titleFontColor: "#fff",
                    titleFontStyle: "bold",
                    titleMarginBottom: 2,
                    titleSpacing: 2,
                    xPadding: 6,
                    yPadding: 6
                  },
                layout: {
                    padding: {
                        top: 5,
                        left: 15,
                        right: 15,
                        bottom: 5
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: { display: true },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }
                    }],
                    yAxes: [{
                        id:type1.yAxisID,
                        scaleLabel:{display:true, labelString:type1.label},
                        ticks: { display: true },
                        gridLines: {
                            display: true,
                            drawBorder: true
                        }
                    },{
                        id:type2.yAxisID,
                        scaleLabel:{display:true, labelString:type2.label},
                        position:'right',
                        ticks: { display: true },
                        gridLines: {
                            display: true,
                            drawBorder: true
                        }
                    }],
                    
                }
              }
        });
    }
    render() {
        return (
            <div className={classes.graphContainer} >
                <canvas 
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}