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
            <td>
                <div className="income-update">
                    <NavLink tag={Link}
                             to={ROUTE_INCOME_FORM_UPDATE}>
                        <AiOutlineEdit
                            id={id}
                            onClick={handleUpdate}
                        />
                    </NavLink>
                </div>
            </td>
            <td>
                <div className='income-delete'
                >
                    <RiDeleteBin4Line className='delete'
                                      onClick={toggle}


                    />
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>You are about to delete {name}</ModalHeader>
                        <ModalBody>
                                    <span style={{
                                        fontSize: '1.5rem',
                                        fontWeight: "700"
                                    }}>! Are you sure ? ! </span>
                            if you delete, this action is irreversible.

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" id={id}
                                    onClick={onDelete}
                                    tag={Link} to={ROUTE_INCOME}
                            >Yes,delete</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                </div>


            </td>
        </tr>
    )
}
export default IncomeItem;