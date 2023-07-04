import { Route } from 'wouter';
import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

function App() {
  return (
    <>      
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </>
  )
}

export default App
