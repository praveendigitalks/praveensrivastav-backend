import nodemailer from "nodemailer";

export const sendTenantWelcomeMail = async ({
  email,
  userName,
  password,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });

  try {
    await transporter.sendMail({
      from: `"SaaS Platform" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Your Trial Account Is Ready 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Welcome 🎉</h2>

          <p>Your trial account has been successfully created.</p>

          <p><b>Username:</b> ${userName}</p>
          <p><b>Password:</b> ${password}</p>

          <p>Your trial is valid for <b>7 days</b>.</p>

          <div style="margin: 30px 0;">
            <a href="https://praveensrivastav.vercel.app/login"
               style="
                 background-color: #2563eb;
                 color: #ffffff;
                 padding: 12px 24px;
                 text-decoration: none;
                 border-radius: 6px;
                 font-weight: bold;
                 display: inline-block;
               ">
              🔐 Login to Your Dashboard
            </a>
          </div>

          <p>If the button doesn’t work, copy & paste this link:</p>
          <p>
            <a href="https://praveensrivastav.vercel.app/login">
              https://praveensrivastav.vercel.app/login
            </a>
          </p>

          <hr style="margin: 30px 0;" />

          <p style="font-size: 12px; color: #777;">
            If you did not request this account, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    console.log("✅ Welcome email sent to:", email);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};
