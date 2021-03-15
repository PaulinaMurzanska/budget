import React from "react";
import axios from "axios";
import {Api} from "Services/Api";

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
            console.log('fetch triggered');
            this.setState({incomeInProgress: true});
            return delayFetch(fetch_delay_simulator, (resolve, reject) => {
                return axios.get(Api.INCOME)
                    .then((response) => {
                        const data = response.data;
                        const incomes = data.map((item) => ({
                            name: item.name, id: item.id,
                            amount: item.amount, timestamp: item.timestamp
                        }));
                        console.log(incomes);
                        const incomesFilteredInFetch = incomes.filter(item => new Date(item.timestamp).getTime() > this.state.startDate);
                        console.log(incomesFilteredInFetch);

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

        handleIncomesFilter = (e) => {
            console.log("income filter triggered");
            console.log(e.target);
            const newIncomes = this.state.incomes;
            const endDate = new Date(this.state.endDate).getTime();
            const startDate = new Date(this.state.startDate).getTime();
            const filteredData = newIncomes.filter((income) => {
                const time = new Date(income.timestamp).getTime();
                if (time > startDate && time < endDate) {
                    return time
                }
            })

            this.setState({
                filteredIncomes: filteredData,
                isFiltered: true,
            })
        }

        handleSelectedStartDate = (e) => {
            console.log("start date trigered");
            const startDate = e.target.value;
            const startDateFormat = new Date(startDate).getTime();
            this.setState({startDate: startDateFormat})
        }

        handleSelectedEndDate = (e) => {
            const endDate = e.target.value;
            const endDateFormat = new Date(endDate).getTime();
            this.setState({endDate: endDateFormat})
        }

        render() {
            const {isFiltered, incomes, filteredIncomes} = this.state;
            const incomesToDisplay = isFiltered ? filteredIncomes : incomes;
            return (
                <WrappedComponent
                    {...this.state}
                    {...this.props}
                    fetchIncome={this.fetchIncome}
                    handleIncomesFilter={this.handleIncomesFilter}
                    handleSelectedStartDate={this.handleSelectedStartDate}
                    handleSelectedEndDate={this.handleSelectedEndDate}
                    incomes={incomesToDisplay}
                />
            )
        }

    }
}
export default withIncome;