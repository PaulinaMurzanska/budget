import React from "react";
import {Card, Label, FormGroup} from "reactstrap";
import {Field, Form} from "formik";
import FormHeader from "SharedComponents/FormHeader";
import FormInput from "SharedComponents/FormInput";
import moment from "moment";
import {DatePickerComponent} from "@syncfusion/ej2-react-calendars";

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
                    <Label for='id'>Income name: </Label>
                    <Field
                        component={FormInput}
                        id='name'
                        placeholder="Salary"
                        type='text'
                        name="name"
                        required

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
                        required
                    />
                </div>
                <div className='income-field'>
                    <Label for='id'>Date: </Label>
                    <Field
                        className="date-input"
                        id='timestamp'
                        placeholder={moment(Date.now()).format('MM-DD-YYYY')}
                        type='date'
                        name="timestamp"
                        required

                    />
                </div>


            </div>

        </FormGroup>
    )
}
export default IncomeForm