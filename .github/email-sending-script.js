#! /usr/bin/env node

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'ts03085781@gmail.com',
  from: 'ts03085781@gmail.com',
  subject: '🚨 Main 分支有新的 push！',
  text: '有人對 main 分支做了 push。',
  html: '<p>有人對 main 分支做了 push。</p>',
};

sgMail
  .send(msg)
  .then(() => console.log('Mail sent successfully'))
  .catch((error) => console.error(error.toString()));
