import { useRef, useState } from "react";
import styles from "./login.module.scss";
import logo from "../../assets/login/logo.png";

const OTP_LENGTH = 6;
const ERROR_MESSAGES = {
  sendCodeFailed:
    "We couldn’t send the code to your email. Please check your email address or contact support.",
  invalidEmail: "Please enter a valid email address.",
  incorrectCode: "The code you entered is incorrect. Please try again.",
  codeExpired: "This code has expired. Request a new one.",
  verifyTrouble:
    "We’re having trouble verifying your code. Please check your connection and try again.",
  tooManyAttempts: "Too many incorrect attempts. Please request a new code.",
  resendCooldown: "You can request a new code in 30 seconds. try again.",
  enterCode: "Please enter the verification code.",
};

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
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return ERROR_MESSAGES.invalidEmail;
    }
    const isValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) && trimmed.length <= 254;
    return isValid ? "" : ERROR_MESSAGES.invalidEmail;
  };

  const handleSubmit = () => {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }
    setEmailError("");
    onNext();
  };

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
          <i
            className={`fa-solid fa-envelope ${styles["input-icon-fa"]} ${
              emailError ? styles["input-icon-fa--error"] : ""
            }`}
          ></i>
          <input
            type="email"
            className={`${styles["custom-input"]} ${
              emailError ? styles["custom-input--error"] : ""
            }`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) {
                setEmailError("");
              }
            }}
            placeholder="name@company.com"
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "email-error" : "email-help"}
          />
        </div>
        {emailError ? (
          <div className={styles["input-error"]} role="alert" id="email-error">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>{emailError}</span>
          </div>
        ) : (
          <small
            className={`ps-3 fst-italic text-secondary ${styles["helper-text"]}`}
            id="email-help"
          >
            A verification code will be sent to the provided email
          </small>
        )}
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

      <button className={styles["submit-btn"]} onClick={handleSubmit}>
        Send verification code
      </button>
    </div>
  );
}

function OtpCard({ onBack }) {
  const [otp, setOtp] = useState(Array.from({ length: OTP_LENGTH }, () => ""));
  const [otpError, setOtpError] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const clean = value.replace(/\D/g, "");
    if (!clean) {
      setOtp((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }

    const digits = clean.split("");
    setOtp((prev) => {
      const next = [...prev];
      let cursor = index;
      digits.forEach((d) => {
        if (cursor < OTP_LENGTH) {
          next[cursor] = d;
          cursor += 1;
        }
      });
      if (cursor < OTP_LENGTH) {
        inputRefs.current[cursor]?.focus();
      }
      return next;
    });
    if (otpError) {
      setOtpError("");
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData?.getData("text") || "";
    const clean = text.replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!clean) return;
    const digits = clean.split("");
    setOtp((prev) => {
      const next = [...prev];
      digits.forEach((d, i) => {
        next[i] = d;
      });
      return next;
    });
    if (digits.length < OTP_LENGTH) {
      inputRefs.current[digits.length]?.focus();
    } else {
      inputRefs.current[OTP_LENGTH - 1]?.focus();
    }
    if (otpError) {
      setOtpError("");
    }
  };

  const handleSubmit = () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setOtpError(ERROR_MESSAGES.enterCode);
      return;
    }
    setOtpError("");
    onBack();
  };

  return (
    <div className={styles["login-card"]}>
      <h2>Verify your email address</h2>
      <p className={styles.subtitle}>
        We've sent a 6-digit code to your registered email
      </p>

      <div className={styles["otp-inputs"]} onPaste={handlePaste}>
        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            autoComplete={index === 0 ? "one-time-code" : "off"}
            className={styles["otp-input"]}
            aria-label={`OTP digit ${index + 1}`}
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
          />
        ))}
      </div>
      {otpError ? (
        <div className={styles["input-error"]} role="alert">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>{otpError}</span>
        </div>
      ) : (
        <div className={styles["resend-row"]}>
          <span>Didn't get a code?</span>
          <button type="button" className={styles["resend-btn"]}>
            Resend
          </button>
        </div>
      )}

      <button className={styles["submit-btn"]} onClick={handleSubmit}>
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
