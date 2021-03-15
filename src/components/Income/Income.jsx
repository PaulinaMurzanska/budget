import React from "react";
import "./Income.scss";
import {Container} from "@material-ui/core";
import IncomeChart from "components/Income/MyChart";
import IncomeDatepicker from "components/Income/IncomeDatepicker";
import IncomeTable from "components/Income/IncomeTable";
import moment from "moment";



class Income extends React.PureComponent {


    render() {

        const {handleStartDate,handleEndDate,handleFilter,names,numbers,
            incomes,handleSort,handleSortDate, startDate,endDate,handleSubmit}=this.props;

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
                            />
                             <button id2={startDate} id={endDate} onClick={handleFilter}>search</button>


                        </div>
                        <div className='income-page-title'>
                            <p>Selected period of time {dateFrom} to {dateTo}</p>
                        </div>
                    </div>
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
                            />
                        </div>
                    </div>

                </div>
            </Container>
        )
    }
}

export default Income;