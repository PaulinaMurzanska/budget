import React from "react";
import {FormGroup, Label} from "reactstrap";
import FormHeader from "SharedComponents/FormHeader";
import {Field, Formik} from "formik";
import FormInput from "SharedComponents/FormInput";
import moment from "moment";
import CategorySelectField from "components/Expenses/ExpensesForm/CategorySelectField";
import {ROUTE_CATEGORY, ROUTE_CATEGORY_FORM, ROUTE_CATEGORY_FORM_UPDATE} from "Constants/Routes";
import {Link} from "react-router-dom";
import './Expenses.scss';
import SimpleButton from "SharedComponents/SimpleButton";
import {Container} from "@material-ui/core";

const ExpensesForm = ({title, categories, handleCategoryUpdate}) => {
    return (
        <FormGroup>
            <div className='form-header'>
                <FormHeader
                    title={title}
                />
            </div>
            <div className='expenses-fields'>
                <div className='expenses-field'>
                    <Label for='id'>Expense name: </Label>
                    <Field
                        component={FormInput}
                        id='name'
                        placeholder="grocery"
                        type='text'
                        name="name"
                        required
                    />
                </div>
                <div className='expenses-field'>
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
                <div className='expenses-field'>
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

                <CategorySelectField
                    categories={categories}
                />
            </div>
            <div className='category-buttons'>
                <SimpleButton
                    label="new category"
                    path={ROUTE_CATEGORY_FORM}
                />
                <SimpleButton
                    label="manage category"
                    path={ROUTE_CATEGORY}
                />
            </div>
        </FormGroup>
    )
}
export default ExpensesForm;