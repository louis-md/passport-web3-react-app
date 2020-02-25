import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/auth-service";
import Login from "../auth/Login";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    });
  };

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="navbar navbar-default navbar-expand-md navbar-light sticky-top">
          <div className="container">
            <a className="navbar-brand font-weight-bold" href="/">
              <img rel="img-fluid" src="/logo.png" width="35px" alt="logo" />
            </a>
            <span className="navbar-brand font-weight-bold">
              <Link to="/contacts" style={{ textDecoration: "none" }}>
                My contacts
              </Link>
            </span>
            <span className="navbar-brand font-weight-bold">
              <Link to={`/user/profile/${this.state.loggedInUser._id}`} style={{ textDecoration: "none" }}>My profile</Link>
            </span>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ml-auto mr-5"></div>
              <div className="my-2 my-sm-0">
                <Link to="/">
                  <button
                    onClick={() => this.logoutUser()}
                    className="btn btn-secondary btn-sm"
                  >
                    <span className="d-flex align-items-center">
                      Log out&nbsp;&nbsp;
                    </span>
                  </button>
                </Link>
                <div
                  className="modal fade"
                  id="login-oy2nrmz20"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="login-oy2nrmz20"
                  style={{ display: "none" }}
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content text-left text-dark">
                      <div className="modal-header p-4">
                        <h5 className="modal-title text-primary font-weight-bold" id="modal-title-login-oy2nrmz20">Log in</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <Login />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="navbar navbar-default navbar-expand-md navbar-light sticky-top">
          <div className="container">
            <a className="navbar-brand font-weight-bold" href="/">
              <img rel="img-fluid" src="/logo.png" width="35px" alt="logo" />
            </a>
            <a className="navbar-brand font-weight-bold" href="/">
              Passport Web3
            </a>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ml-auto mr-5"></div>
              <div className="my-2 my-sm-0">
                <button
                  data-toggle="modal"
                  data-target="#login-oy2nrmz20"
                  className="btn btn-secondary btn-sm"
                >
                  <span className="d-flex align-items-center">
                    Log in&nbsp;&nbsp;
                  </span>
                </button>
                <div
                  className="modal fade"
                  id="login-oy2nrmz20"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="login-oy2nrmz20"
                  style={{ display: "none" }}
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content text-left text-dark">
                      <div className="modal-header p-4">
                        <h5
                          className="modal-title text-primary font-weight-bold"
                          id="modal-title-login-oy2nrmz20"
                        >
                          Log in
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <Login />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      );
    }
  }
}

export default Navbar;
