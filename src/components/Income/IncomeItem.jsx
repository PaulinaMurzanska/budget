import React, {useState} from "react";
import moment from "moment";
import {AiOutlineEdit} from "react-icons/ai";
import {Link} from "react-router-dom";
import {ROUTE_INCOME, ROUTE_INCOME_FORM_UPDATE} from "Constants/Routes";
import {RiDeleteBin4Line} from "react-icons/ri";
import {
    Button,
    ModalHeader, ModalBody, ModalFooter, Modal, NavItem, NavLink
} from "reactstrap";
import "./IncomeTable.scss";
import SimpleButton from "SharedComponents/SimpleButton";
import ModalButtons from "SharedComponents/ModalButtons";
import {Container} from "@material-ui/core";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



const IncomeItem = ({income, onDelete, handleUpdate}) => {

    const {name, amount, timestamp, id} = income;
    const dateOfIncome = moment(timestamp).format("MMM Do YY");
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal)
    };


    return (
        <tr>
            <td>{name}</td>
            <td>{amount}</td>
            <td>{dateOfIncome}</td>
            <td id={id} >
                <div className="income-update" >
                    <NavLink className="update"
                       tag={Link}
                       to={ROUTE_INCOME_FORM_UPDATE}
                       id={id}
                        onClick={handleUpdate}

                    >
                        <AiOutlineEdit/>
                    </NavLink>
                </div>
            </td>
            <td >
                <div className='income-delete'
                >
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
    )
}
export default IncomeItem;