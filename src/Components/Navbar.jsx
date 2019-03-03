import React from 'react';
// import navbar from '../CSS/navbar.module.css';
import styled from 'styled-components';

// flex flex-space-evenly"
function Navbar() {
        const Nav = styled.nav`
            display: flex;
            justify-content: space-evenly;
            height: 5vh;
            background-image: linear-gradient(to bottom right, red, #565649);
        `;

        const Ul = styled.ul`
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: inherit;
        `;

        const Li = styled.li`
            float: left;
            a {
                display: block;
                color: white;
                text-align: center;
                padding: 14px 16px;
                text-decoration: none;
                
                    &:hover { 
                        background-color: #111;
                    }
            }
        `;

        // const Li_a = styled.a`
        //     display: block;
        //     color: white;
        //     text-align: center;
        //     padding: 14px 16px;
        //     text-decoration: none;
            
        //         &:hover { 
        //             background-color: #111;
        //         }
        // `

    return (
            /* <nav className="Navbar_nav flex flex_space_evenly">
                <ul className="Navbar_ul">
                    <li className="Navbar_li"><a href="#">Home</a></li>
                    <li className="Navbar_li"><a href="#About">About</a></li>
                    <li className="Navbar_li"><a href="#Service">Service</a></li>
                    <li className="Navbar_li"><a href="#Clients">Clients</a></li>
                </ul>
            </nav> */

            //  <nav className={navbar.nav}>
            //     <ul className={navbar.ul}>
            //         <li className={navbar.li}><a href="#">Home</a></li>
            //         <li className={navbar.li}><a href="#About">About</a></li>
            //         <li className={navbar.li}><a href="#Service">Service</a></li>
            //         <li className={navbar.li}><a href="#Clients">Klienten</a></li>
            //     </ul>
            // </nav>

            
             <Nav>
                <Ul>
                    <Li><a href="#">Home</a></Li>
                    <Li><a href="#About">About</a></Li>
                    <Li><a href="#Service">Service</a></Li>
                    <Li><a href="#Clients">Klienten</a></Li>
                </Ul>
            </Nav>
    );
}

export default Navbar;