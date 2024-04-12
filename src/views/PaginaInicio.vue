<template>
    <div class="ayuda">
        <div class="student__principalPage">
            <div class="content__welcome">
                        <div class="student__data">
                            <span class="welcome__student">
                                ¡Bienvenido a tus pendientes!
                            </span>
                            <br>
                            <span class="career__student">
                                Aqui puedes revisar los estados de tus tareas.
                            </span>
                            <span class="career__student1"></span>
                        </div>
                    </div>
           
                    <div class="profile__content__header1">
                    
                        <div class="card-inicio">
                                    <div class="card">
                                        <h1>Tareas pendientes</h1>
                                        <div class="EmpresasDestacadas">
                                            <div v-for="(data, index) in tareasPorCompletar" :key="index" class="company-cards-container" >
                                               
                                                <template v-if="data.b === 'Univeridad' ">
                                            <Carta2
                                                :name="data.name" 
                                                :description="data.description"
                                                :a="data.a"
                                                :b="data.b"
                                                :c="data.c"
                                                :d="data.d"
                                            />
                                        </template>
                                        <template v-if="data.b === 'Eventos'">
                                            <Carta 
                                                :name="data.name" 
                                                :description="data.description"
                                                :a="data.a"
                                                :b="data.b"
                                                :c="data.c"
                                                :d="data.d"
                                            />
                                        </template>
                                        <template v-if="data.b === 'Tareas Personales'">
                                            <Carta3 
                                                :name="data.name" 
                                                :description="data.description"
                                                :a="data.a"
                                                :b="data.b"
                                                :c="data.c"
                                                :d="data.d"
                                            />
                                       
                                    </template>
                                            </div>
                                        </div>
                                 </div>
                     
                      
                    <div class="task-form-container">
                        
                        <div class="task-form">
                        <h2>Añadir Tarea</h2>
                        <form @submit.prevent="agregarTarea">
                            <div class="form-grid">
                            <!-- Columna izquierda: Título y Prioridad -->
                            <div class="form-group">
                                <label for="titulo">Título:</label>
                                <input type="text" id="titulo" v-model="nuevaTarea.nombre1" required>
                            </div>
                            <div class="form-group">
                                <label for="Categoria">Categoria:</label>
                                <select id="Categoria" v-model="nuevaTarea.categoriasIdcategorias1" required>
                                <option value="1">Universidad</option>
                                <option value="3">Evento</option>
                                <option value="2">Tareas Personales</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="fecha">Fecha:</label>
                                <input type="date" id="fecha" v-model="nuevaTarea.fecha1" required>
                            </div>
                            <div class="form-group">
                                <label for="hora">Hora:</label>
                                <input type="time" id="hora" v-model="nuevaTarea.hora1" required>
                            </div>
                            <!-- Columna derecha: Materia y Descripción -->

                            <div class="form-group">
                                <label for="descripcion">Descripción:</label>
                                <textarea id="descripcion" v-model="nuevaTarea.descripcion" rows="4" cols="25"></textarea>
                            </div>
                            
                            </div>
                            <button type="submit">Añadir Tarea</button>
                        </form>
                       
   
               
                </div>
               
            </div>
            </div>
                      
            </div>
        </div>
  
        <!--prueba -->
  
        
          
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
        async agregarTarea() {
            try {
                const response = await axios.post('https://backend-control-tareas-jhessika.serverbb.online/api/v1/usuarios/1/tareas/1', {
                    nombre: "Tarea15sas",
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
                });
                this.successMessage = 'Usuario registrado exitosamente.';
                
            } catch (error) {
                this.errorMessage = 'Error al registrar usuario: ' + error.message;
            }
        },
    
        async agregarTarea1() {
    try {
        // Construir la fecha y hora de ingreso y de la tarea...

        // Llama al método postTarea del store para guardar la nueva tarea
        const fechaActual = new Date().toISOString();

// Construir la fecha y hora de ingreso usando la fecha actual
            const fechaHoraIngreso = fechaActual.substring(0, 10) + 'T' + fechaActual.substring(11, 19) + '.000+00:00';

            // Obtener el valor de la fecha y hora desde la nuevaTarea
            const fechaTarea = this.nuevaTarea.fecha;
            const horaTarea = this.nuevaTarea.hora;

            // Construir la fecha y hora de la tarea usando los valores proporcionados
            const fechaHoraTarea = fechaTarea + 'T' + horaTarea + ':00.000+00:00';

            // Llama al método postTarea del store para guardar la nueva tarea
            const response = await this.storeTareas.postTarea({
                ...this.nuevaTarea,
                fechahoraingreso: fechaHoraIngreso,
                fechahoratarea: fechaHoraTarea
            });
            console.log(this.nuevaTarea);

        // Verificar si la tarea se agregó correctamente
        if (response.success) {
            // La tarea se agregó correctamente
            console.log('Tarea agregada correctamente:', response.message);
            // Aquí puedes mostrar un mensaje de éxito al usuario o realizar otras acciones necesarias
        } else {
            // Hubo un error al agregar la tarea
            console.error('Error al agregar tarea:', response.error);
            // Aquí puedes mostrar un mensaje de error al usuario o realizar otras acciones necesarias
        }

        // Limpia el formulario después de agregar la tarea...
    } catch (error) {
        console.error('Error al agregar tarea:', error);
        // Aquí puedes manejar el error si ocurre
    }
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
textarea {
    width: 100%; /* Ajusta el ancho según sea necesario */
    padding: 10px; /* Ajusta el relleno según sea necesario */
    border: 1px solid #ccc; /* Añade un borde */
    border-radius: 5px; /* Añade esquinas redondeadas */
    box-sizing: border-box; /* Incluye el relleno y el borde en el ancho total */
    resize: none; /* Deshabilita el redimensionamiento del textarea */
}

  .ayuda{
   padding: 100px;
    margin-bottom: 100px;
  }
 
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
margin-top: 10%
}
/**prueba */
.ayuda{
    flex-wrap: wrap;
    margin-right: 20%;
    margin-left: 20%;
}
.student__principalPage{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  
}
.card-inicio{
padding: 1rem;
width: 100%;
display: grid;
    grid-template-columns: repeat(2, 8fr);
    gap: 100px;
}

