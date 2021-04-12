import React, {useEffect, useState} from "react";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Dashboard from "components/Dashboard/Dashboard";
import {
    ROUTE_CATEGORY,
    ROUTE_DASHBOARD,
    ROUTE_EXPENSES,
    ROUTE_INCOME,
    ROUTE_MAIN,

} from "Constants/Routes";
import Header from "components/Header/Header";
import IncomePage from "components/Income/IncomePage";
import CategoriesPage from "components/Categories/CategoriesPage";
import ExpensesPage from "components/Expenses/ExpensesPage";
import withUser from "components/User/User";

class MainBody extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUserData();
    }

    render() {
        const {onLogout, username} = this.props;
        return (
            <>
                <Switch>
                    <Route exact path={ROUTE_MAIN}>
                        <Header onLogout={onLogout}
                                pageName="Dashboard"
                                username={username}
                        />
                        <Dashboard/>
                    </Route>
                    <Route exact path={ROUTE_DASHBOARD}>
                        <Header onLogout={onLogout}
                                pageName="Dashboard"
                                username={username}

                        />
                        <Dashboard/>
                    </Route>
                    <Route path={ROUTE_EXPENSES}>
                        <Header onLogout={onLogout}
                                pageName="Expenses"
                                username={username}
                        />
                        <ExpensesPage

                        />
                    </Route>
                    <Route path={ROUTE_INCOME}>
                        <Header onLogout={onLogout}
                                pageName="Income"
                                username={username}
                        />
                        <IncomePage/>
                    </Route>
                    <Route path={ROUTE_CATEGORY}>
                        <Header onLogout={onLogout}
                                pageName="Categories"
                                username={username}
                        />
                        <CategoriesPage
                        />
                    </Route>


                </Switch>
            </>

        )
    }

}

export default withUser(MainBody);