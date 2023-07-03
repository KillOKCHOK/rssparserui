import React, { Component } from 'react';
import {connect} from "react-redux";
import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DOMPurify from "dompurify";
import {initialPostLoad, singlePostDelete, updatePost} from "../store/actions/posts/singlePostActions"
import {searchPost} from "../store/actions/posts/listPostsActions"

class SinglePostPage extends Component {
    state = { 
        showUpdateModal:false,
        showDeleteModal:false
     }
    componentDidMount(){
        let id = this.props.match.params['id'];
        this.props.initialPostLoad(id);
    }
    handleUpdateShow = () => {this.setState({showUpdateModal:true})};
    handleUpdateClose = () => {this.setState({showUpdateModal:false})}
    handleDeleteShow = () => {this.setState({showDeleteModal:true})};
    handleDeleteClose = () => {this.setState({showDeleteModal:false})}
    handleDeletePost = () => {
        let id = this.props.match.params['id'];
        this.props.singlePostDelete(id);
        this.handleDeleteClose();
        this.props.searchPost({
            page:0,
            title: this.props.searchString,
            orderBy: this.props.orderBy
        });
    }
    updatePost = () => {
        let id = this.props.match.params['id'];
        let post = {
            id:id,
            title:document.getElementById("NewPostTitle").value, 
            description:document.getElementById("NewPostData").value, 
            link:document.getElementById("NewPostLink").value, 
            author:document.getElementById("NewPostAuthor").value, 
            published:new Date().toUTCString(), 
            created:new Date().toUTCString(), 
            category:[document.getElementById("NewPostCategory").value]
        }
        this.props.updatePost(post);
        this.handleUpdateClose();
    }
    render() { 
        return ( 
            <div>
                <br/>
                <Card style={{ width:'34rem', textOverflow:'ellipsis' }}  className='mx-auto'>
                    <Card.Body>
                        <Card.Title>{this.props.post?this.props.post.title:""}</Card.Title>
                        <Card.Text className='multiline-ellipsis'>
                        <div className='postDesc' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.props.post?this.props.post.description:"")}}></div>
                        </Card.Text>
                        <p>{this.props.post?this.props.post.author?"Author: "+this.props.post.author:"":""}</p>
                    </Card.Body>
                </Card>
                <br/>
                {this.props.user.loggedIn?<ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" onClick={this.handleUpdateShow}>Change post</Button>
                    <Button variant="secondary" onClick={this.handleDeleteShow}>Delete post</Button>
                </ButtonGroup>
                :""}
                <Modal show={this.state.showDeleteModal} onHide={this.handleDeleteClose} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete the post?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleDeleteClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleDeletePost}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>
                {/* /////////////////////////////////////////////////////////// */}
                <Modal show={this.state.showUpdateModal} onHide={this.handleUpdateClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            id="NewPostTitle"
                            type="text"
                            placeholder="title"
                            autoFocus
                            defaultValue={this.props.post.title}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Post</Form.Label>
                        <Form.Control 
                        // onChange={()=>{console.log("Change")}
                        // async (event) => { await handleChange();}
                        defaultValue={this.props.post.description}
                        id="NewPostData" as="textarea" rows={5} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label>Link</Form.Label>
                        <Form.Control
                            id="NewPostLink"
                            type="text"
                            placeholder="link"
                            autoFocus
                            defaultValue={this.props.post.link}
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            id="NewPostAuthor"
                            type="text"
                            placeholder="author"
                            autoFocus
                            defaultValue={this.props.post.author}
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            id="NewPostCategory"
                            type="text"
                            placeholder="category"
                            autoFocus
                            defaultValue={this.props.post.category}
                        />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleUpdateClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.updatePost}>
                            Save Post
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
         );
    }
}
const mapStateToProps = (state)=>{
    return{
      user:state.auth.user,
      token:state.auth.token,
      post:state.singlePostReducer.post,
      activePage:state.postsReducer.activePage,
      searchString:state.postsReducer.searchString,
      orderBy:state.postsReducer.orderBy,
    }
  }

  const mapDispatchToProps = (dispatch)=>{
    return{
        initialPostLoad:(id)=>{dispatch(initialPostLoad(id))},
        singlePostDelete:(id)=>{dispatch(singlePostDelete(id))},
        searchPost:(params)=>{dispatch(searchPost(params))},
        updatePost:(params)=>{dispatch(updatePost(params))},
    }
  }  

export default connect(mapStateToProps,mapDispatchToProps)(SinglePostPage);