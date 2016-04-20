// Funcion que recoge los valores de la búsqueda (Se activa en el botón "Enviar" del menu)

function getImages(){
  // Query type indica el tipo de busqueda (Fecha de captura, tamaño, titulo ...) para poder acceder al valor de su formulario
  var input = query_type+" :input";
  var value = $(input).val();
  // En funcion del tipo de consulta, realizaremos distintas acciones
  switch (query_type) {

      // BUSQUEDA POR FECHA DE CAPTURA
      case '#fecha-captura-form':
          var inputs = $(query_type).find("input");
          var minTakenDate = inputs[0].value;
          var maxTakenDate = inputs[1].value;
          console.log("min-taken-date " + minTakenDate);
          console.log("max-taken-date " + maxTakenDate);
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
          var texto = value;
          console.log("Titulo " + value);
          break;

      // BUSQUEDA POR ETIQUETAS
			case '#etiquetas-form':
          var etiquetas = value;
          console.log("Etiquetas " + value);
          break;

      // BUSQUEDA POR FECHA DE SUBIDA
      case '#fecha-subida-form':
          var inputs = $(query_type).find("input");
          var minUploadDate = inputs[0].value;
          var maxUploadDate = inputs[1].value;
          console.log("min-upload-date " + minUploadDate);
          console.log("max-upload-date " + maxUploadDate);
          break;

      default: console.error("ERROR: Búsqueda no valida");
  }

  // Borramos el resultado anterior
  $( ".grid__item" ).remove();
  $( "img" ).remove();

  // Cargamos nuevos resultados (Por defecto)
  var variable = {
          tags: etiquetas,
          text: texto,
          min_taken_date: minTakenDate,
          max_taken_date:	maxTakenDate,
          min_upload_date: minUploadDate,
          max_upload_date: maxUploadDate,
          format: "json"
      };

  getPhotos(variable);
}


// Funcion que carga las fotos

function getPhotos(variable) {

    url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + api_key + "&user_id=" + user_id + "&format=json&nojsoncallback=1";
    url_getInfo = "";

    $.getJSON(url, variable,
        function(data) {
            console.log(data);
            console.log(url);
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
