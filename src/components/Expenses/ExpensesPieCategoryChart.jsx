import React from "react";
import Chart from "react-apexcharts";

const ExpensesPieCategoryChart = ({numbers, names}) => {
    const series = numbers;
    const labels = names;
    const chartOptions = {
        labels: labels,
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                        }
                    },
                }
            }
        },
        chart: {
            background: 'rgba(220, 217, 217, 0.29)',

        }
    }
    return (
        <Chart
            options={chartOptions}
            series={series}
            type="donut"
            height="auto"
            width="100%"
        />

    )
}
export default ExpensesPieCategoryChart;