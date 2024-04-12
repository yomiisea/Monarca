import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
import {RutaApi} from '@/assets/apiConfig.js'


export const useTareasStore = defineStore({
    id: 'tareas',
    state: () => ({
        Tareas: [],
        Tarea:{},
        needReload:false,
    }),

    actions: {
    async getTareaById(id){
        const authToken = Cookies.get('authToken');
        const userId = Cookies.get('id');
        const apiUrl = `${RutaApi}usuarios/${userId}/`;

        // Obtener tareas del usuario
        const responseTareas = await axios.get(apiUrl + 'tareas/'+id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        
        console.log(responseTareas);
        if (responseTareas.status === 200 ) {
            console.log('saldjalksjdlk')
            const tarea = responseTareas.data.response;
            return tarea

           

            
        } else {
            console.error('Error al obtener tareas del usuario');
            return [];
        }
    
    },

    async getTareasByUsuario() {
        },

// Nuevo método mejorado
async getTareasByUsuarioCalendario() {
    try {
        const authToken = Cookies.get('authToken');
        const userId = Cookies.get('id');
        const apiUrl = `${RutaApi}usuarios/${userId}/`;

        // Obtener tareas del usuario
        const responseTareas = await axios.get(apiUrl + 'tareas', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        
        console.log(responseTareas);

     
        

        // Verificar si las respuestas son exitosas
        if (responseTareas.status === 200 ) {
            console.log('saldjalksjdlk')
            const tareas = responseTareas.data.response;
            const etiquetasMap = {};

           

            // volver formato calendario
            const tareasConEtiquetas = tareas.map(tarea => ({
                startDatetime: tarea.fechahoratarea,
                endDatetime: tarea.fechahoratarea,
                category: tarea.categoriasIdcategorias.nombre,
                description: tarea.descripcion,
                name:tarea.nombre,
                idEstado:tarea.estadoIdestado.idestado,
            }));
            console.log(tareasConEtiquetas)

            console.log(tareasConEtiquetas);
            return tareasConEtiquetas;
        } else {
            console.error('Error al obtener tareas del usuario');
            return [];
        }
    } catch (error) {
        console.error('Error en la función getTareasByUsuarioCalendario:', error);
        return [];
    }
},


async getTareasEstado() {
    try {
        const authToken = Cookies.get('authToken');
        const userId = Cookies.get('id');
        const apiUrl = `${RutaApi}usuarios/${userId}/`;

        // Obtener tareas del usuario
        const responseTareas = await axios.get(apiUrl + 'tareas', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        
        console.log(responseTareas);

     
        

        // Verificar si las respuestas son exitosas
        if (responseTareas.status === 200 ) {
            console.log('saldjalksjdlk')
            const tareas = responseTareas.data.response;
            const etiquetasMap = {};

           

            // volver formato calendario
            const tareasConEtiquetas = tareas.map(tarea => ({
                name: tarea.fechahoraingreso,
                description: tarea.descripcion,
                a: tarea.fechahoratarea,
                b: tarea.categoriasIdcategorias.nombre,
                c:tarea.estadoIdestado.nombre,
                d:tarea.categoriasIdcategorias.color,
                e: tarea.categoriasIdcategorias.id,
                f:tarea.nombre,
                g:tarea.estadoIdestado.idestado,
                h:tarea.usuarioIdusuario.idusuario,
                idtarea:tarea.idtarea,
                
            }));
            console.log(tareasConEtiquetas)

            console.log(tareasConEtiquetas);
            return tareasConEtiquetas;
        } else {
            console.error('Error al obtener tareas del usuario');
            return [];
        }
    } catch (error) {
        console.error('Error en la función getTareasEstado:', error);
        return [];
    }
},

        async postTarea(tarea) {
            console.log(Cookies.get('authToken'));
            tarea.idUsuario = Cookies.get('id');

            console.log(tarea);
            const response = await axios.post(RutaApi+"usuarios/"+Cookies.get('id')+"/tareas",tarea, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                },
            });
            console.log(response);
            if (response.data.code === '200') {
                this.Tarea = response.data.data;
            }
            return response.data.response;
        },




        async postTarea(tarea) {
            console.log(Cookies.get('authToken'));
            tarea.idUsuario = Cookies.get('id');

            console.log(tarea);
            const response = await axios.post(RutaApi+"usuarios/"+Cookies.get('id')+"/tareas",tarea, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                },
            });
            console.log(response);
            if (response.data.code === '200') {
                this.Tarea = response.data.data;
            }
            return response.data.response;
        },



        
         async putTarea(tarea) {
            console.log(Cookies.get('authToken'));
            tarea.idUsuario = Cookies.get('id');

            console.log(tarea);
            const response = await axios.put(RutaApi+"usuarios/"+Cookies.get('id')+"/tareas/"+tarea.idtarea,tarea, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                },
            });
            console.log(response);
            if (response.data.code === '200') {
                this.Tarea = response.data.response;
            }
            return response.data.response;
         },

        
    }
});
