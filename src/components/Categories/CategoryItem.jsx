import React from "react";
import {NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import {ROUTE_CATEGORY_FORM_UPDATE, ROUTE_INCOME_FORM_UPDATE} from "Constants/Routes";
import {AiOutlineEdit} from "react-icons/ai";
import ModalDelete from "SharedComponents/ModalDelete";

const CategoryItem = ({category, handleCategoryUpdate, onDelete, errorMessage,checkClick}) => {
    const {name, id} = category;

    return (
        <React.Fragment>

            <tr>
                <td>{name}</td>
                <td id={id}>
                    <div className="category-update">
                        <NavLink className="update"
                                 tag={Link}
                                 to={ROUTE_CATEGORY_FORM_UPDATE}
                                 id={id}
                                 onClick={handleCategoryUpdate}
                        >
                            <AiOutlineEdit
                            />
                        </NavLink>
                    </div>
                </td>
                <td>
                        <ModalDelete
                            name={name}
                            id={id}
                            onDelete={onDelete}
                            errorMessage={errorMessage}
                            checkClick={checkClick}
                        />
                </td>
            </tr>
        </React.Fragment>
    )
}
export default CategoryItem;