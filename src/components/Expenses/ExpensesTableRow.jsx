import React, {useState} from "react";
import moment from "moment";
import {Modal, ModalBody, ModalFooter, ModalHeader, NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import {ROUTE_EXPENSES_FORM_UPDATE,} from "Constants/Routes";
import {AiOutlineEdit} from "react-icons/ai";
import {RiDeleteBin4Line} from "react-icons/ri";
import {Container} from "@material-ui/core";
import ModalButtons from "SharedComponents/ModalButtons";


const getCategoryName = (categories, category) => {
    const index = categories.findIndex((item) => item.id === category);
    if (index < 0) {
        return 'undefined';
    }
    return categories[index].name;
}

const ExpensesTableRow = ({expense, categories, handleUpdate, onDelete}) => {
    const {name, category, amount, timestamp, id} = expense;
    const date = moment(timestamp).format("MMM Do YY");
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal)
    };
    return (
        <React.Fragment>
            <tr>
                <td>{name}</td>
                <td>{amount}</td>
                <td>{getCategoryName(categories, category)}</td>
                <td>{date}</td>
                <td id={id}>
                    <div className="expenses-update">
                        <NavLink className="update"
                                 tag={Link}
                                 to={ROUTE_EXPENSES_FORM_UPDATE}
                                 id={id}
                                 onClick={handleUpdate}
                        >
                            <AiOutlineEdit/>
                        </NavLink>
                    </div>
                </td>
                <td>
                    <div className='expenses-delete'>
                        <RiDeleteBin4Line className='delete'
                                          onClick={toggle}
                        />
                        <Modal isOpen={modal} toggle={toggle} className="delete-modal">
                            <Container className="modal-container">
                                <ModalHeader toggle={toggle}>You are about to delete <span className="name-to-delete">
                            {name}</span>
                                </ModalHeader>
                                <ModalBody>
                                    Are you sure ?
                                    This action will be irreversible.
                                </ModalBody>
                                <ModalFooter>

                                    <ModalButtons
                                        id={id}
                                        onClick={onDelete}
                                        toggle={toggle}
                                        label1="Delete"
                                        label2='Cancel'
                                    />
                                </ModalFooter>
                            </Container>
                        </Modal>
                    </div>
                </td>
            </tr>
        </React.Fragment>
    )

}
export default ExpensesTableRow;