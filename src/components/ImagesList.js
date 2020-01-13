import React from 'react';
import Message from "./Message";

import "./CommentList.css"

export class ImagesList extends React.Component{
    render() {
        const {imagesList} = this.props;
        console.log(imagesList);

        if (null === imagesList ){
            return (<Message message="No comments yet"/>)
        }

        return (
            <div className="card mb-3 mt-3 shadow-sm">
                    {/*{imagesList.map(image => {
                        return (
                            <img className="card-img-top" src={`http://localhost:8080${image.url}`} alt="Card image cap"/>

                            );
                    })}*/}
            </div>
        )
    }

}
