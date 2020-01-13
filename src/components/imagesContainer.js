import React from 'react';
import {connect} from "react-redux";
import {imageBlogPostFetch, imageBlogPostUnload} from "../actions/action";
import Spinner from "./Spinner";
import {ImagesList} from "./ImagesList";


const mapeStateToProps = state => ({
    ...state.blogPost

});

const mapDispatchToProps = {
    imageBlogPostFetch,
    imageBlogPostUnload
};

class ImagesContainer extends React.Component {

    componentDidMount() {
        this.props.imageBlogPostFetch(this.props.blogPostId);
    }

    componentWillUnmount() {
        this.props.imageBlogPostUnload();
    }


    render() {
        const {isFetching, imagesList} = this.props;
        if (isFetching){
            return (<Spinner/>)
        }
        return(
            <ImagesList imagesList={imagesList}>

            </ImagesList>
        )
    }
}

export default connect(mapeStateToProps, mapDispatchToProps)(ImagesContainer)
