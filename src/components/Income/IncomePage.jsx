import React from "react";
import Income from "components/Income/Income";
import withIncome from "components/Income/WithIncome";
import {generatePath, Route, Switch, withRouter} from "react-router-dom";
import {ROUTE_INCOME, ROUTE_INCOME_FORM, ROUTE_INCOME_FORM_UPDATE} from "Constants/Routes";
import IncomeFormCard from "components/Income/IncomeForm/IncomeFormCard";
import moment from "moment";
import axios from "axios";
import {Api} from "Services/Api";


class IncomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: undefined,
            sortDirection: true,
            // incomes:this.props.incomes,
            incomesErrorMessage: "",
            incomesFilteredInFetch: [],
            isCreatedOrUpdated: false,
            isUpdated: false,
            incomeIdToUpdate: undefined,
            selectedIncomeToUpdate: [],


            name: "Income",
            id: 0,
            amount: 0,
            timestamp: Date.now(),
        }
    }

    componentDidMount() {
        console.log("component did mount");
        this.props.fetchIncome()
    }

    handleSort = (event) => {
        const sortBy = event.target.id;
        this.setState({
            sortBy: sortBy,
            sortDirection: !this.state.sortDirection,
        })
    }

    onSubmitIncomeCreate = (income) => {
        console.log('income create triggered');
        console.log(income);
        const path = generatePath(ROUTE_INCOME);

        axios.post(Api.INCOME, income)
            .then((response) => {
                const data = response.data;
                const income = data;
                const incomes = [...this.props.incomesFilteredInFetch];
                incomes.push(income);
                this.setState({incomesFilteredInFetch: incomes, isCreatedOrUpdated: true,});
                this.props.history.push(path);
            })
            .catch((error) => {
                const incomesErrorMessage = "Error creating income";
                this.props.history.push(path);
                this.setState({
                    incomesErrorMessage: incomesErrorMessage,
                });
            });
    };

    handleUpdate = (event) => {
        const targetId = parseInt(event.target.id);
        const incomeToUpdate = this.props.incomes.find(obj => obj.id === targetId);
        console.log(incomeToUpdate);
        this.setState({
            incomeIdToUpdate: targetId,
            selectedIncomeToUpdate: incomeToUpdate,
        })

    }

    onSubmitMyIncomeUpdate = (income) => {

        const path = generatePath(ROUTE_INCOME);

        axios.put(Api.INCOME + income.id + '/', income)
            .then((response) => {
                const data = response.data;
                const income = data;
                const incomes = [...this.props.incomesFilteredInFetch];
                const getIndex = incomes.findIndex(item => item.id === income.id);
                incomes[getIndex] = income;
                this.setState({
                    incomesFilteredInFetch: incomes,
                    isCreatedOrUpdated: true,
                });
                this.props.history.push(path);
            })
            .catch((error) => {
                const incomesErrorMessage = "Error updating income";
                this.props.history.push(path);
                this.setState({
                    incomesErrorMessage: incomesErrorMessage,
                });
            });
    };


    render() {
        const {sortDirection, isCreatedOrUpdated, selectedIncomeToUpdate, incomeIdToUpdate, incomesErrorMessage} = this.state;
        const {name, id, timestamp, amount} = selectedIncomeToUpdate;
        console.log(name, id, timestamp, amount, incomeIdToUpdate);
        const {
            incomes, handleIncomesFilter, handleSelectedEndDate,
            handleSelectedStartDate, isFiltered, startDate, endDate, incomesFilteredInFetch
        } = this.props;

        const numbersDefault = incomesFilteredInFetch.map((income) => income.amount);
        const namesDefault = incomesFilteredInFetch.map((income) => income.name);
        const numbersFiltered = incomes.map((income) => income.amount);
        const namesFiltered = incomes.map((income) => income.name);
        const numbers = isFiltered ? numbersFiltered : numbersDefault;
        const names = isFiltered ? namesFiltered : namesDefault;
        const incomeToDisplayDefault = isFiltered ? incomes : incomesFilteredInFetch;
        const incomeToDisplayIfCreated = this.state.incomesFilteredInFetch;
        const incomeToDisplay = isCreatedOrUpdated ? incomeToDisplayIfCreated : incomeToDisplayDefault;
        const multiplier = sortDirection ? 1 : -1;

        const sortedIncomes = incomeToDisplay.sort((item1, item2) => {
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
            name: this.state.name,
            id: this.state.id,
            amount: this.state.amount,
            timestamp: moment(this.state.timestamp).format('MM-DD-YYYY'),
        }
        const initialValuesToUpdate = {
            name: name,
            id: id,
            amount: amount,
            timestamp: timestamp,
        }
        const initialValues = incomeIdToUpdate === undefined ? initialValuesToCreate : initialValuesToUpdate;

        return (
            <Switch>
                <Route exact path={ROUTE_INCOME}>
                    <Income
                        handleStartDate={handleSelectedStartDate}
                        handleEndDate={handleSelectedEndDate}
                        handleFilter={handleIncomesFilter}
                        handleSort={this.handleSort}
                        names={names}
                        numbers={numbers}
                        incomes={sortedIncomes}
                        startDate={startDate}
                        endDate={endDate}
                        handleUpdate={this.handleUpdate}
                        incomesErrorMessage={incomesErrorMessage}
                        onDelete={this.onIncomeDelete}
                    />
                </Route>
                <Route exact path={ROUTE_INCOME_FORM}>
                    <IncomeFormCard
                        title="Create new income"
                        incomes={incomes}
                        initialValues={initialValues}
                        onSubmit={this.onSubmitIncomeCreate}
                    />
                </Route>
                <Route exact path={ROUTE_INCOME_FORM_UPDATE}>
                    <IncomeFormCard
                        title="Update income"
                        incomes={incomes}
                        initialValues={initialValues}
                        onSubmit={this.onSubmitMyIncomeUpdate}
                    />

                </Route>


            </Switch>

        )
    }
}

export default withRouter(withIncome(IncomePage));