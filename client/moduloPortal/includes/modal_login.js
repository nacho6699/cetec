Template.modal_login.events({
	'submit #form_login':function(e){
		var usuario = e.target.usuario.value;
		var password = e.target.password.value;
		$("#btn_entrar").text('Cargando...');
		$("#loading").css({'opacity':'1'});

		Meteor.loginWithPassword(usuario,password, function(err){

			if(err){
				toastr.error("Usuario o Contraceña incorrecta");
				$("#btn_entrar").text('Entrar');
				$("#loading").css({'opacity':'0'});
			}else{
				
				$("#btn_entrar").text('Entrar');
				$("#loading").css({'opacity':'0'});
				$("#mlogin").modal('hide');
			}
		});
		//console.log(usuario+" "+password);
		return false;
	}
});