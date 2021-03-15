import React from "react";
import Income from "components/Income/Income";
import withIncome from "components/Income/WithIncome";


class IncomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: undefined,
            sortDirection: true,
        }
    }
    componentDidMount() {
        console.log("component did mount");
        this.props.fetchIncome()
    }

    handleSort = (event) => {
        const sortBy = event.target.id;
        this.setState({
            sortBy: sortBy,
            sortDirection: !this.state.sortDirection,
        })
    }

    render() {
        const {
            sortDirection,

        } = this.state;
        const {incomesFilteredInFetch,incomes,handleIncomesFilter,handleSelectedEndDate,
            handleSelectedStartDate,isFiltered,startDate,endDate} = this.props;

        const numbersDefault = incomesFilteredInFetch.map((income) => income.amount);
        const namesDefault = incomesFilteredInFetch.map((income) => income.name);
        const numbersFiltered = incomes.map((income) => income.amount);
        const namesFiltered = incomes.map((income) => income.name);
        const numbers = isFiltered ? numbersFiltered : numbersDefault;
        const names = isFiltered ? namesFiltered : namesDefault;
        const incomeToDisplay = isFiltered ? incomes : incomesFilteredInFetch;
        const multiplier = sortDirection ? 1 : -1;


        const sortedIncomes = incomeToDisplay.sort((item1, item2) => {
            if (this.state.sortBy === "timestamp") {
                const a = new Date(item1.timestamp).getTime();
                const b = new Date(item2.timestamp).getTime();
                if (a > b) {
                    return 1 * multiplier;
                }
                if (b > a) {
                    return -1 * multiplier;
                }
                return 0;

            }
            const sortBy = this.state.sortBy;
            const a = item1[sortBy];
            const b = item2[sortBy];
            if (a > b) {
                return 1 * multiplier;
            }
            if (b > a) {
                return -1 * multiplier;
            }
            return 0;
        });

        return (
            <Income
                handleStartDate={handleSelectedStartDate}
                handleEndDate={handleSelectedEndDate}
                handleFilter={handleIncomesFilter}
                handleSort={this.handleSort}
                names={names}
                numbers={numbers}
                incomes={sortedIncomes}
                startDate={startDate}
                endDate={{endDate}}

            />
        )
    }
}

export default withIncome(IncomePage);