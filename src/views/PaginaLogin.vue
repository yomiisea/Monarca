<template>
	<body>
		<div v-if="successMessage" class="success-message">{{ successMessage }}</div>
       
	 <div class="main">  	
		 <input type="checkbox" id="chk" aria-hidden="true">
 
		 <div class="signup">
				<form @submit.prevent="registerUser">
					<label for="chk" aria-hidden="true">Registrate</label>
					<div class="pinguino">
					<img src="https://i.postimg.cc/zB2n1yNY/monarca-preview-rev-1.png" alt="Pingüino" style="margin-top: 20px; width: 100px; height: auto;">
				</div><input type="text" v-model="email" name="txt" placeholder="Usuario" required="">
					<input type="password" v-model="password" name="pswd" placeholder="Contraseña" required="">
					<button type="submit">Registrarse</button>
				</form>
				</div>
			 <div class="login">
				 <form @submit.prevent="loginUser">
					 <label for="chk" aria-hidden="true">Cuenta</label>
					 <div class="pinguino">
					<img src="https://i.postimg.cc/zB2n1yNY/monarca-preview-rev-1.png" alt="Pingüino" style="margin-top: 20px; width: 100px; height: auto;">
				</div><input type="text" v-model="EmailIngresado" name="txt" placeholder="Usuario" required="">
				<input type="password" v-model="PasswordIngresado" name="pswd" placeholder="Contraseña" required="" :readonly="loginBlocked">
 <div v-if="loginBlocked" class="login-blocked-message">
					<p>Su cuenta ha sido bloqueada temporalmente.</p>
					<p>Intente de nuevo después de {{ remainingTime }} segundos.</p>
					</div>
	<button type="submit">Iniciar sesión</button>
				 </form>
			 </div>
	 </div>
 </body>
 </template>
 
 <script>
 import axios from 'axios';
 import { useLoginStore } from '@/stores/loginStore.js';
 
 export default {
    name: 'PaginaLogin',
    data() {
        return {
			needReload:false,
			usuarioAutenticado: false,
            email: '',
            password: '',
            EmailIngresado: '',
            PasswordIngresado: '',
            errorMessage: '',
            successMessage: '',
			loginAttempts: 0,
      		loginBlocked: false,
			  remainingTime: 30,
        }
    },
    methods: {
		

async registerUser() {
    try {
        const response = await axios.post('https://devel.transoft.bo/monarca/api.php/records/users', {
            name: this.email,
            password: this.password
        });

        // Verificar si la respuesta es exitosa
        if (response.status === 200) {
            this.successMessage = 'Usuario registrado exitosamente.';
            
            // Redirigir a la página deseada
            this.$router.push('/home');
            
            // Limpiar los campos de entrada
            this.email = '';
            this.password = '';

            // Recargar la página después de 2 segundos
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            // Mostrar un mensaje de error si la respuesta no es exitosa
            this.errorMessage = 'Error al registrar usuario.';
        }
    } catch (error) {
        // Capturar y mostrar el error en caso de fallo en la solicitud
        this.errorMessage = 'Error al registrar usuario: ' + error.message;
    }
},
async loginUser() {
    const apiUrl = 'https://devel.transoft.bo/monarca/api.php/records/users';

    // Construir los parámetros de filtro para el nombre de usuario y la contraseña
    const filters = [
        'filter=name,eq,' + this.EmailIngresado,
        'filter=password,eq,' + this.PasswordIngresado
    ];
    const query = filters.join('&');

    // Construir la URL completa para la solicitud de login
    const loginUrl = apiUrl + '?' + query;

    try {
        // Realizar la solicitud GET para verificar el usuario y la contraseña
        const response = await axios.get(loginUrl);
		console.log(response);
        // Verificar si se encontró un usuario que coincida con los datos proporcionados
        if (response.data.records.length > 0) {
            // Usuario autenticado correctamente
        	
            this.PasswordIngresado = '';
            this.EmailIngresado = '';
			console.log(response.data.records[0].id);
			console.log(window.userid);
			window.userid=response.data.records[0].id;
			console.log(window.userid);
	            // Recargar la página después de 2 segundos
            setTimeout(() => {
                // location.reload();
            }, 1000);
			
			this.$router.push("/home");
        } else {
            // Usuario o contraseña incorrectos
            alert("Usuario o contraseña incorrectos");
        }
    } catch (error) {
        // Capturar y mostrar el error en caso de fallo en la solicitud
        console.error('Error al realizar la solicitud de login:', error);
        alert("Error al iniciar sesión");
    }
	
}

  }, }
</script>
 
 
 <style scoped>
 .login-blocked-message {
  font-size: 0.5rem;
  margin-left: 100px;
}
 body{
	 margin: 0;
	 padding: 0;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 min-height: 100vh;
	 font-family: 'Jost', sans-serif;
	 background: #ad7814;
 }
 .main{
	 width: 350px;
	 height: 500px;
	 background: red;
	 overflow: hidden;
	 background: #84A98C;
	 box-shadow: 5px 20px 50px #000;
	 position:relative;
	 border-radius: 40px;
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
	 color:  #ffffff;;
	 font-size: 2.3em;
	 justify-content: center;
	 display: flex;
	 margin: 20px;
	 font-weight: bold;
	 cursor: pointer;
	 transition: .5s ease-in-out;
	 
 }
 input{
	
	 height: 20px;
	 box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
    inset -7px -7px 10px 0px rgba(0, 0, 0, .1),
    3.5px 3.5px 20px 0px rgba(0, 0, 0, .1),
    2px 2px 5px 0px rgba(0, 0, 0, .1);
  border-radius: 8rem;
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
	 background: #2F3E46;
	 font-size: 1em;
	 font-weight: bold;
	 margin-top: 20px;
	 outline: none;
	 border: none;
	 border-radius: 5px;
	 transition: .2s ease-in;
	 cursor: pointer;
	 box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
    inset -7px -7px 10px 0px rgba(0, 0, 0, .1),
    3.5px 3.5px 20px 0px rgba(0, 0, 0, .1),
    2px 2px 5px 0px rgba(0, 0, 0, .1);
 }
 button:hover{
	 background: #ADC178;
 }
 .login{
	margin-top: 80px;
	 height: 460px;
	 background: #CAD2C5;
	 border-radius: 60% / 10%;
	 transform: translateY(-180px);
	 transition: .8s ease-in-out;
 }
 .login label{
	 color: #ffffff;
	 transform: scale(.6);
 }
 
 #chk:checked ~ .login{
	 transform: translateY(-580px);
	

 
 }
 #chk:checked ~ .signup{
	 transform: translateY(-0px);
	
	 /*background: #84A98C;*/
	
 
 }
 #chk:checked ~ .login label{
	 transform: scale(1);	
 }
 #chk:checked ~ .signup label{
	 transform: scale(.6);
 }
 .pinguino {
    display: flex;
    justify-content: center;
}
 </style>
 