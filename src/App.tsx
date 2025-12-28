import 'bootstrap/dist/css/bootstrap.min.css';
import { EmployeeList } from './components/EmployeeList';

function App() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary mb-3">
        <div className="container">
          <span className="navbar-brand mb-0 h1">ERP System - Spring Boot & React</span>
        </div>
      </nav>
      
      <EmployeeList />
    </div>
  )
}

export default App