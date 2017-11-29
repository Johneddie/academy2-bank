//metodos genericos y globales de SIGAR 1.0
var FORMAT_ALFANUMERICO = /[a-zA-Z0-9]/;
var FORMAT_NUMERICO = /^\d*$/;
var FORMAT_NUMERICO_GUIA = /^[0-9\-]+$/;
var FORMAT_NUMERO_DOCUMENTO = /^[a-zA-Z0-9\°\ \.\-\/]+$/;

var iconError = '<img src="/a/imagenes/msg/error.gif" border="0" style="height: 48px;">';
var iconInfo = '<img src="/a/imagenes/msg/info.gif" border="0" style="height: 48px;">';
var iconWarn = '<img src="/a/imagenes/see/icons/icon-warning.gif" border="0" style="height: 31px;">';

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
         for (var i = (start || 0), j = this.length; i < j; i++) {
             if (this[i] === obj) { return i; }
         }
         return -1;
    };
}

function initButtonEvent(){
	
	var myObject = {
		    id: "myObject",
		    onKeydown: function(e){
		    	if(e.keyCode == dojo.keys.ENTER){
		    		e.preventDefault();
				    e.stopPropagation();
				    this.click();
		    	}
		    }
		};
		dojo.query(".dijitButtonContents").connect("onkeydown", myObject.onKeydown);
}

function initDisabledDateTextBox(datesInv){
	var dateControls = dojo.query('.dijitDateTextBox .dijitInputInner');
	if(dateControls){
		for (var i = 0; i < dateControls.length; i++) {
	        dijit.byId(dateControls[i].id).rangeCheck = function(date,constraints) {
	           if (datesInv) {
	               if(datesInv.indexOf(dojo.date.locale.format(date, {
	                   selector: 'date',
	                   datePattern: 'dd/MM/yyyy'
	               })) != -1) {
	                   return false;
	               }
	           }
	           if(dojo.date.locale.isWeekend(date)){
	               return false;
	           }
	           return true;
	        };
		};
	}
}

function numeroDeFilas(numRows){
	var myList = null;
	
	if(document.querySelectorAll){
		myList = document.querySelectorAll('.dojoxGridInactiveSwitch');
	}else if(document.getElementsByClassName){
		myList = document.getElementsByClassName("dojoxGridInactiveSwitch");
	}
	
	if(myList!= undefined && myList!=null){
		var active = false;
		if(myList){
			for(var i=0; i<myList.length ; i++){
				if(parseInt(myList[i].title.substring(0, 2)) == numRows){
					myList[i].click();
					active = true;
				}
			}
			if(!active){
				if(myList[0]){
					myList[0].click();
				}
			}
		}
	}
}

function validateAlfanumerico(valor,mensaje) {
    if ((valor.match(FORMAT_ALFANUMERICO)) && (valor!='')) {
        return true;
    } else {
    	loadInformativo(mensaje,iconError);
    	return false;
    } 
}

function strcmp(a, b) { return (a<b?-1:(a>b?1:0)); }
function trim(s){ return s.replace( /^\s*/, "" ).replace( /\s*$/, "" ); }
function consultFailed(){  alert("Consulta Fallida."); }

//FUNCIONES PARA TRABAJAR CON EL EXPLORADOR 
function isIE () {
	  var myNav = navigator.userAgent.toLowerCase();
	  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}
	
//FUNCION PARA BLOQUEAR EL BACKSPACE
document.onkeydown = function(event) {
		
	event = event || window.event;
		
    var tecla = event.keyCode || event.which;
    var origen = event.target || event.srcElement;
	    
	var rx = /INPUT|SELECT|TEXTAREA/i;
		
	if(tecla == 8 ){
		if(!rx.test(origen.tagName) || origen.disabled || origen.readOnly ){
			if (isIE() && isIE()==10){
				return false;
			} else {
				if (event.preventDefault){
					event.preventDefault();
					return false;
				} else {
					event.returnValue = false;
					return false;
				}
			}
		}
    }
}

//FUNCION PARA VALIDAR REGISTRO DEL NUMERO DE DOCUMENTO
function isNroDocumento(e) {
	var key = e.keyCode || e.which;
	var tecla = String.fromCharCode(key).toLowerCase();
	
	var letras = "0123456789";
	var especiales = "-/";
	var tecla_especial = false;

	for ( var i in especiales) {
		if (tecla == especiales[i]) {
			tecla_especial = true;
			break;
		}
	}
		
	if (letras.indexOf(tecla) == -1 && !tecla_especial) {
		return false;
	}
	
	return true;
}

function bloquearCaracteres(event){
	if (isIE() && isIE()==10){
		event.keyCode = 0;
		return false;
	} else {
		if (event.preventDefault){
			event.preventDefault();
			return false;
		} else {
			event.returnValue = false;
			return false;
		}
	}
}

function caracteresPermitidos(e) {
                var idTecla = e.keyCode || e.which;
                if (idTecla == 8 || idTecla == 9 || idTecla == 36 || idTecla == 35 || idTecla == 37  || idTecla == 38 ||  idTecla == 39 || idTecla == 40 || idTecla == 46 ) {
                               return true;
                }
                var chr = String.fromCharCode(e.keyCode || e.which);
    if ("1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM ./-;:[],=()¿?*+".indexOf(chr) < 0) {
                               if (e.preventDefault){
                                               e.preventDefault();
                                               return false;
                               } else {
                                               event.returnValue = false;
                                               return false;
                               }
    } else {
                               return true;
    };
}

	