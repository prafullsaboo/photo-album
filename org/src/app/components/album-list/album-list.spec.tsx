import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import AlbumList from './album-list';
import { fetchAlbums } from '../../+state/albumListSlice';

const mockStore = configureMockStore([thunk]);
// jest.mock('react-redux', () => ({
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }));
describe('AlbumList component', () => {
  let store;

  beforeEach(() => {
    // dispatchMock = jest.fn();
    // navigateMock = jest.fn();

    // jest.clearAllMocks();
    // (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    // (useSelector as jest.Mock).mockReturnValue([]);

    // (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    store = mockStore({
      album: {
        albums: [],
        loading: false,
        error: null,
        selectedUserId: 0,
      },
    });
  });

  it('should render AlbumList componnent', () => {
    render(
      <Provider store={store}>
        <Router>
          <AlbumList />
        </Router>
      </Provider>
    );
  });

  // it('should render user list items correctly', () => {
  //   (useSelector as jest.Mock).mockReturnValue([
  //     { id: 1, title: 'quidem molestiae enim', userId: 1 },
  //   ]);

  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <AlbumList />
  //       </Router>
  //     </Provider>
  //   );

  //   const user1 = screen.getByText('quidem molestiae enim');

  //   expect(user1).toBeInTheDocument();
  // });

  // it('should fetch albums for the selected user', async () => {
  //   const selectedUserId = 1; // Replace with the desired user ID for testing
  //   await store.dispatch(fetchAlbums(selectedUserId));

  //   // Define the expected albums data for comparison
  //   const albums = [
  //     { userId: 1, id: 1, title: 'quidem molestiae enim' },
  //     { userId: 1, id: 2, title: 'sunt qui excepturi placeat culpa' },
  //     {
  //       userId: 2,
  //       id: 11,
  //       title: 'quam nostrum impedit mollitia quod et dolor',
  //     },
  //   ];

  //   const actions = store.getActions();
  //   const fetchAlbumsAction = actions.find(
  //     (action) => action.type === fetchAlbums.fulfilled.type
  //   );

  //   expect(fetchAlbumsAction.payload).toEqual(albums);
  // });

  // it('should take expeceted action after clicking on an album', () => {
  //   const albumId = 1;
  //   const navigateMock = jest.fn();
  //   const dispatchMock = jest.fn();

  //   jest.mock('react-router-dom', () => ({
  //     ...jest.requireActual('react-router-dom'),
  //     useNavigate: () => navigateMock,
  //   }));

  //   jest.mock('react-redux', () => ({
  //     ...jest.requireActual('react-redux'),
  //     useDispatch: () => dispatchMock,
  //     useSelector: jest.fn(),
  //   }));

  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <AlbumList />
  //       </Router>
  //     </Provider>
  //   );

  //   expect(dispatchMock).toHaveBeenCalledWith({
  //     type: 'photosList/setSelectedAlbumId',
  //     payload: albumId,
  //   });
  //   expect(navigateMock).toHaveBeenCalledWith('/photolist');
  // });
});
