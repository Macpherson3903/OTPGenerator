import { useState, useEffect, useRef } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

// We want to create the function that generates the otp.
function generateOTP(length = 6) {
  const digits = "0123456789"
  let otp = ""

  // for loop that generates the random otp when triggered.
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)]
  }
  return otp;
}

function App({ length = 6, validSeconds = 5 }) {
  // we need to add the variables to store the state and ref
  const [otp, setOtp] = useState("")
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [isActive, setIsActive] = useState(false) // this is used to set when the timer gets triggered.
  const intervalRef = useRef(null)
  const otpDisplayRef = useRef(null)

  // now we create the effect
  useEffect(() => {
    // first we want don't want the timer to start unless triggered
    if (!isActive) return;

    // now for the actual effect.
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setIsActive(false)
          return 0;
        }
        return prev - 1
      })
    }, 1000)

    // the cleanup function
    return () => clearInterval(intervalRef.current)
  }, [isActive]) // lastly dependency.

  // we want to have a function to handle the generation of the otp
  const handleGenerate = () => {
    setOtp(generateOTP(length))
    setSecondsLeft(validSeconds)
    setIsActive(true)
  }

  // the copy function
  const handleCopy = () => {
    if (otpDisplayRef.current) {
      navigator.clipboard.writeText(otpDisplayRef.current.textContent)
    }
  }

  // the timer function
  let timerMessage = ""
  if (isActive && secondsLeft > 0) {
    timerMessage = `Expires in: ${secondsLeft} seconds`
  } else if (!isActive && otp && secondsLeft === 0) {
    timerMessage = "OTP expired. Click the button to generate a new OTP."
  }

  return (
    <div className='w-96 p-8 rounded-sm backdrop-blur-xs backdrop-grayscale'>
      <h1 id='otp-title' className='text-4xl text-center mb-16 font-bold'>OTP Generator</h1>
      <h2
        id='otp-display'
        ref={otpDisplayRef}
        className='text-sm mb-4 text-center'>
        {otp || "Click 'Generate OTP' to get a code"}
      </h2>
      <p id='otp-timer' aria-live='assertive' className='text-center'>
        {timerMessage}
      </p>
      <button
        id='generate-otp-button'
        disabled={isActive}
        className='bg-orange-700 py-4 w-full text-xl mt-4 cursor-pointer'
        onClick={handleGenerate}>
        Generate OTP
      </button>
      <button
        id='otp-copy'
        className='bg-orange-700 py-4 w-full text-xl mt-4 cursor-pointer'
        onClick={handleCopy}>
        Copy
      </button>
    </div>
  )
}

export default App
