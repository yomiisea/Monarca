
import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RutaApi } from '@/assets/apiConfig.js';

export const useCategoriasStore = defineStore({
  id: 'categorias',
  state: () => ({
    Categorias: [],
    Categoria: {},
  }),

  actions: {
    async postCategoria(categoria) {
        console.log(Cookies.get('authToken'));
        categoria.idUsuario = Cookies.get('id');

        console.log(categoria);
        const response = await axios.post(RutaApi+"usuarios/"+Cookies.get('id')+"/categorias",categoria, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('authToken')}`
            },
        });
        console.log(response);
        if (response.data.code === '200') {
            this.Categoria = response.data.data;
        }
        return response.data.response;
    },
    async putTarea(categoria) {
        console.log(Cookies.get('authToken'));
        categoria.idUsuario = Cookies.get('id');

        console.log(categoria);
        const response = await axios.put(RutaApi+"usuarios/"+Cookies.get('id')+"/categorias/"+categoria.idcategoria,categoria, {

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

    async crearCategoria(nombreCategoria) {
      try {
        const idUsuario = Cookies.get('id');

        const response = await axios.post(
          `${RutaApi}usuarios/${idUsuario}/categorias`,
          {
            idCategoria: null,
            nombreCategoria: nombreCategoria,
            idUsuario: null
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('authToken')}`,
            },
          }
        );
        console.log(response);
        if (response.data.code === '200') {
          // Actualizar la lista de categorias despuÃ©s de crear una nueva
          this.Categoria=response.data.response;
        }
        return response.data.response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async getCategoriasByUsuario() {
      try {
        const idUsuario = Cookies.get('id');

        console.log(Cookies.get('authToken'));
        const response = await axios.get(RutaApi+"usuarios/"+Cookies.get('id')+"/categorias", {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });
        console.log(response);
        if (response.data.code === '200') {
          this.Categorias = response.data.data;
        }
        return response.data.response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async getCategoriasById(id) {
      try {
        const idUsuario = Cookies.get('id');

        const response = await axios.get(`${RutaApi}usuarios/${idUsuario}/categorias/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });
        console.log(response);
        return response.data.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async actualizarCategoria(id, nombreCategoria) {
      try {
        const idUsuario = Cookies.get('id');

        const response = await axios.put(
          `${RutaApi}usuarios/${idUsuario}/categorias/${id}`,
          {
            idCategoria: null,
            nombreCategoria: nombreCategoria,
            idUsuario: null,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('authToken')}`,
            },
          }
        );
        console.log(response);
        if (response.data.code === '200') {
          // Actualizar la Categoria en la lista
          this.Categoria = response.data.response;
        }
        return response.data.response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async eliminarCategoria(id) {
      try {
        const idUsuario = Cookies.get('id');

        const response = await axios.delete(`${RutaApi}usuarios/${idUsuario}/categorias/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });
        console.log(response);
        if (response.data.code === '200') {
          // Eliminar la Categoria de la lista
            this.Categoria = response.data.response;
        }
        return response.data.response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
});
