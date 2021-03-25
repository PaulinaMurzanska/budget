import React from "react";
import {Field} from "formik";
import {FormGroup, Label} from "reactstrap";
import AppSelectComponent from "SharedComponents/AppSelectComponent";



class CategorySelectField extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const{categories}=this.props;

        return (

            <FormGroup>
                <Label for="category">Type of plant:</Label>
                <Field
                    component={AppSelectComponent}
                    required
                    id="category"
                    items={categories}
                    name="category"
                >
                    <option value='' hidden>Category Type....
                    </option>
                </Field>

            </FormGroup>
        )
    }
}

export default CategorySelectField;