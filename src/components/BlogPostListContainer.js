import React from 'react';
import ListBlogPost from "./ListBlogPost";
import {blogPostListFetch, listBlogPostSetPage} from "../actions/action";
import {connect} from "react-redux";
import Spinner from "./Spinner";
import {Paginator} from "./Paginator";

const mapStateToProps = state => ({
    ...state.listBlogPost
});

const mapDispatchToProps = {
    blogPostListFetch,listBlogPostSetPage
};

class BlogPostListContainer extends React.Component{

    componentDidMount() {

        this.props.blogPostListFetch( this.getQueryParamPage());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {currentPage,blogPostListFetch, listBlogPostSetPage} = this.props;

        if (prevProps.match.params.page !== this.getQueryParamPage()){
            listBlogPostSetPage(this.getQueryParamPage());
        }

        if (prevProps.currentPage !== currentPage){
            blogPostListFetch(currentPage);
        }
    }

    getQueryParamPage(){

        return Number(this.props.match.params.page) || 1;
    }

    changePage(page){
        const {history, listBlogPostSetPage} = this.props;
        listBlogPostSetPage(page);
        history.push(`/${page}`);
    }

    onNextPageClick(e){
        const {currentPage,pageCount} = this.props;
        const newPage = Math.min(currentPage + 1, pageCount);
        this.changePage(newPage);
    }

    onPrevPageClick(e){
        const {currentPage} = this.props;
        const newPage = Math.max(currentPage - 1, 1);
        this.changePage(newPage);
    }

    render() {
        const {posts, isFetching, currentPage, pageCount} = this.props;

        if (isFetching){
            return (<Spinner/>);
        }

        return (
            <div>
                <ListBlogPost posts={posts} />
                <Paginator currentPage={currentPage} pageCount={pageCount} setPage={this.changePage.bind(this)} nextPage={this.onNextPageClick.bind(this)} prevPage={this.onPrevPageClick.bind(this)}/>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostListContainer)