.student__content__internship{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}


/*Estilos para el perfil del estudiante*/
.student__profile{
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
  background-color: #Fff;
  padding-top: 3%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.card{
width: 1000px;

  border-radius: 10px;
padding:2% ;
  background-color: #Fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

overflow-y: scroll;}


.dark-theme .card{
  background-color: #434B54;
}
.dark-theme .student__profile{
  background-color: #434B54;
}
.profile__content__header{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 10%;
}
.profile__content__header1{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 10%;
}

.content__welcome{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

}

.student__data{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
}
.welcome__student{
  font-size: 3.5rem;
  font-weight: 700;
}
.career__student{
  font-size: 2rem;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 30px;
  height: 20px;
  
}


.content__more{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.profile__button {
padding: 0.9rem;
margin: 0.5rem;
color: #fff;
cursor: pointer;
text-align:center;
border: none;
background-size: 300% 100%;
border-radius: 50px;
-o-transition: all .4s ease-in-out;
-webkit-transition: all .4s ease-in-out;
transition: all .4s ease-in-out;
}

.profile__button:hover {
background-position: 100% 0;
-o-transition: all .4s ease-in-out;
-webkit-transition: all .4s ease-in-out;
transition: all .4s ease-in-out;
}

.profile__button:focus {
outline: none;
}

.profile__button.bn23 {
  background-image: linear-gradient(
  to right,
  #25aae1,
  #4481eb,
  #04befe,
  #3f86ed
);
box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}
.dark-theme .profile__button.bn23{
  background-image: linear-gradient(
  to right,
  #29323c,
  #485563,
  #2b5876,
  #4e4376
);
box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
}

.see_vitae{
  font-size: 1rem;
  font-weight: 700;
  margin-left: 0.5rem;
}
.edit__Profile{
  font-size: 1rem;
  font-weight: 700;
  margin-left: 0.5rem;
}
.summary{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  
}
.summary__title{
  font-size: 2.5rem;
  font-weight: 700;
}
.summary__content{
    display: flex;
  flex-direction: row;
  
  padding: 0.5rem;
  font-size: 8rem;
  font-weight: 700;
  
}
.summary__content__number{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  font-size: 8rem;
  font-weight: 700;
}
.summary__content__text{
  font-size: 1.8rem;
  font-weight: 700;
  margin-left: 0.5rem;
}
/*Estilos para las pasantías del estudiante*/
/*Estilos para las pasantías activas del estudiante*/


.container__cards{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: scroll;
  height: 100%;
  width: 80%;

}
/*Estilos para las solicitudes del estudiante*/



.dark-theme .requests__by__student{
  background-color: #434B54;
}
.container__little__nav{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.container__Arrow{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
}



/* Estilos para dispositivos pequeños (teléfonos) */

@media only screen and (max-width: 600px) {
/* Estilos específicos para dispositivos pequeños */
  .student__principalPage{
          padding: 0.5rem;
  }
  .profile__content__header{
      flex-direction: column;
}
  .content__welcome{
      width: 100%;
      margin-bottom: 0.3rem;
  }
  .content__more{
      width: 100%;
  }
  .profile__button{
      margin: 0.2rem;
      padding: 0.5rem;
      font-size: 0.4rem;
  }
  .profile__button span{
      font-size: 0.6rem;
  }
  .summary__content{
      flex-wrap: wrap;
  }
  .summary__title{
      font-size: 1rem;
      font-weight: 700;
  }
  .summary__content__number{
      font-size: 1.2rem;
  }
  .summary__content__text{
      font-size: 0.6rem;
  }





}

@media only screen and (max-width: 480px) {
/* Estilos específicos para dispositivos pequeños */
  .student__profile{
         flex-direction: column;
  }
  
}
@media only screen and (max-width: 451px) {
/* Estilos específicos para dispositivos pequeños */
.profile__content__header{
 
 padding-bottom: 20%;
}
  
}



/* Estilos para tabletas */
@media only screen and (min-width: 600px) and (max-width: 1024px) {
/* Estilos específicos para tabletas */
.student__principalPage{
      padding: 1rem;
  
}
.profile__content__header{
      flex-direction: column;
}
  .content__welcome{
      width: 100%;
      margin-bottom: 0.5rem;
  }
  .content__more{
      width: 100%;
  }
  .profile__button{
      margin: 0.3rem 0.3rem;
      padding: 0.8rem;
      font-size: 0.6rem;
  }
  .profile__button span{
      font-size: 0.8rem;
  }
  .summary__content{
      flex-wrap: wrap;
  }
  .summary__title{
      font-size: 1.3rem;
      font-weight: 700;
  }
  .summary__content__number{
      font-size: 1.5rem;
  }
  .summary__content__text{
      font-size: 0.8rem;
  }
}
@media only screen and (min-width: 600px) and (max-width: 1024px) {
/* Estilos específicos para tabletas */
.student__principalPage{
      padding: 1rem;
  
}
.profile__content__header{
      flex-direction: column;
}
  .content__welcome{
      width: 100%;
      margin-bottom: 0.5rem;
  }
  .content__more{
      width: 100%;
  }
  .profile__button{
      margin: 0.3rem 0.3rem;
      padding: 0.8rem;
      font-size: 0.6rem;
  }
  .profile__button span{
      font-size: 0.8rem;
  }
  .summary__content{
      flex-wrap: wrap;
  }
  .summary__title{
      font-size: 1.3rem;
      font-weight: 700;
  }
  .summary__content__number{
      font-size: 1.5rem;
  }
  .summary__content__text{
      font-size: 0.8rem;
  }
}

/* Estilos para dispositivos medianos */
@media only screen and (min-width: 1025px) and (max-width: 1440px) {
/* Estilos específicos para dispositivos medianos */
.student__principalPage{
      padding: 1.5rem;
}
}

/* Estilos para dispositivos grandes (pantallas de escritorio) */
@media only screen and (min-width: 1441px) {
/* Estilos específicos para dispositivos grandes */
}

.EmpresasDestacadas {  width: 90%;
    height:auto;
    display: grid;
    grid-template-columns: repeat(2, 8fr);
    gap: 3px;
  
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
  padding-top: 10%;
    padding-bottom: 10%;
  }

}

#chk{
	 display: none;
 }
 .signup{
	 position: relative;
	 width:100%;
	 height: 100%;
 }
 label{
	 color: #A98467;
	
	 justify-content: center;
	 display: flex;
	 margin: 20px;
	 font-weight: bold;
	 cursor: pointer;
	 transition: .5s ease-in-out;
 }
 input{
	 width: 60%;
	 height: 20px;
	 background: #ffffff;
	 justify-content: center;
	 display: flex;
	 margin: 20px auto;
	 padding: 10px;
	 border: none;
	 outline: none;
	 border-radius: 5px;
	 font-family: 'Times New Roman', Times, serif;
 }
 button{
	 width: 60%;
	 height: 40px;
	 margin: 10px auto;
	 justify-content: center;
	 display: block;
	 color: #fff;
	 background: #A98467;
	 font-weight: bold;
	 margin-top: 20px;
	 outline: none;
	 border: none;
	 border-radius: 5px;
	 transition: .2s ease-in;
	 cursor: pointer;
 }

 button:hover{
	 background: #ADC178;
 }
 .login{
	 height: 260px;
	 background: #eee;
	 border-radius: 60% / 10%;
	 transform: translateY(-180px);
	 transition: .8s ease-in-out;
 }
 .login label{
	 color: #A98467;
	 transform: scale(.6);
 }
 
 #chk:checked ~ .login{
	 transform: translateY(-500px);
 }
 #chk:checked ~ .login label{
	 transform: scale(1);	
 }
 #chk:checked ~ .signup label{
	 transform: scale(.6);
 }
 .task-form-container {
  left:590px ;
  bottom: 150px;
 
}
.task-form-container2 {
  left: 330px;
  bottom: 140px;

  width: 900px; /* Ancho del recuadro */
  height: 700px; /* Alto del recuadro */
  border: 8px solid #6C584C; /* Borde del recuadro */
  border-radius: 10px; /* Radio de borde del recuadro */
  background-color: #F0EAD2;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
      inset -5px -5px 15px rgba(255, 255, 255, 0.1),
      5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
    border-radius: 15px;
   transition: 0.5s;
}
/* Estilos para el formulario */
.task-form {
  margin: 50px;
  padding: 20px;
  border: 3px solid #6C584C;
  background-color: #DDE5B6;
  border-radius: 5px;
  width: 600px;
  height: 550px;
  font-size: large;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2), inset -5px -5px 15px rgba(255, 255, 255, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    transition: 0.5s;
}

.task-form h2 {
  margin-bottom: 10px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text1"],
textarea,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  background-color: #6C584C;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #ADC178;
}
input{
	
    height: 20px;
    background: #ffffff;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    font-family: 'Times New Roman', Times, serif;
}
</style>