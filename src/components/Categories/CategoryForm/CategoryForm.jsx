import React from "react";
import {Card, Label, FormGroup} from "reactstrap";
import {Field, Form} from "formik";
import FormHeader from "SharedComponents/FormHeader";
import FormInput from "SharedComponents/FormInput";

const CategoryForm = ({title}) => {

    return (
        <FormGroup>
            <div className="form-header">
                <FormHeader
                    title={title}
                />
            </div>
            <div className='category-fields'>
                <div className='category-field'>
                    <Label for='id'>Your Category name: </Label>
                    <Field
                        component={FormInput}
                        id='category'
                        placeholder="Bills"
                        type='text'
                        name="name"
                    />
                </div>
            </div>

        </FormGroup>
    )
}
export default CategoryForm;