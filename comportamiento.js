//Implemento la funcionalidad para alternar entre el tema claro y oscuro

let esta_el_tema_claro = true;
//alterna entre el tema claro y oscuro de boostrap
function alternar_tema(){
    let html_tag = $('html')[0];
    let btn_alternar_tema = $('#btn-alternar-tema')[0];
    btn_alternar_tema.removeChild(btn_alternar_tema.children[0]);
    if(esta_el_tema_claro){
        //poner tema oscuro
        html_tag.setAttribute('data-bs-theme','dark')
        btn_alternar_tema.appendChild($.parseHTML('<i class="fa-solid fa-sun"></i>')[0])
    }
    else{
        //poner tema claro
        html_tag.setAttribute('data-bs-theme','light')
        btn_alternar_tema.appendChild($.parseHTML('<i class="fa-solid fa-moon"></i>')[0])
    }
    esta_el_tema_claro = !esta_el_tema_claro
}
//configuro el botón
$('#btn-alternar-tema').click(function(){
    alternar_tema()
})
// -----------------------------------------------------------------------------------------

//Creo los cards de los proyectos, y agrego el comportamiento necesario para exhibir y cerrar la descripción detallada de los mismos. 
//Para esto voy a modelar los proyectos como objetos con titulo descripcion, descripción breve etc..
//y crear los cards de los proyectos a través de js. además, esta sería una solución reutilizable y más flexible.

proyectos = 
    [
        {'nombre':'Proyecto Apolo',
        'descripcion_corta': 'Aplicación de escritorio para dimensionar instalaciones de paneles solares',
        'ruta_imagen':'proyecto-apolo-01.jpeg',
        'descripcion_imagen' : 'imagen de una interfaz grafica de usuario',
        'descripcion_completa':'El Proyecto Apolo es un proyecto personal el cual estoy desarrollando en conjunto con un ingeniero. El mismo consiste en una aplicación de escritorio para facilitar el proceso de dimensionamiento de instalaciones de paneles fotovoltaicos. Esto se logra brindado al usuario una serie de formularios para que complete con los datos relevantes para una instalación en particular, como por ejemplo la latitud del local, la potencia de los paneles fotovoltaicos que serán utilizados y la radiación solar diaria promedio, entre otros. <br><br>La aplicación toma estos valores y los utiliza para calcular diferentes parámetros tales como la potencia mínima que se requerirá del inversor de corriente y la cantidad de paneles necesarios. Además, la aplicación le permite al usuario armar un diagrama de las conexiones eléctricas de la instalación.<br><br>Actualmente nos encontramos en las etapas iniciales del desarrollo ya habiendo concluido una primer versión de la aplicación lo que nos permitió obtener un mejor entendimiento de nuestros objetivos con la misma. Nuestro próximo paso será crear una segunda versión en la cual no solo mejoraremos las funcionalidades que ya tenemos sino que además añadiremos soporte para otros idiomas.',
        'descripcion_tecnologias':'El Proyecto Apolo esta implementado 100% en python, utilizando librerias como PyQt5 para la GUI \n y openpyxl para interactuar con planillas excel'},
        {'nombre':'Trade Bot',
         'descripcion_corta':'Bot capaz de operar en el broker binary realizando compra/venta de activos',
         'ruta_imagen':'robot-solid.svg',
         'descripcion_imagen': 'icono minimalista de robot',
         'descripcion_completa':'Trade Bot es un proyecto personal el cual estoy desarrollando en conjunto con mi padre.<br>El objetivo de este proyecto es crear un bot que sea capaz de operar en la plataforma Binary.com. Esta plataforma le permite a sus usuarios realizar predicciones acerca de la evolución de las cotizaciones activos como commodities, criptomonedas y tasas de cambio, si el usuario predice correctamente dichas evoluciones, la plataforma le retorna su inversión más una comisión.<br><br>Trade Bot es un programa que opera en esta plataforma, para esto, lleva a cabo 3 tareas de forma constante, siendo estas:<br><br>1º : obtener las cotizaciones de distintos activos en tiempo real.<br>2º : comparar la evolución reciente de dichas cotizaciones con datos históricos para generar predicciones acerca de cómo evolucionaran las cotizaciones en el futuro cercano.<br>3º : operar en la plataforma Binary y recuperar los resultados de las operaciones.<br><br>Actualmente nuestro bot interactúa con los distintos sitios web a través de un framework para web scrapping llamado Selenium. Este framework nos permite simular la interacción de un usuario con las páginas web, podemos por ejemplo hacer click en un botón o llenar un formulario con apenas algunas líneas de código. Esto nos permitió enfocarnos en la lógica de nuestra aplicación de tal manera que hoy día, la misma se encuentra bastante refinada.<br><br>Sin embargo, esta forma de interactuar con las páginas web no es la ideal, ya que es frágil en el sentido de que es muy vulnerable a los cambios que sufren estas páginas a lo largo del tiempo. Esto requiere de una tarea constante de correcciones en el código para mantener la interacción de nuestra aplicación con las páginas web funcionando correctamente.<br><br>Por este motivo en el futuro pretendemos incurrir en una segunda versión en la cual pasaremos a interactuar con las páginas web a través de API\'s Rest.',
         'descripcion_tecnologias': 'Este proyecto esta implementado en Python y utiliza las librerias Selenium para interactuar con los sitios web, y openpyxl para interactuar con planillas de excel'
        }
    ]

