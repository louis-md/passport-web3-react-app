import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Welcome extends Component {
    render() {
        return (
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header p-4">
                        <h3 className="modal-title text-primary font-weight-bold">Welcome to Passport Web3</h3>
                    </div>
                    <div className="form-group">
                        <h5>Private profiles & file sharing using web3.js</h5>
                        <br/><br/>
                        <article>
                            <p>Dear internet traveller,<br/>
                             This small website is intended to be an introduction to the web3, as well as a nice interface for storing files and web3 user profiles collaboratively. </p><br/><br/>
                            <a href="/signup" style={{color: 'white'}}><button className="btn btn-secondary btn-sm">Get Started!</button></a>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}