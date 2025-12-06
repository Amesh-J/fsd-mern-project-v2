import React, { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setIsLogin }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  }
  return (
    <form className="authForm glass">
      <h2 className="authTitle">Sign in to AeroWave</h2>

      <div className="form-floating mb-3 authFormInputs">
        <input type="email" className="form-control" id="floatingInput"
               placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="floatingInput">Email address</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input type="password" className="form-control" id="floatingPassword"
               placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <div className="authActions">
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>Sign in</button>
        <p className="muted">Not registered? <span className="link-like" onClick={() => setIsLogin(false)}>Create account</span></p>
      </div>
    </form>
  )
}
export default Login
