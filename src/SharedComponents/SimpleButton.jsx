import React from "react";
import {Link} from "react-router-dom";
import"./SimpleButton.scss";

const SimpleButton =({label,path,onClick})=>{
    return(
        <button className="simple-button"
        onClick={onClick}
        >
              <Link to={path}> {label}</Link>
        </button>
    )
}
export default SimpleButton;