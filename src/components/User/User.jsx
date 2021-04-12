import React from "react";
import axios from "axios";
import {Api} from "Services/Api";

const withUser = (WrappedComponent) => {
    return class extends React.Component {
        state = {
            user: {},
        }

        fetchUserData = () => {
            return axios.get(Api.PROFILE)
                .then((response) => {
                    const data = response.data;
                    this.setState({user: data})
                })

        }
        render() {
            const {user} = this.state;
            const {username} = user;
            console.log(username);

            return (
                <WrappedComponent
                    {...this.state}
                    {...this.props}
                    fetchUserData={this.fetchUserData}
                    username={username}
                />
            )
        }
    }
}
export default withUser;