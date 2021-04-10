import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import {ROUTE_CATEGORY, ROUTE_DASHBOARD, ROUTE_EXPENSES, ROUTE_INCOME, } from "Constants/Routes";
import AppNavItem from "SharedComponents/AppNavItem";
import logo from "images/logo 2.png";
import "./Header.scss";
import {AiOutlineLineChart} from "react-icons/ai";
import {GiTakeMyMoney, GiPayMoney} from "react-icons/gi";
import {RiAccountBoxLine} from "react-icons/ri";
import {FiLogOut} from "react-icons/fi";
import moment from "moment";
import User from "components/User/User";

const useStyles = makeStyles({
    // list: {
    //     width: 300,
    // },
    fullList: {
        width: '100%',
    },
});

const Header = ({onLogout, pageName}) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List className='menu-list'>
                <div className='logo-nav'>
                    <img src={logo}/>
                </div>
                <div className='menu-item'>
                    <div className="menu-icon">
                        <AiOutlineLineChart/>
                    </div>
                    <AppNavItem path={ROUTE_DASHBOARD} name="Dashboard"/>
                </div>
                <div className='menu-item'>
                    <div className="menu-icon">
                        <GiTakeMyMoney/>
                    </div>
                    <AppNavItem path={ROUTE_INCOME} name="Income"/>
                </div>
                <div className='menu-item'>
                    <div className="menu-icon">
                        <GiPayMoney/>
                    </div>
                    <AppNavItem path={ROUTE_EXPENSES} name="Expenses"/>
                </div>
                <div className='menu-item'>
                    <div className="menu-icon">
                        <GiPayMoney/>
                    </div>
                    <AppNavItem path={ROUTE_CATEGORY} name="Category"/>
                </div>


            </List>
            <Divider/>
            <List className="account-list">
                <div className='account-item'>
                    <div className="menu-icon">
                        <RiAccountBoxLine/>
                    </div>
                    <div className='user'>
                          <User/>
                    </div>

                </div>
                <div className='account-item' onClick={onLogout}>
                    <div className="menu-icon">
                        <FiLogOut/>
                    </div>
                    <span>Sign out</span>
                </div>

            </List>
        </div>
    );
    const icon = <MenuIcon style={{color: "#e78200", fontSize: "3rem"}}/>;
    const date = moment(new Date().getTime()).format('MMMM Do YY');

    return (
        <div className='menu-top-wrap'>
            <div>
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button onClick={toggleDrawer(anchor, true)}>{icon}</Button>
                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>

                    </React.Fragment>
                ))}

            </div>
            <div className='horizontal-tab-label'>
                <span>{pageName}</span>
                <p>today </p>
                <p>{date}</p>
                <div className='username'>
                    <User/>
                </div>

            </div>
        </div>

    );
}
export default Header;
