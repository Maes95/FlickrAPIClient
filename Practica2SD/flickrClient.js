
// Funcion que recoge los valores de la búsqueda (Se activa en el botón "Enviar" del menu)

function getImages(){
  // Query type indica el tipo de busqueda (Fecha de captura, tamaño, titulo ...) para poder acceder al valor de su formulario
  var input = query_type+" :input";
  var value = $(input).val();
  // En funcion del tipo de consulta, realizaremos distintas acciones
  switch (query_type) {

      // BUSQUEDA POR FECHA DE CAPTURA
      case '#fecha-captura-form':
          console.log("Fecha captura " + value);
          break;

      // BUSQUEDA POR TAMAÑO
      case '#tamanyo-form':
          // En el caso del tamaño, tendremos que recoger 2 parámetros
          var inputs = $(query_type).find("input");
          var a = inputs[0].value;
          var b = inputs[1].value;
          console.log("Anchura " + a);
          console.log("Altura " + b);
          break;

      // BUSQUEDA POR TITULO
      case '#titulo-form':
          console.log("Titulo " + value);
          break;

      // BUSQUEDA POR ETIQUETAS
			case '#etiquetas-form':
          console.log("Etiquetas " + value);
          break;

      // BUSQUEDA POR FECHA DE SUBIDA
      case '#fecha-subida-form':
          console.log("Fecha subida " + value);
          break;

      default: console.error("ERROR: Búsqueda no valida");
  }

  // Borramos el resultado anterior
  $( ".grid__item" ).remove();
  $( "img" ).remove();

  // Cargamos nuevos resultados (Por defecto)
  getPhotos();
}


// Funcion que carga las fotos

function getPhotos() {

    url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b8a6b59c6a22e88bf223c7cfa1ffde05&user_id=141769805%40N07&tags=Perezoso&format=json&nojsoncallback=1";
    url_getInfo = "";

    $.getJSON(url, {
            tags: "jquery",
            tagmode: "any",
            format: "json"
        },
        function(data) {
            console.log(data);
            $.each(data.photos.photo, function(i, photo) {

                var msg = photo.title.substr(0, 1).toUpperCase() + photo.title.substr(1);

                var url_img = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_h.jpg";

                var size = "800 x 800";

                var html = getHtml(url_img, size, msg);

                $(".grid").append(html);

            });
            // Una vez cargadas todas las fotos, se añaden animaciones
            // Funcion del archivo library/js/animations.js
            setAnimation();
        });
}

// Funcion para obtener el HTML que se inyectará

function getHtml(url_img, size, msg) {
    var html = '<div class="grid__item" data-size="';
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
