import "./Register.css";
import "./register.theme.css";
import {
  CheckIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "../../../assets/icons/RegisterPageIcons";
import { useAuth } from "../hooks/useAuth";
import ContinueWithGoogle from "../components/ContinueWithGoogle";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    password: "",
    role: "buyer" as "buyer" | "seller",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleSellerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.checked ? "seller" : "buyer",
    }));
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await handleRegister({
        email: formData.email,
        contact: formData.contact,
        password: formData.password,
        role: formData.role,
        fullName: formData.fullName,
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

  const handleToggle = function () {
    setShowPassword((prev) => !prev);
  };
  const inputStyle = {
    color: "#FFF",
    borderBottom: "1px solid #d0c5b5",
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div className="register-page">
      <div className="register-card">
        {/* Header */}
        <header className="register-header">
          <span className="register-header__label">Get started</span>

          <h1 className="register-header__title">Create Account</h1>

          <p className="register-header__subtitle">
            Join the curated collection
          </p>
        </header>

        <form
          id="register-form"
          className="register-form"
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <label className="input-group__label" htmlFor="register-fullname">
              Full Name
            </label>

            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <UserIcon />
              </span>

              <input
                id="register-fullname"
                className="input-group__field has-icon"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                name="fullName"
                style={inputStyle}
                placeholder="Jane Doe"
                autoComplete="name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="register-email">
              Email Address
            </label>

            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <MailIcon />
              </span>

              <input
                id="register-email"
                className="input-group__field has-icon"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                placeholder="jane.doe@example.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Contact Number */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="register-contact">
              Contact Number
            </label>

            <div className="input-group__wrapper">
              <span className="input-group__icon">
                <PhoneIcon />
              </span>

              <input
                id="register-contact"
                className="input-group__field has-icon"
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                style={inputStyle}
                placeholder="+1 (555) 123-4567"
                autoComplete="tel"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="register-password">
              Create Password
            </label>

            <div className="input-group__wrapper input-icon">
              <span className="input-group__icon">
                <LockIcon />
              </span>

              <input
                id="register-password"
                className="input-group__field has-icon"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
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

          {/* Seller Checkbox */}
          <div className="checkbox-container full-width">
            <label className="checkbox-group" htmlFor="register-isseller">
              <input
                name="role"
                id="register-isseller"
                className="checkbox-group__input"
                type="checkbox"
                checked={formData.role === "seller"}
                onChange={handleSellerChange}
              />

              <span className="checkbox-group__box">
                <CheckIcon />
              </span>

              <div className="checkbox-group__content">
                <span className="checkbox-group__label">
                  Register as <strong>SELLER</strong>
                </span>

                <span className="checkbox-group__desc">
                  Enable your profile for selling.
                </span>
              </div>
            </label>
          </div>
        </form>

        {/* Actions */}
        <div className="register-actions">
          <button type="submit" form="register-form" className="register-btn">
            Create Account
          </button>

          <div className="google-btn-container">
            <ContinueWithGoogle />
          </div>
        </div>

        {/* Footer */}
        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/login" className="register-footer__link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
