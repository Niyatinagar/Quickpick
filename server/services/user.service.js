/**
 * User Service Layer
 * Contains business logic for user-related operations
 * Separated from controllers for better testability and maintainability
 */

import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import genertedRefreshToken from '../utils/generatedRefreshToken.js';
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import generatedOtp from '../utils/generatedOtp.js';
import { createError } from '../utils/errorHandler.js';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Created user object
 */
export const registerUser = async ({ name, email, password }) => {
    // Validate required fields
    if (!name || !email || !password) {
        throw createError('Please provide email, name, and password', 400);
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw createError('Email already registered', 400);
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new UserModel({
        name,
        email,
        password: hashPassword
    });

    const savedUser = await newUser.save();

    // Send verification email
    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`;
    await sendEmail({
        sendTo: email,
        subject: 'Verify email from QuickPick',
        html: verifyEmailTemplate({
            name,
            url: verifyEmailUrl
        })
    });

    return savedUser;
};

/**
 * Login user
 * @param {Object} credentials - User login credentials
 * @returns {Promise<Object>} Access token, refresh token, and user data
 */
export const loginUser = async ({ email, password }) => {
    // Validate required fields
    if (!email || !password) {
        throw createError('Please provide email and password', 400);
    }

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw createError('User not registered', 400);
    }

    // Check user status
    if (user.status !== 'Active') {
        throw createError('Account is not active. Please contact admin', 400);
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
        throw createError('Invalid password', 400);
    }

    // Generate tokens
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await genertedRefreshToken(user._id);

    // Update last login date
    await UserModel.findByIdAndUpdate(user._id, {
        last_login_date: new Date()
    });

    return {
        accessToken,
        refreshToken,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

/**
 * Verify user email
 * @param {string} code - Verification code (user ID)
 * @returns {Promise<boolean>} Verification success status
 */
export const verifyEmail = async (code) => {
    if (!code) {
        throw createError('Verification code is required', 400);
    }

    const user = await UserModel.findOne({ _id: code });
    if (!user) {
        throw createError('Invalid verification code', 400);
    }

    await UserModel.updateOne({ _id: code }, {
        verify_email: true
    });

    return true;
};

/**
 * Initiate forgot password process
 * @param {string} email - User email
 * @returns {Promise<boolean>} Success status
 */
export const forgotPassword = async (email) => {
    if (!email) {
        throw createError('Email is required', 400);
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        throw createError('Email not found', 400);
    }

    // Generate OTP
    const otp = generatedOtp();
    const expireTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour

    // Update user with OTP
    await UserModel.findByIdAndUpdate(user._id, {
        forgot_password_otp: otp,
        forgot_password_expiry: new Date(expireTime).toISOString()
    });

    // Send OTP email
    await sendEmail({
        sendTo: email,
        subject: 'Forgot password from QuickPick',
        html: forgotPasswordTemplate({
            name: user.name,
            otp: otp
        })
    });

    return true;
};

/**
 * Verify forgot password OTP
 * @param {string} email - User email
 * @param {string} otp - OTP code
 * @returns {Promise<boolean>} Verification success status
 */
export const verifyForgotPasswordOtp = async (email, otp) => {
    if (!email || !otp) {
        throw createError('Email and OTP are required', 400);
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        throw createError('Email not found', 400);
    }

    // Check OTP expiration
    const currentTime = new Date().toISOString();
    if (user.forgot_password_expiry < currentTime) {
        throw createError('OTP has expired', 400);
    }

    // Verify OTP
    if (otp !== user.forgot_password_otp) {
        throw createError('Invalid OTP', 400);
    }

    // Clear OTP
    await UserModel.findByIdAndUpdate(user._id, {
        forgot_password_otp: '',
        forgot_password_expiry: ''
    });

    return true;
};

/**
 * Reset user password
 * @param {string} email - User email
 * @param {string} newPassword - New password
 * @param {string} confirmPassword - Password confirmation
 * @returns {Promise<boolean>} Success status
 */
export const resetPassword = async (email, newPassword, confirmPassword) => {
    if (!email || !newPassword || !confirmPassword) {
        throw createError('Email, new password, and confirmation are required', 400);
    }

    if (newPassword !== confirmPassword) {
        throw createError('Passwords do not match', 400);
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        throw createError('Email not found', 400);
    }

    // Hash new password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    // Update password
    await UserModel.findByIdAndUpdate(user._id, {
        password: hashPassword
    });

    return true;
};

/**
 * Update user details
 * @param {string} userId - User ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Update result
 */
export const updateUserDetails = async (userId, updates) => {
    const { name, email, mobile, password } = updates;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;

    if (password) {
        const salt = await bcryptjs.genSalt(10);
        updateData.password = await bcryptjs.hash(password, salt);
    }

    const result = await UserModel.updateOne({ _id: userId }, updateData);
    return result;
};

/**
 * Get user details by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User object
 */
export const getUserById = async (userId) => {
    const user = await UserModel.findById(userId).select('-password -refresh_token');
    if (!user) {
        throw createError('User not found', 404);
    }
    return user;
};
