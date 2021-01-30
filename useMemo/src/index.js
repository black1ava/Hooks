import React from 'react'
import ReactDOM from 'react-dom'

function App(){
   const [number, setNumber] = React.useState(0)
   const [bg, setBg] = React.useState(true)
   
   function increment(){
     setNumber(prevNumber => prevNumber + 1)
   }
   
   const time2 = React.useMemo(() => {
     return slow(number)
   }, [number])
   
   function slow(x){
     for(let i = 0; i <= 1000000000; i++){}
     return x * 2
   }
   
   function changeTheme(){
     setBg(prevBg => !prevBg)
   }
   
   let style 
   
   if(bg){
     style = { backgroundColor: "white" }
   }else{
     style = { backgroundColor: "red" }
   }
   
   return(
     <div>
      <h1 style={ style }>{ time2 }</h1>
      <button onClick={ increment }>
        Increment
      </button>
      <button onClick={ changeTheme }>
        Change Theme
      </button>
     </div>
   )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)