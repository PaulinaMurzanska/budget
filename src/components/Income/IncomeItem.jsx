import React from "react";
import moment from "moment";

const IncomeItem = ({income, getTimestamp}) =>{

    const{name, amount, timestamp} = income;
    // const customDate = moment(timestamp).format("MMM Do YY");

    return(
        <tr>
            <td>{name}</td>
            <td>{amount}</td>
            <td id={timestamp} onClick={getTimestamp}>{timestamp}</td>
        </tr>
    )
}
export default IncomeItem;