import React from "react";
import {Form, Formik} from 'formik';
import {Container} from "@material-ui/core";
import Buttons from "SharedComponents/Buttons";
import {ROUTE_EXPENSES, ROUTE_INCOME} from "Constants/Routes";
import CategoryForm from "components/Categories/CategoryForm/CategoryForm";


class CategoryFormCard extends React.Component {
    render() {
        const {categories, initialValues, title} = this.props;
        const key = initialValues.id;

        const onSubmit = (values) => {
            const category = values;
            this.props.onSubmit(category);
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
                        <Form className='category-form'>
                            <CategoryForm
                                categories={categories}
                                title={title}

                            />
                            <div className='form-buttons'>
                                <Buttons
                                    route={ROUTE_EXPENSES}
                                    cancelLabel="Cancel"
                                    submitDisabled={!isValid}
                                    submitLabel={key === undefined ? 'Create new category' : 'Save changes'}
                                />
                            </div>

                        </Form>
                    )}

                </Formik>
            </Container>

        )
    }
}

export default CategoryFormCard;