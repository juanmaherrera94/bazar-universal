<template>
  <div class="container"> <!-- Contenedor principal centrado -->
    <img
      src="https://cdn.dribbble.com/users/7878347/screenshots/17622244/media/2c2ad6a8051f6c83fcb115688c5a3929.jpg?resize=1600x1200&vertical=center"
      alt="logo"
    />
    <h1>Bazar Online</h1>

    <input class="input" type="text" placeholder="Buscar un producto" v-model="buscar" />
    <button class="button" @click="busqueda">Buscar</button>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router'
// Router
const router = useRouter()

// Input de texto
const buscar = ref<string>("");

// Función para realizar la bsqueda
const busqueda = () => {

  if (buscar.value.trim() !== "") {

    router.push({ path: "lista", query: { q: buscar.value } });
  }
};
</script>

<style scoped>
/* From Uiverse.io by cohencoo */ 
.input {
  border-radius: 10px;
  outline: 2px solid #FEBF00;
  border: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #e2e2e2;
  outline-offset: 3px;
  padding: 10px 1rem;
  transition: 0.25s;
}

.input:focus {
  outline-offset: 5px;
  background-color: #fff
}

/* Centrar todo el contenido en la pantalla */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 100% de la altura de la ventana */
  width: 100%; /* 100% de ancho */
  background-color: #f4f4f4;
  padding: 20px;
  box-sizing: border-box;
  text-align: center; /* Asegura que el contenido se centre de manera horizontal */
}

/* Imagen */
img {
  width: 100%;
  max-width: 250px;
  margin-bottom: 20px;
}

/* Título */
h1 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 20px;
}

/* Input de búsqueda */
input[type="text"] {
  width: 100%;
  max-width: 350px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}



button:hover {
  background-color: #45a049;
}
/* From Uiverse.io by vikiWayne */ 
.button {
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