//html usado para crear los cards que presentarán los proyectos,
const html_proyecto =`
<div class="col-sm-5 proyecto">
    <div class="card h-100">
        <div class="card-header">
            <h5 class="card-title"></h5>
        </div>
        <img src="robot-solid.svg" class="card-img-top w-50 mx-auto" alt="">
            <div class="card-body">
                <p class="card-text"></p>
            </div>
            <div class="card-footer d-flex justify-content-start">
                <button class="btn btn-primary btn-mas-detalles"> Más detalles</button>
            </div>
    </div>
</div>`

function alternar_visibilidad_proyectos(){
    let proyectos = document.getElementsByClassName('proyecto');
    for(let p of proyectos){
        p.hidden = ! p.hidden
    }
}

function alternar_visibilidad_detalle (){
    let detalle = document.getElementById('col-detalle')
   detalle.hidden = ! detalle.hidden
}

function poblar_detalle(titulo_proyecto, descripcion_proyecto){
    titulo = document.getElementById('titulo-detalle');
    cuerpo = document.getElementById('cuerpo-detalle');
    titulo.innerHTML = titulo_proyecto;
    cuerpo.innerHTML = descripcion_proyecto;
}

//Uso el evento ready para crear los cards de los proyectos e insertarlos en la página
let nuevo_proyecto;
let btn_mas_detalles;
$(document).ready(function(){
    proyectos.forEach(element => {
        //creo un nuevo proyecto
        nuevo_proyecto = $.parseHTML(html_proyecto);
        //configuro el proyecto con su título e imagen
        nuevo_proyecto[1].getElementsByClassName('card-title')[0].innerHTML = element.nombre;
        nuevo_proyecto[1].getElementsByClassName('card-text')[0].innerHTML = element.descripcion_corta;
        nuevo_proyecto[1].getElementsByClassName('card-img-top')[0].setAttribute('src', element.ruta_imagen);
        nuevo_proyecto[1].getElementsByClassName('card-img-top')[0].setAttribute('alt', element.descripcion_imagen);
        //configuro el botón de detalles del proyecto para que exhiba la descripción detallada del mismo
        btn_mas_detalles = nuevo_proyecto[1].getElementsByClassName('btn-mas-detalles')[0];
        btn_mas_detalles.addEventListener('click', function(){
            poblar_detalle(element.nombre, element.descripcion_completa);
            alternar_visibilidad_proyectos()
            alternar_visibilidad_detalle()
            })
            //agrego el poryecto a la página
            $('#proyectos-row').append(nuevo_proyecto); 
    });
});
//configuro el botón de cerrar detalles
document.getElementById('btn-cerrar-detalle').addEventListener('click', function(){
    alternar_visibilidad_proyectos()
    alternar_visibilidad_detalle()
})



