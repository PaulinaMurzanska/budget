import React from "react";
import "./Income.scss";
import {Container} from "@material-ui/core";
import IncomeChart from "components/Income/MyChart";
import IncomeDatepicker from "components/Income/IncomeDatepicker";
import IncomeTable from "components/Income/IncomeTable";
import moment from "moment";
import {MdYoutubeSearchedFor} from "react-icons/md";
import {ROUTE_INCOME, ROUTE_INCOME_FORM} from "Constants/Routes";
import {generatePath, Link, withRouter} from "react-router-dom";
import {Button, NavItem, NavLink} from "reactstrap";
import axios from "axios";
import {Api} from "Services/Api";
import SimpleButton from "SharedComponents/SimpleButton";


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
            handleStartDate, handleEndDate, handleFilter, names, numbers,
            incomes, handleSort, handleSortDate, startDate, endDate, handleUpdate,
            incomesErrorMessage, onDelete,onSubmit,initialValues
        } = this.props;

        const dateFrom = moment(startDate).format("MMM Do YY");
        const dateTo = moment(endDate).format("MMM Do YY");


        return (
            <Container maxWidth="lg">
                <div className="income-container">
                    <div className='search-bar'>
                        <div className='income-datepicker'>

                            <IncomeDatepicker
                                handleStartDate={handleStartDate}
                                handleEndDate={handleEndDate}
                                // handleFilter={handleFilter}
                                startDate={startDate}
                                endDate={endDate}
                            />


                        </div>
                        <div className="search-icon">
                            <MdYoutubeSearchedFor
                                onClick={handleFilter}
                            />
                        </div>

                    </div>
                    <h4>{incomesErrorMessage}</h4>
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

                            />
                        </div>
                    </div>

                </div>
            </Container>
        )
    }
}

export default withRouter(Income);