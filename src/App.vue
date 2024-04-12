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
export default {
    name: 'App',
    components: {
      Sidebar,
       
     },
    data() {
      return {
        usuarioAutenticado: true,
      };
    },
    methods: {
      // Puedes definir métodos aquí
    },
    mounted() {
    // Verificar si el usuario está autenticado al cargar la página
   
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