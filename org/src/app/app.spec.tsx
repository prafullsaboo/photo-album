import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './+state/store';
import { App } from './App';
import Breadcrumbs from './breadCrumb';
import UserList from './components/user-list/user-list';
import AlbumList from './components/album-list/album-list';
import PhotosList from './components/photos-list/photos-list';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  BrowserRouter: jest.fn(({ children }) => <div>{children}</div>),
  Route: jest.fn(({ element }) => <div>{element}</div>),
  Routes: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('react-redux', () => ({
  __esModule: true,
  Provider: jest.fn(({ children, store }) => <div data-testid="provider">{children}</div>),
}));

jest.mock('./breadCrumb', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Breadcrumbs component</div>),
}));

jest.mock('./components/user-list/user-list', () => ({
  __esModule: true,
  default: jest.fn(() => <div>UserList component</div>),
}));

jest.mock('./components/album-list/album-list', () => ({
  __esModule: true,
  default: jest.fn(() => <div>AlbumList component</div>),
}));

jest.mock('./components/photos-list/photos-list', () => ({
  __esModule: true,
  default: jest.fn(() => <div>PhotosList component</div>),
}));

describe('App', () => {
  it('should renders Breadcrumbs component', () => {
    render(<App />);
    expect(Breadcrumbs).toHaveBeenCalledTimes(1);
  });

  it('should renders Provider with the store', () => {
    render(<App />);
    expect(Provider).toHaveBeenCalledWith(
      { store: store, children: expect.anything() },
      {}
    );
  });

  it('should renders Router component', () => {
    render(<App />);
    expect(Router).toHaveBeenCalled();
  });

  it('should renders UserList component for the root path', () => {
    render(<App />);
    expect(Route).toHaveBeenCalledWith(
      expect.objectContaining({ path: expect.stringMatching(/^\/$/) }),
      {}
    );
  });

  it('should renders AlbumList component for "/albumlist" path', () => {
    render(<App />);
    expect(Route).toHaveBeenCalledWith(
      expect.objectContaining({ path: expect.stringMatching(/^\/albumlist$/) }),
      {}
    );
  });

  it('should renders PhotosList component for "/photolist" path', () => {
    render(<App />);
    expect(Route).toHaveBeenCalledWith(
      expect.objectContaining({ path: expect.stringMatching(/^\/photolist$/) }),
      {}
    );
  });
});
