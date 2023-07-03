import React from 'react';
import {Switch, Route} from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import PostsListPage from '../../pages/PostsListPage';
import SinglePostPage from '../../pages/SinglePostPage';
import LoginPage from '../../pages/LoginPage';
import SignUpPage from '../../pages/SignUpPage';
import AboutPage from '../../pages/AboutPage';
import ContactPage from '../../pages/ContactPage';
import ProfilePage from '../../pages/ProfilePage';

import {Container} from "react-bootstrap";

let ContentComponent = (props) =>{

    return(
        <div className=''>
            <Container className="container py-3 my-app my-container">
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path='/posts' component={PostsListPage}/>
                    <Route exact path="/posts/:id" component={SinglePostPage} />
                    <Route exact path='/about' component={AboutPage}/>
                    <Route exact path='/profile' component={ProfilePage}/>
                    <Route exact path='/contact' component={ContactPage}/>
                    <Route exact path='/login' component={LoginPage}/>
                    <Route exact path='/signup' component={SignUpPage}/>
                </Switch>
            </Container>

        </div>
    );

}
export default ContentComponent;

