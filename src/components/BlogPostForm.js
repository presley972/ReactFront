import React from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {canWriteBlogPost} from "../apiUtils";
import {Redirect} from "react-router";
import {renderField} from "../form";
import {blogPostAdd, blogPostFormUnload} from "../actions/action";
import ImageUpload from "./ImageUpload";
import {ImageBrowser} from "./ImageBrowser";

const mapDispatchToProps = {
    blogPostAdd,
    blogPostFormUnload
};

const mapStateToProps = state => ({
    userData: state.auth.userData,
    ...state.blogPostForm
});

class BlogPostForm extends React.Component{

    onSubmit(values){
        const {blogPostAdd, reset, history, images} = this.props;

        return blogPostAdd(values.title,values.content, images)
            .then(() => {
                reset();
                history.push('/');
            });
    }

    componentWillUnmount() {
        this.props.blogPostFormUnload();
    }

    render() {
        if (!canWriteBlogPost(this.props.userData)){
            return <Redirect to="/login"/>
        }

        const {submitting,handleSubmit, error,images, isImageUploading} = this.props;
        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    {error && <div className="alert alert-danger"> {error}</div>}
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="title" label="Title:" type="text" component={renderField}/>
                        <Field name="content" label="Content:" type="textarea" component={renderField}/>
                        <ImageUpload/>
                        <ImageBrowser images={images}/>
                        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting || isImageUploading}>
                            Post it</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default reduxForm({
    form: 'BlogPostForm'
})(connect(mapStateToProps, mapDispatchToProps)(BlogPostForm))
