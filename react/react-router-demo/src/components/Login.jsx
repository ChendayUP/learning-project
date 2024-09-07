import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Login() {
  const [token, setToken] = useState('');
  const navigate = useNavigate()
  const location = useLocation()
  const saveToken = () => {
    localStorage.setItem('token', token)
    navigate(location.state?.from || '/')
  }
  return (
    <div>
      <input
        value={token}
        onChange={e => setToken(e.target.value)}
      />
      <button onClick={saveToken}>保存</button>
    </div>
  )
}

export default Login;