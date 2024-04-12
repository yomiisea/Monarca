<template>
  <div class="ayuda">
      <div class="student__principalPage">
          <div class="student__profile">
              <div class="profile__content__header1">
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
              </div>
              <div class="summary">
                  <span class="summary__title">
                      Resumen general de tus tareas
                  </span>
                  <div class="summary__content">
                      <span class="summary__content__number">{{ cantidadTareasPendientes }}
                          <span class="summary__content__text">Tareas pendientes</span>
                      </span>
                      <span class="summary__content__number">{{ cantidadTareasEnProgreso }}
                          <span class="summary__content__text">Tareas en progreso</span>
                      </span>
                      <span class="summary__content__number">{{ cantidadTareasCompletadas  }}
                          <span class="summary__content__text">Tareas Completadas</span>
                      </span>
                      <span class="summary__content__number">{{ cantidadTareasIncompletas }}
                          <span class="summary__content__text">Tareas Incompletas</span>
                      </span>
                  </div>
              </div>
          </div>
      </div>

      <!--prueba -->

      <div class="card-inicio">
          <div class="card">
              <h1>Tareas pendientes</h1>
              <div class="EmpresasDestacadas">
                  <div v-for="(data, index) in tareasPendientes" :key="index" class="company-cards-container">
  <Carta
      :name="data.name" 
      :description="data.description"
      :a="data.a"
      :b="data.b"
      :c="data.c"
      :d="data.d"
  />
</div>
              </div>
          </div>
      </div>
   
      <div class="card-inicio">
          <div class="card">
              <h1>Tareas en progreso</h1>
              <div class="EmpresasDestacadas">
                  <div v-for="(data, index) in tareasEnProgreso" :key="index" class="company-cards-container">
  <Carta2 
      :name="data.name" 
      :description="data.description"
      :a="data.a"
      :b="data.b"
      :c="data.c"
      :d="data.d"
  />
</div>
              </div>
          </div>
      </div>

      <div class="card-inicio">
          <div class="card">
              <h1>Tareas completadas</h1>
              <div class="EmpresasDestacadas">
                  <div v-for="(data, index) in tareasCompletadas" :key="index" class="company-cards-container">
  <Carta3 
      :name="data.name" 
      :description="data.description"
      :a="data.a"
      :b="data.b"
      :c="data.c"
      :d="data.d"
  />
