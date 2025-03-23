import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './providers/routes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
