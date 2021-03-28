import React from "react";
import Chart from "react-apexcharts";
import WithExpenses from "components/Expenses/WithExpenses";

class DashboardExpensesChart extends React.Component {
    componentDidMount() {
        this.props.fetchExpenses()
    }

    render() {
        const{expenses}=this.props;
        const chartLabels = expenses.map((item)=>item.name);
        const chartValues =expenses.map((item)=>item.amount);

        const options = {
            chart: {
                background: 'rgba(220, 217, 217, 0.29)',
                foreColor: "#333",
            },
            xaxis: {
                categories: chartLabels,
            },
            fill: {
                colors: ["#e6d111", "#39aa25", "#254baa", "#7325aa", "#ba0f32", "#ee7e1b"],

            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    distributed: true,
                }
            },
            legend: {
                show: false,
            },
            dataLabels: {
                style: {
                    fontSize: "10px",
                    fontWeight: "normal",
                }
            }
        };
        const series = [{
            name: "expenses",
            data: chartValues,
        }];


        return (
            <React.Fragment>
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    height='auto'
                    width='100%'
                />
            </React.Fragment>
        )
    }
}

export default WithExpenses(DashboardExpensesChart);