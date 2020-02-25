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
                        <h5>A light & secure web3 contact repository</h5>
                        <br/><br/>
                        <article>
                            <p>Hello internet traveller. This small website is intended to be a short introduction to the web3 concepts necessary for blockchain-related web development, as well as a nice interface for storing profiles, personal information and contacts in a safe way.</p>
                            <Link to={`/signup`}><button className="btn btn-secondary btn-sm">Get started!</button></Link>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}