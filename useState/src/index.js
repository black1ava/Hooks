import React from 'react'
import ReactDOM from 'react-dom'

function App(){
  const [name, setName] = React.useState("")
  
  function handleChange(e){
    setName(e.target.value)
  }
  
  return(
    <div>
      <input 
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <p>My name is {name}</p>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)