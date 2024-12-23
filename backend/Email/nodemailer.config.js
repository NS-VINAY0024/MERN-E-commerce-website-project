import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.mailtrap.io", // Default to Mailtrap's sandbox SMTP
    port: process.env.SMTP_PORT || 2525,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sender = `"Agni Private Ltd" Agni_org@gmail.com`; // Update with your desired sender details
    