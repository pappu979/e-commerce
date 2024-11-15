import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/passwordInput.css'

const PasswordInput = ({ name, value, onChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <>
            <div className="password-input-wrapper">
                <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    name={name}
                    value={value}
                    className="form-control"
                    onChange={onChange}
                    style={{ width: "100%" }}
                />
                <span onClick={togglePasswordVisibility} className="toggle-password-icon">
                    <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                </span>
            </div>
        </>
    );
};

export default PasswordInput;
