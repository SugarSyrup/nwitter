import React, {useState} from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbInstace';
import app from 'fbInstace';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={ isLoggedIn } />
      <footer>&copy; Nwitter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
