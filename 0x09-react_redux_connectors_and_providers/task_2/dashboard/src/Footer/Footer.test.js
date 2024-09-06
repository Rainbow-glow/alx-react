/** @jest-environment jsdom */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from './Footer';
import { getFullYear, getFooterCopy } from '../utils/utils';
import { AppContext, defaultUser } from '../App/AppContext';

describe('Footer Test', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('renders the text "Copyright"', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.text()).toContain(
      `Copyright ${getFullYear()} - ${getFooterCopy()}`
    );
  });

  it('does not display the contact link when the user is logged out', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('#contactLink').length).toBe(0);
  });

  it('displays the contact link when the user is logged in', () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      isLoggedIn: true,
    };
    const wrapper = mount(
      <AppContext.Provider value={{ user }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('#contactLink').length).toBe(1);
  });
});