<template>
 <link href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <Sidebar v-if="usuarioAutenticado" />
  
    <div id="app">
      
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from "@/components/common/Sidebar.vue";
import Cookies from 'js-cookie';
import axios from 'axios';
export default {
    name: 'App',
    components: {
      Sidebar,
       
     },
    data() {
      return {
        usuarioAutenticado: true,
        userId: 987
      };
    },
    created() {
    // Llamar a la función para obtener el ID del usuario al cargar la aplicación
    // this.fetchUserId();
  },
    methods: {
      async fetchUserId() {
      try {
        // Realiza la solicitud GET para obtener el usuario por su nombre y contraseña
        const response = await axios.get('https://devel.transoft.bo/monarca/api.php/records/users', {
          params: {
            filter: 'name,eq,user1',
            filter: 'password,eq,pass1'
          }
        });

        // Verifica si se obtuvo el ID del usuario correctamente
        if (response.data && response.data[0] && response.data[0].id) {
          // Almacena el ID del usuario en la instancia de Vue para que esté disponible globalmente
          this.userId = response.data[0].id;
        }
      } catch (error) {
        console.error('Error al obtener el ID del usuario:', error);
      }
    }

    },
    mounted() {
    // Verificar si el usuario está autenticado al cargar la página
   console.log("mounted",window.userid);
  },
};
</script>

<style>
#app {
   align-items: center;
   justify-content: center;
   width: 100%;
   
   font-family: 'Popins', sans-serif;
   background: #ffffff;
   

 }
 input{
    width: 60%;
    height: 20px;
    background: #ffffff;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    
    border: none;
    outline: none;
    border-radius: 5px;
    font-family: 'Times New Roman', Times, serif;
  }

@media(max-width : 860px){
  #app {
  /*display: flex;*/
  

  
}
}
body {
  padding: 0; 
  margin: 0;
  

  overflow-x: hidden ;

}


</style>