import React from "react";
import "./Income.scss";
import {Container} from "@material-ui/core";
import IncomeChart from "components/Income/MyChart";
import IncomeDatepicker from "components/Income/IncomeDatepicker";
import IncomeTable from "components/Income/IncomeTable";
import moment from "moment";
import {MdYoutubeSearchedFor} from "react-icons/md";
import {ROUTE_INCOME_FORM} from "Constants/Routes";
import {Link} from "react-router-dom";
import {Button, NavItem, NavLink} from "reactstrap";


class Income extends React.PureComponent {


    render() {

        const {
            handleStartDate, handleEndDate, handleFilter, names, numbers,
            incomes, handleSort, handleSortDate, startDate, endDate,handleUpdate,incomesErrorMessage
        } = this.props;

        const dateFrom = moment(startDate).format("MMM Do YY");
        const dateTo = moment(endDate).format("MMM Do YY");
        console.log(dateTo);
        console.log(dateFrom);

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
                            <Button>
                                <Link to={ROUTE_INCOME_FORM}>add new</Link>
                            </Button>

                            <IncomeTable
                                incomes={incomes}
                                handleSort={handleSort}
                                handleSortDate={handleSortDate}
                                handleUpdate={handleUpdate}
                            />
                        </div>
                    </div>

                </div>
            </Container>
        )
    }
}

export default Income;