const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let newState = {...state};
  switch (action.type) {
    case 'GOOD':
      newState.good++
      return newState
    case 'OK':
      newState.ok++
      return newState
    case 'BAD':
      newState.bad++
      return newState
    case 'ZERO':
      return state
  }
  return state
}

export default counterReducer