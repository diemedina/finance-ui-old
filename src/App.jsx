import { Route } from 'wouter';
import Notifications from 'src/components/Notifications/Notifications';
import { Header } from 'src/components/Header/Header';
import Login from 'src/pages/Login/Login.jsx';
import Dashboard from 'src/pages/Dashboard/Dashboard.jsx';


function App() {
  return (
    <>
      <Header />
      <Notifications />
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </>
  )
}

export default App
