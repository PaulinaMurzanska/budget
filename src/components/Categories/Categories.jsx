import React from "react";
import {Alert, FormGroup, Table, UncontrolledAlert} from "reactstrap";
import CategoryItem from "components/Categories/CategoryItem";
import "./Categories.scss";
import {generatePath, Link, withRouter} from "react-router-dom";
import {ROUTE_CATEGORY, ROUTE_CATEGORY_FORM, ROUTE_INCOME} from "Constants/Routes";
import axios from "axios";
import {Api} from "Services/Api";
import {Container} from "@material-ui/core";
import SimpleButton from "SharedComponents/SimpleButton";
import FormHeader from "SharedComponents/FormHeader";

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: undefined,
            copy: [],
            visible: true,
            isDeleted: undefined,
        }
    }

    onCategoryDelete = (event) => {
        console.log(event.target);
        const idToDelete = parseInt(event.target.id);
        console.log(idToDelete);
        const categoryToDelete = this.props.categories.find(obj => obj.id === idToDelete);
        console.log(categoryToDelete);
        const copy = [...this.props.categories];
        this.setState({
            copy: copy,
        })
        const index = this.props.categories.findIndex((category) => category.id === idToDelete);
        if (index !== -1) this.props.categories.splice(index, 1);
        const path = generatePath(ROUTE_CATEGORY);
        axios.delete(Api.CATEGORY + categoryToDelete.id + '/', categoryToDelete)
            .then(response => {
                console.log(response);
                this.props.history.push(path);
                window.location.reload();
                this.setState({
                    isDeleted: true,
                })
            })
            .catch((error) => {
                const errorMessage = "you cant delete this category";
                const copy = [...this.props.categories]
                this.props.history.push(path);

                this.setState({
                    errorMessage: errorMessage,
                    isDeleted: false,
                })
            })
    }

    render() {
        console.log(this.props);
        const {categories, handleCategoryUpdate, setCancelRoute} = this.props;
        const {errorMessage, isCreatedOrUpdated, copy, isDeleted} = this.state;

        const dataToDisplay = () => {
            if (isDeleted === undefined) {
                return categories;
            }
            if (isDeleted === true) {
                return categories
            }
            if (isDeleted === false) {
                return copy
            }
        };
        const data = dataToDisplay();
        return (
            <React.Fragment>
                <Container>
                  <p className="category-title">Manage Categories</p>
                    {
                        errorMessage !== undefined &&
                        <UncontrolledAlert color="danger">
                            This category cannot be deleted as it has assigned expenses.This category can be only
                            updated.
                        </UncontrolledAlert>
                    }


                    <Table striped className="category-table">
                        <thead>
                        <tr>
                            <th>Spendings categories</th>
                            <th colSpan={2}>
                                <SimpleButton
                                    label="Add new Category"
                                    path={ROUTE_CATEGORY_FORM}
                                    onClick={setCancelRoute}
                                />
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((category, index) =>
                                <CategoryItem
                                    category={category}
                                    key={category.id}
                                    handleCategoryUpdate={handleCategoryUpdate}
                                    onDelete={this.onCategoryDelete}
                                    erroMessage={errorMessage}
                                    isCreatedOrUpdated={isCreatedOrUpdated}
                                />
                            )
                        }
                        </tbody>
                    </Table>

                </Container>

            </React.Fragment>
        )
    }
}

export default withRouter(Categories);