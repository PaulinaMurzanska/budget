import React from "react";
import {generatePath, Route, Switch, withRouter} from "react-router-dom";
import {ROUTE_EXPENSES, ROUTE_EXPENSES_FORM} from "Constants/Routes";
import Expenses from "components/Expenses/Expenses";
import WithExpenses from "components/Expenses/WithExpenses";
import withCategories from "components/Categories/WithCategories";
import Income from "components/Income/Income";
import ExpensesFormCard from "components/Expenses/ExpensesForm/ExpensesFormCard";
import moment from "moment";
import axios from "axios";
import {Api} from "Services/Api";


class ExpensesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: undefined,
            sortDirections: true,
            chartValues: [],
            expensesToDisplay: [],
            expensesErrorMessage: "",
            isCreatedOrUpdated: false,
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
    handleIsCreated = () => {
        this.setState({isCreatedOrUpdated: false})
    }
    onSubmitExpenseCreated = (expense) => {
        console.log("on submit triggered");
        const path = generatePath(ROUTE_EXPENSES);
        axios.post(Api.EXPENSES, expense)
            .then((response) => {
                const data = response.data;
                const expense = data;
                const expensesCopy = [...this.props.expenses];
                expensesCopy.push(expense);
                this.setState({
                    expensesToDisplay: expensesCopy,
                    isCreatedOrUpdated: true,
                });
                this.props.history.push(path);
            })
            .catch((error) => {
                this.props.history.push(path);
                this.setState({
                    expensesErrorMessage: "error creating new expenses"
                })
            })

    }

    render() {


        const {
            endDate, startDate, handleStartDate, handleEndDate, handleFilter, expenses,
            categories, isFiltered,
        } = this.props;
        const {sortBy, sortDirection, expensesToDisplay, isCreatedOrUpdated} = this.state;


        const multiplier = sortDirection ? 1 : -1;
        const preSort = () => {
            if (isCreatedOrUpdated === true) {
                return expensesToDisplay;
            }
            if (isCreatedOrUpdated === false) {
                return expenses;
            }
            if (isCreatedOrUpdated === true && isFiltered === true) {
                return expensesToDisplay;
            }
            if (isCreatedOrUpdated === false && isFiltered === true) {
                return expenses
            }
            if (isCreatedOrUpdated === false && isFiltered === false) {
                return expenses
            }
        };

        const expensesToDisplayToSort = preSort();

        const sortedExpenses = expensesToDisplayToSort.sort((item1, item2) => {
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

        const initialValuesToCreate = {
            name: "",
            id: undefined,
            amount: "",
            timestamp: moment(Date.now()).format('MM-DD-YYYY'),
            category: "",
        };

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
                        categories={categories}
                        handleSort={this.handleSort}
                        handleIsCreated={this.handleIsCreated}

                    />
                </Route>
                <Route exact path={ROUTE_EXPENSES_FORM}>
                    <ExpensesFormCard
                        initialValues={initialValuesToCreate}
                        title='Create new expense'
                        onSubmit={this.onSubmitExpenseCreated}
                        categories={categories}
                    />
                </Route>

            </Switch>

        )
    }
}

export default withRouter(WithExpenses(withCategories(ExpensesPage)));