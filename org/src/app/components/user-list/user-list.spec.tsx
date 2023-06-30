import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '@testing-library/jest-dom';

import UserList from './user-list';
import { albumAction } from '../../+state/albumListSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('UserList', () => {
  let dispatchMock;
  let navigateMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    navigateMock = jest.fn();

    jest.clearAllMocks();
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useSelector as jest.Mock).mockReturnValue([]);

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('should render user list component', () => {
    render(
      <Router>
        <UserList />
      </Router>
    );
  });

  it('should render user list items correctly', () => {
    (useSelector as jest.Mock).mockReturnValue([
      { id: 1, name: 'Leanne Graham' },
      { id: 2, name: 'Ervin Howell' },
    ]);

    render(
      <Router>
        <UserList />
      </Router>
    );

    const user1 = screen.getByText('Leanne Graham');
    const user2 = screen.getByText('Ervin Howell');
    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
  });

  it('should call setSelectedUserId and navigate tp album listwhen a user item is clicked', () => {
    const setSelectedUserIdMock = jest.fn();
    albumAction.setSelectedUserId = setSelectedUserIdMock as any;

    (useSelector as jest.Mock).mockReturnValue([
      { id: 1, name: 'Leanne Graham' },
      { id: 2, name: 'Ervin Howell' },
    ]);

    render(
      <Router>
        <UserList />
      </Router>
    );
    const useDispatchMock = useDispatch as jest.Mock;
    useDispatchMock.mockReturnValue(dispatchMock);

    const useNavigateMock = useNavigate as jest.Mock;
    useNavigateMock.mockReturnValue(navigateMock);

    const user1 = screen.getByText('Leanne Graham');
    fireEvent.click(user1);

    expect(setSelectedUserIdMock).toHaveBeenCalledWith(1);
    expect(navigateMock).toHaveBeenCalledWith('/albumlist');
  });
});
