import React from "react";
import IncomeItem from "components/Income/IncomeItem";
import {Table} from "reactstrap";
import "./IncomeTable.scss";
import {BiSort} from "react-icons/bi";
import SimpleButton from "SharedComponents/SimpleButton";
import {ROUTE_INCOME_FORM} from "Constants/Routes";

const IncomeTable = ({incomes, handleSort, handleSortDate, handleUpdate, onDelete,handleCreate}) => {


    return (

        <table className='income-table-exact'>
            <thead>
            <tr>
                <th
                    id='name'
                    onClick={handleSort}
                >Source of income
                    <BiSort style={{marginLeft: "15px", fontSize: ".7rem"}}/>
                </th>
                <th id='amount'
                    onClick={handleSort}
                >Amount [EUR]
                    <BiSort style={{marginLeft: "15px", fontSize: ".7rem"}}/>
                </th>
                <th id='timestamp' onClick={handleSort}>Date of income
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
        </table>


    )
}
export default IncomeTable;