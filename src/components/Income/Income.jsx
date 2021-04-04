import React from "react";
import "./Income.scss";
import {Container} from "@material-ui/core";
import IncomeChart from "components/Income/MyChart";
import IncomeTable from "components/Income/IncomeTable";
import moment from "moment";
import {MdYoutubeSearchedFor} from "react-icons/md";
import {ROUTE_INCOME, ROUTE_INCOME_FORM} from "Constants/Routes";
import {generatePath, Link, withRouter} from "react-router-dom";
import axios from "axios";
import {Api} from "Services/Api";
import SimpleButton from "SharedComponents/SimpleButton";
import AppDatepicker from "components/Income/IncomeDatepicker";
import ScrollToTop from "react-scroll-to-top";
import InProgress from "SharedComponents/InProgress";


class Income extends React.PureComponent {

    onIncomeDelete = (event) => {
        const idToDelete = parseInt(event.target.id);
        const incomeToDelete = this.props.incomes.find(obj => obj.id === idToDelete);

        const index = this.props.incomes.findIndex((income) => income.id === idToDelete);
        if (index !== -1) this.props.incomes.splice(index, 1);
        const path = generatePath(ROUTE_INCOME);
        axios.delete(Api.INCOME + incomeToDelete.id + '/', incomeToDelete)
            .then(response => {
                this.props.history.push(path);
                this.setState(this.state);
            })
    }
    setDefaultDates=(e)=>{
        window.location.reload();
    }

    render() {


        const {
            handleStartDate, handleEndDate, handleFilter,
            incomes, handleSort, handleSortDate, startDate, endDate, handleUpdate,
            incomesErrorMessage, onSubmit, initialValues,incomesSuccess,incomesFetchErrorMessage,
            handleCreate, handleIsCreated, inProgress,
        } = this.props;
        console.log(inProgress);
        console.log(incomesSuccess);
        const dateFrom = moment(startDate).format("MMM Do YY");
        const dateTo = moment(endDate).format("MMM Do YY");

        const numbers = incomes.map((income) => income.amount);
        const names = incomes.map((income) => income.name);

        const displayLength = incomes.length;

        return (
            <Container maxWidth="lg">
                <ScrollToTop smooth color="rgba(231, 130, 0, 0.91)"/>
                <div className="income-container">
                    <div className='search-bar'>
                        <div className='income-datepicker'>
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
                        displayLength === 0 && inProgress === false && incomesSuccess===true &&
                            <div className='no-data'>
                                <p>No data matching selected period <b>{dateFrom} - {dateTo}.</b> Please select
                                    different
                                    dates, or create new income.</p>
                                <div className='no-data-buttons'>
                                      <SimpleButton
                                    path={ROUTE_INCOME_FORM}
                                    label="New income"
                                    onClick={handleCreate}
                                />
                                <SimpleButton
                                    label="Last 30 days"
                                    onClick={this.setDefaultDates}
                                />
                                </div>


                            </div>

                    }
                    {
                        incomesSuccess===false && (
                           <p> {incomesFetchErrorMessage}</p>
                        )
                    }
                    {
                        incomesSuccess===true && displayLength > 0 &&(
                            <div className='chart-table-section'>
                                <div className='income-chart'>
                                    <IncomeChart
                                        names={names}
                                        numbers={numbers}
                                    />
                                </div>

                                <div className='income-table'>
                                    <IncomeTable
                                        incomes={incomes}
                                        handleSort={handleSort}
                                        handleSortDate={handleSortDate}
                                        handleUpdate={handleUpdate}
                                        onDelete={this.onIncomeDelete}
                                        initialValues={initialValues}
                                        onSubmit={onSubmit}
                                        handleCreate={handleCreate}
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

export default withRouter(Income);