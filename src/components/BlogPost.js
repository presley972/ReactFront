import React from 'react';
import { format } from 'timeago.js';
import Message from "./Message";
import ImagesContainer from "./imagesContainer";


export class BlogPost extends React.Component{
    render() {const {post} = this.props;



        if (null === post){
            return (<Message message="Blog post doesn't exist"/>)
        }

        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    <h2>{post.title}</h2>
                    <p className="card-text">{post.content}</p>
                    <p className="card-text border-top">
                        <small className="text-muted">{format(post.published)} by&nbsp;
                            {post.author.name}
                        </small>
                    </p>
                </div>
            </div>
        );
    }

}
