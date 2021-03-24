import React from "react";
import {Table} from "reactstrap";
import ExpensesTableRow from "components/Expenses/ExpensesTableRow";
import "./ExpensesTable.scss";
import {BiSort} from "react-icons/bi";


const ExpensesTable = ({expenses, categories, handleSort}) => {
    console.log(expenses);
    return (
        <Table className='expenses-exact-table'>
            <thead>
            <tr>
                <th id='name'
                    onClick={handleSort}
                >name
                    <BiSort style={{marginLeft: "15px", fontSize: ".7rem"}}/>
                </th>
                <th id='amount'
                    onClick={handleSort}
                >amount
                    <BiSort style={{marginLeft: "15px", fontSize: ".7rem"}}/>
                </th>
                <th id="category" onClick={handleSort}
                >category
                    <BiSort style={{marginLeft: "15px", fontSize: ".7rem"}}/>
                </th>
                <th id='timestamp' onClick={handleSort}
                >date
                    <BiSort style={{marginLeft: "15px", fontSize: ".7rem"}}/>
                </th>
            </tr>
            </thead>
            <tbody>
            {
                expenses.map((item) =>
                    <ExpensesTableRow
                        expense={item}
                        key={item.id}
                        categories={categories}
                    />
                )
            }
            </tbody>
        </Table>
    )

}
export default ExpensesTable;