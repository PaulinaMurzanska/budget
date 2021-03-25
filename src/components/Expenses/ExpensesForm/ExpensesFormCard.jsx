import React from "react";
import {Form, Formik} from 'formik';
import {Container} from "@material-ui/core";
import ExpensesForm from "components/Expenses/ExpensesForm/ExpensesForm";
import Buttons from "SharedComponents/Buttons";
import {ROUTE_EXPENSES, ROUTE_INCOME} from "Constants/Routes";


class ExpensesFormCard extends React.Component {
    render() {
        const {initialValues, title,categories} = this.props;
        const key = initialValues.id;
        console.log(initialValues);

        const onSubmit = (values) => {
            const expense = values;
            this.props.onSubmit(expense);
            console.log(expense);
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
                            <ExpensesForm
                                title={title}
                                categories={categories}
                            />
                            <Buttons
                                route={ROUTE_EXPENSES}
                                cancelLabel="Cancel"
                                submitDisabled={!isValid}
                                submitLabel={key === undefined ? 'Create new income' : 'Save changes'}
                            />
                        </Form>
                    )}

                </Formik>
            </Container>
        )
    }
}

export default ExpensesFormCard;