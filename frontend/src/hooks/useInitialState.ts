import { useState, useEffect } from 'react'
import { InitialState, IUserLog } from 'src/types'

const initialState: InitialState = {
  user: null
}

const useInitialState = () => {
  const [state, setState] = useState(initialState)

  const setUser = (user: IUserLog) => {
    setState({
      ...state,
      user: { ...user }
    })
  }

  return {
    state,
    setUser,
  }
}

export default useInitialState