# useState

As known, hooks allow us to use state without writing a class.

Normally, in class:

    class App extends React.Component{
      state = { name: "" }
      
      handleChange = e => {
        const {name, value} = e.target
        this.setState({ [name]: value })
      }
      
      render(){
        return(
          <div>
            <input 
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <p>
              My name is {this.state.name}
            </p>
          </div>
        )
      }
    }
    
Thankfully to React hooks, we also can do this in function :
    
    function App(){
      const [name, setName] = useState("")
      
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