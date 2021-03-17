import React from "react";
import {Button, FormGroup, NavItem} from "reactstrap";
import {Link} from "react-router-dom";
import "./Buttons.scss";


/**
 * @component
 */
const Buttons = ({cancelLabel, submitDisabled, submitLabel, route}) => {
    return (
        <React.Fragment>
            <hr className="mb-4 mt-4"/>
            <FormGroup className="submit-btn">
                <NavItem tag={Link} to={route}>
                    <Button color="secondary" type="reset" className="action-btn cancel" >
                        {cancelLabel}
                    </Button>
                </NavItem>
                <Button type="submit" disabled={submitDisabled} className='action-btn ok'>
                    {submitLabel}
                </Button>

            </FormGroup>
        </React.Fragment>
    );
};


export default React.memo(Buttons);