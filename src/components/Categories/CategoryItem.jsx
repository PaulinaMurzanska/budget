import React from "react";

const CategoryItem =({category})=>{
    const {name, id}=category;
    return(
        <React.Fragment>
            <tr>
                <td>{name}</td>
            </tr>
        </React.Fragment>
    )
}
export default  CategoryItem;