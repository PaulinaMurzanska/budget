import React from "react";
import {Link} from "react-router-dom";
import"./SimpleButton.scss";

const SimpleButton =({label,path})=>{
    return(
        <button className="simple-button">
              <Link to={path}> {label}</Link>
        </button>
    )
}
export default SimpleButton;