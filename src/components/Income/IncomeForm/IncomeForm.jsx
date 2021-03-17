import React from "react";
import {Card, Label, FormGroup} from "reactstrap";
import {Field, Form} from "formik";
import FormHeader from "SharedComponents/FormHeader";
import FormInput from "SharedComponents/FormInput";

const IncomeForm = ({title}) => {
    return (
        <FormGroup>
            <div className="form-header">
                <FormHeader
                    title={title}
                />
            </div>
            <div className='income-fields'>
                <div className='income-field'>
                    <Label for='id'>Your income name: </Label>
                    <Field
                        component={FormInput}
                        id='name'
                        placeholder="Salary"
                        type='text'
                        name="name"
                    />
                </div>
                <div className='income-field'>
                    <Label for='id'>Amount: </Label>
                    <Field
                        component={FormInput}
                        id='amount'
                        placeholder="1000"
                        type='number'
                        name="amount"
                    />
                </div>
                <div className='income-field'>
                    <Label for='id'>Date of income: </Label>
                    <Field
                        component={FormInput}
                        id='timestamp'
                        placeholder="Salary"
                        type='date'
                        name="timestamp"
                    />
                </div>


            </div>

        </FormGroup>
    )
}
export default IncomeForm