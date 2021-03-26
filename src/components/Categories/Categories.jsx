import React from "react";
import {Table} from "reactstrap";
import CategoryItem from "components/Categories/CategoryItem";
import "./Categories.scss";
import {generatePath, withRouter} from "react-router-dom";
import {ROUTE_CATEGORY, ROUTE_INCOME} from "Constants/Routes";
import axios from "axios";
import {Api} from "Services/Api";

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: undefined,
            copy:[],


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
            copy:copy,
        })

        const index = this.props.categories.findIndex((category) => category.id === idToDelete);
        if (index !== -1) this.props.categories.splice(index, 1);
        const path = generatePath(ROUTE_CATEGORY);
        axios.delete(Api.CATEGORY + categoryToDelete.id + '/', categoryToDelete)
            .then(response => {
                console.log(response);
                this.props.history.push(path);
            })
            .catch((error) => {
                const errorMessage = "you cant delete this category";
                const copy =[...this.props.categories]
                this.props.history.push(path);

                this.setState({
                    errorMessage: errorMessage,


                })
            })


    }


    render() {
        console.log(this.props);
        const {categories, handleCategoryUpdate} = this.props;
        const {errorMessage,isCreatedOrUpdated,copy} = this.state;

        console.log(copy);
        console.log(categories);

        const dataToDisplay = errorMessage===undefined ? categories : copy;
        console.log(errorMessage);
        console.log(dataToDisplay);

        return (
            <React.Fragment>
                <p>{errorMessage}</p>
                <Table className="category-table">
                    <thead>
                    <tr>
                        <th>Spending category name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        dataToDisplay.map((category, index) =>
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
            </React.Fragment>
        )
    }
}

export default withRouter(Categories);