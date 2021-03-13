import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container"
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Dashboard from "components/Dashboard/Dashboard";
import Expenses from "components/Expenses/Expenses";
import Income from "components/Income/Income";
import Categories from "components/Categories/Categories";
import axios from "axios";
import {Api} from "Services/Api";
import {ROUTE_CATEGORY, ROUTE_DASHBOARD, ROUTE_EXPENSES, ROUTE_INCOME, ROUTE_MAIN} from "Constants/Routes";
import NavigationTop from "components/NavigationTop/NavigationTop";
import Header from "components/Header/Header";

const fetch_delay_simulator = 500;
const delayFetch = (ms, func) => {
    return new Promise((resolve, reject) => setTimeout(() => func(resolve, reject), ms));
}

class MainBody extends React.PureComponent {

    state = {
        incomeInProgress: false,
        incomes: [],
        incomesSuccess: undefined,

    }

    componentDidMount() {
        this.fetchIncome()
    }

    fetchIncome = () => {
        this.setState({incomeInProgress: true});
        return delayFetch(fetch_delay_simulator, (resolve, reject) => {
            return axios.get(Api.INCOME)
                .then((response) => {
                    const data = response.data;
                    const incomes = data.map((item) => ({
                        name: item.name, id: item.id,
                        amount: item.amount, timestamp: item.timestamp
                    }));
                    const incomesSuccess = true;
                    this.setState({incomes, incomesSuccess});
                    resolve();
                })
                .catch((error) => {
                    this.setState({incomesSuccess: false});
                    reject();
                })
        }).finally(() => {
            this.setState({incomeInProgress: false});
        })
    }


    render() {
        const {incomes} = this.state;
        const {onLogout}=this.props;
        console.log(incomes);
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
                        <Expenses/>
                    </Route>
                    <Route path={ROUTE_INCOME}>
                        <Header onLogout={onLogout}
                        pageName="Income"
                        />
                        <Income
                            incomes={incomes}
                        />
                    </Route>
                    <Route path={ROUTE_CATEGORY}>
                        <Header onLogout={onLogout}/>
                        <Categories/>
                    </Route>
                </Switch>
            </>

        )
    }


}

export default MainBody;