import {combineReducers} from "redux";
import listBlogPost from "./reducers/listBlogPost";
import blogPost from "./reducers/blogPost";
import commentList from "./reducers/commentList";
import {reducer as formReducer} from 'redux-form';
import auth from "./reducers/auth";
import {routerReducer} from "react-router-redux";
import registration from "./reducers/registration";
import blogPostForm from "./reducers/blogPostForm";

export default combineReducers({
    listBlogPost,
    blogPost,
    commentList,
    auth,
    registration,
    blogPostForm,
    router: routerReducer,
    form: formReducer
})
