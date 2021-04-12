import React from "react";
import IncomeItem from "components/Income/IncomeItem";
import "./IncomeTable.scss";
import {BiSort} from "react-icons/bi";
import SimpleButton from "SharedComponents/SimpleButton";
import {ROUTE_INCOME_FORM} from "Constants/Routes";
import {Table} from "reactstrap";

const IncomeTable = ({incomes, handleSort,handleUpdate, onDelete,handleCreate}) => {

    return (
        <Table  striped className='income-table-exact'>
            <thead>
            <tr>
                <th
                    id='name'
                    onClick={handleSort}
                >Income name
                    <BiSort style={{marginLeft: "15px", fontSize: ".7rem"}}/>
                </th>
                <th id='amount'
                    onClick={handleSort}
                >Amount [EUR]
                    <BiSort style={{marginLeft: "15px", fontSize: ".7rem"}}/>
                </th>
                <th id='timestamp' onClick={handleSort}>Date
                    <BiSort style={{marginLeft: "15px", fontSize: ".7rem"}}/>
                </th>
                <th colSpan={2}>
                    <SimpleButton
                    path={ROUTE_INCOME_FORM}
                    label="New income"
                    onClick={handleCreate}
                />
                </th>
            </tr>
            </thead>
            <tbody>
            {
                incomes.map((income, index) =>
                    <IncomeItem
                        income={income}
                        key={income.id}
                        handleUpdate={handleUpdate}
                        onDelete={onDelete}
                    />
                )
            }
            </tbody>
        </Table>
    )
}
export default IncomeTable;