import React from "react";
import {Container} from "@material-ui/core";
import {MdYoutubeSearchedFor} from "react-icons/md";
import AppDatepicker from "components/Income/IncomeDatepicker";
import './Expenses.scss';
import ExpensesTable from "components/Expenses/ExpensesTable";
import "./ExpensesTable.scss";
import ExpensesChart from "components/Expenses/ExpensesChart";
import CategoriesSelectOptions from "SharedComponents/CategoriesSelectOptions";
import ExpensesPieCategoryChart from "components/Expenses/ExpensesPieCategoryChart";
import {ROUTE_EXPENSES, ROUTE_EXPENSES_FORM} from "Constants/Routes";
import {generatePath, withRouter} from "react-router-dom";
import axios from "axios";
import {Api} from "Services/Api";
import ScrollToTop from "react-scroll-to-top";
import SimpleButton from "SharedComponents/SimpleButton";
import moment from "moment";
import InProgress from "SharedComponents/InProgress";


class Expenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategoryId: undefined,
        }
    }

    handleSelectCategory = (event) => {
        const targetValue = event.target.value;
        const categoryId = parseInt(targetValue);
        const target = targetValue === "reset" ? undefined : categoryId;
        this.setState({selectedCategoryId: target})
    }
    onExpenseDelete = (event) => {
        const idToDelete = parseInt(event.target.id);
        const expenseToDelete = this.props.expenses.find(obj => obj.id === idToDelete);
        const index = this.props.expenses.findIndex((expense) => expense.id === idToDelete);
        if (index !== -1) this.props.expenses.splice(index, 1);
        const path = generatePath(ROUTE_EXPENSES);
        axios.delete(Api.EXPENSES + expenseToDelete.id + '/', expenseToDelete)
            .then(response => {
                this.props.history.push(path);
                this.setState(this.state);
            })
    }

    render() {
        const {selectedCategoryId} = this.state;
        const {
            endDate, startDate, handleStartDate, handleEndDate, handleFilter, expenses,
            categories, handleSort, handleIsCreated, handleUpdate, inProgress, expensesSuccess,
            expensesFetchErrorMessage,handleResetId
        } = this.props;

        const filteredByCategory = expenses.filter(item => item.category === selectedCategoryId);
        const dateFrom = moment(startDate).format("MMM Do YY");
        const dateTo = moment(endDate).format("MMM Do YY");
        const dataToTableDisplay = selectedCategoryId === undefined ? expenses : filteredByCategory;
        const chartLabels = categories.map((category) => category.name);
        const chartValues = [];

        const chartLabelsIfCategorySelected = dataToTableDisplay.map(item => item.name);
        const chartNumbersIfCategorySelected = dataToTableDisplay.map(item => item.amount);

        for (let i = 0; i < categories.length; i++) {
            const barPre = expenses.filter(item => item.category === categories[i].id);
            const barMap = barPre.map(item => item.amount);
            const barSum = barMap.reduce((a, b) => a + b, 0);
            chartValues.push(barSum);
        }
        const displayLength = expenses.length;

        return (
            <Container maxWidth="lg">
                <ScrollToTop smooth color="rgba(231, 130, 0, 0.91)"/>

                <div className="expenses-container">
                    <div className='search-bar'>
                        <div className='expenses-datepicker'>
                            <AppDatepicker
                                handleStartDate={handleStartDate}
                                handleEndDate={handleEndDate}
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </div>
                        <div className="search-icon">
                            <MdYoutubeSearchedFor
                                onClick={function (event) {
                                    handleFilter();
                                    handleIsCreated()
                                }}
                            />
                        </div>
                    </div>
                    <InProgress
                        inProgress={inProgress}
                    />
                    {
                        displayLength === 0 && inProgress === false && expensesSuccess === true && (
                            <div className='no-data'>
                                <p>No data matching selected period <b>{dateFrom} - {dateTo}.</b> Please select
                                    different
                                    dates, or create new expense.</p>
                                <div className='no-data-buttons'>
                                    <SimpleButton
                                        path={ROUTE_EXPENSES_FORM}
                                        label="New expense"
                                        // onClick={handleCreate}
                                    />
                                </div>
                            </div>
                        )
                    }
                    {
                        expensesSuccess === false && (
                            <div className='fetch-error'>
                                <p>{expensesFetchErrorMessage}</p>
                            </div>
                        )
                    }
                    {
                        displayLength > 0 && expensesSuccess === true && (
                            <div>
                                <div className='chart-browser-section'>
                                    <div className='chart-section'>
                                        {
                                            selectedCategoryId === undefined &&
                                            <ExpensesChart
                                                chartLabels={chartLabels}
                                                chartValues={chartValues}
                                            />
                                        }
                                        {
                                            selectedCategoryId !== undefined &&
                                            <ExpensesPieCategoryChart
                                                numbers={chartNumbersIfCategorySelected}
                                                names={chartLabelsIfCategorySelected}
                                            />
                                        }
                                    </div>
                                    <div className='browser-section'>
                                        <SimpleButton
                                            path={ROUTE_EXPENSES_FORM}
                                            label="new expense"
                                        />
                                        <div className="search-section">
                                            <CategoriesSelectOptions
                                                onChange={this.handleSelectCategory}
                                                title="Search by category"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='table-section'>
                                    <ExpensesTable
                                        expenses={dataToTableDisplay}
                                        categories={categories}
                                        handleSort={handleSort}
                                        handleUpdate={handleUpdate}
                                        onDelete={this.onExpenseDelete}
                                        handleResetId={handleResetId}
                                    />
                                </div>
                            </div>
                        )
                    }
                </div>
            </Container>
        )
    }
}
export default withRouter(Expenses);