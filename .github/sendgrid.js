module.exports = {
  personalizations: [
    {
      to: [{ email: process.env.EMAIL_TO }],
      subject: process.env.SUBJECT,
    },
  ],
  from: { email: process.env.EMAIL_FROM },
  content: [
    {
      type: 'text/plain',
      value: process.env.BODY,
    },
  ],
};
