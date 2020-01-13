import React from 'react';
import Message from "./Message";


export class Profile extends React.Component{
    render() {
        const {userData} = this.props;

        if (null === userData){
            return (<Message message="No profile yet"/>)
        }

        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <h2>{userData.username}</h2>
                <h2>{userData.name}</h2>
                <h2>{userData.email}</h2>
            </div>
        )
    }

}
