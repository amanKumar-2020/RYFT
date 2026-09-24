import "./Register.css"
import "./register.theme.css"    
import {
  CheckIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "../../../assets/icons/RegisterPageIcons";

import ContinueWithGoogle from "../components/ContinueWithGoogle";

export default function Register() {
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

        {/* Error banner */}
        {/* Add your error state here later */}

        {/* Form */}
        <form id="register-form" className="register-form" noValidate>
          {/* Full Name */}
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
                type="text"
                name="fullName"
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
                type="password"
                name="password"
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="input-group__toggle"
                aria-label="Show password"
              >
                <EyeIcon />
              </button>
            </div>
          </div>

          {/* Seller Checkbox */}
          <div className="checkbox-container full-width">
            <label className="checkbox-group" htmlFor="register-isseller">
              <input
                id="register-isseller"
                className="checkbox-group__input"
                type="checkbox"
                name="isSeller"
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
          <a href="/login" className="register-footer__link">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}