import React from "react";
import IncomeItem from "components/Income/IncomeItem";
import {Table} from "reactstrap";
import "./IncomeTable.scss";

const IncomeTable=({incomes, handleSort,handleSortDate})=>{



    return(

            <table className='income-table-exact'>
                    <thead>
                    <tr>
                        <th id='name'
                            onClick={handleSort}
                        >Source of income</th>
                        <th id='amount'
                            onClick={handleSort}
                        >Amount [EUR]</th>
                        <th id='timestamp' onClick={handleSortDate} >Date of income</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        incomes.map((income, index) =>
                            <IncomeItem
                                income={income}
                                key={income.id}

                            />
                        )
                    }

                    </tbody>
                </table>


    )
}
export  default IncomeTable;