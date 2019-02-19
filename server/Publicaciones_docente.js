Meteor.publish('publi_estudiantes', function(){
	Meteor._sleepForMs(3000);
	return Meteor.users.find();
});
Meteor.publish('publi_docentes', function(){
	return Meteor.users.find();
});
Meteor.publish('publi_designaciones', function(){
	return Designaciones.find();
});
Meteor.publish('publi_kardexEstudiante', function(){
	return KardexEstudiante.find();
});

Meteor.methods({
	registrarDocente: function(dato){
		var id=Accounts.createUser(dato);
		Roles.addUsersToRoles(id,['docente'],'admin');
		//console.log(id);
	},
	registrarEstudiante: function(dato){
		
		var id=Accounts.createUser(dato);
		Roles.addUsersToRoles(id,['inscritos'],'admin');
		//para actualizar la cantidad de estudiantes inscritos
		var cantidad=Carreras.findOne({_id:dato.profile.id_carrera[0]});
		if(cantidad.limite===undefined){
			Carreras.update({_id:dato.profile.id_carrera[0]},{$set:{limite:0}});
		}else{
			Carreras.update({_id:dato.profile.id_carrera[0]},{$set:{limite:cantidad.limite + 1}});
		}
		
		
		return id;
		
		//Roles.addUsersToRoles(id,['docente'],'admin');
		//console.log(id);
	},
	registrarDesignacion: function(dato){
		var con=false;
		var con2=false;
		//para mi separacion de modulos y verificacion de si el modulo y grupo ya fue asignado 
		
		for(let value of dato){
   			var usuario = Designaciones.findOne({$and:[{id_gestion:value.id_gestion},{id_grupo:value.id_grupo},{id_modulos:value.id_modulos},{turno:value.turno}]});
   			if (usuario){
   				con=true;
   			}
   		}
   		for(let value2 of dato){
   			var usuario = Designaciones.findOne({$and:[{id_gestion:value2.id_gestion},{idUs:value2.idUs},{turno:value2.turno},{finaliza: {$gte:value2.empiesa}}]});
   			if (usuario){

   					con2=true;
   					//console.log('final es  '+usuario.finaliza+usuario._id);
   					//console.log(con2);
			}
			if(con){
				return 'El modulo ya sue asignado';
			}else if(con2){
				var aux=Modulos.findOne({_id:value2.id_modulos});
				return 'El '+aux.nombreModulo+' No se Asigno / verifique los choques';
			}else{
				//for(let value of dato ){
					   //var obj = value;
					   Designaciones.insert(value2);
				   
				
			}   
   		}
		//insertando modulo por modulo
		
	},
	borrarDesignacion: function(dato){
		if(Meteor.userId()){
			Designaciones.remove({_id:dato});
		}else{
			throw new Meteor.Error('no-autorisado');
		}
	},
	editarDesignacion: function(dato){
			for(let value of dato ){
	   			Designaciones.update({_id:value.id_designacion},
				{$set:{id_modulos:value.id_modulos,id_grupo:value.id_grupo,turno:value.turno}})
	   		}
		
	},
	registrarAdmin: function(dato){
		var user=Meteor.users.findOne({username:dato.username});
		if (user) {
			return "el usuario ya está registrado!!!"
		}else{
			var id=Accounts.createUser(dato);
			Roles.addUsersToRoles(id,[dato.profile.rol],'admin');
		}
		
		//console.log(id);
	},
	borrarAdministrador: function(dato){
		if(Meteor.userId()){
			Meteor.users.remove({_id:dato});
		}else{
			throw new Meteor.Error('no-autorisado');
		}
	},
	editarRol: function(dato){
		Roles.setUserRoles(dato.idUs, [dato.nuevoRol], 'admin');
	},
	editarAdmin: function (dato) {
        // Update account
            Meteor.users.update(dato.idUs, {
                $set: {
                    username: dato.username,
                    emails: dato.email,
                    profile: dato.profile
                }
            });

        // Update password
        if (dato.password != 'the same') {
            Accounts.setPassword(dato.idUs, dato.password);
        }

        //return true;
    },
	borrarDocente: function(dato){
		if(Meteor.userId()){
			Meteor.users.remove({_id:dato});
		}else{
			throw new Meteor.Error('no-autorisado');
		}
	},
	docenteOff: function(dato){
		Roles.setUserRoles(dato, ['docenteOff'], 'admin');
	},
	docenteOn: function(dato){
		Roles.setUserRoles(dato, ['docente'], 'admin');
	},
	editarDocente: function (dato) {
        // Update account
            Meteor.users.update(dato.idUs, {
                $set: {
                    username: dato.username,
                    emails: dato.email,
                    profile: dato.profile
                }
            });

        // Update password
        if (dato.password != 'the same') {
            Accounts.setPassword(dato.idUs, dato.password);
        }

        //return true;
	},
	editarDocenteAlmatricular: function (dato) {
        // Update account
            Meteor.users.update(dato.idUs, {
                $set: {
                    "profile.matriculado": dato.matriculado
                }
			});

	},
	desMatricular: function (dato) {
        // Update account
            Meteor.users.update({}, {
                $set: {
                    "profile.matriculado": dato
                }
			},{multi:true});
			
    },
	borrarEstudiante: function(dato){
		if(Meteor.userId()){
			Meteor.users.remove({_id:dato});
		}else{
			throw new Meteor.Error('no-autorisado');
		}
	},
	estudentOff: function(dato){
		Roles.setUserRoles(dato, ['inscritos'], 'admin');
	},
	estudentOn: function(dato){
		Roles.setUserRoles(dato, ['estudiante'], 'admin');
	},
	registrarNuevaCarreraAestudiante:function(dato){
		Meteor.users.update(dato.idUs, {
			
				$addToSet:{"profile.id_carrera":dato.id_carrera}
			
		});
	},
	registrarKardexEstudiante: function(dato){
	
		if(Meteor.userId()){
			KardexEstudiante.insert(dato);
		}else{
			throw new Meteor.Error('no-autorisado');
		}
	},
	borrarKardex: function(dato){
	
		if(Meteor.userId()){
			var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
			KardexEstudiante.remove({$and:[{idUs:dato},{id_gestion:gestion._id}]});
		}else{
			throw new Meteor.Error('no-autorisado');
		}
	}
});