import React, {useState} from "react";
import {RiDeleteBin4Line} from "react-icons/ri";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Container} from "@material-ui/core";
import ModalButtons from "SharedComponents/ModalButtons";
import "components/Categories/Categories.scss";

const ModalDelete = ({name, id, onDelete,}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal)
    };
    return (
        <div className='delete-wrap'
        >
            <RiDeleteBin4Line className='delete'
                              onClick={toggle}
            />
            <Modal isOpen={modal} toggle={toggle} className="delete-modal">
                <Container className="modal-container">
                    <div>
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
                    </div>
                </Container>
            </Modal>
        </div>
    )
}
export default ModalDelete;