import React from "react";
import {Link} from "react-router-dom";
import "./ModalButtons.scss";

const ModalButtons = ({
                          id, path, onClick, toggle,
                          label1, label2
                      }) => {
    return (
        <React.Fragment>
            <div className='buttons-wrapper'>
                <button className="modal-button accept"
                        id={id}
                        tag={Link}
                        to={path}
                        onClick={onClick}

                >
                    {label1}
                </button>
                <button
                    className="modal-button cancel"
                    onClick={toggle}

                >
                    {label2}
                </button>
            </div>

        </React.Fragment>

    )
}
export default ModalButtons;