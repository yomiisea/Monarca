<template>
    <div class="ayuda">
      <div class="student__profile">
         <div class="content__welcome">
            <span class="welcome__student">ESTADOS</span>
          </div>
        </div>
  
        <!--prueba -->
  
        <div class="abajo">
            <div class="card">
                <h1>Tareas pendientes</h1>
                <div class="EmpresasDestacadas">
                    <div v-for="(data, index) in tareasPendientes" :key="index" class="company-cards-container" @click="navegarATareaDetalle(data)">
    <PruebaTarea 
        :name="formatDateTime(data.name)" 
        :description="data.description"
        :a="  formatDateTime(data.a) "
        :b="data.b"
        :c="data.c"
        :d="data.d"
        :e="data.e"
        :f="data.f"
        :g="data.g"
        :h="data.h"
        :objetoTarea="data"
    />

                </div>
            </div>
        </div>
     
    
            <div class="card">
                <h1>Tareas en progreso</h1>
                <div class="EmpresasDestacadas">
                    <div v-for="(data, index) in tareasEnProgreso" :key="index" class="company-cards-container" @click="navegarATareaDetalle(data)">
    <PruebaTarea2 
        :name="formatDateTime(data.name)" 
        :description="data.description"
        :a="  formatDateTime(data.a) "
        :b="data.b"
        :c="data.c"
        :d="data.d"
        :e="data.e"
        :f="data.f"
        :g="data.g"
        :h="data.h"
        :objetoTarea="data"
  
    />
            </div>
            </div>
        </div>
  
    
            <div class="card">
                <h1>Tareas completadas</h1>
                <div class="EmpresasDestacadas">
                    <div v-for="(data, index) in tareasCompletadas" :key="index" class="company-cards-container">
    <PruebaTarea3 
        :name="formatDateTime(data.name)" 
        :description="data.description"
        :a="  formatDateTime(data.a) "
        :b="data.b"
        :c="data.c"
        :d="data.d"
        :e="data.e"
        :f="data.f"
        :g="data.g"
        :h="data.h"
        :objetoTarea="data"
    />

                </div>
            </div>
        </div>

       
            <div class="card">
                <h1>Tareas Incompletas</h1>
                <div class="EmpresasDestacadas">
                    <div v-for="(data, index) in tareasIncompletas" :key="index" class="company-cards-container">
    <PruebaTarea4 
        :name="formatDateTime(data.name)" 
        :description="data.description"
        :a="  formatDateTime(data.a) "
        :b="data.b"
        :c="data.c"
        :d="data.d"
        :e="data.e"
        :f="data.f"
        :g="data.g"
        :h="data.h"
        :objetoTarea="data"
    />
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
import PruebaTarea4 from "@/components/common/PruebaTarea4.vue";
import { useTareasStore } from '@/stores/tareasStore.js';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
export default {
    name: 'Paginaestado',
    components: {
        PruebaTarea,
        PruebaTarea2,
        PruebaTarea3,
        PruebaTarea4,
    },
    data() {
        return {
          needReload:false,
            listInstitution: [],
            listInternship: [],
            everyInternshipsAreLoaded: false,
            tareasPendientes: [],
            tareasEnProgreso: [],
            tareasCompletadas: [],
            tareasIncompletas:[],
            nuevoObjetoTarea:
{
      nombre: "pipi",
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
      navegarATareaDetalle(tarea) {
        this.$router.push({ name: 'TareaDetalle', params: { id: tarea.idtarea,  } });
    },
      formatDateTime(datetime) {
            // Formatear la fecha y la hora según tu formato deseado
            const formattedDate = format(new Date(datetime), 'MMMM dd'); // Formato del mes y día
            const formattedTime = format(new Date(datetime), 'HH:mm'); // Formato de la hora
            console.log('MMMM dd', formattedDate)
            console.log('MMMM dd', formattedTime)
            return `${formattedDate} / ${formattedTime}`; // Concatenar la fecha y la hora
        },
        async reloadFunction() {
    try {
        const response = await this.storeTareas.getTareasEstado();
        console.log('Respuesta de la API:', response);

        // Verificar si la respuesta es un arreglo
        if (Array.isArray(response)) {
            // Actualizar las tareas según su estado
            this.tareasPendientes = response.filter(data => data.c === 'Nueva');
            this.tareasEnProgreso = response.filter(data => data.c === 'En Progreso');
            this.tareasCompletadas = response.filter(data => data.c === 'Completada');
            this.tareasIncompletas = response.filter(data => data.c === 'Incompletas');

            // Verificar si alguna tarea ha pasado y mostrar en consola
            this.tareasPendientes.forEach(async data => {
                const tareaDate = new Date(data.a); // Obtener la fecha y hora de la tarea
                const now = new Date(); // Obtener la fecha y hora actual
                if (tareaDate < now) { // Comparar si la tarea ha pasado
                    console.log(`La tarea ${data.f} ha pasado de tiempo.`);
        
                    this.nuevoObjetoTarea.idtarea=data.idtarea;
                    this.nuevoObjetoTarea.nombre=data.f;       
                    this.nuevoObjetoTarea.fechahoraingreso = data.name;
                    this.nuevoObjetoTarea.fechahoratarea = data.a;
                    this.nuevoObjetoTarea.descripcion=data.descripcion;
                    this.nuevoObjetoTarea.categoriasIdcategorias.idcategorias=data.e;
                    this.nuevoObjetoTarea.estadoIdestado.idestado=4;
                    this.nuevoObjetoTarea.usuarioIdusuario.idusuario=Cookies.get('id');


                    console.log('tarea mostrar cambios: ',this.nuevoObjetoTarea);
                try {
                  const response = await this.storeTareas.putTarea(this.nuevoObjetoTarea);
                  this.storeTareas.needReload=true;

              
              } catch (error) {
                console.error("Error al guardar:", error);
              } 

                
                  }
            });

            // Actualizar el estado needReload
            this.storeTareas.needReload = false;

            console.log('Tareas pendientes:', this.tareasPendientes);
            console.log('Tareas en progreso:', this.tareasEnProgreso);
            console.log('Tareas completadas:', this.tareasCompletadas);
            console.log('Tareas incompletas:', this.tareasIncompletas);
        } else {
            console.error('La respuesta de la API no es un arreglo válido:', response);
        }
    } catch (error) {
        console.error('Error al cargar las tareas:', error);
    }
},

        
    },
    setup() {
        const storeTareas = useTareasStore();
        return { storeTareas };
      },
      async mounted() {
     // Llama a reloadFunction al montar el componente
     this.reloadFunction();

// Establece un intervalo para volver a cargar las tareas si es necesario
this.intervalId = setInterval(() => {
    if (this.storeTareas.needReload) {
        this.reloadFunction();
    }
}, 1000);
},
beforeUnmount() {
// Limpia el intervalo antes de desmontar el componente
clearInterval(this.intervalId);
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
},
};
</script>

  
<style scoped>


@media screen and (max-width: 1250px) {
.container__header__page{
  flex-direction: column;
}
.container__header__description{
  padding: 3% 7%;
}
.container__carrousel {
  width: 400px;
  height: 300px;
}
.container__problem{
  flex-direction: column-reverse;
}
.container__problem__description{
  padding: 3% 7%;
}
.container__problem__image{
  padding: 3% 7%;
}
.container__problem__image img{
  width: 300px;
  height: 200px;
}
.container__solution{
  flex-direction: column;
}
.container__solution__description{
  padding: 3% 7%;
}
.company-logo{
  height: 400px;
}
.student__profile{
  padding-bottom: 70%;
}
}

@media screen and (max-width: 1025px) {

.company-logo{
  height: 10%;
}
}

@media screen and (max-width: 768px) {
.container__header__page{
  flex-direction: column;
}
.container__header__description{
  padding: 3% 7%;
}
.container__carrousel {
  width: 300px;
  height: 200px;
}
.container__problem{
  flex-direction: column-reverse;
}
.container__problem__description{
  padding: 3% 7%;
}
.container__problem__image{
  padding: 3% 7%;
}
.container__problem__image img{
  width: 200px;
  height: 150px;
}
.container__solution{
  flex-direction: column;
}
.container__solution__description{
  padding: 3% 7%;
}
}
@media screen and (max-width: 425px) {
.container__header__page{
  flex-direction: column;
}
.container__header__description{
  padding: 3% 7%;
}
.container__carrousel {
  width: 200px;
  height: 150px;
}
.container__problem{
  flex-direction: column-reverse;
}
.container__problem__description{
  padding: 3% 7%;
}
.container__problem__image{
  padding: 3% 7%;
}
.container__problem__image img{
  width: 150px;
  height: 100px;
}
.container__solution{
  flex-direction: column;
}
.container__solution__description{
  padding: 3% 7%;
}
}
@media screen and (max-width: 375px) {
.container__header__page{
  flex-direction: column;
}
.container__header__description{
  padding: 3% 7%;
}
.container__carrousel {
  width: 200px;
  height: 150px;
}
.container__problem{
  flex-direction: column-reverse;
}
.container__problem__description{
  padding: 3% 7%;
}
.container__problem__image{
  padding: 3% 7%;
}
.container__problem__image img{
  width: 150px;
  height: 100px;
}
.container__solution{
  flex-direction: column;
}
.container__solution__description{
  padding: 3% 7%;
}
}
/**ARREGLO0S   DE COSAS */

/* Estilos para la página de inicio de sesión */
@media (max-width: 480px) {
.top-section {
  flex-direction: column;
  align-items: center;
}

.left-section {
  width: 100%;
}

.right-section {
  width: 100%;
  text-align: center;
}

.company-logo {
  margin-top: 15px;
}
}

.company-logo {
  height: 100%;
}


h3 {
  font-size: 18px;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
}



@media (max-width: 370px) {
  .company-logo {
  height: 70px;
 
}}

@media (max-width: 700px) {
  .company-logo {
  max-width:auto;
}}
@media (max-width: 275px) {
  .company-logo {
    margin-top: 50px;
 height: 50px;
}

}
.h1{

font-size: 12px;
}
/**prueba */
.ayuda{
  flex-wrap: wrap;
padding-top: 10px ;
}



/*Estilos para el perfil del estudiante*/
.student__profile{
display: flex;
align-items: center;

padding: 1rem;
border-radius: 10px;
}

.card{
height: 430px;
border-radius: 10px;
padding-left:15px ;
/*background-color: #Fff;*/}


.dark-theme .card{
background-color: #434B54;
}
.dark-theme .student__profile{
background-color: #434B54;
}






.welcome__student{
font-size: 3rem;
font-weight: 700;
}








.EmpresasDestacadas {
display: flex;
flex-direction: row;
align-items: center;
border-radius: 10px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
background: #434B54;
margin: 0.5rem;
min-height: 70%;

overflow-y: scroll;

}
.EmpresasDestacadas {
background-color: #Fff;

}

.dark-theme .EmpresasDestacadas {
background: #434B54;
padding: 0.1rem;


}
.company-cards-container {
display: inline-flex;
margin-top: 20px;
}
.container__button{
display: flex;
flex-direction: row;
align-items: center;
text-decoration: none;
justify-content: space-around;
}
.button{
height: 50px;
}


@media screen and (max-width: 380px){

.EmpresasDestacadas{
padding: 0.5rem;
height: 320px;
}

}
@media screen and (max-width: 360px){

.profile__content__header{

padding-bottom: 20%;
}

}
.dark-theme .company-logo{
filter:invert(20%) sepia(100%) saturate(100%) hue-rotate(220deg);
}
@media screen and (max-width: 335px){

.profile__content__header{

padding-bottom: 30%;
}

}
@media screen and (max-width: 300px){

.profile__content__header{

padding-bottom: 40%;
}

}



@media screen and (max-width: 540px){

.student__profile{

}

}
/* Estilos para dispositivos pequeños (teléfonos) */

@media screen and (max-width: 589px){
  .card{
    height: 250px;
  }
  .EmpresasDestacadas{
    height: 170px;
    overflow-y: hidden;
  }
}
.abajo{
  margin-bottom: 70px;
}

</style>