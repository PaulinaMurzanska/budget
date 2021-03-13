import React from "react";
import {Table} from "reactstrap";
import IncomeItem from "components/Income/IncomeItem";
import {Container} from "@material-ui/core";
import {PieChart} from 'react-minimal-pie-chart';
import ApexCharts from 'apexcharts';
import MyChart from "components/MyChart";
import moment from "moment";

class Income extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            filterDate: undefined,
        }
    }

    getTimestamp = (event) => {
        console.log("klikięto w datę")
        const date = event.target.id;
        this.setState({
            filterDate: date
        })

    }

    render() {
        const {filterDate} = this.state;
        console.log(filterDate);
        const {incomes} = this.props;
        console.log(incomes);
        const keys_to_keep = ["name", "amount"];
        const newData = incomes.map(element => Object.assign({}, ...keys_to_keep.map(key => ({[key]: element[key]}))));

        const names = incomes.map((income) => income.name);
        const numbers = incomes.map((income) => income.amount);
        // console.log(names);
        // console.log(numbers);

        const filtObj = incomes.filter(income => income.timestamp < filterDate);
        console.log(filtObj);


        const neeewDate = new Date(filterDate);
        console.log(neeewDate);




        return (
            <Container maxWidth="sm">
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Source of income</th>
                        <th>Amount [EUR]</th>
                        <th>Date of income</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        incomes.map((income, index) =>
                            <IncomeItem
                                income={income}
                                key={income.id}
                                getTimestamp={this.getTimestamp}
                            />
                        )
                    }

                    </tbody>
                </Table>
                <MyChart
                    names={names}
                    numbers={numbers}
                />

            </Container>
        )
    }
}

export default Income;