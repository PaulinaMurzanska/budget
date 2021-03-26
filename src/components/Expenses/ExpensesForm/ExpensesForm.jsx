import React from "react";
import {FormGroup, Label} from "reactstrap";
import FormHeader from "SharedComponents/FormHeader";
import {Field, Formik} from "formik";
import FormInput from "SharedComponents/FormInput";
import moment from "moment";
import CategorySelectField from "components/Expenses/ExpensesForm/CategorySelectField";
import {ROUTE_CATEGORY, ROUTE_CATEGORY_FORM, ROUTE_CATEGORY_FORM_UPDATE} from "Constants/Routes";
import {Link} from "react-router-dom";

const ExpensesForm = ({title, categories,handleCategoryUpdate}) => {
    return (
        <FormGroup>
            <div className='form-header'>
                <FormHeader
                    title={title}
                />
            </div>
            <div className='expenses-fields'>
                <div className='income-field'>
                    <Label for='id'>Your expense name: </Label>
                    <Field
                        component={FormInput}
                        id='name'
                        placeholder="grocery"
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
                    <Label for='id'>Date of income: </Label>
                    <Field
                        // component={FormInput}
                        id='timestamp'
                        placeholder={moment(Date.now()).format('MM-DD-YYYY')}
                        type='date'
                        name="timestamp"
                        required

                    />
                </div>
                <div className='income-field'>
                    <CategorySelectField
                        categories={categories}
                    />

                </div>


            </div>
            <button>
                <Link to={ROUTE_CATEGORY_FORM}>add new category</Link>
            </button>
            <button  >
                <Link to={ROUTE_CATEGORY}>update category</Link>
            </button>


        </FormGroup>
    )
}
export default ExpensesForm;