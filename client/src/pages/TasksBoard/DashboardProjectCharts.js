import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux';
import { getLineChartTaskList, getStatusChartTaskList } from '../../store/tasks/action';

  // FOR BASE LINE CHART

  const BasicLineCharts = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLineChartTaskList());
      }, []);

  const { lineChartTaskList } = useSelector((state) => ({
    lineChartTaskList: state.Tasks.lineChartTaskList,
  }));


  let filteredArray= [0,0,0,0,0,0,0,0,0,0,0,0];
  if (lineChartTaskList.length !== 0) {   
    for (let i = 0; i < lineChartTaskList.length; i++) {
        filteredArray[lineChartTaskList[i].month-1] = lineChartTaskList[i].total;
        }
    }

    var linechartBasicColors = ['#2E93fA'];
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



const PrjectsStatusCharts = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStatusChartTaskList());
      }, [dispatch]);

  const { statusChartTaskList } = useSelector((state) => ({
    statusChartTaskList: state.Tasks.statusChartTaskList,
  }));

  let filteredArray = [0,0,0,0,0];
  let totalTasks = 0;
  if (statusChartTaskList.length !== 0) {   
    for (let i = 0; i < statusChartTaskList.length; i++) {
        filteredArray[i] = statusChartTaskList[i].status;
        totalTasks = totalTasks + statusChartTaskList[i].status;
        }
    }

    const donutchartProjectsStatusColors = ['#FF9800', '#2E93fA', '#66DA26', '#E91E63', '#546E7A'];
    const series = filteredArray;
    var options = {
        labels: ['To Do','In Progress','Completed','Pending','Cancelled'],
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
                        show: true,
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
            width: 1,
        },
        colors: donutchartProjectsStatusColors,
    };
    return (
        <React.Fragment>
            <div id="prjects-status" className="apex-charts" dir="ltr">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="donut"
                    height="230"
                    className="apex-charts"
                />
            </div>
            <div className="mt-5">
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <h2 className="me-3 ff-secondary mb-0">{totalTasks}</h2>
                    <div>
                        <p className="text-muted mb-0">Total Tasks</p>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                <p className="fw-semibold mb-0"><i className="ri-checkbox-blank-circle-fill text-warning align-middle me-2"></i>To Do</p>
                <div>
                    <span className="text-muted pe-5">{filteredArray[0] + ' Tasks'}</span>
                </div>
            </div>
            <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                <p className="fw-semibold mb-0"><i className="ri-checkbox-blank-circle-fill text-primary align-middle me-2"></i> In Progress</p>
                <div>
                    <span className="text-muted pe-5">{filteredArray[1] + ' Tasks'}</span>
                </div>
            </div>
            <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                <p className="fw-semibold mb-0"><i className="ri-checkbox-blank-circle-fill text-success align-middle me-2"></i> Completed</p>
                <div>
                    <span className="text-muted pe-5">{filteredArray[2] + ' Tasks'}</span>
                </div>
            </div>
            <div className="d-flex justify-content-between py-2">
                <p className="fw-semibold mb-0"><i className="ri-checkbox-blank-circle-fill text-danger align-middle me-2"></i> Pending</p>
                <div>
                    <span className="text-muted pe-5">{filteredArray[3] + ' Tasks'}</span>
                </div>
            </div>
            <div className="d-flex justify-content-between py-2">
                <p className="fw-semibold mb-0"><i className="ri-checkbox-blank-circle-fill text-disabled align-middle me-2"></i> Cancelled</p>
                <div>
                    <span className="text-muted pe-5">{filteredArray[4] + ' Tasks'}</span>
                </div>
            </div>
        </React.Fragment>
    );
};

export { BasicLineCharts, PrjectsStatusCharts };