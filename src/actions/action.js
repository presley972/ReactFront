import {requests} from "../agent";
import {
    BLOG_POST_ERROR,
    BLOG_POST_FORM_UNLOAD,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECEIVED,
    BLOG_POST_LIST_REQUEST,
    BLOG_POST_LIST_SET_PAGE,
    BLOG_POST_RECEIVED,
    BLOG_POST_REQUEST,
    BLOG_POST_UNLOAD,
    COMMENT_ADDED,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_RECEIVED,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_UNLOAD,
    IMAGE_BLOG_POST_ERROR,
    IMAGE_BLOG_POST_RECEIVED,
    IMAGE_BLOG_POST_REQUEST,
    IMAGE_BLOG_POST_UNLOAD,
    IMAGE_UPLOAD_ERROR,
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOADED,
    USER_CONFIRMATION_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_PROFILE_ERROR,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_REQUEST,
    USER_PROFILE_UNLOAD,
    USER_REGISTER_COMPLETE,
    USER_REGISTER_SUCCESS,
    USER_SET_ID
} from "./constants";
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "../apiUtils";

export const listBlogPostRequest = () => ({
    type: BLOG_POST_LIST_REQUEST,
});
export const listBlogPostError = (error) => ({
    type: BLOG_POST_LIST_ERROR,
    error

});
export const listBlogPostReceived = (data) => ({
    type: BLOG_POST_LIST_RECEIVED,
    data

});
export const listBlogPostSetPage = (page) => ({
    type: BLOG_POST_LIST_SET_PAGE,
    page
});
export const blogPostListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(listBlogPostRequest());
        return requests.get(`/blog_posts?_page=${page}`)
            .then(response => dispatch(listBlogPostReceived(response)))
            .catch(error => dispatch(listBlogPostError(error)))
    }
};

export const blogPostRequest = () => ({
    type: BLOG_POST_REQUEST,

});

export const blogPostError = (error) => ({
    type: BLOG_POST_ERROR,
    error

});
export const blogPostReceived = (data) => ({
    type: BLOG_POST_RECEIVED,
    data

});

export const blogPostUnload = () => ({
    type: BLOG_POST_UNLOAD,

});

export const blogPostFetch = (id) => {
    return (dispatch) => {
        dispatch( blogPostRequest());
        return requests.get(`/blog_posts/${id}`)
            .then(response => dispatch(blogPostReceived(response)))
            .catch(error => dispatch(blogPostError(error)));
    }
};

export const blogPostAdd= (title, content, images = []) => {
    return (dispatch) =>  {
        return requests.post(
            '/blog_posts',
            {
                 content,
                title,
                slug: title && title.replace(/ /g,"-").toLowerCase(),
                images: images.map(image => `/images/${image.id}`)
            }
        ).catch(error => {
            if (401 === error.response.status){
                dispatch(userLogout());
            }else if (403 === error.response.status){
                throw new SubmissionError({
                    _error: "You don't have rights to publish "
                });
            }
            throw new SubmissionError(parseApiErrors(error))
        })
    }
};

export const blogPostFormUnload = () => ({
    type: BLOG_POST_FORM_UNLOAD
});

export const commentListRequest = () => ({
    type: COMMENT_LIST_REQUEST,

});

export const commentListError = (error) => ({
    type: COMMENT_LIST_ERROR,
    error

});
export const commentListReceived = (data) => ({
    type: COMMENT_LIST_RECEIVED,
    data

});

export const commentListUnload = () => ({
    type: COMMENT_LIST_UNLOAD,

});

export const commentListFetch = (id, page = 1) => {
    return (dispatch) => {
        dispatch( commentListRequest());
        return requests.get(`/blog_posts/${id}/comments?_page=${page}`)
            .then(response => dispatch(commentListReceived(response)))
            .catch(error => dispatch(commentListError(error)));
    }
};

export const commentAdded = (comment) => ({
    type: COMMENT_ADDED,
    comment

});

