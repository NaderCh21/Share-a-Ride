import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import "../styles/SignLogin.css";

const SignLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("passenger");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    universityEmail: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    universityName: "",
    campusLocation: "",
    phoneNumber: "",
    location: "",
    vehicleNumber: "",
    driverLicense: "",
    studentIdPic: null,
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.universityEmail) {
      newErrors.universityEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.universityEmail)) {
      newErrors.universityEmail = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password (only for signup)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Basic required field validation for signup
    if (!isLogin) {
      if (!formData.first_name) newErrors.first_name = "First name is required";
      if (!formData.last_name) newErrors.last_name = "Last name is required";
      if (!formData.phoneNumber)
        newErrors.phoneNumber = "Phone number is required";
      if (!formData.location) newErrors.location = "Location is required";

      if (role === "passenger") {
        if (!formData.universityName)
          newErrors.universityName = "University name is required";
        if (!formData.campusLocation)
          newErrors.campusLocation = "Campus location is required";
      }

      if (role === "driver") {
        if (!formData.vehicleNumber)
          newErrors.vehicleNumber = "Vehicle number is required";
        if (!formData.driverLicense)
          newErrors.driverLicense = "Driver license is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // Clear specific error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:4000/user/login", {
          universityEmail: formData.universityEmail,
          password: formData.password,
        });
        console.log("Login successful:", response.data);
        navigate("/dashboard");
      } else {
        // Upload student ID pic (if exists)
        let studentIdPicUrl = "";
        if (formData.studentIdPic) {
          const studentPicForm = new FormData();
          studentPicForm.append("image", formData.studentIdPic);
          const res = await axios.post("http://localhost:4000/user/uploadPic", studentPicForm, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          studentIdPicUrl = res.data.url; // adjust key based on API response
        }
  
        // Upload driver license (if exists)
        let driverLicenseUrl = "";
        if (formData.driverLicense) {
          const licenseForm = new FormData();
          licenseForm.append("image", formData.driverLicense);
          const res = await axios.post("http://localhost:4000/user/uploadPic", licenseForm, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          driverLicenseUrl = res.data.url; // adjust key based on API response
        }
  
        // Final signup request
        const signupData = {
          ...formData,
          role,
          studentIdPic: studentIdPicUrl,
          driverLicense: driverLicenseUrl,
        };
  
        const response = await axios.post("http://localhost:4000/user/signup", signupData);
        console.log("Signup successful:", response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(isLogin ? "Login error:" : "Signup error:", error);
      setErrors({
        form:
          error.response?.data?.message ||
          error.message ||
          "An error occurred. Please try again.",
      });
    }
  };
  

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="sign-page-wrapper">
      <div className="form-container">
        <div className="form-header">
          <h2>
            {isLogin
              ? "Welcome Back"
              : role === "passenger"
              ? "Passenger Signup"
              : "Driver Signup"}
          </h2>
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={toggleForm} className="link-button">
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>

        <form className="form-body" onSubmit={handleSubmit}>
          {errors.form && <div className="form-error">{errors.form}</div>}

          {!isLogin && (
            <div className="role-switch">
              <button
                type="button"
                className={role === "passenger" ? "active" : ""}
                onClick={() => setRole("passenger")}
              >
                Passenger
              </button>
              <button
                type="button"
                className={role === "driver" ? "active" : ""}
                onClick={() => setRole("driver")}
              >
                Driver
              </button>
            </div>
          )}

          <div className="input-group">
            <label htmlFor="universityEmail">Email</label>
            <input
              id="universityEmail"
              name="universityEmail"
              type="email"
              autoComplete="email"
              value={formData.universityEmail}
              onChange={handleChange}
              className={errors.universityEmail ? "error" : ""}
              placeholder="University Email"
            />
            {errors.universityEmail && (
              <p className="error-message">{errors.universityEmail}</p>
            )}
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                placeholder="Password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="icon" />
                ) : (
                  <Eye className="icon" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          {!isLogin && (
            <div className="input-group password-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "error" : ""}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="icon" />
                  ) : (
                    <Eye className="icon" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {!isLogin && (
            <>
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={errors.first_name ? "error" : ""}
                    placeholder="First Name"
                  />
                  {errors.first_name && (
                    <p className="error-message">{errors.first_name}</p>
                  )}
                </div>

                <div className="input-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={errors.last_name ? "error" : ""}
                    placeholder="Last Name"
                  />
                  {errors.last_name && (
                    <p className="error-message">{errors.last_name}</p>
                  )}
                </div>
              </div>

              {role === "passenger" && (
                <>
                  <div className="input-group">
                    <label htmlFor="universityName">University Name</label>
                    <input
                      id="universityName"
                      name="universityName"
                      type="text"
                      value={formData.universityName}
                      onChange={handleChange}
                      className={errors.universityName ? "error" : ""}
                      placeholder="University Name"
                    />
                    {errors.universityName && (
                      <p className="error-message">{errors.universityName}</p>
                    )}
                  </div>

                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="campusLocation">Campus Location</label>
                      <input
                        id="campusLocation"
                        name="campusLocation"
                        type="text"
                        value={formData.campusLocation}
                        onChange={handleChange}
                        className={errors.campusLocation ? "error" : ""}
                        placeholder="Campus Location"
                      />
                      {errors.campusLocation && (
                        <p className="error-message">{errors.campusLocation}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {role === "driver" && (
                <>
                  <div className="input-group">
                    <label htmlFor="vehicleNumber">Vehicle Number</label>
                    <input
                      id="vehicleNumber"
                      name="vehicleNumber"
                      type="text"
                      value={formData.vehicleNumber}
                      onChange={handleChange}
                      className={errors.vehicleNumber ? "error" : ""}
                      placeholder="Vehicle Number"
                    />
                    {errors.vehicleNumber && (
                      <p className="error-message">{errors.vehicleNumber}</p>
                    )}
                  </div>

                  <div className="input-group file-upload-group">
                    <label htmlFor="driverLicense">Driver License</label>
                    <div className="file-upload">
                      <label className="file-upload-label">
                        <span>Upload a file</span>
                        <input
                          id="driverLicense"
                          name="driverLicense"
                          type="file"
                          accept="image/*"
                          onChange={handleChange}
                          className="file-input"
                        />
                      </label>
                      <p className="file-upload-hint">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    {formData.driverLicense && (
                      <div className="file-success">
                        <Check className="icon" /> File uploaded:{" "}
                        {formData.driverLicense.name}
                      </div>
                    )}
                    {errors.driverLicense && (
                      <p className="error-message">{errors.driverLicense}</p>
                    )}
                  </div>
                </>
              )}

              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={errors.phoneNumber ? "error" : ""}
                    placeholder="Phone Number"
                  />
                  {errors.phoneNumber && (
                    <p className="error-message">{errors.phoneNumber}</p>
                  )}
                </div>

                <div className="input-group">
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className={errors.location ? "error" : ""}
                    placeholder="Location"
                  />
                  {errors.location && (
                    <p className="error-message">{errors.location}</p>
                  )}
                </div>
              </div>

              <div className="input-group file-upload-group">
                <label htmlFor="studentIdPic">Student ID Picture</label>
                <div className="file-upload">
                  <label className="file-upload-label">
                    <span>Upload a file</span>
                    <input
                      id="studentIdPic"
                      name="studentIdPic"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="file-input"
                    />
                  </label>
                  <p className="file-upload-hint">PNG, JPG, GIF up to 10MB</p>
                </div>
                {formData.studentIdPic && (
                  <div className="file-success">
                    <Check className="icon" /> File uploaded:{" "}
                    {formData.studentIdPic.name}
                  </div>
                )}
              </div>
            </>
          )}

          <button type="submit" className="submit-button">
            <svg
              className="lock-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignLogin;
