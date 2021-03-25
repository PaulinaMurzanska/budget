import React from "react";
import IncomeChart from "components/Income/MyChart";
import DashboardIncomeChart from "components/Dashboard/DashboardIncomeChart";
import Balance from "components/Balance";
import WithExpenses from "components/Expenses/WithExpenses";
import withIncome from "components/Income/WithIncome";
import {Container} from "@material-ui/core";
import "./Dashboard.scss";

class Dashboard extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchIncome();
        this.props.fetchExpenses();
    }

    render() {
        const {expensesTotal, incomesTotal} = this.props;
        const incomeAmount = incomesTotal.map(item => item.amount);
        const incomeTotalToBalance = incomeAmount.reduce((a, b) => a + b, 0);
        const outcomeAmount = expensesTotal.map(item => item.amount);
        const outcomeTotalToBalance = outcomeAmount.reduce((a, b) => a + b, 0);
        const balance = incomeTotalToBalance - outcomeTotalToBalance;
        return (
            <React.Fragment>
                <Container>
                    <div className='my-container'>
                        <div className="section">
                            <Balance
                                balance={balance}
                            />
                        </div>
                        <div className="section">
                               <DashboardIncomeChart/>
                        </div>
                        <div className="section">
                            <p>expenses</p>
                        </div>
                        <div className="section">
                            <p>idk yet</p>
                        </div>
                    </div>
                </Container>





            </React.Fragment>
        )
    }
}

export default withIncome(WithExpenses(Dashboard));