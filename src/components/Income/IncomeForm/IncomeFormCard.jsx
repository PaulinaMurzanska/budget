import React from "react";
import {Form, Formik} from 'formik';
import IncomeForm from "components/Income/IncomeForm/IncomeForm";
import {Container} from "@material-ui/core";
import Buttons from "SharedComponents/Buttons";
import {ROUTE_INCOME} from "Constants/Routes";
import "./IncomeForm.scss";


class IncomeFormCard extends React.Component {
    render() {
        const {incomes, initialValues, title} = this.props;
        const key = initialValues.id;

        const onSubmit = (values) => {
            const income = values;
            this.props.onSubmit(income);
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
                        <Form className='income-form'>
                            <IncomeForm
                                incomes={incomes}
                                title={title}
                            />
                            <div className='form-buttons'>
                                <Buttons
                                    route={ROUTE_INCOME}
                                    cancelLabel="Cancel"
                                    submitDisabled={!isValid}
                                    submitLabel={key === 0 ? 'Create new income' : 'Save changes'}
                                />
                            </div>

                        </Form>
                    )}

                </Formik>
            </Container>

        )
    }
}

export default IncomeFormCard;
