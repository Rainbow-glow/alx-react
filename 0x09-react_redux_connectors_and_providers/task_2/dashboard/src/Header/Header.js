import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { AppContext } from '../App/AppContext';
import { logout } from '../actions/uiActionCreators';
import Logo from '../assets/holberton-logo.jpg';

class Header extends Component {
  static contextType = AppContext;

  render() {
    const { user, logOut } = this.context;
    return (
      <div className={css(styles['App-header'])}>
        <img src={Logo} className={css(styles['App-logo'])} alt='logo' />
        <h1>School dashboard</h1>
        {user?.isLoggedIn && (
          <section id='logoutSection'>
            Welcome {user.email} (
            <a href='#' onClick={logOut}>
              logout
            </a>
            )
          </section>
        )}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  'App-header': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.25rem',
    color: '#e0364b',
    padding: '1.2rem 0 0.3rem 0',
    borderBottom: '4px solid #e0364b',
  },

  'App-logo': {
    width: '200px',
    height: '200px',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.get('user'),
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);