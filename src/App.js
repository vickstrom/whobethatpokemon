import './App.css';
import HomePresenter from './components/presenters/homePresenter';
import PlayPresenter from './components/presenters/playPresenter';
import RegisterPresenter from './components/presenters/registerPresenter';
import RoomPresenter from './components/presenters/roomPresenter'
import JoinViaLinkPresenter from './components/presenters/joinViaLinkPresenter'
import Header from './components/view/header';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App(props) {

  

  return (
    <div className="App">
      <div className="App-body">
        <Router>
          <Header model={props.model} />
          <Routes>
            <Route path="/" element={
              <HomePresenter model={props.model}/>
            } />
            <Route path="/play" element={
              <PlayPresenter model={props.model}/>
            } /> 
            <Route path="/room" element={
              <RoomPresenter model={props.model}/>
            } /> 
            <Route path="/register" element={
              <RegisterPresenter model={props.model}/>
            } /> 
            <Route path="/join" element={
              <JoinViaLinkPresenter model={props.model} />
            } />
          </Routes>
        </Router>
        </div>
    </div>
  );
}

export default App;
