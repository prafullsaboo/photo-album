import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import PhotosList from './photos-list';

const mockStore = configureStore([thunk]);

describe('PhotosList', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      photo: {
        photos: [
          {
            albumId: 1,
            title: 'Photo 1',
            url: 'https://via.placeholder.com/150/92c952',
            thumbnailUrl: 'https://via.placeholder.com/150/92c952',
          },
          {
            albumId: 1,
            title: 'Photo 2',
            url: 'https://via.placeholder.com/150/771796',
            thumbnailUrl: 'https://via.placeholder.com/150/771796',
          },
        ],
        loading: false,
        error: null,
        selectedAlbumId: 1,
      },
    });

    store.dispatch = jest.fn();
  });
  it('should render photos list component', () => {
    render(
      <Provider store={store}>
        <PhotosList />
      </Provider>
    );
  });

  it('should renders photos correctly', () => {
    render(
      <Provider store={store}>
        <PhotosList />
      </Provider>
    );

    const photoElements = screen.getAllByRole('img');

    expect(photoElements).toHaveLength(2);
    expect(photoElements[0]).toHaveAttribute('alt', 'Photo 1');
    expect(photoElements[0]).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150/92c952'
    );
    expect(photoElements[1]).toHaveAttribute('alt', 'Photo 2');
    expect(photoElements[1]).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150/771796'
    );
  });
});
