import React from "react";
import { Button, FormGroup ,NavItem} from "reactstrap";
import{Link} from "react-router-dom";


/**
 * @component
 */
const Buttons = ({ cancelLabel, submitDisabled, submitLabel,route }) => {
  return (
    <React.Fragment>
      <hr className="mb-4 mt-4" />
      <FormGroup className="mb-2">
        <Button type="submit" disabled={ submitDisabled }
                style={{marginRight:'15px',backgroundColor:"#387f34"}}>
          { submitLabel }
        </Button>
          <NavItem tag={Link} to={route}>
              <Button color="secondary" type="reset" className="ml-0 ml-md-2"  style={{paddingRight:'15px'}}>
          { cancelLabel }
        </Button>
          </NavItem>

      </FormGroup>
    </React.Fragment>
  );
};



export default React.memo(Buttons);