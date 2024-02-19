

import './App.css'
import { useDispatch } from "react-redux";
import { signIn, signUpdate } from './redux/user/userSlice';

import Component from './Pages/Component'

function App() {

  const dispatch = useDispatch();
  function changer(e) {
    dispatch(signIn(e))
    dispatch(signUpdate(null))
  }
  
 
  return (
    <div className='mainPage'>
      <div className='buttons'>
        <button className='butt' onClick={() => { changer("btcusdt") }}>
          
        Bitcoin
      </button>
      <button className='butt' onClick={()=>{changer("ethusdt")}}>
        Etherium
      </button>
      </div>
      <Component/>
    </div>
  )
}

export default App
