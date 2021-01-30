# useMemo

let's check an example bellow:

    function App(){
      const [number, setNumber] = useState(0)
      
      const [bg, setBg] = useState(false)
      
      function increment(){
        setNumber(prevNumber => prevNumber + 1)
      }
      
      const time2 = slow(number)
      
      function slow(x){
        for(let i = 0; i <= 10000000; i++){}
        return x *= 2
      }
      
      function ChangeTheme(){
        setBg(prevBg => !prevBg)
      }
      
      let style 
      
      if(bg){
        style = { backgroundColor: "white" }
      }else{
        style = { backgroundColor: "black" }
      }
      
      return(
        <div>
          <h1>{ number }</h1>
          <button onClick={ increment }>
            Increment
          </button>
          <button onClick={ changeTheme }>
            Change Theme
          </button>
        </div>
      )
    }
    
Here, whenever you click the button to 
increment **number**, it will take time, 
because of the loop (time complexity O(n)).
That make sence.\
However, when you click another button to 
change the theme, it also take time to run.
This one doesn't make any sence at all. 
That's because when click **Change Theme** 
button, you have changed a state that caused
the whole program re-render. So time 
complexity is still O(n).\
So to avoid this problem, we use **useMemo hooks**\


    const memo = useMemo(() => {
      return any_function()
    }, [dependency])
    
Take a look at example bellow\

    function App(){
       const [number, setNumber] = useState(0)
       
       const [bg, setBg] = useState(true)
       
       function increment(){
         setNumber(prevNumber => prevNumber + 1)
       }
       
       const time2 = useMemo(() => {
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
    
So when you click **Increment Button** 
number get changed which is the dependency 
of useMemo hook. Then it will return the 
result from slow function and show to the 
screen (Of course, it take some time)\
However, when you click **Change Theme** 
**Button**, bg get changed but number which
is the dependency of useMemo hook isn't change, so the slow function doesn't run, the time complexity is O(1)