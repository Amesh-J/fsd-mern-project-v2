import React, { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setIsLogin }) => {
  const { setUsername, setEmail, setPassword, usertype, setUsertype, register } = useContext(GeneralContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    await register();
  }

  return (
    <form className="authForm glass">
      <h2 className="authTitle">Create AeroWave Account</h2>

      <div className="form-floating mb-3 authFormInputs">
        <input type="text" className="form-control" id="floatingInput" placeholder="username"
               onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="floatingInput">Full name</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"
               onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="floatingEmail">Email address</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input type="password" className="form-control" id="floatingPasswordReg" placeholder="Password"
               onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="floatingPasswordReg">Password</label>
      </div>

      <select className="form-select form-select-lg mb-3" aria-label="User type"
              value={usertype} onChange={(e) => setUsertype(e.target.value)}>
        <option value="">Choose role</option>
        <option value="admin">Admin</option>
        <option value="customer">Customer</option>
        <option value="flight-operator">Flight Operator</option>
      </select>

      <div className="authActions">
        <button className="btn btn-primary" onClick={handleRegister}>Create account</button>
        <p className="muted">Already have an account? <span className="link-like" onClick={() => setIsLogin(true)}>Sign in</span></p>
      </div>
    </form>
  )
}
export default Register;
