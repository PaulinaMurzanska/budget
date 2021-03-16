import React from "react";
import {DatePickerComponent} from "@syncfusion/ej2-react-calendars";
import moment from "moment";
import "./Income.scss";

const IncomeDatepicker = ({handleStartDate, handleEndDate, startDate,endDate}) => {
    const dateFrom = moment(startDate).format("MMM Do YY");
    const dateTo = moment(endDate).format("MMM Do YY");

    return (
        <React.Fragment>
            <div className='my-datepicker' >
                <p>FROM:</p>
                <DatePickerComponent
                    onChange={handleStartDate}
                    format='MMM-dd-yy'
                    placeholder={dateFrom}
                />
            </div>

            <div className='my-datepicker' >
                <p>TO:</p>
                <DatePickerComponent
                    onChange={handleEndDate}
                    format='MMM-dd-yy'
                    placeholder={dateTo}
                />
            </div>
        </React.Fragment>

    )
}
export default IncomeDatepicker;