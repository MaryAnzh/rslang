import { useLocation } from 'react-router-dom'

// Location is, for example: http://localhost:3000/users/new

// Care! MyComponent must be inside Router to work
const Mylocation = () => {
  const location = useLocation()

  // location.pathname is '/users/new'
  return <span>Path is: {location.pathname}</span>
}

export { Mylocation };