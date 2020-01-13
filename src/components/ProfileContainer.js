import {userProfileFetch, userSetId} from "../actions/action";
import {requests} from "../agent";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import React from "react";

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userProfileFetch, userSetId
};
class ProfileContainer extends React.Component{
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');

        if (token){
            requests.setToken(token);
        }
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('userId');
        const {userSetId} = this.props;

        if (userId){
            userSetId(userId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {userId,userData, userProfileFetch} = this.props;

        if (prevProps.userId !== userId && userId !== null && userData === null){
            userProfileFetch(userId);
        }
    }

    render() {
        const {userData} = this.props;
        return (
            <div>
                <Profile  userData={userData}/>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileContainer);
