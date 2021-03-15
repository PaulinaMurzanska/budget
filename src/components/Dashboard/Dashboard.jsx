import React from "react";
import IncomeChart from "components/Income/MyChart";
import DashboardIncomeChart from "components/Dashboard/DashboardIncomeChart";

class Dashboard extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <p>dashboard</p>
                <DashboardIncomeChart/>

            </React.Fragment>
        )
    }
}

export default Dashboard;