import React, { Component } from 'react';
import {connect} from "react-redux";
import {initialPostLoad, searchPost, changeOrder, createNewPost} from "../store/actions/posts/listPostsActions";
import { Button, Card, Pagination, Form, Col, Modal, InputGroup, FormControl} from 'react-bootstrap';
import DOMPurify from "dompurify";

class PostsListPage extends Component {
    state = { show:false }

    componentDidMount(){
        if(this.props.posts.length===0)this.props.initialPostsLoad();
    }

    handleClose = () => { 
        this.setState({show:false})
    }
    handleShow = () => this.setState({show:true});
    
    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        this.props.searchPost({title:form.searchString01.value, orderBy:form.formHorizontalRadios[0].checked?"created":"title"}); 
    }

    saveNewPost = (event) => {
        let post = {
            img:document.getElementById("NewPostImage").value,
            title:document.getElementById("NewPostTitle").value, 
            description:document.getElementById("NewPostData").value, 
            link:document.getElementById("NewPostLink").value, 
            author:document.getElementById("NewPostAuthor").value, 
            published:new Date().toUTCString(), 
            created:new Date().toUTCString(), 
            category:[document.getElementById("NewPostCategory").value]
        }
        this.props.createNewPost(post);
        this.setState({show:false});
    }
    render() { 
        let active = this.props.active;
        let pagesNumber = Math.ceil(this.props.postsNumber/10);
        let items = [];
        for (let number = 1; number <= pagesNumber; number++) {
        items.push(
            <Pagination.Item onClick={()=>{
                this.props.searchPost({page:number, title:this.props.searchString, orderBy:this.props.orderBy});
                window.scrollTo({
                    top: 0, 
                    behavior: 'smooth'
                  });
                }} key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
        }
        return ( 
        <div>
            <div style={{width:"75%", marginLeft:"9%"}}>
            <Form noValidate onSubmit={this.handleSubmit}>
            <Form.Row>
            <Col sm={2}>
                <Form.Check
                type="radio"
                label="Order by date"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                defaultChecked 
                onChange = {(event)=>{
                    if(event.currentTarget.checked)this.props.changeOrder("date");
                }}
                />
                <Form.Check
                type="radio"
                label="Order by title"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                onChange = {(event)=>{
                    if(event.currentTarget.checked)this.props.changeOrder("title");
                }}
                />
            </Col>
                <Col sm={10}>
                <InputGroup className="mb-3">
                <FormControl
                id="searchString01"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button type="submit" variant="outline-secondary">Search</Button>
                </InputGroup.Append>
                </InputGroup>
                <InputGroup className="mb-3" 
                onClick={this.handleShow}>
                    <FormControl
                        placeholder="Create new post"
                        aria-label="Start here"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">Create post</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                </Col>
            </Form.Row>
            </Form>
            </div>
            {this.props.posts&&this.props.posts.map(({id, title, link, description, created, author})=>(
                    <div key={id}>
                        <Card style={{ width:'34rem', textOverflow:'ellipsis' }}  className='mx-auto'>
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text className='multiline-ellipsis'>
                                <div className='postDesc' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}}></div>
                                </Card.Text>
                                <p>Author: {author}</p>
                                <Button variant="primary" onClick={(e)=>{
                                    e.preventDefault(); 
                                    this.props.history.push("/posts/"+id);
                                    window.scrollTo({
                                        top: 0, 
                                        behavior: 'smooth'
                                      }); 
                                    }}>Open post description</Button>
                            </Card.Body>
                        </Card>
                        <br/>
                    </div>
                ))}
                <Pagination style={{paddingLeft: 100/2-100/33*pagesNumber/2+"%"}}>{items}</Pagination>
        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Enter image url</Form.Label>
                <Form.Control
                    id="NewPostImage"
                    type="text"
                    autoFocus
                />
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label>Title</Form.Label>
                <Form.Control
                    id="NewPostTitle"
                    type="text"
                    placeholder="title"
                    autoFocus
                    defaultValue={null}
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Post</Form.Label>
                <Form.Control 
                // onChange={()=>{console.log("Change")}
                    // async (event) => { await handleChange();}
                id="NewPostData" as="textarea" rows={5} />
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label>Link</Form.Label>
                <Form.Control
                    id="NewPostLink"
                    type="text"
                    placeholder="link"
                    autoFocus
                    defaultValue={null}
                />
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label>Author</Form.Label>
                <Form.Control
                    id="NewPostAuthor"
                    type="text"
                    placeholder="author"
                    autoFocus
                    defaultValue={null}
                />
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label>Category</Form.Label>
                <Form.Control
                    id="NewPostCategory"
                    type="text"
                    placeholder="category"
                    autoFocus
                    defaultValue={null}
                />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.saveNewPost}>
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
      posts:state.postsReducer.posts,
      active:state.postsReducer.activePage,
      postsNumber:state.postsReducer.postsNumber,
      searchString:state.postsReducer.searchString,
      orderBy:state.postsReducer.orderBy,
    }
  }

  const mapDispatchToProps = (dispatch)=>{
    return{
        initialPostsLoad:()=>{dispatch(initialPostLoad())},
        searchPost:(params)=>{dispatch(searchPost(params))},
        changeOrder:(params)=>{dispatch(changeOrder(params))},
        createNewPost:(params)=>{dispatch(createNewPost(params))}
    }
  }  

export default connect(mapStateToProps,mapDispatchToProps)(PostsListPage);