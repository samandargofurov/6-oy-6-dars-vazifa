import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  return (
    <>
      <div>
        <input type="text" name="" id="" value={name}/>
      </div>
    </>
  )
}

export default App
