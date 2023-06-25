/* eslint-disable prefer-const */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { UserList } from './user-list';
import { fetchUsers } from '../../+state/userListSlice';
import { albumAction } from '../../+state/albumListSlice';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../+state/userListSlice', () => ({
  fetchUsers: jest.fn(),
  selectUsers: jest.fn(),
}));

jest.mock('../../+state/albumListSlice', () => ({
  albumAction: {
    setSelectedUserId: jest.fn(),
  },
}));

describe('UserList', () => {
  beforeEach(() => {
    let navigateMock;
    let useDispatchMock;
    let useSelectorMock;

    navigateMock = jest.fn();
    useDispatchMock = jest.fn();
    useSelectorMock = jest.fn();

    navigateMock.mockReturnValue(jest.fn());
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockImplementation((selector) =>
      selector({
        userList: {
          userList: [
            { id: 1, name: 'Leanne Graham' },
            { id: 2, name: 'Ervin Howell' },
          ],
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should renders user list items correctly', () => {
    render(<UserList />);

    const user1 = screen.getByText('Leanne Graham');
    const user2 = screen.getByText('Ervin Howell');

    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
  });

  it('shouold calls setSelectedUserId and navigate when a user item is clicked', () => {
    render(<UserList />);

    const user1 = screen.getByText('Leanne Graham');
    fireEvent.click(user1);

    expect(albumAction.setSelectedUserId).toHaveBeenCalledWith(1);
    expect(useNavigate).toHaveBeenCalledWith('/albumlist');
  });

  it('should calls fetchUsers on component mount', () => {
    render(<UserList />);

    expect(fetchUsers).toHaveBeenCalled();
  });
});
