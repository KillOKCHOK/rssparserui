import React, { Component } from 'react';

class AboutPage extends Component {
    render() { 
        return ( 
            <div>
                <div  className="pageBaseComponent mainPageFirstLvl  w-100 mx-1 px-5 ">
                        <img style={{height:"400px", width:"auto"}} src="/images/about.jpg" alt="profile.logo" width="100%"/>
                    </div>
                <div className="mainPageSecondLvl  w-100 mx-1 px-5 ">
                    <br/>
                    <h4 >About us</h4>
                    <br/>
                </div>
                <div className="mainPageThirdLvl  w-100 mx-1 px-5 ">
                    <br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam blanditiis architecto, perspiciatis enim amet minima dicta ratione facilis magnam suscipit labore libero, et, accusamus voluptatum maiores? Consequatur molestiae quibusdam voluptate?
                    <br/>
                    <br/>
                </div>
                <div className="mainPageFourthLvl  w-100 mx-1 px-5 " style={{background: "lightgray"}}>
                    <br/>
                </div>
            </div>
         );
    }
}
 
export default AboutPage;