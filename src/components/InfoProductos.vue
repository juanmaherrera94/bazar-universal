<template>
  <div class="container" v-if="producto">
    <div class="producto-info">
      <h2>{{ producto.title }}</h2>
      <img :src="producto.thumbnail" :alt="producto.title" />
      <p><b>Descripción:</b> {{ producto.description }}</p>
      <p><b>Precio:</b> {{ producto.price }}</p>
      <p><b>Categoría:</b> {{ producto.category }}</p>
      <button class="button" @click="volverAInicio">Volver a inicio</button>
      <br><br>
      <button class="button" @click="comprar">Comprar</button>
    </div>
  </div>
  <p v-else>Cargando...</p>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const producto = ref<{ id: number; title: string; description: string; price: number; thumbnail: string; category: string } | null>(null);

const obtenerProducto = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/products/${route.params.id}`);
    producto.value = response.data; // Asegúrate de que el backend devuelva un solo producto
  } catch (error) {
    console.error('Error al obtener el producto', error);
  }
};

const volverAInicio = () => {
  router.push('/');
};

const comprar = () => {

}

onMounted(obtenerProducto);
</script>

<style scoped>

/* Contenedor principal centrado */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 100% de la altura de la ventana */
  width: 100%; /* 100% de ancho */
  background-color: #f4f4f4;
  text-align: center; /* Asegura que el contenido se centre horizontalmente */
}

.producto-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px; /* Limitar el tamaño máximo de la tarjeta */
  text-align: left;
}

img {
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
}

button {
  padding: 1em 2em;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: 5px;
  text-transform: uppercase;
  cursor: pointer;
  color: #2c9caf;
  transition: all 1000ms;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  outline: 2px solid #2c9caf;
}

button:hover {
  color: #ffffff;
  transform: scale(1.1);
  outline: 2px solid #70bdca;
  box-shadow: 4px 5px 17px -4px #268391;
}

button::before {
  content: "";
  position: absolute;
  left: -50px;
  top: 0;
  width: 0;
  height: 100%;
  background-color: #2c9caf;
  transform: skewX(45deg);
  z-index: -1;
  transition: width 1000ms;
}

button:hover::before {
  width: 250%;
}

</style>