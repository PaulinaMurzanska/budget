import React from "react";
import WithExpenses from "components/Expenses/WithExpenses";
import withIncome from "components/Income/WithIncome";

class Balance extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchExpenses();
        this.props.fetchIncome();
    }

    render() {
        const {balance} =this.props;


        return(
            <p>balance :{balance}</p>
        )
    }
}
export default withIncome(WithExpenses(Balance));
