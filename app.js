let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const pg = document.getElementById('pg');

// Insertamos la página en la que nos encontramos actualmente
function pageReload() {
  pg.innerHTML = `
  <div class="pg">
            <p>Página: ${pagina}</p>
          </div>
  `
}
// Agregamos al boton la funcionalidad para avanzar a la siguiente página
btnSiguiente.addEventListener('click', () => {
  if (pagina < 1000){
    pagina += 1;
    cargarPeliculas();
    pageReload()
  }
});

// Agregamos al boton la funcionalidad para avanzar a la anterior página
btnAnterior.addEventListener('click', () => {
  if (pagina > 1){
    pagina -= 1;
    cargarPeliculas();
    pageReload()
  }
});


// Función para obtener los datos de las peliculas en orden de popularidad
 const cargarPeliculas = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e22d99a4b315738dd78e7e79ab236742&language=es-MX&page=${pagina}`);

    if(response.status === 200) {
      const data = await response.json();

      let movies = '';
      data.results.forEach(movie => {
        movies += `
        <div class="pelicula">
          <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
        
        <h3 class="titulo">${movie.title}</h3>
        </div>
        `
      });;

      document.getElementById('contenedor').innerHTML = movies;

    }else if(response.status === 401){
      console.log('Error de la llave API');
    }else if(response.status === 404){
      console.log('La pelicula no existe');
    }else {
      console.log('Ocurrio un error sin identificar');
    }

  }

  catch(error) {
    console.log(error);
  }
}

cargarPeliculas();
pageReload();