
import { useState, useCallback, useEffect, useRef} from 'react'


function App() {
  const [length, setlength] = useState(8);
  const [numberallow, setnumberallow] = useState(false);
  const [charallow, setcharallow] = useState(false);
  const [password , setpassword] = useState('')
  const passwordref = useRef(null)

  const passgenerator = useCallback(()=>{
    let pass = ""
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberallow) str += "0123456789"
    if (charallow) str += "!@#$~&()*+;"

    for (let i = 1; i <= length; i++) {
      let element = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(element)
    }
    setpassword(pass)
  }, [length, numberallow, charallow, setpassword])

const copyPasswordToClipboard = useCallback(()=>{
  passwordref.current.select()
  // passwordref.current.setSelectionRange(0, 100) for defining range of selection
  window.navigator.clipboard.writeText(password)
}, [password])

  useEffect(()=>{
    passgenerator()
  }, [length, numberallow, charallow, passgenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto rounded-lg shadow-md 
      px-4 my-8 text-orange-500 bg-slate-700 p-4'>
        <h1 className='text-white text-center p-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text" 
            value={password}
            className='outline-none w-full py-1 px-3' 
            placeholder='password' 
            readOnly
            ref={passwordref}
          />

          <button className='outline bg-blue-700 text-white p-3'
          onClick={copyPasswordToClipboard}
          >copy</button>

        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}}/>
            <label>length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              id='numberInput'
              className='cursor-pointer'
              defaultChecked={numberallow}
              onChange={() => {setnumberallow((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>


          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              id='CharInput'
              dafaultcheck={charallow}
              className='cursor-pointer'
              onChange={() => {setcharallow((prev) => !prev);
            }}/>
            <label htmlFor="CharInput">Character</label>
          </div>

        </div>
      </div>
      
    </>
  )
}

export default App



// useCallback
// useCallback is a React Hook that lets you cache a function definition between re-renders.
//means jab function render hota h to agar chnage hua to vo catch kr leta h

// useEffect hook
// ye jab hume bar bar function ko run krna hota t tab use krte h
// syn: useEffect(callback, dependencies)

// passwordref.current?.select() : this is use for optional selection the value can be null (?)

// 1. use Callback: used for optimization it calls the function inside it when the dependencies are changed and returns a memorized function 
// 2. useeffect: runs the function inside it whenever the page renders first-time or dependencies are changed
// 3. use ref : used to give reference of selected components in our page so that functions can be performed on referenced values