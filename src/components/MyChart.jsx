import React, {Component} from "react";
import Chart from "react-apexcharts";
import {Container} from "@material-ui/core";

class MyChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // options: {},
            series: this.props.numbers,
            chartOptions: {
                labels: this.props.names,

            }
        }

    }

    render() {
        console.log(this.state.chartOptions);
        console.log(this.state.labels);

        return (
            <Chart
                options={this.state.chartOptions}
                series={this.state.series}
                // labels={this.state.labels}
                type="donut"
                height='450'
                width='100%'
            />

        )
    }

}

export default MyChart;