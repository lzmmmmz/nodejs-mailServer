const nodemailer = require('nodemailer');
const _ = require('lodash');
const Config = require('./configs/config');

/**
 * 接收邮件配置，发送邮件
 * @param {from} 邮件里显示的发件人
 * @param {to} 收件人，array/string
 * @param {subject} 邮件主题
 * @param {html} 邮件内容，可以包含html标签
 */
const sendMail = ({from, to, subject, html}) => {
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport(Config.sendMailConfig);

    const mailOptions = {
      from: from,
      to: _.isArray(to) ? to.join(',') : to,
      subject: subject,
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  })
}

module.exports = sendMail;