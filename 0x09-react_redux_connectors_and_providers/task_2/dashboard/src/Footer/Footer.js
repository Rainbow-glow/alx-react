import React from 'react';
import { connect } from 'react-redux';
import { getFullYear, getFooterCopy } from '../utils/utils';
import { AppContext } from '../App/AppContext';

function Footer() {
  return (
    <AppContext.Consumer>
      {(context) => {
        return (
          <div className='App-footer'>
            Copyright {getFullYear()} - {getFooterCopy()}
            {context.user.isLoggedIn && (
              <p>
                <a href='/contact' id='contactLink'>
                  Contact us
                </a>
              </p>
            )}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.get('user'),
  };
};

export default connect(mapStateToProps, null)(Footer);