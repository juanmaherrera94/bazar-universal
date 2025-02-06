<template>
  <div>

    <h2> <span>⛺</span>Lista de productos</h2>
    
    <input v-model="buscar" placeholder="Buscar producto..." class="input">
    <h3>Resultados encontrados: {{ productos.length}}</h3>
  <div v-for="(productosPorCategoria, categoria) in productosPorCategoria" :key="categoria">
      <h4>Categoria: {{ categoria }} ({{ productosPorCategoria.length }} resultados)</h4>
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
/* From Uiverse.io by LightAndy1 */ 
.group {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  max-width: 190px;
}

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
