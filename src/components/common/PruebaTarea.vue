<template>
    <div class="container">
      <div class="card">
        <div class="box">
          <div class="content">
            
            <h3>{{f}}</h3><!--CARD ONE-->
            <!--<p><strong>Categoria :</strong> {{b }}</p>-->
            <p><strong>Fecha/Hora :</strong> {{a }}</p><!--descripcion-->
            <p><strong>Descripción : </strong> {{description }}</p><!--descripcion-->
            <a 
            @mouseover="hoverText = 'En Progreso'"
            @mouseout="hoverText = 'Pendiente'"
            @click="JhessPayasita()">
            {{ hoverText }}
          </a>
          
          </div>
        </div>
      </div>
    </div>
    </template>
      
      <script>
      import Cookies from 'js-cookie';

      import { useTareasStore } from '@/stores/tareasStore.js';
      export default {
        data() {
    return {
      
      hoverText: "Pendiente ",
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
  setup() {
        const storeTareas = useTareasStore();
       
    
        return { storeTareas };
      }
  ,props: {
          name: {
            type: String,
            required: true,
          },
         d: {
            type: String,
            required: true,
          },
          a: {
            type: String,
            required: true,
          },
          b: {
            type: String,
            required: true,
          },
          c: {
            type: String,
            required: true,
          },
          d: {
            type: String,
            required: true,
          },
          e: {
            type: String,
            required: true,
          },
          f: {
            type: String,
            required: true,
          },
          g: {
            type: String,
            required: true,
          },
          h: {
            type: String,
            required: true,
          },
          description: {
          type: String,
          required: true,
        },
          objetoTarea:{
            type: Object,
            required:true,
          }
        },
        methods: {
        handleChange(value) {
            console.log('Nuevo estado:', value);
            // Aquí puedes realizar cualquier acción adicional con el nuevo estado seleccionado
        },
        async JhessPayasita() {
          console.log('objeto:',this.objetoTarea)

        // Aquí puedes implementar la lógica para agregar la tarea, como enviarla a un servidor o almacenarla localmente
        console.log('Nueva tarea:', this.nuevaTarea);
          console.log(this.nuevoObjetoTarea)
          this.nuevoObjetoTarea.idtarea=this.objetoTarea.idtarea;
        this.nuevoObjetoTarea.nombre=this.objetoTarea.f;
        
        this.nuevoObjetoTarea.fechahoraingreso = this.objetoTarea.name;
        this.nuevoObjetoTarea.fechahoratarea = this.objetoTarea.a;
        this.nuevoObjetoTarea.descripcion=this.objetoTarea.description;
        this.nuevoObjetoTarea.categoriasIdcategorias.idcategorias=this.objetoTarea.e;
        this.nuevoObjetoTarea.estadoIdestado.idestado=2;
        this.nuevoObjetoTarea.usuarioIdusuario.idusuario=Cookies.get('id');


        console.log('tarea mostrar cambios: ',this.nuevoObjetoTarea);
                try {
                  const response = await this.storeTareas.putTarea(this.nuevoObjetoTarea);
                  this.storeTareas.needReload=true;

              
              } catch (error) {
                console.error("Error al guardar:", error);
              } 


              const ruta = '/PaginaEstado';
            
            // Redirigir a la ruta definida
            this.$router.push(ruta);

            }
                }
      };
      </script>
      
    <style scoped>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;800&display=swap");
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Poppins", sans-serif;
    }
    
    
    body {
      display: flex;
      justify-content: left;
      align-items: left;
      flex-wrap: wrap;
      min-height: 100vh;
  
      z-index: 99999;
    }
    
    body .container {
      display: flex;
      margin:10px;
      flex-wrap: wrap;
      max-width: 100%;
    
    }
    
    body .container .card {
      position: relative;
      height: 300px;
      width: 300px;
      
      box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
        border-radius: 50%;
     transition: 0.5s;
     
     margin-right: 10px;
     margin-bottom: 20px;
 
    }
    
   
    body .container .card:nth-child(1) .box .content a {
      background: #CAD2C5;
    }
    
    
    body .container .card .box {
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      background: #52796F;
      box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
        border-radius: 50%;
      height: 260px;
      padding: 20px;
      width: 260px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      transition: 0.5s;
    }
    
    
    body .container .card .box:hover {
      transform: translateY(-50px);
      background: #5d8279;
    
    
    }
    
    body .container .card .box:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      background: rgba(210, 29, 29, 0.03);
    }
    
    
    
    body .container .card .box .content {
      
      text-align: center;
    }
    
    body .container .card .box .content h2 {
      position: absolute;
      top: -10px;
      left: 5px;
      font-size: 8rem;
    }
    
    body .container .card .box .content h3 {
      font-size: 1.8rem;
      color: rgb(255, 255, 255);
      z-index: 1;
      transition: 0.5s;
    }
    
    body .container .card .box .content h2 p:hover{
      
      color: rgba(220, 25, 25, 0.985);
    }
    
    
    
    
    body .container .card .box .content p {
      font-size: 1rem;
      font-weight: 300;
      color: #000000; /**textooo info */
      z-index: 1;
      transition: 0.5s;
    
    }
    
    body .container .card .box .content a {
      position: relative;
      display: inline-block;
      padding: 8px 20px;
      background: rgb(49, 49, 185);
      border-radius: 5px;
      text-decoration: none;
      color: rgb(0, 0, 0);
      margin-top: 5px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      transition: 0.5s;
    }
    body .container .card .box .content a:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
      background: #CAD2C5;
      color: #000000;
    }
    
    @media screen and (max-width: 939px){
      body .container .card {
      position: relative;
      height: 250px;
      width: 250px;
      margin-right: 10px;
     margin-bottom: 20px;
     font-size: 1rem;
    }
  
    
    body .container .card .box {
     

      height: 210px;
      padding: 25px;
      width: 210px;
      border-radius: 100%;
      font-size: 1ßrem;
      transition: 0.5s;
    }
       
     }
    
    
    
       
 

     @media screen and (max-width: 589px){
      body .container .card {
      height: 150px;
      width: 150px;
      margin-right: 10px;
     margin-bottom: 20px;
     font-size: 1rem;
  
    }
    body .container .card .box:hover {
      transform: translateY(-10px);

      z-index: 9999;
    
    }
    span{
      font-size: 6%;
    }
    body .container .card .box .content h3,
  body .container .card .box .content p {
    font-size: 0.7rem; /* Tamaño de la fuente más pequeño para pantallas más pequeñas */
  }

  body .container .card .box .content a {
    padding: 6px 16px; /* Ajusta el relleno del enlace */
    font-size: 1rem; /* Tamaño de la fuente más pequeño para pantallas más pequeñas */
  }
    
    body .container .card .box {
     
     
      height: 150px;
      padding: 25px;
      width: 150px;
      top: 0px;
      left: 0px;
      border-radius: 100%;
      font-size: 10%;
      transition: 0.5s;
      z-index: 9999;
    }
    body .container .card .box .content a {
      font-size: 0.4rem}
     }
    
    @media screen and (max-width: 480px){
      
       
     }
     @media screen and (max-width: 366px){
    
       
     }
  
      </style>