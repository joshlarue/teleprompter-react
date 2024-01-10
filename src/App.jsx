import './App.css'
import Camera from './components/Camera';
import Tele from './components/Tele';
import TeleControl from './components/TeleControl';

function App() {
  // adapted from https://www.geeksforgeeks.org/how-to-open-web-cam-in-javascript/

  return (
    <>
      <div className='body'>
        <Camera />
        <Tele />
        <TeleControl />
      </div>
    </>
  )
}
export default App;