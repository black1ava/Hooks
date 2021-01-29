# useEffect

Talking about useEffect hook, it reminds life-cycle in React:
1. Mouting: componentDidMount() 
2. Update: componentDidUpdate() 
3. unmount: componentWillUnmount()

But those methods exist only in class. The useEffect hook can make them exists in function

- useEffect(() => {...}) likes componentDidMount() and componentDidUpdate() combined

Ex: Class


    class App extends React.Component{
      state = { value: 0 }
      
      componentDidMount(){
        document.getElementById("h1").innerHTML = `Value: ${this.state.value}`
      }
      
      componentDidUpdate(){
         document.getElementById("h1").innerHTML = `Value: ${this.state.value}`
      }
      
      incre = () => {
        this.setState({ 
          value: this.state.value + 1 
        })
      }
      
      render(){
        return(
          <div>
            <h1 id="h1"></h1>
            <button onClick={this.incre}>
              Increment
            </button>
          </div>
        )
      }
    }
    
Ex: Function

    function App(){
      const [value, setValue] = useState(0)
      
      useEffect(() => {
       document.getElementById("h1").innerHTML = `Value: {this.state.value}`
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
    
- useEffect(() => {...}, []) likes componentDidMount()

Normally, I like to fetch data from api in componentDidMount(), because the data will be fetched as soon as the app starts

Ex: Class

    componentDidMount(){
      fetch("api")
        .then(response => response.json())
        .then(response => console.log(response))
    }
    
Ex: Function

    useEffect(() => {
      fetch("api")
        .then(response => response.json())
        .then(response => console.log(response))
    }, [])
    
- useEffect(() => { return function(){...} }, []) likes componentWillUnmount
componentWillUnmount will traggered whenever the component stop render

Ex: Class

    import React from 'react'
    import ReactDOM from 'react-dom'

    class App extends React.Component{
      state = { show: true}
      
      end = () => {
        this.setState({ show: false })
      }
      
      render(){
      
        let showIt

        if(this.state.show){
          showIt = <Child />
        }
        
        return(
          <div>
            {showIt}
            <button onClick={this.end}>
              End it 
            </button>
          </div>
        )
      }
    }
    class Child extends React.Component{
      componentWillUnmount(){
        alert("Show ends")
      }
      
      render(){
        return(
          <div>
            <h1>Hello Word</h1>
          </div>
        )
      }
    }
    ReactDOM.render(
      <App />,
      document.getElementById('app')
    )

Ex: Function

    import React, { useEffect, useState } from 'react'
    import ReactDOM from 'react-dom'

    function App(){
      const [show, setShow] = useState(true)
      
      function end(){
        setShow(false)
      }
      
      let showIt

      if(show){
        showIt = <Child />
      }
      
      return(
        <div>
          {showIt}
          <button onClick={end}>
            End it
          </button>
        </div>
      )
    }
      
    function Child(){
      useEffect(() => {
        return function(){
          alert("Show ends")
        }
      })
      
      return(
        <div>
          <h1>Hello World</h1>
        </div>
      )
    }
    ReactDOM.render(
      <App />,
      document.getElementById('app')
    )
    
- useEffec(() => {...}, [dependency]), useEffect is triggered whenever the dependency is updated


    function App(){
      const [name, setName] = useState("")
      const [newName, setNewName] = useState("")
      
      function handleChange(e){
        setName(e.target.value)
      }
      
      function handleSubmit(e){
        e.preventDefault()
        setNewName(name)
      }
      
      useEffect(() => {
        alert("Your name has been updated")
      }, [newName])
      
      return(
        <div>
          <form onSubmit={handleSubmit}>
            <input 
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <button>
              Update Name
            </button>
          </form>
        </div>
      )
    }
    
Let's see how it works. you wrote your name
in the input box and click "Update button".
Then your newName has changed from " " -> _your new name_.
Since **newName** is a dependency in 
useEffect, so whenever it got change, 
useEffect will triggered and alert _your name has been changed_