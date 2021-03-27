import React from "react";
import {Field} from "formik";
import {FormGroup, Label} from "reactstrap";
import AppSelectComponent from "SharedComponents/AppSelectComponent";
import "../ExpensesForm/Expenses.scss";

class CategorySelectField extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {categories} = this.props;

        return (

            <FormGroup>
                <div className='expenses-field'>
                    <Label className='category-select-label' for="category">Category</Label>
                    <Field className='category-select-input'
                        component={AppSelectComponent}
                        required
                        id="category"
                        items={categories}
                        name="category"
                    >
                        <option className='category-option' value='' hidden>Category Type....
                        </option>
                    </Field>
                </div>

            </FormGroup>
        )
    }
}

export default CategorySelectField;