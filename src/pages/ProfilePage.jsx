import React from 'react';

import {Button} from 'react-bootstrap';
import {Form,Modal, Col} from 'react-bootstrap';
import {connect} from "react-redux";
import{PwdChangeLinkAction, cleanRegistrationMsg, setModalShow, formvalidation} from '../store/actions/updatepwd/changePwdActions';

let MyVerticallyCenteredModal=(props) =>{
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" >
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>
          {props.title?props.title:"Something went wrong"}
          </h3>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

class ProfilePage extends React.Component {
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
            fillForm:false
        });
      }else{
        event.preventDefault();
        event.stopPropagation();
        var user = {};
        user.loggedIn=true;
        user.email = event.currentTarget.validationEmail01.value;
        user.password = event.currentTarget.validationPwd02.value;
        this.props.changePWD({login:event.currentTarget.validationEmail01.value, password:event.currentTarget.validationPwd02.value, link:this.props.match.params.id})
        this.props.testvalidate({ samePwd:true, validated: false , fillForm:false});
    }
}
handleChange (event){
  event.preventDefault();
  event.stopPropagation();
    if (event.currentTarget.validationPwd02.value !== ''&&event.currentTarget.validationPwd03.value === '') {
      event.currentTarget.validationPwd03.isInvalid=true
      this.props.testvalidate({ 
        samePwd:false,
        validated: true,
        fillForm:false
      }) }
      else if (event.currentTarget.validationPwd02.value === ''&&event.currentTarget.validationPwd03.value !== '') {
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.validationPwd03.isInvalid=true
      this.props.testvalidate({ 
        samePwd:false,
        validated: true,
        fillForm:true
      })
    }
    else if (event.currentTarget.validationPwd02.value !== event.currentTarget.validationPwd03.value) {
      event.currentTarget.validationPwd03.isInvalid=true
      this.props.testvalidate({ 
          samePwd:false,
          validated: true,
          fillForm:true
      })
    }
    else if(event.currentTarget.validationPwd02.value === event.currentTarget.validationPwd03.value) {
      event.currentTarget.validationPwd03.isInvalid=false
      this.props.testvalidate({ 
          samePwd:true,
          validated: true,
          fillForm:true
      });
    }
}

render() {
  
    return (
    <div>
         <div  className="pageBaseComponent mainPageFirstLvl  w-100 mx-1 px-5 ">
                <img style={{height:"400px", width:"auto"}} src="/images/profile.jpg" alt="profile.logo" width="100%"/>
            </div>
        <div className="mainPageSecondLvl  w-100 mx-1 px-5 ">
            <br/>
            <h4 >Welcome! </h4>
            <h4>To create new password use the following form</h4>
            <br/>
        </div>
        <div className="mainPageThirdLvl  w-100 mx-1 px-5 ">
                
          <br/>
        <Form
            validated={this.props.pwdChangeFormValidated}
            onSubmit={e => this.handleSubmit(e)}
            onChange={e => this.handleChange(e)}
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
                    className={!this.props.pwdChangeFormSamePwd?"textCenter is-invalid":"textCenter"}
                    placeholder="password"
                    defaultValue={''}
                />
                {this.props.pwdChangeFormSamePwd?"":<Form.Control.Feedback className="textCenter">{!this.props.pwdChangeFormSamePwd?"Looks good!":""}</Form.Control.Feedback>}
                <Form.Control.Feedback className="textCenter">{this.props.pwdChangeFormSamePwd?"Looks good!":""}</Form.Control.Feedback>
                <Form.Control.Feedback className="textCenter" type="invalid">
                  {!this.props.pwdChangeFormSamePwd?"Password mismatch":"Please enter password."}
                </Form.Control.Feedback>
            </Form.Group>
            <Col lg="3"></Col>
          </Form.Row>
          <Form.Row>
            <Col lg="3"></Col>
            <Form.Group as={Col} lg="6" controlId="validationBtn">
              <Button style={{width:"100%"}} type="submit">Change password</Button>
            </Form.Group>
            <Col lg="3"></Col>
          </Form.Row>
        </Form>
        </div>
        <div className="mainPageFourthLvl  w-100 mx-1 px-5 " style={{background: "lightgray"}}>
            <br/>
        </div>
        <MyVerticallyCenteredModal
                show={this.props.pwdChangeFormModalShow}
                onHide={async () => {
                  await this.props.cleanRegistrationMsg();
                  this.props.setModalShow(false);
                  this.props.history.push('/');
              }}
              title= {this.props.pwdChangeFormRegistrationmsg!==""?this.props.pwdChangeFormRegistrationmsg:"Something went wrong, try one more time 30 seconds later"}
            />
    </div>
      );
    }
  }

  const mapStateToProps = (state)=>{
    return{
      user:state.auth.user,
      pwdChangeFormValidated:state.changePwdReducer.validated,
      pwdChangeFormSamePwd:state.changePwdReducer.samePwd,
      pwdChangeFormFillForm:state.changePwdReducer.fillForm,
      pwdChangeFormRegistrationmsg:state.changePwdReducer.registrationMessage,
      pwdChangeFormModalShow:state.changePwdReducer.modalShow,
    }
  }

  const mapDispatchToProps = (dispatch)=>{
    return{
      testvalidate:(val)=>{dispatch(formvalidation(val))},
      changePWD:async (val)=>{dispatch(PwdChangeLinkAction(val))},
      setModalShow:async (val)=>{dispatch(setModalShow(val))},
      cleanRegistrationMsg:()=>{dispatch(cleanRegistrationMsg())}
    }
  }  

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);