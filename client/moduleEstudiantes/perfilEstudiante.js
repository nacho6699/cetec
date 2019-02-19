var kardexEstudiante=new ReactiveVar();
Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_kardexEstudiante');
Template.perfilEstudiante.onRendered(function(e){
	$(".btn-pref .btn").click(function () {
		$(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
		// $(".tab").addClass("active"); // instead of this do the below 
		$(this).removeClass("btn-default").addClass("btn-primary");  
		
	
	});
});
Template.perfilEstudiante.helpers({

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
	carrerasUserKar:function(){
		var user=Meteor.user();    
		return user.profile.id_carrera;
	},
	carrerasKar:function(){
		return Carreras.findOne({_id:this.toString()});
	},
})
//para avatar
Template.perfilEstudiante.events({
	'change #txt_file': function(e,temp){
		FS.Utility.eachFile(e, function(file) {
		    Images.insert(file, function (err, fileObj) {
		        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
		        if (err){
		            toastr.error("Error al subir Imagen");
		        }else {
		    		
		            var userId=Meteor.userId();
		            var imageurl = {"profile.avatar":"/cfs/files/images/" + fileObj._id};

		            setTimeout(function(){
			            Meteor.users.update(userId, {$set : imageurl}); 
			          	toastr.success('Imagen Subida Correctamente!');
		            }, 2000)                 
		       	};
		    });
	    });
		//console.log('faaaaaaa');
	},
	'click .btn_printKardex':function(e){
		e.preventDefault();
		var user=Meteor.user(); 
		var id_carrera=e.target.value;
		var idUs=user._id;
		var kardex=KardexEstudiante.find({$and:[
			{idUs:idUs},
			{id_carrera:id_carrera}
		]}).fetch();
		kardexEstudiante.set(kardex);

		
		//console.log(kardexEstudiante.get())
		var carrera=Carreras.findOne({_id:id_carrera});

		var doc = new jsPDF();
		doc.setFontSize(12);
		doc.setFontType('bold');
        doc.setFont('times');
        doc.setDrawColor(245, 117, 10);
		doc.setLineWidth(1);//grosor de linea
		doc.line(20, 20, 190, 20); // horizontal line
		doc.setTextColor(38, 38, 114);
		doc.text(65, 25, 'CENTRO DE ESTUDIOS TÉCNICO "CETEC');

		doc.setLineWidth(0.5);
		doc.line(20, 26, 190, 26);//(x1,y1,x2,y2)
		doc.text(80, 33, 'Historial Academico '+carrera.nombreCarrera);

		
		
		doc.setFontType('bold');
		doc.setTextColor(0, 0, 0);
		doc.text(20, 40, 'DATOS DE ESTUDIANTE');
		//datos del estudiante
		doc.setDrawColor(7, 7, 7)
		doc.rect(20, 42, 160, 35);

		doc.text(21, 48, 'Apellido Paterno :');
		doc.text(21, 54, 'Apellido Materno :');
		doc.text(21, 60, 'Nombres :');
		doc.text(21, 66, 'Cédula de Identidad :');
		

		doc.setFont('times');
		doc.setFontType('italic');
		doc.text(60, 48, user.profile.apellidoP);
		doc.text(60, 54, user.profile.apellidoM);
		doc.text(60, 60, user.profile.nombres);
		doc.text(70, 66, user.username);
		

		var modulos;
		var gestion;
		var notasEstudiante;
		var literal;
		var conG=90;
		var conM;
		var con1=96;
		
		for(let value of kardexEstudiante.get()){
			gestion=Gestiones.findOne({_id:value.id_gestion});
			doc.text(21, conG, gestion.gestion.toString());
			doc.setLineWidth(0.5);
			doc.line(20, conG+2, 180, conG+2);
			conM=conG+6;
			for(let value2 of value.id_modulos){
				
				modulos=Modulos.findOne({_id:value2});
				notasEstudiante=Notas.findOne({$and:[{id_modulo:modulos._id},{id_gestion:gestion._id},{idUs:user._id}]});
				console.log(notasEstudiante);
				doc.text(21, conM, modulos.nombreModulo);
				doc.text(70, conM, modulos.nombreMateria);
				//console.log(notasEstudiante.total);
				if(notasEstudiante==undefined){
					doc.text(130, conM, "0");
					doc.setLineWidth(0.1);
					doc.line(20, con1+2, 180, con1+2);
					con1=con1+6;
				}else{
					if(notasEstudiante.total>notasEstudiante.segundaInstancia){
						doc.text(130, conM, notasEstudiante.total.toString());
						doc.setLineWidth(0.1);
						doc.line(20, con1+2, 180, con1+2);
						con1=con1+6;
					}else{
						doc.text(130, conM, notasEstudiante.segundaInstancia.toString());
						doc.setLineWidth(0.1);
						doc.line(20, con1+2, 180, con1+2);
						con1=con1+6;
					}
					
					if(notasEstudiante.total>50){
						literal="Aprobado";
						
						doc.text(150, conM, literal);
					}else{
						literal="Reprobado";
						doc.setTextColor(255, 0, 0);
						doc.text(150, conM, literal);
						doc.setTextColor(0, 0, 0);
					}
					
				}
				//doc.text(100, conM, notasEstudiante.total.toString());
				
				//console.log(nota.total.toString());
				//doc.text(100, conM, nota.total.toString());
				conM=conM+6;
			}
			conG=conM+6;
		}
		
		doc.text(21, 75, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));

		//(typeof(moment(datos_preEstudiante.get().profile.fecha_inscripcion).format("YYYY-MM-DD HH:mm:ss")));
		
		doc.save(user.username+'.pdf'); 
		//doc.output('save', user.username+'.pdf'); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
		//doc.output('datauristring');        //returns the data uri string
		//doc.output('datauri');              //opens the data uri in current window
		//doc.output('dataurlnewwindow'); 
	}

});