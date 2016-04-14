
// Al cargar el documento

(function() {
	getPhotos();
})();


// Funcion que carga las fotos

function getPhotos(){

  url = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=907dea022b0dfc2ec993df236bc0fe6c&user_id=141769805%40N07&format=json&nojsoncallback=1";
	
  url_getInfo = "";

  $.getJSON(url,
  {
    tags: "jquery",
    tagmode: "any",
    format: "json"
  },
  function(data) {
    $.each(data.photos.photo, function(i,photo){
		
	  var msg = photo.title.substr(0,1).toUpperCase()+photo.title.substr(1);
		
	  var url_img = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_h.jpg";
		
	  var size = "800 x 800";
		
	  var html =  getHtml(url_img, size, msg);

	  $( ".grid" ).append( html );
		
	});
	// Una vez cargadas todas las fotos, se añaden animaciones
	setAnimation();
	//borrar());
  });
}

function borrar(){
	$('.sequenced.images .image')
  .transition({
    animation : 'scale',
    reverse   : 'auto', // default setting
    interval  : 100
  });
}

// Funcion para obtener el HTML que se inyectará

function getHtml(url_img, size, msg){
	var html =  '<div class="grid__item" data-size="';
		  html += size;
		  html += '">';
		  html += '<a href="';
		  html += url_img;
		  html += '" class="img-wrap image"><img src="';
		  html += url_img;
		  html += '" alt="img04" />';
		  html += '<div class="description description--grid">';
		  html += msg;
		  html += '</div>';
		  html += '</a>';
		  html += '</div>';
	return html;
}

// Funcion para activar las animaciones para cada imagen

function setAnimation(){
var support = { transitions: Modernizr.csstransitions },
	// transition end event name
	transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
	transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
	onEndTransition = function( el, callback ) {
		var onEndCallbackFn = function( ev ) {
			if( support.transitions ) {
				if( ev.target != this ) return;
				this.removeEventListener( transEndEventName, onEndCallbackFn );
			}
			if( callback && typeof callback === 'function' ) { callback.call(this); }
		};
		if( support.transitions ) {
			el.addEventListener( transEndEventName, onEndCallbackFn );
		}
		else {
			onEndCallbackFn();
		}
	};

	new GridFx(document.querySelector('.grid'), {
		imgPosition : {
			x : 1,
			y : -0.75
		},
		pagemargin : 50,
		onOpenItem : function(instance, item) {
			var win = {width: window.innerWidth, height: window.innerHeight};
			instance.items.forEach(function(el) {
				if(item != el) {
					var delay = Math.floor(Math.random() * 150);
						el.style.WebkitTransition = 'opacity .6s ' + delay + 'ms cubic-bezier(.5,1,.2,1), -webkit-transform .6s ' + delay + 'ms cubic-bezier(.5,1,.2,1)';
						el.style.transition = 'opacity .6s ' + delay + 'ms cubic-bezier(.5,1,.2,1), transform .6s ' + delay + 'ms cubic-bezier(.5,1,.2,1)';

						el.style.WebkitTransform = 'translate3d(-' + win.width + 'px,0,0)';
						el.style.transform = 'translate3d(-' + win.width + 'px,0,0)';
						el.style.opacity = 0;
				}
			});
		},
		onCloseItem : function(instance, item) {
			instance.items.forEach(function(el) {
				if(item != el) {
					var delay = Math.floor(Math.random() * 150);
					el.style.WebkitTransition = 'opacity .3s ' + delay + 'ms cubic-bezier(.5,1,.2,1), -webkit-transform .3s ' + delay + 'ms cubic-bezier(.5,1,.2,1)';
					el.style.transition = 'opacity .3s ' + delay + 'ms cubic-bezier(.5,1,.2,1), transform .3s ' + delay + 'ms cubic-bezier(.5,1,.2,1)';


					el.style.WebkitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					el.style.opacity = 1;

					onEndTransition(el, function() {
						el.style.transition = 'none';
						el.style.WebkitTransform = 'none';
					});
				}
			});
		}
	});
}
