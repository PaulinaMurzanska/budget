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
        const {categories,onChange, title,} = this.props
        const undef=undefined;
        return (
            <React.Fragment>
                <label htmlFor="categories">{title}</label>
                <select name='categories' id='categories' onChange={onChange}>
                     <option
                         value="reset"
                     >select category</option>
                    {
                        categories.map((category, index) =>

                            <option value={category.id} key={category.id} >
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


