import "./register.theme.css";
import "./Login.css";
import {
  EyeIcon,
  LockIcon,
  MailIcon,
} from "../../../assets/icons/LoginPageIcons";
import { useAuth } from "../hooks/useAuth";
import ContinueWithGoogle from "../components/ContinueWithGoogle";
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent} from "react";

export default function Login() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  
  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async function (e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const user = await handleLogin({
        email: formData.email,
        password: formData.password,
      });
      if (user.role === "seller") {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Failed", error);
    }
  };
  const handleToggle = function(){
    setShowPassword(prev=>!prev)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Header */}
        <header className="login-header">
          <span className="login-header__label">Welcome Back</span>

          <h1 className="login-header__title">Sign In</h1>

          <p className="login-header__subtitle">
            Enter your credentials to access your account
          </p>
        </header>

        {/* Error banner */}
        {/* Add your error state here later */}

        {/* Form */}
        <form
          id="login-form"
          className="login-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Email */}
          <div className="input-group full-width">
            <label className="input-group__label" htmlFor="login-email">
              Email Address
            </label>

            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <MailIcon />
              </span>

              <input
                id="login-email"
                className="input-group__field has-icon"
                type="email"
                name="email"
                placeholder="jane.doe@example.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group full-width">
            <label className="input-group__label" htmlFor="login-password">
              Password
            </label>

            <div className="input-group__wrapper input-icon">
              <span className="input-group__icon">
                <LockIcon />
              </span>

              <input
                id="login-password"
                className="input-group__field has-icon"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="input-group__toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={handleToggle}
              >
                <EyeIcon />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="login-btn full-width">
            Sign In
          </button>
        </form>

        {/* Google Login */}
        <ContinueWithGoogle />

        {/* Footer */}
        <p className="login-footer">
          Don't have an account?{" "}
          <Link to="/register" className="login-footer__link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
