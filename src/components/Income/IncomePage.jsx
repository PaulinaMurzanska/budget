import React from "react";
import Income from "components/Income/Income";
import withIncome from "components/Income/WithIncome";
import {generatePath, Route, Switch, withRouter} from "react-router-dom";
import {ROUTE_INCOME, ROUTE_INCOME_FORM, ROUTE_INCOME_FORM_UPDATE} from "Constants/Routes";
import IncomeFormCard from "components/Income/IncomeForm/IncomeFormCard";
import moment from "moment";
import axios from "axios";
import {Api} from "Services/Api";

const errorCreate =" An error occured while creating new income. It may be caused by one of the following causes:" +
    "1. You haven't completed all required fields.Try again."+
    "2. An internal server error occured. Check your Internet connection."+
    "3. An external server occured. Try to reload the page one or several times."


class IncomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: undefined,
            sortDirection: true,
            incomesErrorMessage: "",
            incomesFilteredInFetch: [],
            isCreatedOrUpdated: false,
            isUpdated: false,

            incomeIdToUpdate: undefined,
            selectedIncomeToUpdate: [],
            incomesToDisplay: [],

            nameCreate: "",
            idCreate: 0,
            amountCreate: 0,
            timestampCreate: Date.now(),
        }

    }

    componentDidMount() {
        this.props.fetchIncome()

    }
    handleIsCreated=()=>{
        console.log("is created handler trigered");
        this.setState({isCreatedOrUpdated:false})
    }

    handleSort = (event) => {
        const sortBy = event.target.id;
        this.setState({
            sortBy: sortBy,
            sortDirection: !this.state.sortDirection,
        })
    }
    handleCreate = () => {
        this.setState({incomeIdToUpdate: undefined})
    }

    onSubmitIncomeCreate = (income) => {
        const path = generatePath(ROUTE_INCOME);

        axios.post(Api.INCOME, income)
            .then((response) => {
                const data = response.data;
                const income = data;
                const incomesCopy = [...this.props.incomes];
                incomesCopy.push(income);
                this.setState({
                    incomesToDisplay: incomesCopy, isCreatedOrUpdated: true,

                });
                this.props.history.push(path);
            })
            .catch((error) => {
                this.props.history.push(path);
                this.setState({
                    incomesErrorMessage: errorCreate,
                    isCreatedOrUpdated: true
                });
            });
    };

    handleUpdate = (event) => {
        const targetId = parseInt(event.currentTarget.id);
        const createdOrUpdated =this.state.isCreatedOrUpdated;
        const incomesToDisplay = this.state.incomesToDisplay;
        const incomes= this.props.incomes;
           console.log(createdOrUpdated);

        console.log(incomesToDisplay);
        console.log(incomes);

        const incomeToUpdate = createdOrUpdated ?
              incomesToDisplay.find(obj =>obj.id === targetId) :
            incomes.find(obj=>obj.id===targetId);
        console.log(incomeToUpdate);
        this.setState({
            selectedIncomeToUpdate: incomeToUpdate,
            incomeIdToUpdate: targetId,

        });
    };

    onSubmitMyIncomeUpdate = (income) => {
        const path = generatePath(ROUTE_INCOME);

        axios.put(Api.INCOME + income.id + '/', income)
            .then((response) => {
                const data = response.data;
                const income = data;
                console.log(this.state.isCreatedOrUpdated );
                const incomesCopy = this.state.isCreatedOrUpdated ?
                    [...this.state.incomesToDisplay] :
                    [...this.props.incomes];
                console.log(incomesCopy);
                const getIndex = incomesCopy.findIndex(item => item.id === income.id);
                console.log(getIndex);
                incomesCopy[getIndex] = income;
                this.setState({
                    incomesToDisplay: incomesCopy,
                    isCreatedOrUpdated:true,

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
        const {
            sortDirection, selectedIncomeToUpdate, incomeIdToUpdate,
            incomesToDisplay, incomesErrorMessage,isCreatedOrUpdated
        } = this.state;
        const {
            incomes, handleIncomesFilter, handleSelectedEndDate,isFiltered,incomesSuccess,
            handleSelectedStartDate,startDate, endDate, incomesFilteredInFetch,inProgress,
            incomesFetchErrorMessage,
        } = this.props;

        const preSort = ()=>{
            if(isCreatedOrUpdated===true){
                return incomesToDisplay;
            }
            if(isCreatedOrUpdated===false){
                return incomes;
            }
            if(isCreatedOrUpdated===true && isFiltered===true){
                return incomesToDisplay;
            }
            if(isCreatedOrUpdated===false && isFiltered===true){
                return incomes
            }
            if(isCreatedOrUpdated===false && isFiltered===false){
                return incomes
            }
        };

        const incomesToDisplayToSort=preSort();

        const multiplier = sortDirection ? 1 : -1;
        const sortedIncomes = incomesToDisplayToSort.sort((item1, item2) => {
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

        const {name, id, timestamp, amount} = selectedIncomeToUpdate;
        const initialValuesToCreate = {
            name: "",
            id: undefined,
            amount: undefined,
            timestamp: moment(Date.now()).format('MM-DD-YYYY'),
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
                        incomes={sortedIncomes}
                        startDate={startDate}
                        endDate={endDate}
                        handleUpdate={this.handleUpdate}
                        incomesErrorMessage={incomesErrorMessage}
                        onDelete={this.onIncomeDelete}
                        incomesFilteredInFetch={incomesFilteredInFetch}
                        isFiltered={isFiltered}
                        isCreatedOrUpdated={isCreatedOrUpdated}
                        handleCreate={this.handleCreate}
                        handleIsCreated={this.handleIsCreated}
                        incomeToChartDisplay={incomesToDisplayToSort}
                        inProgress={inProgress}
                        incomesFetchErrorMessage={incomesFetchErrorMessage}
                        incomesSuccess={incomesSuccess}

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