export const commentAdd= (comment, blogPostId) => {
  return (dispatch) =>  {
      return requests.post(
          '/comments',
          {
              content: comment,
              blogPost: `/blog_posts/${blogPostId}`
          }
      ).then(response => dispatch(commentAdded(response))
      ).catch(error => {
          if (401 === error.response.status){
              dispatch(userLogout());
          }
          throw new SubmissionError(parseApiErrors(error))
      })
  }
};

export const userLoginSuccess = (token, userId) => {
    return {
        type: USER_LOGIN_SUCCESS,
        token,
        userId
    }
};

export const userLoginAttempt = (email,password) =>{
    return (dispatch) => {
        return requests.post('/authentication_token',{email, password}, false).then(
            response => dispatch(userLoginSuccess(response.token, response.id))
        ).catch(error =>{
            throw new SubmissionError({
                _error: 'Email or Password is invalid'
            });
        });
    }
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
};

export const userRegisterSuccess = () => {
    return {
        type: USER_REGISTER_SUCCESS
    }
};

export const userRegister = (username, password, retypedPassword, email, name) => {
    return (dispatch) => {
        return requests.post('/utilisateurs', {username, password, retypedPassword, email, name}, false)
            .then(() => dispatch(userRegisterSuccess()))
            .catch(error => {
                throw new SubmissionError(parseApiErrors(error));
            });
    }
};

export const userConfirmationSuccess = () => {
    return {
        type: USER_CONFIRMATION_SUCCESS
    }
};

export const userRegisterComplete = () => {
    return {
        type: USER_REGISTER_COMPLETE
    }
};

export const userConfirm = (confirmationToken) => {
    return (dispatch) => {
        return requests.post('/utilisateurs/confirm', {confirmationToken}, false)
            .then(() => dispatch(userConfirmationSuccess()))
            .catch(error => {
                throw new SubmissionError({
                    _error: 'Confirmation token is invalid'
                });
            });
    }
};

export const userSetId = (userId) => ({
    type: USER_SET_ID,
    userId

});

export const userProfileRequest = () => ({
    type: USER_PROFILE_REQUEST,

});

export const userProfileError = (userId) => ({
    type: USER_PROFILE_ERROR,
    userId

});
export const userProfileReceived = (userId,userData) => ({
    type: USER_PROFILE_RECEIVED,
    userData,
    userId

});

export const userProfileUnload = () => ({
    type: USER_PROFILE_UNLOAD,

});
export const userProfileFetch = (userId) =>{
    return (dispatch) => {
        dispatch(userProfileRequest());
        return requests.get(`/utilisateurs/${userId}`, true).then(
            response => dispatch(userProfileReceived(userId,response))
        ).catch(() => dispatch(userProfileError(userId)))
    }
};
export const imageUploaded = (data) => {
    return {
        type: IMAGE_UPLOADED,
        image: data
    }
};

export const imageUploadRequest = () => {
    return {
        type: IMAGE_UPLOAD_REQUEST,
    }
};

export const imageUploadError = () => {
    return {
        type: IMAGE_UPLOAD_ERROR,
    }
};

export const imageUpload = (file) => {
    return (dispatch) => {
        dispatch(imageUploadRequest());
        return requests.upload('/images', file)
            .then(response => dispatch(imageUploaded(response)))
            .catch(() => dispatch(imageUploadError))
    }
};

export const imageBlogPostRequest = () => ({
    type: IMAGE_BLOG_POST_REQUEST,

});

export const imageBlogPostError = (error) => ({
    type: IMAGE_BLOG_POST_ERROR,
    error

});
export const imageBlogReceived = (data) => ({
    type: IMAGE_BLOG_POST_RECEIVED,
    data

});

export const imageBlogPostUnload = () => ({
    type: IMAGE_BLOG_POST_UNLOAD
});


export const imageBlogPostFetch = (id) => {
    return (dispatch) => {
        dispatch( blogPostRequest());
        return requests.get(`/blog_posts/${id}/images`)
            .then(response => dispatch(imageBlogReceived(response)))
            .catch(error => dispatch(imageBlogPostError(error)));
    }
};
