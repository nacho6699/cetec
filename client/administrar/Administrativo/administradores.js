Template.administradores.onRendered(function(){
	$("#password").on("focusout", function (e) {
	    if ($(this).val() != $("#passwordConfirm").val()) {
	        $("#passwordConfirm").removeClass("valid").addClass("invalid");
	    } else {
	        $("#passwordConfirm").removeClass("invalid").addClass("valid");
	    }
	});

	$("#passwordConfirm").on("keyup", function (e) {
	    if ($("#password").val() != $(this).val()) {
	        $(this).removeClass("valid").addClass("invalid");
	    } else {
	        $(this).removeClass("invalid").addClass("valid");
	    }
	});
	$('.tabs').tabs();

	var password = document.getElementById("password")
	  , confirm_password = document.getElementById("passwordConfirm");

	function validatePassword(){
	  if(password.value != confirm_password.value) {
	    confirm_password.setCustomValidity("Verifique la contraceña");
	  } else {
	    confirm_password.setCustomValidity('');
	  }
	}

	password.onchange = validatePassword;
	confirm_password.onkeyup = validatePassword;

})

Template.administradores.events({
	'submit #formRegistrarAdmin': function(e){
		e.preventDefault();
		var user = {
			"username" : e.target.txt_ci.value,
			"email" : e.target.email.value,
			"password" : e.target.password.value,
			"profile" : {
				"copiaPass" :e.target.password.value,
				"nombres" : e.target.txt_nombres.value,
				"apellidoP" :e.target.txt_Ap.value,
				"apellidoM" :e.target.txt_Am.value,
				"telefono" :e.target.txt_telefono.value,
				"rol" :e.target.rol.value
			}
		};
		//console.log(user);
		
		Meteor.call('registrarAdmin', user, function(error,result){
			if(error){
                alert(error.reason); 
                swal(
				  'Oops...',
				  'Error al registrar',
				  'error'
				)
			}else if(result){
					swal({
					  type: 'info',
					  title: 'Error '+result,
					  showConfirmButton: false,
					  timer: 4000
					});
			}else{
            	swal({
				  //position: 'top-end',
				  type: 'success',
				  title: 'Registrado correctamente',
				  showConfirmButton: false,
				  timer: 2000
				});
            	$("#formRegistrarAdmin")[0].reset();
            	//Meteor.loginWithPassword(user.username, user.password);
            }
                
		});

		//console.log(user);

	}
});