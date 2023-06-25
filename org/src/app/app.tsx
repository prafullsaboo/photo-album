import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../app/+state/store';

import Breadcrumbs from './breadCrumb';
import UserList from './components/user-list/user-list';
import AlbumList from './components/album-list/album-list';
import PhotosList from './components/photos-list/photos-list';

/**
 * Application Component used to remder all components and set routing
 * @returns App
 */
export function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Breadcrumbs />
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/albumlist" element={<AlbumList />} />
            <Route path="/photolist" element={<PhotosList />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
