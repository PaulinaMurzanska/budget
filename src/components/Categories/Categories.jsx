import React from "react";
import {Table} from "reactstrap";
import CategoryItem from "components/Categories/CategoryItem";
import CategoriesSelectOptions from "SharedComponents/CategoriesSelectOptions";

class Categories extends React.PureComponent{
    constructor(props) {
        super(props);
    }
    render() {
        const {categories}=this.props;

        return(
            <React.Fragment>
               <Table bordered>
                   <thead>
                   <tr>
                       <th>Spending category</th>
                   </tr>
                   </thead>
                   <tbody>
                   {
                       categories.map((category, index)=>
                       <CategoryItem
                           category={category}
                           key={category.id}
                       />
                       )
                   }
                   </tbody>
               </Table>
                <CategoriesSelectOptions/>
            </React.Fragment>
        )
    }
}
export default  Categories;