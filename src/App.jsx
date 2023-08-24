import { Route } from 'wouter';
import { Notifications } from 'src/components/Notifications/Notifications';
import { Login } from 'src/pages/Login/Login';
import { Dashboard } from 'src/pages/Dashboard/Dashboard';
import { Wallet } from 'src/pages/Wallet/Wallet';
import { Monitoring } from 'src/pages/Monitoring/Monitoring';
import { Navbar } from "src/components/Navbar/Navbar";

function App() {
  return (
    <>
      <Notifications />
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/wallet/:id" component={Wallet} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/monitoring" component={Monitoring} />
      <Navbar />
    </>
  )
}

export default App
