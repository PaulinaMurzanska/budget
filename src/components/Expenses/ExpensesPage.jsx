import React from "react";
import {generatePath, Route, Switch, withRouter} from "react-router-dom";
import {ROUTE_EXPENSES} from "Constants/Routes";
import Expenses from "components/Expenses/Expenses";
import WithExpenses from "components/Expenses/WithExpenses";
import withCategories from "components/Categories/WithCategories";
import Income from "components/Income/Income";



class ExpensesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: undefined,
            sortDirections: true,
            chartValues: [],
        }
    }

    componentDidMount() {
        this.props.fetchExpenses();
        this.props.fetchCategories();
    }


    handleSort = (event) => {
        console.log('handle sort trigered');
        const sortBy = event.target.id;
        console.log(sortBy);
        this.setState({
            sortBy: sortBy,
            sortDirection: !this.state.sortDirection,
        })
    }

    render() {


        const {endDate, startDate, handleStartDate, handleEndDate, handleFilter, expenses, categories} = this.props;
        const {sortBy, sortDirection} = this.state;
        const multiplier = sortDirection ? 1 : -1;

        const sortedExpenses = expenses.sort((item1, item2) => {
            if (this.state.sortBy === "timestamp") {
                const a = new Date(item1.timestamp).getTime();
                const b = new Date(item2.timestamp).getTime();
                if (a > b) {
                    return 1 * multiplier;
                }
                if (b > a) {
                    return -1 * multiplier;
                }
                return 0;
            }
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
        console.log(sortedExpenses);


        return (
            <Switch>
                <Route exact path={ROUTE_EXPENSES}>
                    <Expenses
                        endDate={endDate}
                        startDate={startDate}
                        handleStartDate={handleStartDate}
                        handleEndDate={handleEndDate}
                        handleFilter={handleFilter}
                        expenses={sortedExpenses}
                        // sortedExpenses={sortedExpenses}
                        categories={categories}
                        handleSort={this.handleSort}
                        // handleIsCreated={this.handleIsCreated}

                    />
                </Route>
            </Switch>

        )
    }
}

export default WithExpenses(withCategories(ExpensesPage));