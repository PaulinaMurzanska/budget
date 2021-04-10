import React from "react";
import withCategories from "components/Categories/WithCategories";
import {generatePath, Route, Switch, withRouter} from "react-router-dom";
import {
    ROUTE_CATEGORY,
    ROUTE_CATEGORY_FORM,
    ROUTE_CATEGORY_FORM_UPDATE,
    ROUTE_EXPENSES_FORM,
} from "Constants/Routes";
import Categories from "components/Categories/Categories";
import CategoryFormCard from "components/Categories/CategoryForm/CategoryFormCard";
import axios from "axios";
import {Api} from "Services/Api";


class CategoriesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriesToDisplay: [],
            isCreatedOrUpdated: false,
            selectedCategoryToUpdate: [],
            categoryIdToUpdate: undefined,
            categoryErrorMessage: '',
            originPathCategory:false,
        }
    }

    componentDidMount() {
        this.props.fetchCategories();
    }

    onSubmitCategoryCreate = (category) => {
        const path = generatePath(ROUTE_CATEGORY);
        axios.post(Api.CATEGORY, category)
            .then((response) => {
                const data = response.data;
                const category = data;
                const categoriesCopy = [...this.props.categories];
                categoriesCopy.push(category);
                this.setState({
                    categoriesToDisplay: categoriesCopy,
                    isCreatedOrUpdated: true,
                });
                this.props.history.push(path);
            })
            .catch((error) => {
                this.props.history.push(path);
                this.setState({
                    categoryErrorMessage: "error creating category",
                    isCreatedOrUpdated: true,
                });
            });
    };

    handleCategoryUpdate = (e) => {
        const targetId = parseInt(e.currentTarget.id);
        const createdOrUpdated = this.state.isCreatedOrUpdated;
        const categoriesToDisplay = this.state.categoriesToDisplay;
        const categories = this.props.categories;
        const categoryToUpdate = createdOrUpdated ?
            categoriesToDisplay.find(obj => obj.id === targetId) :
            categories.find(obj => obj.id === targetId);
        this.setState({
            selectedCategoryToUpdate: categoryToUpdate,
            categoryIdToUpdate: targetId,
        });
    };
    onSubmitCategoryUpdate = (category) => {
        const path = generatePath(ROUTE_CATEGORY);
        axios.put(Api.CATEGORY + category.id + '/', category)
            .then((response) => {
                const data = response.data;
                const category = data;
                const categoriesCopy = this.state.isCreatedOrUpdated ?
                    [...this.state.categoriesToDisplay] :
                    [...this.props.categories];
                const getIndex = categoriesCopy.findIndex(item => item.id === category.id);
                categoriesCopy[getIndex] = category;
                this.setState({
                    categoriesToDisplay: categoriesCopy,
                    isCreatedOrUpdated: true,
                });
                this.props.history.push(path);
            })
            .catch((error) => {
                const categoryErrorMessage = "Error updating category";
                this.props.history.push(path);
                this.setState({
                    categoryErrorMessage: categoryErrorMessage,
                });
            });

    };
      setCancelRoute=(e)=>{
        this.setState({
            originPathCategory:true
        })
    }


    render() {
        const {categories,} = this.props;
        const {categoryIdToUpdate, selectedCategoryToUpdate, isCreatedOrUpdated, categoriesToDisplay,originPathCategory} = this.state;
        const {name, id} = selectedCategoryToUpdate;
        const pathToDisplay = originPathCategory ? ROUTE_CATEGORY : ROUTE_EXPENSES_FORM;

        const initialValuesToUpdate = {
            id: id,
            name: name,
        };

        const initialValuesToCreate = {
            id: undefined,
            name: "",
        }
        const initialValues = categoryIdToUpdate === undefined ? initialValuesToCreate : initialValuesToUpdate;
        const dataToDisplay = isCreatedOrUpdated ? categoriesToDisplay : categories;
        return (
            <Switch>
                <Route exact path={ROUTE_CATEGORY}>
                    <Categories
                        categories={dataToDisplay}
                        handleCategoryUpdate={this.handleCategoryUpdate}
                        isCreatedOrUpdated={isCreatedOrUpdated}
                        setCancelRoute={this.setCancelRoute}
                    />
                </Route>
                <Route exact path={ROUTE_CATEGORY_FORM}>
                    <CategoryFormCard
                        categories={categories}
                        initialValues={initialValues}
                        title='Create new Category'
                        onSubmit={this.onSubmitCategoryCreate}
                        path={pathToDisplay}
                    />
                </Route>
                <Route exact path={ROUTE_CATEGORY_FORM_UPDATE}>
                    <CategoryFormCard
                        categories={categories}
                        initialValues={initialValues}
                        title='Update Category'
                        onSubmit={this.onSubmitCategoryUpdate}
                        path={ROUTE_CATEGORY}
                    />
                </Route>
            </Switch>
        )
    }
}
export default withRouter(withCategories(CategoriesPage));