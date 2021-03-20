import React from "react";
import withCategories from "components/Categories/WithCategories";
import {generatePath, Route, Switch, withRouter} from "react-router-dom";
import {ROUTE_CATEGORY} from "Constants/Routes";
import Categories from "components/Categories/Categories";


class IncomePage extends  React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const {categories}=this.props;
        return(
            <Switch>
                <Route exact path={ROUTE_CATEGORY}>
                    <Categories
                    categories={categories}
                    />

                </Route>
            </Switch>
        )
    }
}
export default withCategories(IncomePage);