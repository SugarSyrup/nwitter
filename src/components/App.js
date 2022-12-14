import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbInstace';

function App() {
  const [initialize, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    setUserObj(Object.assign({}, authService.currentUser));
  }

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      { initialize ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser}/> : "Initializing....."}
      {/* <footer>&copy; Nwitter {new Date().getFullYear()} </footer> */}
    </>
  );
}

export default App;
