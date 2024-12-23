import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./nodemailer.config.js";

// Send Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: email,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        });

        console.log("Verification email sent successfully", response.messageId);
    } catch (error) {
        console.error("Error sending verification email:", error.message);
        throw new Error("Error sending verification email");
    }
};

// Send Welcome Email
export const sendWelcomeEmail = async (email, name) => {
    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: email,
            subject: "Welcome to Agni E-commerce website!",
            html: `
                <h1>Welcome, ${name}!</h1>
                <p>We are excited to have you join us.</p>
                <p>If you have any questions, feel free to contact us.</p>
            `,
        });

        console.log("Welcome email sent successfully", response.messageId);
    } catch (error) {
        console.error("Error sending welcome email:", error.message);
        throw new Error("Error sending welcome email");
    }
};

// Send Password Reset Email
export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: email,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        });

        console.log("Password reset email sent successfully", response.messageId);
    } catch (error) {
        console.error("Error sending password reset email:", error.message);
        throw new Error("Error sending password reset email");
    }
};

// Send Password Reset Success Email
export const sendResetSuccessEmail = async (email) => {
    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });

        console.log("Password reset success email sent successfully", response.messageId);
    } catch (error) {
        console.error("Error sending password reset success email:", error.message);
        throw new Error("Error sending password reset success email");
    }
};
