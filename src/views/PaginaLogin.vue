<template>
	<body>
		<div v-if="successMessage" class="success-message">{{ successMessage }}</div>
       
	 <div class="main">  	
		 <input type="checkbox" id="chk" aria-hidden="true">
 
		 <div class="signup">
				<form @submit.prevent="registerUser">
					<label for="chk" aria-hidden="true">Registrate</label>
					<div class="pinguino">
					<img src="https://i.postimg.cc/15CpHkD8/temp-Image-LACCGu.avif" alt="Pingüino" style="margin-top: 20px; width: 100px; height: auto;">
				</div><input type="text" v-model="email" name="txt" placeholder="Usuario" required="">
					<input type="password" v-model="password" name="pswd" placeholder="Contraseña" required="">
					<button type="submit">Registrarse</button>
				</form>
				</div>
			 <div class="login">
				 <form @submit.prevent="loginUser">
					 <label for="chk" aria-hidden="true">Cuenta</label>
					 <div class="pinguino">
					<img src="https://i.postimg.cc/15CpHkD8/temp-Image-LACCGu.avif" alt="Pingüino" style="margin-top: 20px; width: 100px; height: auto;">
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
		async reloadFunction(){
        const response = await this.storeTareas.getTareasEstado();
        console.log('Todas las tareas:', response);

        // Filtramos las tareas según su estado
        this.tareasPendientes = response.filter(data => data.c == 'Nueva');
        console.log('Tareas pendientes:', this.tareasPendientes);

        this.tareasEnProgreso = response.filter(data => data.c == 'En Progreso');
        console.log('Tareas en progreso:', this.tareasEnProgreso);

        this.tareasCompletadas = response.filter(data => data.c == 'Completada');
        console.log('Tareas completadas:', this.tareasCompletadas);

        this.tareasIncompletas = response.filter(data => data.c == 'Incompletas');
        console.log('Tareas Incompletas:', this.tareasIncompletas);
        this.storeTareas.needReload=false;
      },
		async registerUser2() {
    if (this.email == '' || this.password == '') {
        alert("Ingrese todos los campos");
        return;
    }

    console.log('tarea a meter: ', this.nuevoObjetoTarea);
    console.log(this.nuevaTarea);
    try {
        const response = await this.storeTareas.loginUser({
            usuario: this.email,
            contrasenia: this.password
        });

        // Redirige a la página deseada
        this.$router.push("/PaginaTareas");
		this.email == ''
		this.email == ''
        // Recargar la página después de 2 segundos
        setTimeout(() => {
            location.reload();
        }, 2000);
    } catch (error) {
        console.error("Error al guardar:", error);
    }
},
        async registerUser() {
			try {
				const response = await axios.post('https://backend-control-tareas-jhessika.serverbb.online/api/v1/usuarios/registro', {
					usuario: this.email,
					contrasenia: this.password
				});
				this.successMessage = 'Usuario registrado exitosamente.';
				this.$router.push('/PaginaTareas'); // Cambia '/dashboard' por la ruta deseada
				this.authToken = null;
            this.id = null;
            this.nombre = null;
			try{
				const response = await this.storeTareas.loginUser({
            usuario: this.email,
            contrasenia: this.password
				});
			} catch (error) {
						this.errorMessage = 'Error al registrar usuario: ' + error.message;
					}
           
				// Recargar la página después de 2 segundos
				setTimeout(() => {
					location.reload();
					this.usuarioAutenticado = !!Cookies.get('authToken');
				}, 2000);
			} catch (error) {
				this.errorMessage = 'Error al registrar usuario: ' + error.message;
			}
		},
		async loginUser() {
    const credentials = {
      usuario: this.EmailIngresado,
      clave: this.PasswordIngresado
    };

    const store = useLoginStore();
    const response = await store.loginUser(credentials);

    if (response.code == '200') {
      this.$router.push("/PaginaTareas");
	  this.PasswordIngresado='';
	  this.EmailIngresadoo='';
      // Recargar la página después de 2 segundos
      setTimeout(() => {
        location.reload();
      }, 500);
    } else {
      this.loginAttempts++;
	  this.PasswordIngresado='';
      if (this.loginAttempts >= 3) {
        this.loginBlocked = true;
        setTimeout(() => {
          this.loginAttempts = 0;
          this.loginBlocked = false;
        }, 30000); // 30 segundos
      }

      // Mostrar el tiempo restante antes de poder intentar iniciar sesión nuevamente
      if (this.loginBlocked) {
        this.remainingTime =30; // Inicialmente establecido en 30 segundos

        // Actualizar el contador cada segundo
        const intervalId = setInterval(() => {
          if (this.remainingTime > 0) {
            this.remainingTime--; // Disminuir el tiempo restante en 1 segundo
          } else {
			this.PasswordIngresado='';
			this.loginBlocked = false;
            clearInterval(intervalId); // Detener el contador cuando el tiempo restante llega a cero
          }
        }, 1000);
      }
	  

      alert("Usuario o contraseña incorrectos");
    }
  }

  }, async mounted() {
    // Obtenemos todas las tareas
    setInterval(() => {
        if (this.storeTareas.needReload) {
          this.reloadFunction();
        }
      }, 1000);}
}
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
	 background: #354F52;
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
 