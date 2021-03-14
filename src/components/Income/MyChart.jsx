import React, {Component} from "react";
import Chart from "react-apexcharts";
import {Container} from "@material-ui/core";

const IncomeChart = ({numbers,names})=>{
        const series = numbers;
        const labels = names;
        const chartOptions = {
            labels:labels
        }

        return (
            <Chart
                options={chartOptions}
                series={series}
                // labels={this.state.labels}
                type="donut"
                height='450'
                width='100%'
            />

        )
}

export default IncomeChart;