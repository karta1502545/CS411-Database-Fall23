import React, {useState,useRef, Fragment} from 'react'
import './App.css';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import { Home } from './pages';
import PublicRoute from './components/Routes/PublicRoute';
import { ROUTES } from './utils/constants';
import PrivateRoute from './components/Routes/PrivateRoute';
import SearchRoute from './components/Routes/PrivateRoute';

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const [showCreatePost,setShowCreatePost] = useState(false);
  const changeState = () => {
    ref.current?.focus();
    setShowCreatePost(!showCreatePost);
  }

  return (
    <div className="App">
      <Router>
        {/* <AuthProvider> */}
          <Switch>
              <Route path={ROUTES.SIGNIN} element={<PublicRoute path={ROUTES.SIGNIN}/>}/>
              {/* <PrivateRoute path={ROUTES.HOME} component={Home} exact /> */}
              {/* <Route path={'/'} element={<HomeWithHiddenCreatePost />} /> */}
              <Route path={ROUTES.HOME} element={<PrivateRoute/>} />
              <Route path={ROUTES.SEARCH} element={<SearchRoute/>} />
          </Switch>
        {/* </AuthProvider> */}
      </Router>
    </div>
  );
}

export default App;
