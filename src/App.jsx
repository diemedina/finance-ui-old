import { Route } from 'wouter';
import { Notifications } from 'src/components/Notifications/Notifications';
import { Header } from 'src/components/Header/Header';
import { Login } from 'src/pages/Login/Login';
import { Dashboard } from 'src/pages/Dashboard/Dashboard';
import { Monitoring } from 'src/pages/Monitoring/Monitoring';


function App() {
  return (
    <>
      <Header />
      <Notifications />
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/monitoring" component={Monitoring} />
    </>
  )
}

export default App
