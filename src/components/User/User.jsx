import React from "react";
import axios from "axios";
import {Api} from "Services/Api";

class User extends React.Component {
    state = {
        user: {},
    }

    componentDidMount() {
        this.fetchUserData();
    }

    fetchUserData = () => {
        return axios.get(Api.PROFILE)
            .then((response) => {
                const data = response.data;
                console.log(data);
                this.setState({user: data})
            })

    }

    render() {
        const {user} = this.state;
        const {username} = user;

        return (
            <React.Fragment>
                <p> You are logged in as </p>
                <p>{username}</p>
            </React.Fragment>


        )
    }
}

export default User;