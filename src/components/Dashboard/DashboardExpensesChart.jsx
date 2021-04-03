import React from "react";
import Chart from "react-apexcharts";
import WithExpenses from "components/Expenses/WithExpenses";
import withCategories from "components/Categories/WithCategories";

class DashboardExpensesChart extends React.Component {
    componentDidMount() {
        this.props.fetchExpenses();
        this.props.fetchCategories();
    }

    render() {
        const {expenses, categories} = this.props;
        const chartLabels = categories.map((item) => item.name);
        const chartValues = [];
        for (let i = 0; i < categories.length; i++) {
            const barPre = expenses.filter(item => item.category === categories[i].id);
            const barMap = barPre.map(item => item.amount);
            const barSum = barMap.reduce((a, b) => a + b, 0);
            chartValues.push(barSum);
        }
        console.log(chartValues);

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

export default withCategories(WithExpenses(DashboardExpensesChart));