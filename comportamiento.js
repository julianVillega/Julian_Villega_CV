
//configuro el comprtamiento de los botones de los proyectos.
//esta dificil establecer una relacion entre los botones y los datos de un proyecto en particular.
//quiza seria mas sencillo modelar los proyectos como objetos con titulo descripcion, descripcion breve etc..
//y crear los cards de los proyectos atraves de js. ademas esta seria una solucion reutilizable y mas flexible ...
let btns_detalles = document.getElementsByClassName("btn-mas-detalles")
for (let b of btns_detalles){
    console.log('agregamos evento')
    b.addEventListener('click', function(){
        poblar_detalle('titulo','desc')
        alternar_visibilidad_proyectos()
        alternar_visibilidad_detalle()
    })
}

document.getElementById('btn-cerrar-detalle').addEventListener('click', function(){
    alternar_visibilidad_proyectos()
    alternar_visibilidad_detalle()
})

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

const p =`
<div class="col-sm-5 proyecto">
    <div class="card h-100">
        <div class="card-header">
            <h5 class="card-title">Trade Bot</h5>
        </div>
        <img src="robot-solid.svg" class="card-img-top w-50 mx-auto" alt="icono minimalista de robot">
            <div class="card-body">
                <p class="card-text">Bot capaz de operar en el broker binary realizando compra/venta de activos</p>
            </div>
            <div class="card-footer d-flex justify-content-start">
                <button class="btn btn-primary btn-mas-detalles"> Mas detalles</button>
            </div>
    </div>
</div>`
let new_p;

$(document).ready(function(){
   new_p = $.parseHTML(p);
   console.log(new_p);
})



