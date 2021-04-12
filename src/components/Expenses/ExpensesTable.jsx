import React from "react";
import {Table} from "reactstrap";
import ExpensesTableRow from "components/Expenses/ExpensesTableRow";
import "./ExpensesTable.scss";
import {BiSort} from "react-icons/bi";
import SimpleButton from "SharedComponents/SimpleButton";
import {ROUTE_EXPENSES_FORM, ROUTE_INCOME_FORM} from "Constants/Routes";


const ExpensesTable = ({expenses, categories, handleSort, handleUpdate, onDelete,handleResetId}) => {
    return (
        <Table striped className='expenses-exact-table'>
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
                <th colSpan={2}>
                    <SimpleButton
                        path={ROUTE_EXPENSES_FORM}
                        label="New expense"
                        onClick={handleResetId}

                    />
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
                        handleUpdate={handleUpdate}
                        onDelete={onDelete}
                    />
                )
            }
            </tbody>
        </Table>
    )
}
export default ExpensesTable;