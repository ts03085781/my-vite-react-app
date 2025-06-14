const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'ts03085781@gmail.com',
  from: 'ts03085781@gmail.com',
  subject: '🚨 Main 分支有新的 push！',
  text: '有人對 main 分支做了 push。',
};

sgMail
  .send(msg)
  .then(() => {
    console.log('Email 寄件成功!');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
