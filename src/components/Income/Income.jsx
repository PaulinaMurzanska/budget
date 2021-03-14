import React from "react";
import "./Income.scss";
import {Container} from "@material-ui/core";
// import "react-datepicker/dist/react-datepicker.css";
import IncomeChart from "components/Income/MyChart";
import IncomeDatepicker from "components/Income/IncomeDatepicker";
import IncomeTable from "components/Income/IncomeTable";

const monthInMilSec = 2582000000;

class Income extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            incomes: this.props.incomes,
            startDate: Date.now(),
            endDate: Date.now() - monthInMilSec,
            filteredIncomes: [],
            names: [],
            numbers: [],
            sortBy: "",
            sortDirection: true,
            sortDateDirection:true,

        }
    }

    componentDidMount() {
        const nums = this.props.incomes.filter(income => new Date(income.timestamp).getTime() > this.state.endDate).map((income) => income.amount);
        const names = this.props.incomes.filter(income => new Date(income.timestamp).getTime() > this.state.endDate).map((income) => income.name);
        this.setState({
            numbers: nums,
            names: names,
        })
    }

    handleSelectedStartDate = (e) => {
        const startDate = e.target.value;
        const startDateFormat = new Date(startDate).getTime();
        this.setState({startDate: startDateFormat})
    }

    handleSelectedEndDate = (e) => {
        const endDate = e.target.value;
        const endDateFormat = new Date(endDate).getTime();
        this.setState({endDate: endDateFormat})
    }


    handleIncomesFilter = () => {
        const newIncomes = this.state.incomes;
        const startDateToTime = new Date(this.state.startDate).getTime();
        const endDateToTime = new Date(this.state.endDate).getTime();
        const filteredPre = newIncomes.filter(income => new Date(income.timestamp).getTime() <= endDateToTime);
        const filteredIncomes = filteredPre.filter(item => new Date(item.timestamp).getTime() >= startDateToTime);
        const filteredNames = filteredIncomes.map((income) => income.name);
        const filteredNumbers = filteredIncomes.map((income) => income.amount);
        this.setState({
            filteredIncomes: filteredIncomes,
            names: filteredNames,
            numbers: filteredNumbers,
        })

    }

    handleSort = (event) => {
        console.log("sort triggered");
        console.log(event.target.id);
        const sortBy = event.target.id;
        this.setState({
            sortBy: sortBy,
            sortDirection: !this.state.sortDirection,
        })


    }
    handleSortDate = (e) => {
        this.setState({
            sortDateDirection: !this.state.sortDateDirection,
        })
    }



    render() {
        const {startDate, endDate, filteredIncomes, numbers,
            names, incomes, sortDirection,sortDateDirection,
         } = this.state;

        const multiplier = sortDirection ? 1 : -1;

        const sortedIncomes = incomes.sort((item1, item2) => {
            const sortBy = this.state.sortBy;
            const a = item1[sortBy];
            const b = item2[sortBy];
            if (a > b) {
                return 1 * multiplier;
            }
            if (b > a) {
                return -1 * multiplier;
            }
            return 0;
        });

        const sortedByDate = incomes.sort((a, b) => {
            const asc = new Date(a.timestamp) - new Date(b.timestamp);
            const desc = new Date(b.timestamp) - new Date(a.timestamp);
            return sortDateDirection? asc : desc;
        });





        const incomesToDisplay = sortedIncomes;


        console.log(incomesToDisplay);

        return (
            <Container maxWidth="lg">
                <div className="income-container">
                    <div className='search-bar'>
                        <div className='income-datepicker'>
                            <IncomeDatepicker
                                handleStartDate={this.handleSelectedStartDate}
                                handleEndDate={this.handleSelectedEndDate}
                                handleFilter={this.handleIncomesFilter}
                            />
                        </div>
                    </div>
                    <div className='chart-table-section'>
                        <div className='income-chart'>
                            <IncomeChart
                                names={names}
                                numbers={numbers}
                            />
                        </div>

                        <div className='income-table'>
                            <IncomeTable
                                incomes={incomesToDisplay}
                                handleSort={this.handleSort}
                                handleSortDate={this.handleSortDate}

                            />
                        </div>

                    </div>


                </div>
            </Container>
        )
    }
}

export default Income;