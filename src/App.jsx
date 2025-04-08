
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'

function App() {


  const [usernameParam, setUsernameParam] = useState('GitHub')



  return (
    <>
      <Header setUsernameParam={setUsernameParam} />
      <Main usernameParam={usernameParam} />
    </>
  )
}

export default App
