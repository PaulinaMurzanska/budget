import React from "react";
import axios from "axios";
import {Api} from "Services/Api";
const fetch_delay_simulator = 500;
const delayFetch = (ms, func) => {
    return new Promise((resolve, reject) => setTimeout(() => func(resolve, reject), ms));
}

const withCategories = (WrappedComponent) => {
    return class extends React.Component {
        state = {
            categoryInProgress: false,
            categoriesSuccess: undefined,
            categories: [],
        }


        fetchCategories = () => {
            this.setState({categoryInProgress: true});
            return delayFetch(fetch_delay_simulator, (resolve, reject) => {
                return axios.get(Api.CATEGORY)
                    .then((response) => {
                        const data = response.data;
                        const categories = data.map((item) => ({
                            name: item.name, id: item.id,

                        }));
                        const categoriesSuccess = true;
                        this.setState({categories, categoriesSuccess,});
                        resolve();
                    })
                    .catch((error) => {
                        this.setState({categoriesSuccess: false});
                        reject();
                    })
                    .finally(() => {
                        this.setState({categoryInProgress: false});
                    })
            })
        }


        render() {
            const {categories, categoriesSuccess, categoryInProgress} = this.state;
            return (
                <WrappedComponent
                    {...this.state}
                    {...this.props}
                    categories={categories}
                    categoriesSuccess={categoriesSuccess}
                    categoryInProgress={categoryInProgress}
                    fetchCategories={this.fetchCategories}
                />
            )
        }
    }
}
export default withCategories;