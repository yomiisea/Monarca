<template>
    <div class="home">
    <div class="page-header">
      <h1 class="title">Edita los detalles de tu Tarea 📝🤨 </h1>
      </div>
    <div class="task-form-container">
      <div class="task-form">
        
        <div class="form">
          <div class="form-grid">
            <!-- Columna izquierda: Título y Prioridad -->
            <div class="form-group">
              <label for="titulo">Título:</label>
              <input type="text1" id="titulo" v-model="tarea.nombre" required>
            </div>
            <div class="form-group">
              <label for="Categoria">Categoria:</label>
              <select id="Categoria" v-model="categoriaSeleccionada" required>
                <option value="1">Universidad</option>
                <option value="2">Tareas Personales</option>
                <option value="3">Eventos</option>
              </select>
            </div>
            <div class="form-group">
              <label for="fecha">Fecha:</label>
              <input type="date" id="fecha" v-model="fecha" required class="styled-input">
             </div>
             <div class="form-group">
              <label for="hora">Hora:</label>
              <input type="time" id="hora" v-model="hora" required class="styled-input">
            </div>
            <!-- Columna derecha: Materia y Descripción -->
            <div class="form-group">
              <label for="descripcion">Descripción:</label>
              <textarea id="descripcion" v-model="tarea.descripcion" rows="4"></textarea>
            </div>
          </div>
          <button @click="Actualizar()">Actualizar</button>
          <button2 @click="cancelar()">Cancelar</button2>
        </div> </div>
      
    </div>
  </div>
</template>

<script>

import { useTareasStore } from '@/stores/tareasStore.js';
import Cookies from 'js-cookie';
export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data(){
        return{
            tarea:{},
            fecha: '',
            hora: '',
            categoriaSeleccionada: '',
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
}
        }
    },
    methods: {
        async getTarea(){
            this.tarea = await this.storeTareas.getTareaById(this.id);
            console.log(this.tarea);
            this.fecha = this.tarea.fechahoratarea.split('T')[0];
            this.hora = this.tarea.fechahoratarea.split('T')[1].split('.')[0];
            this.categoriaSeleccionada = this.tarea.categoriasIdcategorias.idcategorias.toString();
        },
        async cancelar(){
            const ruta = '/PaginaEstado';
            
            // Redirigir a la ruta definida
            this.$router.push(ruta);
        },
        async Actualizar() {
            if(this.tarea.nombre == '' || this.tarea.descripcion == '' || this.categoriaSeleccionada == '' || this.fecha == '' || this.hora == '') {
                alert("Ingrese todos los campos");
                return;
            }
            const fechaIngreso = this.fecha;
            const horaTarea = this.hora;
            const fechaHoraTarea = new Date(`${fechaIngreso}T${horaTarea}`);
            const fechahoratarea = fechaHoraTarea.toISOString();
            this.nuevoObjetoTarea.idtarea= this.tarea.idtarea
            this.nuevoObjetoTarea.nombre = this.tarea.nombre;
            this.nuevoObjetoTarea.fechahoraingreso = this.tarea.nombre.fechahoraingreso;
            this.nuevoObjetoTarea.fechahoratarea = fechahoratarea;
            this.nuevoObjetoTarea.descripcion = this.tarea.descripcion;
            console.log(this.categoriaSeleccionada);
            this.nuevoObjetoTarea.categoriasIdcategorias.idcategorias = this.categoriaSeleccionada;
            
            this.nuevoObjetoTarea.estadoIdestado.idestado = this.tarea.estadoIdestado.idestado;
            console.log(this.nuevoObjetoTarea);
            this.nuevoObjetoTarea.usuarioIdusuario.idusuario = Cookies.get('id');
            try {
                const response = await this.storeTareas.putTarea(this.nuevoObjetoTarea);
                
            } catch (error) {
                console.error("Error al guardar:", error);
            } 
            const ruta = '/PaginaEstado';
            
            // Redirigir a la ruta definida
            this.$router.push(ruta);
            this.tarea = { nombre: '', descripcion: '', categoriaSeleccionada: 'Calculo', fecha:'', hora: '' };
            }
            


    },
    async mounted(){
        console.log(this.id)
        await this.getTarea()
    },
    setup(){
        const storeTareas = useTareasStore();
       
    
        return { storeTareas };
    }
};
</script>

<style scoped>
/* Estilos para el cuerpo de la página */
body {
  background-color: #F0EAD2;
  font-family: Arial, sans-serif;
}

/* Estilos para el contenedor principal */
.home {
  height:900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5faf3;  
}

/* Estilos para el encabezado de la página */
.page-header {
  text-align: left;
  margin-left: 5%;
  margin-bottom: 50px;
}

.title {
  font-style:unset;
  font-size: 1.7rem;
  font-weight: 1000;
  color: #84A98C;
  margin-bottom: 60px;
  margin-top: 10%;
  text-shadow: 0px 0px 1px #52796F;

}

.subtitle {
  font-size: 18px;
  color: #6C584C;
  margin-bottom: 20px;
}

/* Estilos para el contenedor del formulario */
.task-form-container {
  max-width: 600px;
  margin: 0 auto;
  
}

.task-form {
  
  background-color: #84A98C;
  padding: 20px;
  border-radius: 10px;
  width: 80%;

  margin: 20px;
  box-shadow: inset 2px 2px 2px 0px #52796F,
    inset -7px -7px 10px 0px #52796F,
    3.5px 3.5px 20px 0px #f7fffd,
    2px 2px 5px 0px #ffffff;
  border-radius: 2rem;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #ffffff  ;
  font-weight: 200;
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

input
 {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}


button {
  background-color: #dfb283  ;
  color: rgb(0, 0, 0);
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
    inset -7px -7px 10px 0px rgba(0, 0, 0, .1),
    3.5px 3.5px 20px 0px rgba(0, 0, 0, .1),
    2px 2px 5px 0px rgba(0, 0, 0, .1);
  border-radius: 1rem;
  transition: background-color 0.3s ease;
}

button2 {
  background-color: #c1121f  ;
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  border: none;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
    inset -7px -7px 10px 0px rgba(0, 0, 0, .1),
    3.5px 3.5px 20px 0px rgba(0, 0, 0, .1),
    2px 2px 5px 0px rgba(0, 0, 0, .1);
  border-radius: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #CAD2C5;
  color: #000000;
}

/* Estilos para la lista de tareas */
.task-list-container {
  margin-top: 50px;
}

.card {
  background-color: #F0EAD2;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.company-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* Estilos para las tarjetas de tareas */
.company-card {
  width: calc(50% - 10px);
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #6C584C;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #DDE5B6;
}

@media screen and (max-width: 768px) {
  .company-card {
    width: 100%;
  }
  .home {
  height:850px;
}

}
</style>