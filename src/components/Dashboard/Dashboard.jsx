import React from "react";
import DashboardIncomeChart from "components/Dashboard/DashboardIncomeChart";
import WithExpenses from "components/Expenses/WithExpenses";
import withIncome from "components/Income/WithIncome";
import {Container} from "@material-ui/core";
import "./Dashboard.scss";
import DashboardExpensesChart from "components/Dashboard/DashboardExpensesChart";
import SimpleButton from "SharedComponents/SimpleButton";
import {ROUTE_CATEGORY, ROUTE_EXPENSES, ROUTE_EXPENSES_FORM, ROUTE_INCOME, ROUTE_INCOME_FORM} from "Constants/Routes";
import {Link} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";


class Dashboard extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchIncome();
        this.props.fetchExpenses();
    }

    render() {
        const {expensesTotal, incomesTotal, incomes, expenses} = this.props;
        const incomeAmount = incomesTotal.map(item => item.amount);
        const incomeTotalToBalance = incomeAmount.reduce((a, b) => a + b, 0);
        const outcomeAmount = expensesTotal.map(item => item.amount);
        const outcomeTotalToBalance = outcomeAmount.reduce((a, b) => a + b, 0);
        const balance = incomeTotalToBalance - outcomeTotalToBalance;
        return (
            <React.Fragment>
                <Container>
                    <div className='my-container'>
                        <ScrollToTop smooth color="rgba(231, 130, 0, 0.91)"/>
                        <div className="section-balance">
                            <h3>balance</h3>
                            <div className="balance-tab">
                                {balance} EUR
                            </div>
                        </div>
                        <hr/>
                        <div className='charts'>
                            <div className="section">
                                <h3>Incomes</h3>
                                <p>data for last 30 days</p>
                                {
                                    incomes.length > 0 && (
                                        <Link to={ROUTE_INCOME}>

                                            <div className='income-chart'>
                                                <DashboardIncomeChart/>
                                            </div>
                                        </Link>
                                    )
                                }
                                {
                                    incomes.length === 0 && (
                                        <div className='no-data'>
                                            <p> no data to display</p>
                                            <SimpleButton
                                                label='Add new income'
                                                path={ROUTE_INCOME_FORM}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                            <div className="section">
                                <h3>expenses</h3>
                                <p>data for last 30 days</p>
                                {
                                    expenses.length > 0 &&
                                    (
                                        <Link to={ROUTE_EXPENSES}>

                                            <div className="expenses-chart ">
                                                <DashboardExpensesChart/>
                                            </div>

                                        </Link>
                                    )
                                }
                                {
                                    expenses.length === 0 && (
                                        <div className='no-data'>
                                            <p>no data to display </p>
                                            <SimpleButton
                                                label='Add new expense'
                                                path={ROUTE_EXPENSES_FORM}
                                            />
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                        <hr/>
                        <div className="section-category">
                            <h3>manage categories</h3>
                            <div className='manage-category'>
                                <SimpleButton
                                    label="manage expenses categories"
                                    path={ROUTE_CATEGORY}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

export default withIncome(WithExpenses(Dashboard));