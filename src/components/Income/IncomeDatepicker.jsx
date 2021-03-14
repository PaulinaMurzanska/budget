import React from "react";
import {DatePickerComponent} from "@syncfusion/ej2-react-calendars";
import {Container} from "@material-ui/core";

const IncomeDatepicker =({handleStartDate,handleEndDate,handleFilter})=>{
    return(
        <React.Fragment>
            <div className='my-datepicker' style={{width: "150px"}}>
                    <DatePickerComponent
                        onChange={handleStartDate}
                        format='MMM-dd-yy'
                        placeholder="start date"
                    />
                </div>
                <div className='my-datepicker' style={{width: "150px"}}>
                    <DatePickerComponent
                        onChange={handleEndDate}
                        format='MMM-dd-yy'
                        placeholder="end date"
                    />
                </div>
                <button onClick={handleFilter}>search</button>
        </React.Fragment>

    )
}
export default IncomeDatepicker;