import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import "./Login.css";

function Login(props) {
  const { login } = useAuth();
  const navigate  = useNavigate();
  return <LoginClass login={login} navigate={navigate} {...props} />;
}

class LoginClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: { email: "", password: "" },
      error: "",
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState((prev) => ({
      form: { ...prev.form, [e.target.name]: e.target.value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ error: "", loading: true });
    try {
      const { data } = await api.post("/auth/login", this.state.form);
      this.props.login(data.user, data.token);
      this.props.navigate("/dashboard");
    } catch (err) {
      this.setState({ error: err.response?.data?.message || "Login failed. Try again." });
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
            <h1>Manage work,<br /><span>not meetings.</span></h1>
            <p>A clean, fast workspace for teams that want to get things done without the noise.</p>
          </div>
          <div className="auth-panel__tags">
            <span className="auth-panel__tag">Projects</span>
            <span className="auth-panel__tag">Tasks</span>
            <span className="auth-panel__tag">Teams</span>
            <span className="auth-panel__tag">Progress</span>
          </div>
        </div>

        <div className="auth-form-wrap page-enter">
          <div className="auth-form-box">
            <div className="auth-form-header">
              <h2>Sign in</h2>
              <p>Enter your credentials to continue</p>
            </div>

            {error && <div className="auth-error" style={{ marginBottom: "1rem" }}>{error}</div>}

            <form onSubmit={this.handleSubmit} className="auth-form">
              <div className="field">
                <label>Email address</label>
                <input
                  type="email" name="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={this.handleChange}
                  required autoComplete="email"
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  type="password" name="password"
                  placeholder="Your password"
                  value={form.password}
                  onChange={this.handleChange}
                  required autoComplete="current-password"
                />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? <span className="spinner" /> : "Continue →"}
              </button>
            </form>

            <p className="auth-switch">
              New here? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;