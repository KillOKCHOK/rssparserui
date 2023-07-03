import React, { Component } from 'react';
import {Form, Button, Modal, Col} from 'react-bootstrap';

import {connect} from "react-redux";
import{signUpAction, cleanRegistrationMsg, setModalShow, formvalidation} from '../store/actions/registration/registrationActions';

let MyVerticallyCenteredModal=(props) =>{
    // console.log(props)
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" >
            {props.title!==""?props.title:"Something went wrong"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
           {props.title==="Account already exists, try other login"||props.title==="Something went wrong"?"Try one more time or other login":"Try to Sign In"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

class SignUpPage extends Component {
    
        async handleSubmit(event) {
          event.preventDefault();
          event.stopPropagation();
          const form = event.currentTarget;
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.props.testvalidate({
              samePwd:false,
              validated: true 
          });
          }else if (event.currentTarget.validationPwd02.value !== event.currentTarget.validationPwd03.value) {
            event.preventDefault();
            event.stopPropagation();
            event.currentTarget.validationPwd03.isInvalid=true
            this.props.testvalidate({ 
                samePwd:false,
                validated: true,
                fillForm:true
            });
          }else{
            event.preventDefault();
            event.stopPropagation();
            var user = {};
            user.loggedIn=true;
            user.email = event.currentTarget.validationEmail01.value;
            user.password = event.currentTarget.validationPwd02.value;
            this.props.userRegistration({login:event.currentTarget.validationEmail01.value, password:event.currentTarget.validationPwd02.value});
            this.props.testvalidate({ samePwd:true, validated: false , fillForm:false});
        }
    }
    
    render() {
        return (
        <div >
            <div className="pageBaseComponent mainPageFirstLvl  w-100 mx-1 px-5 ">
                <img src="/images/registr.jpg" alt="Chicago.logo" width="100%"/>
                <br/>
                <br/>
            </div>
            <div className="mainPageSecondLvl  w-100 mx-1 px-5 ">
                <br/>
                <h4  className="textCenter">Welcome! Please fill the form to create account</h4>
                <br/>
            </div>
            <div className="mainPageThirdLvl  w-100 mx-1 px-5 ">
                    
              <br/>
            <Form
            //   noValidate
              validated={this.props.validated}
              onSubmit={e => this.handleSubmit(e)}
            >
              <Form.Row>
                <Col lg="3"></Col>
                <Form.Group as={Col} lg="6" controlId="validationEmail01">
                  <Form.Control
                    required
                    type="text"
                    className="textCenter"
                    placeholder="enter e-mail"
                    defaultValue={this.props.user.email?this.props.user.email:''}
                    />
                    <Form.Control.Feedback className="textCenter">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback className="textCenter" type="invalid">
                        Please provide your e-mail.
                    </Form.Control.Feedback>
                </Form.Group>
                <Col lg="3"></Col>
                </Form.Row>
                <Form.Row>
                <Col lg="3"></Col>
                <Form.Group as={Col} lg="6" controlId="validationPwd02">
                    <Form.Control
                      required
                      type="password"
                      className="textCenter"
                      placeholder="enter password"
                      defaultValue={''}
                    />
                    <Form.Control.Feedback className="textCenter">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback className="textCenter" type="invalid">
                        Please enter password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Col lg="3"></Col>
              </Form.Row>
                <Form.Row>
                <Col lg="3"></Col>
                <Form.Group as={Col} lg="6" controlId="validationPwd03">
                    <Form.Control
                        required
                        type="password"
                        className={this.props.samePwd?"textCenter ":"textCenter is-invalid"}
                        placeholder="repeat password"
                        defaultValue={''}
                    />
                    <Form.Control.Feedback className="textCenter">Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback className="textCenter" type="invalid">
                      {!this.props.fillForm?"Please enter password.":"Password mismatch"}
                    </Form.Control.Feedback>
                </Form.Group>
                <Col lg="3"></Col>
              </Form.Row>
              <Form.Row>
                <Col lg="3"></Col>
                <Form.Group as={Col} lg="6" controlId="validationBtn">
                  <Button style={{width:"100%"}} type="submit">Sign Up</Button>
                </Form.Group>
                <Col lg="3"></Col>
              </Form.Row>
            </Form>
            </div>
            {/* ========================================================================================= */}
            
            <div className="mainPageFourthLvl  w-100 mx-1 px-5 " style={{background: "lightgray"}}>
            <br/>
            </div>
            <MyVerticallyCenteredModal
                show={this.props.modalShow}
                onHide={async () => {
                    await this.props.cleanRegistrationMsg();
                    this.props.setModalShow(false);
                    this.props.history.push('/login');
                }}
                title= {this.props.registrationmsg!==""?this.props.registrationmsg:"Something went wrong, try one more time 30 seconds later"}
            />
        </div>
          );
        }
      }
    
      const mapStateToProps = (state)=>{
        return{
          user:state.auth.user,
          validated:state.userRegistration.validated,
          samePwd:state.userRegistration.samePwd,
          fillForm:state.userRegistration.fillForm,
          registrationmsg:state.userRegistration.registrationMessage,
          modalShow:state.userRegistration.modalShow,
        }
      }
    
      const mapDispatchToProps = (dispatch)=>{
        return{
          testvalidate:(val)=>{dispatch(formvalidation(val))},
          userRegistration:async (val)=>{dispatch(signUpAction(val))},
          setModalShow:async (val)=>{dispatch(setModalShow(val))},
          cleanRegistrationMsg:()=>{dispatch(cleanRegistrationMsg())}
        }
      }  
    
    export default connect(mapStateToProps,mapDispatchToProps)(SignUpPage);