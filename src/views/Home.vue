<template>
    <div class="ayuda">
      <div class="student__profile">
         <div class="content__welcome">
            <span class="title">Bienvenida🦋</span>
          </div>
        </div>
        <div class="divisora"></div>
        <!--prueba -->
  
        <div class="abajo">
            
                <button class= button @click="botonsos">SOS</button>

            <div class="card">
                <h1 class="subtitle">Ubicaciones Guardadas</h1>
                <div class="EmpresasDestacadas">
                  <div class ="company-cards-container">
                    <div class="container__button">
                      <button class="button3" v-for="ubicacion in ubicaciones" :key="ubicacion.id">
      <i class="fa fa-thumb-tack fa-3x"></i> <!-- Hacer el icono más grande -->
      <div>{{ ubicacion.nombre }}</div> <!-- Colocar el nombre debajo del icono -->
    </button>
</div>
                  </div>
            </div>
        </div>

        <div class="card2">
          
        <button class= button2 @click="dondevasred">Viaje</button>
    </div>
    
            <div class="card3">
                <h1 class="subtitle">CONSEJOS</h1>
                <div class="EmpresasDestacadas">
                    <div class ="company-cards-container">
                        <consejo title="Procura no estar incomunicada" description=" Que alguien sepa donde estas siempre"  link="https://www.ruvaseguridad.com/blog/consejos-de-seguridad-para-mujeres/index.html#:~:text=Consejos%20de%20seguridad%20para%20mujeres%201%20%E2%97%8F%20No,a%20la%20vivienda%2C%20o%20para%20cualquier%20imprevisto.%20"></consejo>
                        <consejo title="No dudes de tus instintos" description="Si sientes incomodidad o peligro, comparte tu ubicación con alguno de tus contactos"  link="https://mexico.unwomen.org/es/noticias-y-eventos/articulos/2021/04/herramientas-de-seguridad-para-mujeres"></consejo>
                        <consejo title="Sé Consciente de tus alrededor" description="Mantén la atención en lo que te rodea. Evita distracciones con dispositivos electrónicos."  link="https://www.econsejos.com/consejos-de-seguridad-para-las-mujeres-que-viven-solas/"></consejo>
                        
                    </div>
                    
            </div>
        </div>

       
           
          </div>
    </div>
</template>
  
<script>
// Obtener el ID del usuario desde cualquier componente hijo


import consejo2 from "@/components/common/consejo2.vue";
import consejo from "@/components/common/consejo.vue";
import { useTareasStore } from '@/stores/tareasStore.js';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
export default {
  
    name: 'Paginaestado',
    components: {
        consejo,
    },
    data() {
        return {
          ubicaciones: [],
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
    created() {
    // Realizar la solicitud GET para obtener la lista de ubicaciones por userid
    fetch(`https://devel.transoft.bo/monarca/api.php/records/ubicaciones?filter=users_id,eq,${window.userid}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de ubicaciones');
            }
            return response.json();
        })
        .then(data => {
            // Guardar los datos obtenidos en la variable ubicaciones
            this.ubicaciones = data.records;
        })
        .catch(error => {
            console.error('Error:', error);
        });
},
    mounted() {
    // Acceder a $root aquí cuando el componente se ha montado completamente
    const userId = window.userid;
    console.log('ID del usuario:', userId);
  },
    methods: {
      botonsos() {
      // Utiliza this.$router.push para ir a la ruta deseada
      this.$router.push("/sos");
    },
      dondevasred() {
      // Utiliza this.$router.push para ir a la ruta deseada
      
      this.$router.push("/dondevas");
    },
    registraubi(){
      
      console.log(window.userid)
    }
    
  },

}
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
}#e69500#e6410#b35f00
.company-logo{
  height: 400px;
}
.student__profile{
  padding-left: 5%;
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

font-size: 10px;
}
/**prueba */
.ayuda{
  flex-wrap: wrap;
padding-top: 10px ;
padding-left: 0%;
}



/*Estilos para el perfil del estudiante*/
.student__profile{
display: flex;
align-items: center;

padding-top: 1rem;
padding-bottom: none;
border-radius: 10px;
}

.card3{
height: 500px;
border-radius: 10px;
padding-left:15px ;
/*background-color: #Fff;*/}
.card{
height: 630px;
border-radius: 10px;
padding-left:10px ;
padding-top: 1%;
/*background-color: #Fff;*/}
.card2{
height: 60px;
border-radius: 10px;

padding-top: 5%;
align-items: center;
/*background-color: #Fff;*/}


.dark-theme .card{
background-color: #434B54;
}
.dark-theme .student__profile{
background-color: #434B54;
}






.welcome__student{
font-size: 2rem;
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
margin-left: 20px;
gap: 20px;
}
.container__button{
display: flex;
flex-direction: row;
align-items: center;
text-decoration: none;
justify-content: space-around;
}
.button{
height: 10dvh;
width: 93dvw;
background-color: crimson;
color: #Fff;
font-size: larger;
border-radius: 10px;
font-weight: bolder;
border: none;
margin-left: 4%;
margin-right: auto;

}
.button2{
height: 7dvh;
width: 93dvw;
background-color: #f4a261;
color: #000000;
font-size: larger;
border-radius: 10px;
font-weight: bolder;
border: none;
margin-left: 4%;
margin-right: auto;

}
.button3{
    display: flex;
    flex-direction: column; /* Dirección de la columna (icono arriba, texto abajo) */
  align-items: center;
height: 10dvh;
width: 20dvw;
background-color:white;
border: none;
border-radius: 10px;
padding-top: 5%;




}
.button4{
height: 6dvh;
width: 30dvw;
background-color: #e4f7c2;
color: #000000;
font-size: larger;
border-radius: 10px;
font-weight: bolder;
border: none;
margin-left: 65%;
margin-right: auto;

}

@media screen and (max-width: 380px){

.EmpresasDestacadas{
padding: 0.5rem;
height: 100px;
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

.divisora {
    padding-top: 20px;
    margin-left: auto; /* Centra la línea horizontalmente */
  margin-right: auto; /* Centra la línea horizontalmente */
  width: 90%;
  border-bottom: 0.5px solid #000; /* Cambia el color y el grosor de la línea según sea necesario */
}

@media screen and (max-width: 540px){

.student__profile{

}
.subtitle {
  font-size: 20px;
  color: #050200;
  margin-bottom: 20px;
  margin-left: 9px;
}
.title {
  font-style:unset;
  font-size: 1.7rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 60px;
  margin-top: 50%;
  text-shadow: 0px 0px 1px #52796F;

}
}
/* Estilos para dispositivos pequeños (teléfonos) */

@media screen and (max-width: 589px){
  .card{
    height: 150px;
  }
  .card2{
    height: 70px;
  }
  .EmpresasDestacadas{
    height: 10px;
    overflow-y: hidden;
  }
}
.abajo{
  margin-bottom: 5px;
  margin-top: 50px;
}

</style>