import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>NAME</th>
            <th>PASSPORT</th>
            <th>AGENT</th>
            <th>RECIVED</th>
            <th>MEDICAL</th>
            <th>MOFA</th>
            <th>PC</th>
            <th>FINGER</th>
            <th>VISA</th>
            <th>MANPOWER</th>
            <th>FLIGHT</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
      
    
  )
}

export default App
