Template.modal_login.events({ 
    'click #re-password': function(event, template) { 
        $("#mlogin").modal('hide');
    } 
});

Template.recuperar_pass.events({ 
    'submit #formEmail':function(e){
        e.preventDefault();

        var user=Meteor.users.findOne({ "emails.address" : e.target.re_email.value});

        if(!user){
            swal({
                type: 'info',
                title: 'El correo no esta registrado, verifique',
                showConfirmButton: false, 
                timer:3000
            });
        }else{

        swal({
            type: 'info',
            title: 'Enviando...',
            showConfirmButton: false, 
        });
        var data={
            to: e.target.re_email.value,
            from: 'instituto@cetec.com',
            subject: 'Instituto CETEC',
            text: 'CETEC',
            html: `Su contraceña es : <strong>${user.profile.copiaPass}</strong> <span style="color:blue">Si desea cambiarla comuniquese con el administrador</span>`
          };

        Meteor.call('sendEmail', data, function(error, res){
              //console.log(res);
              swal.close()
			if(error){
                alert(error.reason); 
                swal(
				  'Lo sentimos',
				  'Ocurrio un error, reintente',
				  'error'
				)
			}
            else if(res==='Enviado'){
                swal({
                    type: 'success',
                    title: 'Enviado',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  $("#formEmail")[0].reset();
            }
                
        });
        } 
    },
});