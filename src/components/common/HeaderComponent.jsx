import React from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap'; /*, NavDropdown*/
import{login, logout} from '../../store/actions/auth/authActions';
import{loginvalidation} from '../../store/actions/auth/loginValidationActions';
import {withRouter} from 'react-router';

class HeaderComponent extends React.Component{
    constructor(props) {
        super(props)
        this.state = {expanded :false};
      }
    state = {  }
    
    render(){
    var className=this.props.history.location.pathname==='/logout'||this.props.location.pathname==='/login'?'active':''

    let LoginButton = {
        sign:this.props.user.loggedIn?'Sign out':'Sign In/Up',
        link:this.props.user.loggedIn?'/':'/login'
    }

    let userButtons = null;
    if (this.props.user.loggedIn) {
        userButtons = [
            <NavLink onClick={() => setExpanded(this.state.expanded ? false : "expanded")}  to="/profile" key='1' >Profile</NavLink>
        ];
    } else {
        userButtons = null;
    }

    let doLogOut = () => {
        this.props.loginvalidate({ validated: false });
        this.props.logout();
    }

    let setExpanded=(val)=>{
        this.setState({expanded:val})
    }

    let signInOut = (e)=>{
        if (this.props.user.loggedIn) doLogOut(); 
        this.setState({expanded:this.state.expanded ? false : "expanded"});
    }
    
    return(
        
        <div>
        <Navbar onToggle={() => setExpanded(this.state.expanded ? false : "expanded")} expanded={this.state.expanded} expand="lg" bg="dark" variant="dark">
            
        <Navbar.Brand onClick={() => setExpanded(false)}> <NavLink exact to="/">POSTS</NavLink></Navbar.Brand>
        <Navbar.Toggle  aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='mr-auto'>
                {userButtons}
            </Nav>
            <Nav>
                <NavLink onClick={() => setExpanded(this.state.expanded ? false : "expanded")} to="/posts">Posts</NavLink>
                <NavLink onClick={() => setExpanded(this.state.expanded ? false : "expanded")} to="/about">About</NavLink>
                <NavLink onClick={() => setExpanded(this.state.expanded ? false : "expanded")} to="/contact">Contact</NavLink>
                <NavLink eventkey={2} onClick={signInOut}  className={className} style={{width:'130px'}} exact to={LoginButton.link} >
                    {LoginButton.sign} 
                </NavLink>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        </div>
    );
}

}
const mapStateToProps = (state)=>{
    return{
      user:state.auth.user,
    }
  };

  const mapDispatchToProps = (dispatch)=>{
    return{
        logout:()=>{dispatch(logout())},
        login:(user)=>{dispatch(login(user))},
        loginvalidate:(val)=>{dispatch(loginvalidation(val))}
    }
  }  
  
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HeaderComponent));
