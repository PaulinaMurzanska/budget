import React from "react";
import Chart from "react-apexcharts";

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
                type="donut"
                height='450'
                width='100%'
            />

        )
}

export default IncomeChart;