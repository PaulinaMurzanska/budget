import React from "react";
import axios from "axios";
import {Api} from "Services/Api";


const fetch_delay_simulator = 500;
const delayFetch = (ms, func) => {
    return new Promise((resolve, reject) => setTimeout(() => func(resolve, reject), ms));
}
const monthInMilSec = 2582000000;

const WithExpenses = (WrappedComponent) => {
    return class extends React.Component {
        state = {
            expensesInProgress: false,
            expenses: [],
            expensesSuccess: undefined,
            startDate: Date.now() - monthInMilSec,
            endDate: Date.now(),
            expensesFilteredInFetch: [],
            isFiltered: false,
            filteredExpenses: [],
        }

        fetchExpenses = () => {
            console.log('fetch expenses triggered');
            this.setState({expensesInProgress: true});
            return delayFetch(fetch_delay_simulator, (resolve, reject) => {
                return axios.get(Api.EXPENSES)
                    .then((response) => {
                        const data = response.data;
                        console.log(data);
                        const expenses = data.map((item) => ({
                            name: item.name, id: item.id,
                            amount: item.amount, timestamp: item.timestamp, category: item.category
                        }));
                        const expensesFilteredInFetch = expenses.filter(item => new Date(item.timestamp).getTime() > this.state.startDate);
                        const expensesSuccess = true;
                        this.setState({expenses, expensesSuccess, expensesFilteredInFetch});
                        resolve();
                    })
                    .catch((error) => {
                        this.setState({expensesSuccess: false});
                        reject();
                    })
            }).finally(() => {
                this.setState({expensesInProgress: false});
            })
        }
        handleSelectedStartDate = (e) => {
            const startDate = e.target.value;
            const startDateFormat = new Date(startDate).getTime();
            this.setState({
                startDate: startDateFormat,

            })
        }

        handleSelectedEndDate = (e) => {
            const endDate = e.target.value;
            const endDateFormat = new Date(endDate).getTime();
            this.setState({
                endDate: endDateFormat,


            })
        }

        handleExpensesFilter = (e) => {
            const newExpenses = this.state.expenses;
            const endDate = new Date(this.state.endDate).getTime();
            const startDate = new Date(this.state.startDate).getTime();
            const filteredData = newExpenses.filter((expense) => {
                const time = new Date(expense.timestamp).getTime();
                if (time >= startDate && time <= endDate) {
                    return time
                }
            })
            this.setState({
                filteredExpenses: filteredData,
                isFiltered: true,
            })
        }


        render() {
            const {
                expensesInProgress, expenses, expensesSuccess, startDate, endDate, expensesFilteredInFetch,
                isFiltered, filteredExpenses
            } = this.state;
            const expensesToDisplay = isFiltered ? filteredExpenses : expensesFilteredInFetch;
            return (
                <WrappedComponent
                    {...this.state}
                    {...this.props}
                    fetchExpenses={this.fetchExpenses}
                    expenses={expensesToDisplay}
                    expensesTotal={expenses}
                    startDate={startDate}
                    endDate={endDate}
                    handleEndDate={this.handleSelectedEndDate}
                    handleStartDate={this.handleSelectedStartDate}
                    handleFilter={this.handleExpensesFilter}


                />
            )
        }
    }
}
export default WithExpenses;