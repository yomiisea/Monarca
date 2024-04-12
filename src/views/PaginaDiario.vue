<template>
  <div class="contenedor">
    <div class="basico">
      <div class="card">
        <div class="calendar">
         
          <div class="days">
            <div class="day1">
              <div class="left-content1">
                <div><b>Tarea</b></div>
              </div>
              <div class="right-content1">
                <div><b>Tiempo</b></div>
              </div>
            </div>
          </div>
          <div class="days">
            <div v-for="tarea in tareasCompletadas" :key="tarea.idtarea" class="day">
              <div class="left-content">
                <div>{{ tarea.f }}</div>
              </div>
              <div class="right-content">
                <div>{{ calcularTiempoTranscurrido(tarea.name, tarea.a) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import PruebaTarea from "@/components/common/PruebaTarea.vue";
import PruebaTarea2 from "@/components/common/PruebaTarea2.vue";
import PruebaTarea3 from "@/components/common/PruebaTarea3.vue";
import Carta from "@/components/common/Carta.vue";
import Carta2 from "@/components/common/Carta2.vue";
import Carta3 from "@/components/common/Carta3.vue";
import { useTareasStore } from '@/stores/tareasStore.js';

export default {
    name: 'Paginaestado',
    components: {
        PruebaTarea,
        PruebaTarea2,
        PruebaTarea3,
        Carta,
    Carta2,
    Carta3,
    },
    data() {
        return {
            listInstitution: [],
            listInternship: [],
            everyInternshipsAreLoaded: false,
            tareasPendientes: [],
            tareasEnProgreso: [],
            tareasCompletadas: [],
            tareasIncompletas:[],
            tareasPorCompletar:[],
            tareas:[],
            nuevaTarea:
{
      nombre: "",
      fechahoraingreso: "2024-02-19T16:00:00.000+00:00",
      fechahoratarea: "2024-02-20T19:30:00.000+00:00",
      descripcion: "Descripción de la tarea 1",
      categoriasIdcategorias: {
        idcategorias: 1,
        nombre: "",
        color: "",
        tareaList: null,
        usuarioIdusuario: null
      },
      estadoIdestado: {
        idestado: 1,
        nombre: "",
        tareaList: null
      },
      usuarioIdusuario: {
        idusuario: 1,
        usuario: "",
        contrasenia: "",
        tareaList: null,
        categoriasList: null
      }
},
        };
    },
    methods: {
      
    // Función para calcular el tiempo transcurrido entre dos fechas
 
calcularTiempoTranscurrido(fechaInicio, fechaFin) {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  const diferencia = fin - inicio;
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / 1000 / 60) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  let resultado = '';

  if (dias > 0) {
    resultado += `${dias} día${dias > 1 ? 's' : ''}, `;
  }
  if (horas > 0) {
    resultado += `${horas} hora${horas > 1 ? 's' : ''}, `;
  }
  if (minutos > 0) {
    resultado += `${minutos} minuto${minutos > 1 ? 's' : ''}, `;
  }
  if (dias === 0 && horas === 0 && minutos === 0) {
    // Si no hay días, horas ni minutos, mostrar solo los segundos
    resultado += `${segundos} segundo${segundos > 1 ? 's' : ''}`;
  } else {
    // Si hay al menos un día, hora o minuto, omitir los segundos
    resultado = resultado.slice(0, -2); // Eliminar la coma y el espacio final
  }

  return resultado;
},

      
    },
    setup() {
        const storeTareas = useTareasStore();
       
    
        return { storeTareas };
      },
      async mounted() {
    // Obtenemos todas las tareas
    const response = await this.storeTareas.getTareasEstado();
    console.log('Todas las tareas:', response);
    this.tareas = response;


    
    this.tareasPorCompletar = response.filter(data => data.c == 'En Progreso'
    ||  data.c == 'Nueva');
    console.log('tareasPorCompletar', this.tareasPorCompletar);

    // Filtramos las tareas según su estado
    this.tareasPendientes = response.filter(data => data.c == 'Nueva');
    console.log('Tareas pendientes:', this.tareasPendientes);

    this.tareasEnProgreso = response.filter(data => data.c == 'En Progreso');
    console.log('Tareas en progreso:', this.tareasEnProgreso);

    this.tareasCompletadas = response.filter(data => data.c == 'Completada');
    console.log('Tareas completadas:', this.tareasCompletadas);

    this.tareasIncompletas = response.filter(data => data.c == 'Incompletas');
    console.log('Tareas Incompletas:', this.tareasIncompletas);

},
computed: {
    // Calcula la cantidad de tareas pendientes
    cantidadTareasPendientes() {
        return this.tareasPendientes.length;
    },
    // Calcula la cantidad de tareas en progreso
    cantidadTareasEnProgreso() {
        return this.tareasEnProgreso.length;
    },
    // Calcula la cantidad de tareas completadas
    cantidadTareasCompletadas() {
        return this.tareasCompletadas.length;
    },
    cantidadTareasIncompletas() {
        return this.tareasIncompletas.length;
    },
    cantidadTareas() {
        return this.tareas.length;
    },
    
},
};
</script>
  
  

<style scoped>
/* Estilos para el componente Home */
.calendar {
  width:100%;
  margin: 5%;
}
.header {
  display: flex;
  justify-content:center;
  align-items: end;
  
}
.days {
  width: 90%;
  height:auto;
  
  grid-template-columns: repeat(1, 8fr);
  gap: 3px;
}
/**  */


.day {
  border: 1px solid #ccc;
  padding: 2%;
  border-radius: 15px;
  height: auto;
  margin: 10px;
 

}
.day {
  display: flex; /* Cambiar a flex para permitir alinear los elementos horizontalmente */
  justify-content: space-between; /* Alinear los elementos en cada cuadro */
  align-items: center; /* Centrar verticalmente el contenido */
}



.day1 {
  padding: 2%;
  
 
  height: 40px;
  font-size: 2rem;
  border-radius: 15px;
 transition: 0.5s;

}
.day1 {
  display: flex; /* Cambiar a flex para permitir alinear los elementos horizontalmente */
  justify-content: space-between; /* Alinear los elementos en cada cuadro */
  align-items: center; /* Centrar verticalmente el contenido */
}


.left-content1 {
  padding: 10px;
  width: 120px;
  background: #ccc;
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
	flex-grow: 1; /* Hacer que el contenido se expanda para ocupar todo el espacio disponible */
}

.right-content1 {
	padding: 10px;
  background: rgb(183, 219, 191);
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  width: 200px;
	margin-left: 10px; /* Agregar un margen a la izquierda para separar el contenido */
}
.left-content {
  padding: 10px;
  width: 150px;
  background: #ccc;
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
	flex-grow: 1; /* Hacer que el contenido se expanda para ocupar todo el espacio disponible */
}

.right-content {
	padding: 10px;
  background: rgb(183, 219, 191);
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
	margin-left: 10px; /* Agregar un margen a la izquierda para separar el contenido */
}

.activities-container {
  margin-left: 15px;
  width: 100%;

}
.activity {
  padding: 2px;
  font-size: 10px;
  align-content: center;
      box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
 transition: 0.5s;
 margin-right: 10px;
 padding-left: 20px;
}

.card {
border: 0px solid #000000;
border-radius: 8px;
overflow: hidden;
margin-bottom: 1rem;
background: rgb(47, 62, 70);
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
 transition: 0.5s;
 margin: 5%;


}

.basico {
border: 0px solid #000000;
border-radius: 8px;
overflow: hidden;
margin-bottom: 1rem;
background: rgb(132, 169, 140);
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
 transition: 0.5s;

width:800px
}

.header{
border: 0px solid #000000;
border-radius: 8px;
margin-bottom: 1rem;
background: #CAD2C5;
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  font-family: 'Times New Roman', Times, serif;
  width: 300px;
}
.contenedor {
padding: 20px;
margin-bottom: 70px;
margin-left: 20%;
}
button{
border: 0px solid #000000;
border-radius: 2px;
margin-bottom: 1rem;
background: rgb(221, 229, 182);
box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  
  width: 30px;
  margin: 10px;
}

@media (max-width: 860px) {
.days {
  grid-template-columns: repeat(3, 1fr); /* Cambiar a 3 columnas en lugar de 7 */
  gap: 1px; /* Reducir el espacio entre columnas */
}
.basico {
  margin: 5%;
 
}
.day {
  border: 1px solid #ccc;
  margin: 5%;
}
.basico {

width:600px;
margin-right: 150px;
}

}

@media (max-width: 540px) {
.days {
  grid-template-columns: repeat(1, 1fr); /* Cambiar a 3 columnas en lugar de 7 */
  gap: 1px; /* Reducir el espacio entre columnas */
}
.day {
  border: 1px solid #ccc;
  margin: 5%;

  
}
.basico {

width:380px;


}

.right-content1 {
	
  width: 120px;
	margin-left: 10px; /* Agregar un margen a la izquierda para separar el contenido */
}

.contenedor {

margin-left: 2%;
margin-right: 50%;
}

.header{


  width: 240px;
}

}

@media (max-width: 400px) {

.days {
  grid-template-columns: repeat(1, 1fr); /* Cambiar a 3 columnas en lugar de 7 */
  gap: 1px; /* Reducir el espacio entre columnas */
}
.day {
  border: 1px solid #ccc;
  margin: 2%;
  height: 90px;
 
}
.basico {
  margin: 0px;
  width:210px;
}
.header{
width: 165px;
}

}

</style>