import React from "react";
import {NavLink as RouterNavLink} from "react-router-dom";
import {NavItem, NavLink} from "reactstrap";

const AppNavItem =({path, name})=>{
    return(
          <NavItem>
                  <NavLink tag={RouterNavLink} to={path} activeClassName ='active'>

                    {name}</NavLink>
        </NavItem>
    )
}
export default AppNavItem;