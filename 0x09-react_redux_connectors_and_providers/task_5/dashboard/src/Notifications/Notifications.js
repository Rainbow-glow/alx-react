import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import { fetchNotifications } from '../actions/notificationActionCreators';
import NotificationItem from './NotificationItem';

class Notifications extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    const {
      displayDrawer,
      listNotifications,
      handleDisplayDrawer,
      handleHideDrawer,
      markNotificationAsRead,
    } = this.props;

    return (
      <div className={css(styles['notification-wrapper'])}>
        {!displayDrawer && (
          <div
            className={css(styles.menuItem)}
            onClick={handleDisplayDrawer}
            id='menuItem'
          >
            <p>Your notifications</p>
          </div>
        )}
        {displayDrawer && (
          <div className={css(styles.Notifications)}>
            <ul>
              {listNotifications?.length ? (
                <>
                  <p>Here is the list of notifications</p>
                  {listNotifications.map(({ id, html, type, value }) => (
                    <NotificationItem
                      key={id}
                      type={type}
                      value={value}
                      html={html}
                      id={id}
                      markNotificationAsRead={() => markNotificationAsRead(id)}
                    />
                  ))}
                </>
              ) : (
                <li data-notification-type='default'>
                  No new notification for now
                </li>
              )}
            </ul>
            <button
              style={{
                background: 'none',
                border: 'none',
                position: 'absolute',
                right: '.8rem',
                top: '1rem',
                cursor: 'pointer',
              }}
              aria-label='Close'
              onClick={handleHideDrawer}
              id='close'
            >
              <img src={closeIcon} alt='closeIcon' width='18px' />
            </button>
          </div>
        )}
      </div>
    );
  }
}

const opacity = {
  '0%': { opacity: 0.5 },
  '100%': { opacity: 1 },
};

const bounce = {
  '0%': { transform: 'translateY(0px)' },
  '33%': { transform: 'translateY(-5px)' },
  '66%': { transform: 'translateY(5px)' },
  '100%': { transform: 'translateY(0px)' },
};

const styles = StyleSheet.create({
  'notification-wrapper': {
    position: 'absolute',
    right: '1rem',
    margin: '1.4rem',
    '@media (max-width: 568px)': {
      width: '100%',
      margin: '0',
    },
  },

  Notifications: {
    position: 'relative',
    padding: '1rem',
    border: '1px dashed #e0364b',
    '@media (max-width: 568px)': {
      fontSize: '20px',
      position: 'absolute',
      top: '0',
      height: '100vh',
      width: '100%',
      padding: '0',
      border: 'none',
      background: '#fff',
    },
  },

  menuItem: {
    display: 'flex',
    justifyContent: 'end',
    paddingBottom: '0.3rem',
    ':hover': {
      cursor: 'pointer',
      animationName: [opacity, bounce],
      animationDuration: '1s, 0.5s',
      animationIterationCount: '3',
    },
  },
});

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  // listNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

const mapStateToProps = (state) => {
  return {
    listNotifications: state.notifications.get('messages'),
  };
};

const mapDispatchToProps = {
  fetchNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);