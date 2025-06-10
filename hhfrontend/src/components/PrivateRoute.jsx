import Profile from '../pages/profile/Profile';
import PrivateRoute from './components/PrivateRoute';

<Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>
