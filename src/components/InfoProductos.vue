<template>
  <article class="container" v-if="producto">
    <div class="producto-info">
      <!-- Contenedor para el logo y el input -->
      <div class="logo-input-container">
        <img src="https://cdn.dribbble.com/users/7878347/screenshots/17622244/media/2c2ad6a8051f6c83fcb115688c5a3929.jpg?resize=1600x1200&vertical=center"
          alt="logo" class="logo">
        <input type="text" placeholder="Buscar producto..." class="input" v-model="buscar" >
        <button @click="busqueda">Buscar</button>
        <p class="carrito">🛒{{contador }} </p>
      </div>
      <h2>{{ producto.title }}</h2> 
      <img :src="producto.thumbnail" :alt="producto.title" />
      <p v-for="(imagen,index) in producto.images" :key="index">
        <img :src="imagen" alt=" 'Imagen ' + (index +1)" class="imagen-producto">

      </p>
      <p><b>Descripcion:</b> {{ producto.description }}</p>
      <p><b>Precio:</b> {{ producto.price }}</p>
      <p><b>Categoria:</b> {{ producto.category }}</p>
      <p><b>Valoracion:</b> {{ producto.rating }} ⭐</p>
      <button class="button" @click="volverAInicio">Volver a inicio</button>
      <button class="button" @click="comprar">Comprar</button>
    </div>
  </article>
  <p v-else>Mostrando productos</p>
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
const contador =  ref(0)
const volverAInicio = () => {
  router.push('/');
};

const comprar = () => {
  contador.value++
}

const buscar = ref<string>("");

// Función para realizar la bsqueda
const busqueda = () => {

  if (buscar.value.trim() !== "") {

    router.push({ path: "/lista", query: { q: buscar.value } });
  }
};

onMounted(obtenerProducto);
</script>

<style scoped>

.carrito{
  font-size: 30px;
  margin-left: 15px;
}
/* Contenedor principal centrado */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%; /* 100% de la altura de la ventana */
  width: 100%; /* 100% de ancho */
  background-color: #f4f4f4;
  text-align: center; /* Asegura que el contenido se centre horizontalmente */
}

.imagen-producto {
  display: flex;
  width: 150px;  /* Ajusta el tamaño */
  height: auto;
  margin: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.logo-input-container {
  display: flex;
  align-items: center; /* Alinea verticalmente el logo y el input */
  margin-bottom: 20px; /* Añade un poco de espacio debajo */
}

.logo {
  width: 70px; /* Tamaño del logo */
  margin-right: 5px; /* Espacio entre el logo y el input */
}

.input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 200px; /* Ajusta el tamaño del input */
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
  margin-left: 5px;
  padding: 1em 2em;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: 5px;
  text-transform: uppercase;
  cursor: pointer;
  color: #2c9caf;
  transition: all 1000ms;
  font-size: 10px;
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
