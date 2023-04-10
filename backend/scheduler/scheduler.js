const cron = require('node-cron');
const moment = require('moment');
const mailer = require('../middleware/otp')
const {User} = require('../model/user/register')


const bookReturnReminders = () =>{
    cron.schedule('0 0 * * *', async () => {
        const users = await User.find()
        users.forEach(user => {
          user.rentedBooks.forEach(book => {
            const returnDate = moment(book.returnDate);
            const twoDaysBeforeReturn = returnDate.subtract(2, 'days');
            const currentDate = moment();
            if (currentDate.isSameOrAfter(twoDaysBeforeReturn)) {
                console.log("sheri enna");
              const mailOptions = {
                from: 'thalhaz999@gmail.com', 
                to: user.email,
                subject: 'Book return reminder',
                text: `Hi ${user.username}, 
                This is a reminder that your book ${book.bookName} is due in 2 days on ${returnDate.format('YYYY-MM-DD')}. Please return the book to the library as soon as possible.`
              };
              mailer.mailTransporter.sendMail(mailOptions, function (err, info) {
                if(err) 
                  console.log(err);
                else
                  console.log(info);
              });
            }
          });
        });
      });
}

module.exports = { bookReturnReminders}