import React from "react";
import withIncome from "components/Income/WithIncome";
import Chart from "react-apexcharts";


class DashboardIncomeChart extends React.Component {
    constructor(props) {
        super(props);


    }

    componentDidMount() {
        this.props.fetchIncome()
    }

    render() {
        const {incomesFilteredInFetch} = this.props;
        const numbers = incomesFilteredInFetch.map((income) => income.amount);
        const names = incomesFilteredInFetch.map((income) => income.name);
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
                        }
                    }
                }
            }
        }


        return (
            <React.Fragment>

                <Chart
                    options={chartOptions}
                    series={series}
                    type="donut"
                    height='auto'
                    width='100%'

                />

            </React.Fragment>

        )
    }


}

export default withIncome(DashboardIncomeChart);