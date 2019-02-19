import { Meteor } from 'meteor/meteor';

//Meteor.startup(() => {
  
  //process.event.MAIL_URL='smptp://postmaster%40sandbox7942adc458df4aee8f8660a8f42229a4.mailgun.org:f764ecc3c6e9f563d5be72ec8263fd3c-7efe8d73-bb798b28@smtp.mailgun.org:587';
//});


// para agregar roloes>  Roles.addUsersToRoles('G4LEw7HuEuC4mbD5o',['administrador'],'admin')
Meteor.startup(function(){
  Meteor.Mailgun.config({
    username: 'postmaster@sandbox7942adc458df4aee8f8660a8f42229a4.mailgun.org',
    password: 'f764ecc3c6e9f563d5be72ec8263fd3c-7efe8d73-bb798b28'
  });
});

// In your server code: define a method that the client can call
Meteor.methods({
  sendEmail: function (mailFields) {
      console.log("about to send email...");
      check([mailFields.to, mailFields.from, mailFields.subject, mailFields.text, mailFields.html], [String]);

      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();

      Meteor.Mailgun.send({
          to: mailFields.to,
          from: mailFields.from,
          subject: mailFields.subject,
          text: mailFields.text,
          html: mailFields.html
      });
      console.log("email sent!");
      return 'Enviado';
  }
});