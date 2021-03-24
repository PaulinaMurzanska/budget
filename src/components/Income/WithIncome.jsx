import React from "react";
import axios from "axios";
import {Api} from "Services/Api";
import {withRouter, generatePath} from "react-router-dom";
import {ROUTE_INCOME} from "Constants/Routes";
import moment from "moment";


const fetch_delay_simulator = 500;
const delayFetch = (ms, func) => {
    return new Promise((resolve, reject) => setTimeout(() => func(resolve, reject), ms));
}
const monthInMilSec = 2582000000;

const withIncome = (WrappedComponent) => {
    return class extends React.Component {
        state = {
            incomeInProgress: false,
            incomes: [],
            incomesFilteredInFetch: [],
            incomesSuccess: undefined,
            startDate: Date.now() - monthInMilSec,
            endDate: Date.now(),
            isFiltered: false,
            filteredIncomes: [],

        }

        fetchIncome = () => {
            this.setState({incomeInProgress: true});
            return delayFetch(fetch_delay_simulator, (resolve, reject) => {
                return axios.get(Api.INCOME)
                    .then((response) => {
                        const data = response.data;
                        const incomes = data.map((item) => ({
                            name: item.name, id: item.id,
                            amount: item.amount, timestamp: item.timestamp
                        }));
                        const incomesFilteredInFetch = incomes.filter(item => new Date(item.timestamp).getTime() > this.state.startDate);
                        const incomesSuccess = true;
                        this.setState({incomes, incomesSuccess, incomesFilteredInFetch});
                        resolve();
                    })
                    .catch((error) => {
                        this.setState({incomesSuccess: false});
                        reject();
                    })
            }).finally(() => {
                this.setState({incomeInProgress: false});
            })
        }
        handleSelectedStartDate = (e) => {
            console.log('start date triggered');
            const startDate = e.target.value;
            const startDateFormat = new Date(startDate).getTime();
            this.setState({
                startDate: startDateFormat,

            })
        }

        handleSelectedEndDate = (e) => {
            console.log('end date triggered');

            const endDate = e.target.value;
            const endDateFormat = new Date(endDate).getTime();
            this.setState({
                endDate: endDateFormat,


            })
        }

        handleIncomesFilter = (e) => {
            console.log('filter triggered');

            const newIncomes = this.state.incomes;
            const endDate = new Date(this.state.endDate).getTime();
            const startDate = new Date(this.state.startDate).getTime();
            const filteredData = newIncomes.filter((income) => {
                const time = new Date(income.timestamp).getTime();
                if (time >= startDate && time <= endDate) {
                    return time
                }
            })
            this.setState({
                filteredIncomes: filteredData,
                isFiltered: true,
            })
        }


        render() {
            const {isFiltered, incomesFilteredInFetch, filteredIncomes, startDate, endDate, incomeInProgress, incomesSuccess} = this.state;
            const incomesToDisplay = isFiltered ? filteredIncomes : incomesFilteredInFetch;
            return (
                <WrappedComponent
                    {...this.state}
                    {...this.props}
                    fetchIncome={this.fetchIncome}
                    handleIncomesFilter={this.handleIncomesFilter}
                    handleSelectedStartDate={this.handleSelectedStartDate}
                    handleSelectedEndDate={this.handleSelectedEndDate}
                    incomes={incomesToDisplay}
                    startDate={startDate}
                    endDate={endDate}
                    incomeInProgress={incomeInProgress}
                    incomesSuccess={incomesSuccess}

                />
            )
        }

    }
}
export default withIncome;