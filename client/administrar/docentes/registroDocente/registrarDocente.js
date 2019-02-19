//re-password
Template.registrarDocente.onRendered(function(e){
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
	//para el date picker
	$('.datepicker').pickadate({
	selectMonths: true,//Creates a dropdown to control month
	selectYears: 15,//Creates a dropdown of 15 years to control year
	//The title label to use for the month nav buttons
	labelMonthNext: 'Next Month',
	labelMonthPrev: 'Last Month',
	//The title label to use for the dropdown selectors
	labelMonthSelect: 'Select Month',
	labelYearSelect: 'Select Year',
	//Months and weekdays
	monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
	monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
	weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
	weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
	//Materialize modified
	weekdaysLetter: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
	//Today and clear
	today: 'Hoy',
	clear: 'Limpiar',
	close: 'Cerrar',
	//The format to show on the `input` element
	format: 'dd/mm/yyyy'
	});
	$('.tabs').tabs();


});
//----------------------------------------------------------
Template.registrarDocente.events({
	'submit #formRegistrarDoc': function(e){
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
				"profesion" :e.target.txt_profesion.value
			}
		};
		Meteor.call('registrarDocente', user, function(error){
			if(error){
                alert(error.reason); 
                swal(
				  'Oops...',
				  'Error al registrar',
				  'error'
				)
			}
            else{
            	swal({
				  //position: 'top-end',
				  type: 'success',
				  title: 'Registrado correctamente',
				  showConfirmButton: false,
				  timer: 2000
				});
            	$("#formRegistrarDoc")[0].reset();
            	//Meteor.loginWithPassword(user.username, user.password);
            }
                
		});

		//console.log(user);

	}
});

//para roles
//Roles.addUsersToRoles('guQfSk9ajEvMrfsgN',['docente'],'admin')
//para avatar
Template.registrarDocente.events({
	'change #txt_file': function(e,temp){
		FS.Utility.eachFile(e, function(file) {
		    Images.insert(file, function (err, fileObj) {
		        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
		        if (err){
		            toastr.error("Upload failed... please try again.");
		        }else {
		    		
		            var userId=Meteor.userId();
		            var imageurl = {"profile.avatar":"/cfs/files/images/" + fileObj._id};

		            setTimeout(function(){
			            Meteor.users.update(userId, {$set : imageurl}); 
			          	toastr.success('Upload succeeded!');
		            }, 1000)                 
		       	};
		    });
	    });
		//console.log('faaaaaaa');
	}
});


/*"change .file-upload-input": function(event, template){
   var func = this;
   var file = event.currentTarget.files[0];
   var reader = new FileReader();
   reader.onload = function(fileLoadEvent) {
      Meteor.call('file-upload', file, reader.result);
   };
   reader.readAsBinaryString(file);
}*/