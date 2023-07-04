import React from 'react'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { AiFillExperiment, AiFillStar } from 'react-icons/ai'
import { BsFillBookmarkStarFill } from 'react-icons/bs';

export default function Navbar(props) {
    const LoadRecents = () => {
        props.setp(1)
        props.setNav(1);
        document.getElementById("navbarBasicExample").className="navbar-menu"
    }
    const LoadAll = () => {
        props.setp(1)
        props.setNav(0);
        document.getElementById("navbarBasicExample").className="navbar-menu"
    }
    const LoadSaved = () => {
        props.setp(1)
        props.setNav(2);
        document.getElementById("navbarBasicExample").className="navbar-menu"
    }
    const LoadPop = () => {
        props.setp(1)
        props.setNav(3);
        document.getElementById("navbarBasicExample").className="navbar-menu"
    }
    return (
        <div>
            <nav className="navbar is-hidden-desktop is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src={"https://cdn.vlabs.ac.in/logo/vlead-large.png"} width="70" height="90"/>
                    </a>
                    <b style={{marginTop:"auto",marginBottom:"auto",fontSize:"x-large"}}>Virtual Labs</b>
                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={()=>{
                        if(document.getElementById("navbarBasicExample").className.includes("is-active"))
                        {
                            document.getElementById("navbarBasicExample").className="navbar-menu"
                        }
                        else{
                            document.getElementById("navbarBasicExample").className="navbar-menu is-active"
                        }
                    }}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" onClick={LoadPop}>
                        <AiFillStar />Popular
                        </a>

                        <a className="navbar-item" onClick={LoadRecents}>
                        <RxCounterClockwiseClock />Recents
                        </a>
                        <a className="navbar-item" onClick={LoadAll}>
                        <AiFillExperiment />All Experiments
                        </a>
                        <a className="navbar-item" onClick={LoadSaved}>
                        <BsFillBookmarkStarFill />Starred
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}
