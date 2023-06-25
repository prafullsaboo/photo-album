/* eslint-disable prefer-const */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';

import AlbumList from './album-list';
import { fetchAlbums } from '../../+state/albumListSlice';
import { photoAction } from '../../+state/photosListSlice';

jest.mock('axios');

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('AlbumList', () => {
  const mockedDispatch = jest.fn();
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    let store;
    let navigateMock;
    let useDispatchMock;
    let useSelectorMock;

    // store.dispatch = jest.fn();

    navigateMock = jest.fn();

    navigateMock.mockReturnValue(navigateMock);

    useDispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(useDispatchMock);

    useSelectorMock = jest.fn();
    useSelectorMock.mockImplementation(useSelectorMock);

    useSelectorMock.mockImplementation((selector) =>
      selector({
        albumList: {
          albums: [{ id: 1, title: 'quidem molestiae enim', userId: 1 }],
          selectedUserId: 1,
        },
      })
    );
    navigateMock.mockReturnValue(mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the album list with the correct title', () => {
    render(<AlbumList />);

    expect(screen.getByText('Album List')).toBeInTheDocument();
  });

  it('dispatches fetchAlbums action on component mount', () => {
    render(<AlbumList />);

    expect(mockedDispatch).toHaveBeenCalledWith(fetchAlbums(1));
  });

  it('dispatches setSelectedAlbumId action and navigates on album click', () => {
    render(<AlbumList />);

    fireEvent.click(screen.getByText('quidem molestiae enim'));

    expect(mockedDispatch).toHaveBeenCalledWith(
      photoAction.setSelectedAlbumId(1)
    );
    expect(mockedNavigate).toHaveBeenCalledWith('/photolist');
  });
});
