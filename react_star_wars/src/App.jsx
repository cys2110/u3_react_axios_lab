import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import axios from 'axios'
import {BASE_URL} from '../globals'


function App() {

  return (
    <div>
      <Header />
      <Main apiCall={BASE_URL}/>
    </div>
  )
}

export default App