</div>
              </div>
          </div>
      </div>

      <div class="card-inicio">
          <div class="card">
              <h1>Tareas Incompletas</h1>
              <div class="EmpresasDestacadas">
                  <div v-for="(data, index) in tareasIncompletas" :key="index" class="company-cards-container">
  <PruebaTarea4 
      :name="data.name" 
      :description="data.description"
      :a="data.a"
      :b="data.b"
      :c="data.c"
      :d="data.d"
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
import Carta from "@/components/common/Carta.vue";
import Carta2 from "@/components/common/Carta2.vue";
import Carta3 from "@/components/common/Carta3.vue";
import PruebaTarea3 from "@/components/common/PruebaTarea3.vue";
import PruebaTarea4 from "@/components/common/PruebaTarea4.vue";
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
    PruebaTarea4,
},
  data() {
      return {
          listInstitution: [],
          listInternship: [],
          everyInternshipsAreLoaded: false,
          tareasPendientes:  [
            {
        name: "RESUMEN CAP",
        description: "Resumen capitulo 1 y 2",
        a: "12 1700",
        b: "Calculo",
        c: "Pendiente",
        d: "Negro"
    },
    {
        name: "RESUMEN CAP",
        description: "Resumen capitulo 1 y 2",
        a: "12 1700",
        b: "Calculo",
        c: "Pendiente",
        d: "Negro"  
    }, {
        name: "RESUMEN CAP",
        description: "Resumen capitulo 1 y 2",
        a: "12 1700",
        b: "Calculo",
        c: "Pendiente",
        d: "Negro"
    },
    {
        name: "RESUMEN CAP",
        description: "Resumen capitulo 1 y 2",
        a: "12 1700",
        b: "Calculo",
        c: "Pendiente",
        d: "Negro"
    },
            ],
          tareasEnProgreso:  [
            {
        name: "INFORME",
        description: "Cap 1",
        a: "12 1700",
        b: "SIS",
        c: "En progreso",
        d: "Amarillo"
    },
    {
        name: "INFORME",
        description: "Cap 1",
        a: "12 1700",
        b: "SIS",
        c: "En progreso",
        d: "Amarillo"
    }, {
        name: "INFORME",
        description: "Cap 1",
        a: "12 1700",
        b: "SIS",
        c: "En progreso",
        d: "Amarillo"
    },
    {
        name: "INFORME",
        description: "Cap 1",
        a: "12 1700",
        b: "SIS",
        c: "En progreso",
        d: "Amarillo"
    },
            ],
          tareasCompletadas:  [
            {
        name: "PRACTICA",
        description: "En clase",
        a: "12 1700",
        b: "LOG",
        c: "Completada",
        d: "Verde"
    },
    {
        name: "PRACTICA",
        description: "En clase",
        a: "12 1700",
        b: "LOG",
        c: "Completada",
        d: "Verde"
    }, {
        name: "PRACTICA",
        description: "En clase",
        a: "12 1700",
        b: "LOG",
        c: "Completada",
        d: "Verde"
    },
    {
        name: "PRACTICA",
        description: "En clase",
        a: "12 1700",
        b: "LOG",
        c: "Completada",
        d: "Verde"
    },
            ],
          tareasIncompletas: [
            {
        name: "Cisco",
        description: "Practica redes convergentes",
        a: "12 1700",
        b: "Redes",
        c: "Incompleta",
        d: "Rojo"
    },
    {
        name: "Cisco",
        description: "Practica redes convergentes",
        a: "12 1700",
        b: "Redes",
        c: "Incompleta",
        d: "Rojo"
    }, {
        name: "Cisco",
        description: "Practica redes convergentes",
        a: "12 1700",
        b: "Redes",
        c: "Incompleta",
        d: "Rojo"
    },
    {
        name: "Cisco",
        description: "Practica redes convergentes",
        a: "12 1700",
        b: "Redes",
        c: "Incompleta",
        d: "Rojo"
    },
            ],
      };
  },
  methods: {
    // Puedes definir métodos aquí
  },
  setup() {
      const storeTareas = useTareasStore();
     
  
      return { storeTareas };
    },
    async mounted() {
  // Obtenemos todas las tareas
  const response = await this.storeTareas.getTareasEstado();
  console.log('Todas las tareas:', response);

  // Filtramos las tareas según su estado
  

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
  padding: 4% 7%;
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
  height: 150%;
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
  color: #242222;
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
width: 80%;
margin-left: 7%;
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
justify-content: center;
align-items: center;
width: 80%;
padding: 1rem;
border-radius: 10px;
background-color: #Fff;
padding-top: 3%;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.card{
width: 100%;

border-radius: 10px;
padding:2% ;
background-color: #Fff;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);}


.dark-theme .card{
background-color: #394047;
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
padding: 0.5rem;
margin: 0.5rem;
}
.summary__title{
font-size: 2.5rem;
font-weight: 700;
}
.summary__content{
display: flex;
flex-direction: row;
width: 100%;
font-size: 1rem;
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
.internship__active__by__student{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
padding: 0.5rem;
margin: 0 0 1.5rem 0;
height: 500px; 
border-radius: 10px;
background-color: #Fff;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.dark-theme .internship__active__by__student{
background-color: #434B54;
}
.internship__active__by__student h1{
font-size: 1.5rem;
font-weight: 700;
margin: 1rem;
}
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

.requests__by__student{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
padding: 0.5rem;
margin: 0 0 1.5rem 0;
height: 500px; 
border-radius: 10px;
background-color: #Fff;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.container__requests{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
gap: 10px;

}

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

.EmpresasDestacadas {
display: flex;
flex-direction: row;
align-items: center;
height: 450px;
border-radius: 10px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
background: #434B54;
margin: 0.5rem;

overflow: auto;
overflow-x: scroll;

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


</style>