import { useEffect, useState } from 'react'

function useNotFound(props) {
  const { callbackFn } = props
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    try {
      callbackFn()
    } catch (error) {
      setIsError(true)
    }
  }, [])

  return {
    isError,
    setIsError,
  }
}

export default useNotFound
