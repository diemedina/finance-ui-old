import { Route } from 'wouter';
import Notifications from './components/Notifications/Notifications';

import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';


function App() {
  return (
    <>
      <Notifications />
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </>
  )
}

export default App
