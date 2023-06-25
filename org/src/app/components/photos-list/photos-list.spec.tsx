import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import PhotosList from './photos-list';

const mockStore = configureStore([thunk]);

describe('PhotosList', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      photosList: {
        photos: [
          {
            id: 1,
            albumId: 1,
            thumbnailUrl: 'https://via.placeholder.com/150/92c952',
          },
          {
            id: 2,
            albumId: 1,
            thumbnailUrl: 'https://via.placeholder.com/150/771796',
          },
          {
            id: 3,
            albumId: 1,
            thumbnailUrl: 'officia porro iure quia iusto qui ipsa ut modi',
          },
        ],
        selectedAlbumId: 1,
      },
    });

    store.dispatch = jest.fn();
  });

  it('renders photos correctly', () => {
    render(
      <Provider store={store}>
        <PhotosList />
      </Provider>
    );

    const photoElements = screen.getAllByRole('img');

    expect(photoElements).toHaveLength(2);
    expect(photoElements[0]).toHaveAttribute(
      'alt',
      'accusamus beatae ad facilis cum similique qui sunt'
    );
    expect(photoElements[0]).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150/92c952'
    );
    expect(photoElements[1]).toHaveAttribute(
      'alt',
      'reprehenderit est deserunt velit ipsam'
    );
    expect(photoElements[1]).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150/771796'
    );
  });
});
