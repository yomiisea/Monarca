<template>
    <div class="ayuda">
      <!-- Tu otro contenido aquí -->
      <div class="abajo">
        <table class="styled-table">
          <thead>
            <tr>
              <th>X de Destino</th>
              <th>Y de Destino</th>
              <th>Dirección de Origen</th>
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ubicacion, index) in ubicaciones" :key="index">
              <td>{{ ubicacion.xdestino }}</td>
              <td>{{ ubicacion.ydestino }}</td>
              <td>{{ ubicacion.direccionorigen }}</td>
              <td>{{ ubicacion.comentario }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  
<script>

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
          selectedLatitude: null,
      selectedLongitude: null,
      descripcion: '',
          center: {lat: -16.4958, lng: -68.1333 },
          markers: [
        {
          position: {
            lat: 51.093048, lng: 6.842120
          },
        }
        , // Along list of clusters
      ],
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
      setPlace(place) {
  // Limpiar los marcadores existentes
  this.markers = [];
  
  // Agregar un nuevo marcador para el lugar seleccionado
  this.markers.push({
    position: {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }
  });

  // Centrar el mapa en el lugar seleccionado
  this.center = {
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng()
  };

  // Imprimir por consola los valores de latitud y longitud del marcador
  console.log('Latitud:', place.geometry.location.lat());
  console.log('Longitud:', place.geometry.location.lng());
  this.selectedLatitude = place.geometry.location.lat();
      this.selectedLongitude = place.geometry.location.lng();
},
      botonsos() {
      // Utiliza this.$router.push para ir a la ruta deseada
      this.$router.push("/sos");
    },
    
    // Otros métodos...
    addubi() {
      
        // Obtener el texto del textarea
        const nombre = this.descripcion;
        console.log(this.descripcion)

        // Verificar si hay al menos un marcador en el mapa
        
            const x = this.selectedLatitude;
            console.log(this.selectedLatitude)
            const y = this.selectedLongitude;
            console.log(this.selectedLongitude)
            // Obtener el ID de usuario desde window.userid
            const userId = window.userid;
            console.log(window.userid)
            // Construir el objeto de datos para enviar al servidor
            const data = {
                users_id: userId,
                x: x,
                y: y,
                nombre: nombre,
                direccion: '' // Puedes agregar la dirección si la tienes disponible
            };

            // Realizar la solicitud POST a tu API
            fetch('https://devel.transoft.bo/monarca/api.php/records/ubicaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar la ubicación');
                }
                // Limpiar el textarea después de enviar la ubicación
                this.descripcion = '';
                // Actualizar la interfaz o realizar alguna otra acción necesaria
                // Por ejemplo, mostrar un mensaje de éxito
                alert('Ubicación agregada exitosamente');
            })
            .catch(error => {
                // Manejar cualquier error que ocurra durante la solicitud
                console.error('Error:', error);
                // Mostrar un mensaje de error al usuario
                alert('Ocurrió un error al enviar la ubicación. Por favor, inténtalo de nuevo.');
            });
        } 
    },
    created() {
  // Obtener el userId desde window.userid
  const userId = window.userid;

  // Realizar la solicitud GET para obtener los datos de la API
  fetch(`https://devel.transoft.bo/monarca/api.php/records/rutas?filter=users_id,eq,${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener las ubicaciones');
      }
      return response.json();
    })
    .then(data => {
      // Almacenar los datos en la variable ubicaciones
      this.ubicaciones = data.records;
    })
    .catch(error => {
      console.error('Error:', error);
      // Manejar el error si la solicitud falla
    });
},

    
};
</script>

  
<style scoped>
.styled-table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd;
  }
  .styled-table th, .styled-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  .styled-table th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
  }
  .styled-table tbody tr:nth-child(even) {
    background-color: #f2f2f2;
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
background-color: #FAD1B0;
height: 900px
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


align-items: center;
padding-left: 5%;
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
height: 8dvh;
width: 20dvw;
background-color: crimson;
color: #Fff;
font-size: larger;
border-radius: 10px;
font-weight: bolder;
border: none;
margin-right: 4%;
margin-left: 78%;

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

@media screen and (max-width: 380px){

.EmpresasDestacadas{
padding: 0.5rem;
height: 800px;
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
  font-size: 15px;
  color: #050200;
  
  margin-left: 5px;
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
    height: 700px;
    overflow-y: hidden;
  }
}
.abajo{
  margin-bottom: 5px;
  
}

</style>