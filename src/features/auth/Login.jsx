import { useState } from "react";
import styles from "./login.module.scss";
import logo from "../../assets/login/logo.png";

const OTP_LENGTH = 6;

function Stepper({ activeStep }) {
  return (
    <div className={styles.steps}>
      <span
        className={activeStep === "login" ? styles.active : ""}
        aria-label="Login form step"
      ></span>
      <span
        className={activeStep === "otp" ? styles.active : ""}
        aria-label="OTP form step"
      ></span>
    </div>
  );
}

function LoginCard({ onNext }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles["login-card"]}>
      <h2>Secure access for authorized field staff</h2>
      <p className={styles.subtitle}>
        Log in to view tasks, record site readings, and sync reports.
      </p>

      {/* Email Field */}
      <div className="mb-4">
        <label className="form-label ps-3">Company Email Address</label>
        <div className={`position-relative ${styles["input-wrapper"]}`}>
          <i className={`fa-solid fa-envelope ${styles["input-icon-fa"]}`}></i>
          <input type="email" className={styles["custom-input"]} />
        </div>
        <small
          className={`ps-3 fst-italic text-secondary ${styles["helper-text"]}`}
        >
          A verification code will be sent to the provided email
        </small>
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label className="form-label ps-3">Password</label>
        <div className={`position-relative ${styles["input-wrapper"]}`}>
          {/* Lock Icon */}
          <i className={`fa-solid fa-lock ${styles["input-icon-fa"]}`}></i>

          {/* Input */}
          <input
            type={showPassword ? "text" : "password"}
            className={`${styles["custom-input"]} ${styles["custom-input--has-toggle"]}`}
            placeholder="Enter password"
          />

          {/* Eye Toggle */}
          <button
            type="button"
            className={styles["eye-toggle"]}
            onClick={() => setShowPassword((v) => !v)}
            aria-label="Toggle password visibility"
          >
            <i
              className={`fa-regular ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
            ></i>
          </button>
        </div>
      </div>

      <button className={styles["submit-btn"]} onClick={onNext}>
        Send verification code
      </button>
    </div>
  );
}

function OtpCard({ onBack }) {
  return (
    <div className={styles["login-card"]}>
      <h2>Verify your email address</h2>
      <p className={styles.subtitle}>
        We've sent a 6-digit code to your registered email
      </p>

      <div className={styles["otp-inputs"]}>
        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            autoComplete={index === 0 ? "one-time-code" : "off"}
            className={styles["otp-input"]}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles["resend-row"]}>
        <span>Didn't get a code?</span>
        <button type="button" className={styles["resend-btn"]}>
          Resend
        </button>
      </div>

      <button className={styles["submit-btn"]} onClick={onBack}>
        Continue
      </button>
    </div>
  );
}

export default function LoginPage() {
  const [activeStep, setActiveStep] = useState("login");

  return (
    <div className={styles["login-page"]}>
      <img src={logo} alt="Logo" className={styles.logo} />

      <div className="row align-items-center g-0">
        {/* LEFT */}
        <div
          className={`col-lg-6 d-flex align-items-center ${styles["left-content"]}`}
        >
          <div className={styles["left-inner"]}>
            <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
            <p>
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-6">
          <div className="row">
            {/* Stepper Row: 1) Login Form 2) OTP Form */}
            <div className="col-12 d-flex justify-content-center">
              <Stepper activeStep={activeStep} />
            </div>

            {/* Card Row */}
            <div className="col-12 d-flex flex-column align-items-center">
              {activeStep === "login" ? (
                <LoginCard onNext={() => setActiveStep("otp")} />
              ) : (
                <OtpCard onBack={() => setActiveStep("login")} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
