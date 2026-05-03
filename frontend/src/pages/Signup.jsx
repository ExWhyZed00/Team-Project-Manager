import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import "./Login.css";
import "./Signup.css";

const AVATAR_COLORS = [
  "#e8613c","#2d7d4f","#2563eb","#d97706","#7c3aed","#0891b2","#be185d"
];

function Signup(props) {
  const { login } = useAuth();
  const navigate  = useNavigate();
  return <SignupClass login={login} navigate={navigate} {...props} />;
}

class SignupClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "", email: "", password: "", confirm: "",
        avatar_color: AVATAR_COLORS[0],
      },
      error: "",
      loading: false,
    };
    this.handleChange      = this.handleChange.bind(this);
    this.handleSubmit      = this.handleSubmit.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleChange(e) {
    this.setState((prev) => ({
      form: { ...prev.form, [e.target.name]: e.target.value },
    }));
  }

  handleColorChange(color) {
    this.setState((prev) => ({ form: { ...prev.form, avatar_color: color } }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: "" });
    const { form } = this.state;
    if (form.password !== form.confirm)
      return this.setState({ error: "Passwords don't match." });
    if (form.password.length < 6)
      return this.setState({ error: "Password must be at least 6 characters." });
    this.setState({ loading: true });
    try {
      const { data } = await api.post("/auth/signup", {
        name: form.name, email: form.email,
        password: form.password, avatar_color: form.avatar_color,
      });
      this.props.login(data.user, data.token);
      this.props.navigate("/dashboard");
    } catch (err) {
      this.setState({ error: err.response?.data?.message || "Signup failed. Try again." });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { form, error, loading } = this.state;

    return (
      <div className="auth-root">
        <div className="auth-panel">
          <div className="auth-panel__logo">Workly</div>
          <div className="auth-panel__copy">
            <h1>Your team's<br /><span>new home base.</span></h1>
            <p>Set up your workspace and start collaborating with your team in minutes.</p>
          </div>
          <div className="auth-panel__tags">
            <span className="auth-panel__tag">Free to start</span>
            <span className="auth-panel__tag">Role-based access</span>
            <span className="auth-panel__tag">Real-time updates</span>
          </div>
        </div>

        <div className="auth-form-wrap page-enter">
          <div className="auth-form-box">
            <div className="auth-form-header">
              <h2>Get started</h2>
              <p>Create your free account today</p>
            </div>

            {error && <div className="auth-error" style={{ marginBottom: "1rem" }}>{error}</div>}

            <form onSubmit={this.handleSubmit} className="auth-form">
              <div className="field">
                <label>Choose a colour</label>
                <div className="color-picker">
                  {AVATAR_COLORS.map((c) => (
                    <button
                      key={c} type="button"
                      className={`color-dot ${form.avatar_color === c ? "selected" : ""}`}
                      style={{ background: c }}
                      onClick={() => this.handleColorChange(c)}
                    />
                  ))}
                  <span className="color-preview" style={{ background: form.avatar_color }}>
                    {form.name ? form.name[0].toUpperCase() : "?"}
                  </span>
                </div>
              </div>

              <div className="field">
                <label>Full name</label>
                <input type="text" name="name" placeholder="Your full name"
                  value={form.name} onChange={this.handleChange} required />
              </div>

              <div className="field">
                <label>Work email</label>
                <input type="email" name="email" placeholder="you@company.com"
                  value={form.email} onChange={this.handleChange} required />
              </div>

              <div className="two-col">
                <div className="field">
                  <label>Password</label>
                  <input type="password" name="password" placeholder="Min. 6 chars"
                    value={form.password} onChange={this.handleChange} required />
                </div>
                <div className="field">
                  <label>Confirm</label>
                  <input type="password" name="confirm" placeholder="Repeat"
                    value={form.confirm} onChange={this.handleChange} required />
                </div>
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? <span className="spinner" /> : "Create Account →"}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;