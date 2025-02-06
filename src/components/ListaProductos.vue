<template>
  <div>
   <!-- Contenedor para el logo y el input -->
    <div class="logo-input-container">
      <img src="https://cdn.dribbble.com/users/7878347/screenshots/17622244/media/2c2ad6a8051f6c83fcb115688c5a3929.jpg?resize=1600x1200&vertical=center"
        alt="logo" class="logo">
      <input v-model="buscar" placeholder="Buscar producto..." class="input" >
      <button class="button">Buscar</button>
    </div>

    <h3>Resultados encontrados: {{ productos.length }}</h3>

    <div v-for="(productosPorCategoria, categoria) in productosPorCategoria" :key="categoria">
      <h4>Categoria: {{ categoria }} ({{ productosPorCategoria.length }} :resultados)</h4>
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
/* Estilo para centrar el contenido de la página */
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  text-align: center;
}

/* Contenedor para el logo y el input */
.logo-input-container {
  display: flex;
  align-items: center; /* Alinea el logo y el input verticalmente */
  margin-bottom: 20px; /* Espacio entre el campo de búsqueda y el resto de los productos */
}

.logo {
  width: 100px; /* Tamaño del logo */
  margin-right: 15px; /* Espacio entre el logo y el input */
}

.input {
  padding: 15px;
  margin-top: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 250px; /* Ajusta el tamaño del input */
}

/* Contenedor de productos */
.productos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 80%;
  max-width: 1200px; /* Limitar el ancho máximo */
}

/* Estilo de cada carta de producto */
.contenido {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Efecto de hover */
.contenido:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Ajustar la imagen a su contenedor */
.contenido img {
  width: 100%;
  height: 150px; /* Ajusta la altura según el diseño */
  object-fit: cover; /* Asegura que la imagen se ajuste sin distorsionarse */
  border-radius: 4px; /* Esquinas redondeadas de la imagen */
  margin-bottom: 10px;
}

/* Estilo para el botón */
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
