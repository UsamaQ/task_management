import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux';
import { getLineChartTaskList } from '../../store/tasks/action';

function getChartColorsArray(colors) {
    colors = JSON.parse(colors);
    return colors.map(function (value) {
        var newValue = value.replace(" ", "");
        if (newValue.indexOf(",") === -1) {
            var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
            if (color.indexOf("#") !== -1)
                color = color.replace(" ", "");
            if (color) return color;
            else return newValue;
        } else {
            var val = value.split(',');
            if (val.length === 2) {
                var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                return rgbaColor;
            } else {
                return newValue;
            }
        }
    });
  }

  // FOR BASE LINE CHART

  const BasicLineCharts = ({ dataColors }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLineChartTaskList());
      }, [dispatch]);

  const { lineChartTaskList } = useSelector((state) => ({
    lineChartTaskList: state.Tasks.lineChartTaskList,
  }));


  let filteredArray= [0,0,0,0,0,0,0,0,0,0,0,0];
  if (lineChartTaskList.length !== 0) {   
    for (let i = 0; i < lineChartTaskList.length; i++) {
        filteredArray[lineChartTaskList[i].month-1] = lineChartTaskList[i].total;
        }
    }

    console.log(filteredArray);

    var linechartBasicColors = getChartColorsArray(dataColors);
    const series = [{
        name: "Tasks",
        data: filteredArray
    }];
    var options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        markers: {
            size: 4,
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        colors: linechartBasicColors,
        title: {
            text: 'Product Trends by Month',
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },

        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height="350"
                className="apex-charts"
            />
        </React.Fragment>
    );
};



const PrjectsStatusCharts = ({dataColors}) => {
    var donutchartProjectsStatusColors = getChartColorsArray(dataColors);
    // const donutchartProjectsStatusColors = ["#67b173", "#3d78e3", "#ffc84b", "#f17171"];
    const series = [125, 42, 58, 89];
    var options = {
        labels: ["Completed", "In Progress", "Yet to Start", "Cancelled"],
        chart: {
            type: "donut",
            height: 230,
        },
        plotOptions: {
            pie: {  
                size: 100,
                offsetX: 0,
                offsetY: 0,
                donut: {
                    size: "90%",
                    labels: {
                        show: false,
                    }
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        stroke: {
            lineCap: "round",
            width: 0
        },
        colors: donutchartProjectsStatusColors,
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="donut"
                height="230"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

export { BasicLineCharts, PrjectsStatusCharts };