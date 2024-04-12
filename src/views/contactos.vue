<template>
    <div class="ayuda">
      
        <button class= button @click="handleClick">SOS</button>
        <!--prueba -->
        <div class="student__profile">
         <div class="content__welcome">
            <span class="title">Contactos de Emergencia🦋</span>
          </div>
        </div>
        <div class="abajo">
            

            <div class="card">
              
                <div class="EmpresasDestacadas">
                  <div class ="company-cards-container">
                    <div class="container__button">
                        <button class="button3" v-for="contacto in contactos" :key="contacto.id" @click="eliminarContacto(contacto.id)">
      <i class="fa fa-user-circle fa-4x"></i> <!-- Hacer el icono más grande -->
      <div>{{ contacto.nombre }}</div> <!-- Colocar el nombre debajo del icono -->
      <div>{{ contacto.telefono }}</div> <!-- Colocar el nombre debajo del icono -->
    </button>
</div>
                  </div>
            </div>
        </div>
          <div class="card2">
            <h1 class="subtitle2">Añade un nuevo contacto</h1>
            <form @submit.prevent="agregarContacto" class="formulario">
      <label for="nombre">Nombre:</label>
      <input class="caja"  type="text" id="nombre" v-model="nuevoContacto.nombre" required>
      
      <label for="telefono">Teléfono:</label>
      <input type="text" id="telefono" v-model="nuevoContacto.telefono" required>
      
      <button class= button type="submit">Agregar contacto</button>
    </form>
      </div>
    </div>
</div>
</template>
  
<script>

import consejo from "@/components/common/consejo.vue";
import { useTareasStore } from '@/stores/tareasStore.js';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
export default {
    name: 'Paginaestado',
    components: {
        consejo,
    },
    data() {
        return {
            contactos: [],
            nuevoContacto: {
        nombre: '',
        telefono: ''
      },
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
    fetch(`https://devel.transoft.bo/monarca/api.php/records/contacto?filter=users_id,eq,${window.userid}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de contactos');
            }
            return response.json();
        })
        .then(data => {
            // Guardar los datos obtenidos en la variable ubicaciones
            this.contactos = data.records;
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
        eliminarContacto(contactoId) {
    // Muestra un modal de confirmación
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas eliminar este contacto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma la eliminación, realiza la solicitud DELETE
            fetch(`https://devel.transoft.bo/monarca/api.php/records/contacto/${contactoId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el contacto');
                }
                // Eliminar el contacto de la lista localmente
                this.contactos = this.contactos.filter(contacto => contacto.id !== contactoId);
                // Mostrar un mensaje de éxito
                Swal.fire(
                    '¡Eliminado!',
                    'El contacto ha sido eliminado correctamente.',
                    'success'
                );
            })
            .catch(error => {
                console.error('Error:', error);
                // Mostrar un mensaje de error
                Swal.fire(
                    'Error',
                    'Ocurrió un error al eliminar el contacto. Por favor, inténtalo de nuevo.',
                    'error'
                );
            });
        }
    });
},
        async agregarContacto() {
      const userId = window.userid; // Obtener el ID de usuario desde window.userid
      const data = {
        nombre: this.nuevoContacto.nombre,
        telefono: this.nuevoContacto.telefono,
        users_id: userId
      };

      try {
        const response = await fetch('https://devel.transoft.bo/monarca/api.php/records/contacto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Error al agregar el contacto');
        }

        // Limpiar los campos del formulario después de agregar el contacto
        this.nuevoContacto.nombre = '';
        this.nuevoContacto.telefono = '';

        // Mostrar un mensaje de éxito
        alert('Contacto agregado exitosamente');
      } catch (error) {
        console.error('Error:', error);
        // Mostrar un mensaje de error si ocurre algún problema al agregar el contacto
        alert('Ocurrió un error al agregar el contacto. Por favor, inténtalo de nuevo.');
      }
      
    }
  },
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
    },
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



.description-box textarea {
  width: 80%;
  padding: 10px;
  margin-top: 10%;
  margin-left: 10%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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
.caja {
  width: 30px;
}

h3 {
  font-size: 18px;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
}
.formulario {
  background-color: #fad6a1; /* Cambia el color de fondo */
  padding: 20px; /* Agrega un espacio interno al formulario */
  border-radius: 10px; /* Agrega esquinas redondeadas */
  width: 350px;

}

/* Estilos para las etiquetas de los campos */
label {
  margin-bottom: 5px; /* Agrega espacio entre las etiquetas y los campos */
}

/* Estilos para los campos de entrada */
input[type="text"] {
  width: 80%; /* Haz que los campos ocupen todo el ancho del formulario */
  padding: 10px; /* Agrega espacio interno a los campos */
  border: none; /* Quita el borde */
  border-radius: 5px; /* Agrega esquinas redondeadas */

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

height: 700px
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
padding-left:10px ;
margin-left: 5  %;
padding-top: 8%;
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
background-color: #ee8036;

}

.dark-theme .EmpresasDestacadas {
background: #434B54;
padding: 0.1rem;


}
.company-cards-container {
display: inline-flex;
margin-top: 5px;
margin-left: 30px;
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
height: 3dvh;
width: 40dvw;
background-color: rgb(255, 255, 255);
color: #000000;
font-size: larger;
border-radius: 10px;
font-weight: bolder;
border: none;
margin-right: 4%;
margin-left: 50%;

}
.button3{
    display: flex;
    flex-direction: column; /* Dirección de la columna (icono arriba, texto abajo) */
  align-items: center;
height: 12dvh;
width: 20dvw;
background-color:white;
border: none;
border-radius: 10px;
padding-top: 5%;
margin: 10px; 




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
  font-size: 20px;
  color: #050200;
  margin-bottom: 20px;
  margin-left: 9px;
}
.subtitle2 {
  font-size: 20px;
  color: #050200;
  margin-bottom: 10px;
  
}
.title {
  font-style:unset;
  font-size: 2rem;
  font-weight: 800;
  color: #ee8036;
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
    padding-left: 5%;
  }
  .EmpresasDestacadas{
    height: 130px;
    overflow-y: hidden;
    padding-left: 5%;
  }
}
.abajo{
  margin-bottom: 5px;
  
}

</style>