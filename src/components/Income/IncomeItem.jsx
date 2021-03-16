import React from "react";
import moment from "moment";
import {AiOutlineEdit} from "react-icons/ai";
import {Link} from "react-router-dom";
import {ROUTE_INCOME_FORM_UPDATE} from "Constants/Routes";

const IncomeItem = ({income, getTimestamp, handleUpdate}) => {

    const {name, amount, timestamp, id} = income;
    const dateOfIncome =moment(timestamp).format("MMM Do YY");

    return (
        <tr>
            <td>{name}</td>
            <td>{amount}</td>
            <td>{dateOfIncome}</td>
            <td>
                <Link to={ROUTE_INCOME_FORM_UPDATE}>
                    <AiOutlineEdit id={id} onClick={handleUpdate}/>
                </Link>
            </td>
        </tr>
    )
}
export default IncomeItem;