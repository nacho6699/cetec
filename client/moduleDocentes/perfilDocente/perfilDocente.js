Template.perfilDocente.onRendered(function(e){
	$(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    // $(".tab").addClass("active"); // instead of this do the below 
    $(this).removeClass("btn-default").addClass("btn-primary");  
    

});
});
//dotos de perfil
Template.perfilDocente.helpers({

	ci (){
		user=Meteor.user();    
	 	return user.username;
	},
	nombres (){
		user=Meteor.user();    
	 	return user.profile.nombres;
	},
	apellidoP (){
		user=Meteor.user();    
	 	return user.profile.apellidoP;
	},
	apellidoM (){
		user=Meteor.user();    
	 	return user.profile.apellidoM;
	},
	correo (){
		user=Meteor.user();    
	 	return user.emails[0].address;
	},
	avatar (){
		user=Meteor.user();    
	 	return user.profile.avatar;
	},
	designaciones:function(){
		var usuario=Meteor.user();  
		var gestion=Gestiones.findOne({}, {sort: {gestion: -1}})  
		return Designaciones.find({
			$and:[
				{idUs:usuario._id},
				{id_gestion:gestion._id}
			]
		});
	},
	modulos:function(){
		return Modulos.find({_id:this.id_modulos});
	},
	carreras:function(){
		return Carreras.findOne({_id:this.id_carrera});
	}
})
//para avatar
Template.perfilDocente.events({
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
		            }, 2000)                 
		       	};
		    });
	    });
		//console.log('faaaaaaa');
	}
});