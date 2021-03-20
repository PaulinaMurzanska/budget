import React from "react";
import withCategories from "components/Categories/WithCategories"



class CategoriesSelectOptions extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCategories();
    }


    render() {
        const {categories} = this.props;
        console.log(categories);
        const category = categories.map((item, index) => item.name);
        console.log(category);


        return (
            <React.Fragment>
                <label htmlFor="categories">Select Category</label>
                <select name='categories' id='categories'>
                    {
                        categories.map((category, index) =>
                            <option value={category.name} key={category.id}>
                                {category.name}
                            </option>
                        )
                    }

                </select>

            </React.Fragment>
        )

    }


}

export default withCategories(CategoriesSelectOptions);


