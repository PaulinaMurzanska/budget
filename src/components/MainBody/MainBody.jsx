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

class MainBody extends React.PureComponent {

    render() {
        const {onLogout} = this.props;
        return (
            <>
                <Switch>
                    <Route exact path={ROUTE_MAIN}>
                        <Header onLogout={onLogout}
                                pageName="Dashboard"
                        />
                        <Dashboard/>
                    </Route>
                    <Route exact path={ROUTE_DASHBOARD}>
                        <Header onLogout={onLogout}
                                pageName="Dashboard"
                        />
                        <Dashboard/>
                    </Route>
                    <Route path={ROUTE_EXPENSES}>
                        <Header onLogout={onLogout}
                                pageName="Expenses"
                        />
                        <ExpensesPage

                        />
                    </Route>
                    <Route path={ROUTE_INCOME}>
                        <Header onLogout={onLogout}
                                pageName="Income"
                        />
                        <IncomePage/>
                    </Route>
                    <Route path={ROUTE_CATEGORY}>
                        <Header onLogout={onLogout}
                                pageName="Categories"
                        />
                        <CategoriesPage
                        />
                    </Route>


                </Switch>
            </>

        )
    }


}

export default MainBody;