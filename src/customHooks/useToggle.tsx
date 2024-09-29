import { useState } from 'react'

const useToggle = () => {
  
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn((prevState: boolean) => !prevState)
  }

  return {isOn, toggle}
}

export default useToggle