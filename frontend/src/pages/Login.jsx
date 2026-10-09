import { useState } from 'react'
import './Login.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event) {
  event.preventDefault()

  if (
    email === 'admin@sportsphere.com' &&
    password === 'Admin@123'
  ) {
    onLogin()
  } else {
    alert('Invalid admin email or password!')
  }
}
  return (
    <div className="login-page">
      <section className="login-brand">
        <h1>Sport<span>Sphere</span></h1>
        <p className="login-tagline">PLAY · TRAIN · GROW</p>

        <div className="brand-message">
          <h2>Stronger<br /><span>Together</span></h2>
          <p>
            Join our sports community and be part of something bigger.
          </p>

          <div className="brand-feature">👥 Manage Members</div>
          <div className="brand-feature">📅 Track Training Sessions</div>
          <div className="brand-feature">🏆 Organize Events</div>
          <div className="brand-feature">📈 Build a Healthier Community</div>
        </div>
      </section>

      <section className="login-form-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back!</h2>
          <p className="login-subtitle">
            Log in to your Sports Club account
          </p>

          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="login-password">Password</label>
          <div className="password-field">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>

          <p className="login-footer">
            SportSphere · Your club, all in one place.
          </p>
        </form>
      </section>
    </div>
  )
}

export default Login