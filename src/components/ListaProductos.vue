<template>

   <!-- Contenedor para el logo y el input -->
    <div class="logo-input-container">
      <img src="https://cdn.dribbble.com/users/7878347/screenshots/17622244/media/2c2ad6a8051f6c83fcb115688c5a3929.jpg?resize=1600x1200&vertical=center"
        alt="logo" class="logo">
      <input v-model="buscar" placeholder="Buscar producto..." class="input" >
 
    <h3>Resultados encontrados: {{ productos.length }}</h3>

    <div v-for="(productosPorCategoria, categoria) in productosPorCategoria" :key="categoria">
      <h4 class="categoria">Categoria: {{ categoria }} ({{ productosPorCategoria.length }} :resultados)</h4>
      <div class="productos">
        <div 
          v-for="producto in productosPorCategoria" 
          :key="producto.id" 
          class="contenido" 
          @click="verDetalles(producto.id)"
        >
          <h3>Nombre: {{ producto.title }}</h3>
          <p>Descripción: {{ producto.description }}</p>
          <p>Precio: {{ producto.price }}</p>
          <p>Categoría: {{ producto.category }}</p>
          <img :src="producto.thumbnail" :alt="producto.title" />
        </div>
      </div>
      <button class="button" @click="volverAtras">Volver atras</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const buscar = ref<string>((route.query.q as string || '').trim());
const productos = ref<Array<{ id: number; title: string; description: string; price: number; thumbnail: string; category: string }>>([]);

const mostrarProductos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/products');
    productos.value = response.data;

    if (buscar.value.trim()) {
      productos.value = productos.value.filter(
        (producto) =>
          producto.description.toLowerCase().includes(buscar.value.toLowerCase()) ||
          producto.title.toLowerCase().includes(buscar.value.toLowerCase()) ||
          producto.category.toLowerCase().includes(buscar.value.toLowerCase())
      );
    }
  } catch (error) {
    console.error('Error al obtener los productos', error);
  }
};

const productosPorCategoria = computed(() => {
  const agrupados: Record<string, Array<any>> = {};
  productos.value.forEach((producto) => {
    if (!agrupados[producto.category]) {
      agrupados[producto.category] = [];
    }
    agrupados[producto.category].push(producto);
  });
  return agrupados;
});

const verDetalles = (id: number) => {
  router.push(`/info/${id}`);
};

const volverAtras = () => {
  router.push('/');
};

onMounted(mostrarProductos);
</script>

<style scoped>
/* Estilo general */
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
  min-height: 100vh;
}

/* categoria */

.categoria{
  background-color: orange;
  color: #f9f9f9;
  border: 1px solid black;
  border-radius: 1px;
}

/* Logo */
.logo {
  width: 70px;
  margin-bottom: 5px;
}

/* Input más compacto */
.input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px; /* Reducido el margen */
}

/* Contenedor de productos */
.productos {

  align-items: center;
  width: 100%;
  max-width: 400px;
}

/* Tarjeta del producto */
.contenido {
  border: 1px solid #ddd;

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
