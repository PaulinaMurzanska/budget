import React from "react";
import moment from "moment";


const getCategoryName = (categories, category) => {
    const index = categories.findIndex((item) => item.id === category);
    if (index < 0) {
        return 'undefined';
    }
    return categories[index].name;
}



const ExpensesTableRow = ({expense, categories}) => {
    const {name, category, amount, timestamp} = expense;
    const date = moment(timestamp).format("MMM do YY");





    return (
        <React.Fragment>
            <tr>
                <td>{name}</td>
                <td>{amount}</td>
                <td>{getCategoryName(categories, category)}</td>
                <td>{date}</td>
            </tr>
        </React.Fragment>
    )

}
export default ExpensesTableRow;