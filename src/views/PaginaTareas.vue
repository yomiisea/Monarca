<template>
  <div class="home">
    <div class="page-header">
      <h1 class="title">Agreguemos una nueva Tarea!  📑✏️</h1>
      </div>
    <div class="task-form-container">
      <div class="task-form">
        <h2 class="title2" >Sobre la tarea...</h2>

        <div class="days">
            <div v-for="categoria in categorias" :key="categoria.idcategorias" class="day">
              <div class="left-content">
                <div>{{ categoria.nombre }}</div>
              </div>
              
            </div>
          </div>


        <div class="form">
          <div class="form-grid">
            <!-- Columna izquierda: Título y Prioridad -->
            <div class="form-group">
              <label for="titulo">Título:</label>
              <input type="text1" id="titulo" v-model="nuevaTarea.titulo" placeholder="Practica" required>
            </div>
            <div class="form-group">
              <label for="Categoria">Categoria:</label>
              <select id="Categoria" v-model="nuevaTarea.categoria"  required>
                <option value="1">Universidad</option>
                <option value="2">Tareas Personales</option>
                <option value="3">Eventos</option>
              </select>
            </div>
            <div class="form-group">
              <label for="fecha">Fecha:</label>
              <input type="date" id="fecha" v-model="nuevaTarea.fecha" required class="styled-input">
            </div>
            <div class="form-group">
              <label for="hora">Hora:</label>
              <input type="time" id="hora" v-model="nuevaTarea.hora" required class="styled-input">
            </div>
            <!-- Columna derecha: Materia y Descripción -->
            <div class="form-group">
              <label for="descripcion">Descripción:</label>
              <textarea id="descripcion" v-model="nuevaTarea.descripcion" rows="4" placeholder="Ej 2-5, Pag 32"></textarea>
            </div>
          </div>
          <button @click="agregarTarea()">📌Añadir Tarea</button>
        </div> </div>
      
    </div>
  </div>
</template>

<script  >
import PruebaTarea from "@/components/common/PruebaTarea.vue";
import PruebaTarea2 from "@/components/common/PruebaTarea2.vue";
import PruebaTarea3 from "@/components/common/PruebaTarea3.vue";
import { format } from 'date-fns';
import Carta from "@/components/common/Carta.vue";
import Carta2 from "@/components/common/Carta2.vue";
import Carta3 from "@/components/common/Carta3.vue";
import Cookies from 'js-cookie';
import { useTareasStore } from '@/stores/tareasStore.js';
import { useCategoriasStore } from '@/stores/categoriasStore.js';

export default {
  name: 'Home',
  setup() {
    const storeTareas = useTareasStore();
    const storeCategorias = useCategoriasStore();
    return { storeTareas, storeCategorias};
  },
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
      tareas:[],
      tareasPorCompletar:[],
      categorias:[],
      nuevaTarea: {
        titulo: '',
        descripcion: '',
        categoria: 'Calculo',
        fecha: '',
        hora: ''
      },
      nuevoObjetoTarea: {
        nombre: "tiste",
        fechahoraingreso: "2024-02-10T16:00:00.000+00:00",
        fechahoratarea: "2024-02-11 19:30:00.000+00:00",
        descripcion: "Descripción de la tarea 7",
        categoriasIdcategorias: {
          idcategorias: 3,
          nombre: "",
          color: "",
          tareaList: null,
          usuarioIdusuario: null
        },
        estadoIdestado: {
          idestado: 4,
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
    };
  },
  methods: {
    formatDateTime(datetime) {
      const formattedDate = format(new Date(datetime), 'MMMM dd');
      const formattedTime = format(new Date(datetime), 'HH:mm');
      return `${formattedDate} / ${formattedTime}`;
    },
    async agregarTarea() {
      if(this.nuevaTarea.titulo == '' || this.nuevaTarea.descripcion == '' || this.nuevaTarea.categoria == '' || this.nuevaTarea.fecha == '' || this.nuevaTarea.hora == '') {
        alert("Ingrese todos los campos");
        return;
      }
      const fechaIngreso = this.nuevaTarea.fecha;
      const horaTarea = this.nuevaTarea.hora;
      const fechaHoraTarea = new Date(`${fechaIngreso}T${horaTarea}`);
      const fechahoratarea = fechaHoraTarea.toISOString();
      this.nuevoObjetoTarea.nombre = this.nuevaTarea.titulo;
      this.nuevoObjetoTarea.fechahoraingreso = new Date().toISOString();
      this.nuevoObjetoTarea.fechahoratarea = fechahoratarea;
      this.nuevoObjetoTarea.descripcion = this.nuevaTarea.descripcion;
      this.nuevoObjetoTarea.categoriasIdcategorias.idcategorias = this.nuevaTarea.categoria;
      this.nuevoObjetoTarea.estadoIdestado.idestado = 1;
      this.nuevoObjetoTarea.usuarioIdusuario.idusuario = Cookies.get('id');
      try {
        const response = await this.storeTareas.postTarea(this.nuevoObjetoTarea);
      } catch (error) {
        console.error("Error al guardar:", error);
      } 
      this.nuevaTarea = { titulo: '', descripcion: '', categoria: 'Calculo', fecha:'', hora: '' };
    }
  },
  setup() {
    const storeTareas = useTareasStore();
    const storeCategorias = useCategoriasStore();
    return { storeTareas, storeCategorias};
  },
  async mounted() {
    const response = await this.storeTareas.getTareasEstado();
    console.log('Todas las tareas:', response);
    this.tareas = response;
    const response1 = await this.storeCategorias.getCategoriasByUsuario();
    console.log('Todas las categorias:', response1);
    this.categorias = response1;

    this.tareasPorCompletar = response.filter(data => data.c == 'En Progreso' || data.c == 'Nueva');
    console.log('tareasPorCompletar', this.tareasPorCompletar);
  },
  computed: {
    cantidadTareasPendientes() {
      return this.tareasPendientes.length;
    },
    cantidadTareasEnProgreso() {
      return this.tareasEnProgreso.length;
    },
    cantidadTareasCompletadas() {
      return this.tareasCompletadas.length;
    },
    cantidadTareasIncompletas() {
      return this.tareasIncompletas.length;
    },
    cantidadTareas() {
      return this.tareas.length;
    },
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
.title2 {
  font-style:unset;
  font-size: 1.5rem;
  font-weight: 1000;
  color: #000000;
  
  text-shadow: 1px 1px 1.2px #52796F;
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