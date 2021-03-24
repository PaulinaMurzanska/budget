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


class Income extends React.PureComponent {

    onIncomeDelete = (event) => {
        console.log("delete triggered");
        const idToDelete = parseInt(event.target.id);
        console.log(idToDelete);
        const incomeToDelete = this.props.incomes.find(obj => obj.id === idToDelete);
        console.log(incomeToDelete);

        const index = this.props.incomes.findIndex((income) => income.id === idToDelete);
        if (index !== -1) this.props.incomes.splice(index, 1);
        const path = generatePath(ROUTE_INCOME);
        axios.delete(Api.INCOME + incomeToDelete.id + '/', incomeToDelete)
            .then(response => {
                this.props.history.push(path);
                this.setState(this.state);
            })


    }


    render() {

        const {
            handleStartDate, handleEndDate, handleFilter,
            incomes, handleSort, handleSortDate, startDate, endDate, handleUpdate,
            incomesErrorMessage, onSubmit, initialValues,
            handleCreate, handleIsCreated,
        } = this.props;
        const dateFrom = moment(startDate).format("MMM Do YY");
        const dateTo = moment(endDate).format("MMM Do YY");


        const numbers = incomes.map((income) => income.amount);
        const names = incomes.map((income) => income.name);

        const displayLength = incomes.length;


        return (
            <Container maxWidth="lg">
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
                    <h4>{incomesErrorMessage}</h4>

                    {
                        displayLength === 0 && (
                            <div>
                                <p>No data matching selected period <i><u>{dateFrom} {dateTo}.</u></i>  Please select different
                                    dates.</p>
                                <SimpleButton
                                    path={ROUTE_INCOME_FORM}
                                    label="New income"
                                    onClick={handleCreate}
                                />
                            </div>
                        )
                    }
                    {
                        displayLength > 0 && (
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