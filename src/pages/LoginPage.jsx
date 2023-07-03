import React from 'react';
import {Form,Button, Col,Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {login, logout, cleanLoginMsg, setModalShow} from '../store/actions/auth/authActions';
import{loginvalidation} from '../store/actions/auth/loginValidationActions';

let MyVerticallyCenteredModal = (props) =>{
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" >
            {props.title?props.title:"Something went wrong"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Invalid login or password
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  class LoginPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            this.props.loginvalidate({ validated: true });
        }else{
            var user = {
            loggedIn : true,
            email : event.currentTarget.validationEmail01.value,
            password : event.currentTarget.validationPwd02.value,
            };
            this.props.login(
            {
                user:user,
                props:this.props
            },
            )
            await this.props.loginvalidate({ validated: false });
        }
    }
  
  render() {
    const {validated} = this.props.validated;
    // const {validated} = false;
      return (
      <div>
          <div className="pageBaseComponent mainPageFirstLvl  w-100 mx-1 px-5 ">
                <img src="/images/security.jpg" alt="Chicago.logo" width="100%"/>
                <br/>
                <br/>
            </div>
          <div className="mainPageSecondLvl  w-100 mx-1 px-5 ">
              <br/>
              <h4  className="textCenter">Welcome! Please Log in to continue...</h4>
              <br/>
          </div>
          <div className="mainPageThirdLvl  w-100 mx-1 px-5 ">
            <br/>
            <Form
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}
          >
          <Form.Row>
            <Col lg="3"></Col>
              <Form.Group as={Col} lg="6" controlId="validationEmail01">
                <Form.Control
                  required
                  type="text"
                  className="textCenter"
                  placeholder="e-mail"
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
                    placeholder="password"
                    defaultValue={this.props.user.password?this.props.user.password:''}
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
              <Form.Group as={Col} lg="6" controlId="validationCustomUsername">
                <Button style={{width:"100%"}} type="submit">Log in</Button>
              </Form.Group>
              <Col lg="3"></Col>
            </Form.Row>
          </Form>
          </div>
          <div className="mainPageSecondLvl  w-100 mx-1 px-5 ">
              <br/>
              <h4  className="textCenter">Don't have an account?</h4>
              <br/>
          </div>
          <div className="mainPageThirdLvl  w-100 mx-1 px-5 ">
          <br/>
            <Form.Row>
                <Col lg="3"></Col>
                    <Form.Group as={Col} lg="6">
                    <Button style={{width:"100%"}} onClick={(e)=>{e.preventDefault(); this.props.history.push("/signup") }}>Sign Up</Button>
                    </Form.Group>
                <Col lg="3"></Col>
            </Form.Row>
          <br/>
          </div>
          <div className="mainPageFourthLvl  w-100 mx-1 px-5 " style={{background: "lightgray"}}>
              <br/>
          </div>
          <MyVerticallyCenteredModal
                  show={this.props.loginFormModalShow}
                  onHide={async () => {
                    await this.props.cleanLoginMsg();
                    this.props.setLoginModalShow(false);
                }}
                title= {this.props.loginErrmsg!==""?this.props.loginErrmsg:"Something went wrong, try one more time 30 seconds later"}
              />
      </div>
        );
      }
    }
 
    const mapStateToProps = (state)=>{
        return{
          user:state.auth.user,
          token:state.auth.token,
          validated:state.loginvalid.loginValidation, //leave as is
          loginErrmsg:state.auth.loginerrmsg,
          loginFormModalShow:state.auth.modalShow,
        }
      }
    
      const mapDispatchToProps = (dispatch)=>{
        return{
          logout:()=>{dispatch(logout())},
          login:async(user,f)=>{dispatch(login(user,f))},
          loginvalidate:(val)=>{dispatch(loginvalidation(val))},   //leave as is
          setLoginModalShow:async (val)=>{dispatch(setModalShow(val))},
          cleanLoginMsg:()=>{dispatch(cleanLoginMsg())}
        }
      }  
    
    export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);