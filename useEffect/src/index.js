import React from 'react'
import ReactDOM from 'react-dom'

function App(){
  const [value, setValue] = React.useState(0)
  
  React.useEffect(() => {
    document.getElementById("h1").innerHTML = `Value: ${value}`
  })
  
  function incre(){
    setValue(prevValue => prevValue + 1)
  }
  return(
    <div>
      <h1 id="h1"></h1>
      <button onClick={incre}>
        Increment
      </button>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)