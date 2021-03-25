import React from "react";
import {Form, Formik} from 'formik';
import {Container} from "@material-ui/core";
import ExpensesForm from "components/Expenses/ExpensesForm/ExpensesForm";
import Buttons from "SharedComponents/Buttons";


class ExpensesFormCard extends React.Component {
    render() {
        const {initialValues} = this.props;
        const key = 0;
        // initialValues.id;

        const onSubmit = (values) => {
            const expense = values;
            this.props.onSubmit(expense);
        };
        const formikProps = {
            key,
            initialValues,
            onSubmit,
        };

        return (
            <Container>
                <Formik {...formikProps}>
                    {({isValid}) => (
                        <Form>
                            <ExpensesForm/>
                            <Buttons/>
                        </Form>
                    )}

                </Formik>
            </Container>
        )
    }
}

export default ExpensesFormCard;