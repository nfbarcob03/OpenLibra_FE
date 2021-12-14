<template>
<div align="center">
  <div class="d-flex flex-column m-3 p-3" align="center" style="width: 60%;">
    <div v-for="libro in pageOfLibros" :key="libro.id">
      <div class="card m-3 p-1" 
      style="max-width: 100%; max-height: 50%; background-color:#e3f2fd; box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;" 
      align="justify">
        <div class="row g-0  no-gutters">
          <div class="col-md-2 text-center">
            <img :src=libro.thumbnail class="img-fluid m-2" style="width:80%" />
          </div>
          <div class="col-md-10">
            <div class="row g-2">
              <div class="card-body m-2">
                <h5 class="card-title">{{libro.titleMayus}}</h5>
                <p class="card-text">
                  <span class="card-text text-muted"><i>{{libro.author}}</i></span>
                </p>
                <span class="card-text" style="max-width: 100ch;">
                {{libro.content_short }}
                </span>
                <div class="row g-2 position-absolute bottom-0 end-0 m-2">
                  <p class="card-text" align="rigth">
                      <small class="text-muted">páginas: {{libro.pages}}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <jw-pagination :items="libros" @changePage="onChangePage" :labels="customLabels" :pageSize ="3"></jw-pagination>
    </div>
    <div align="end">
      <router-link to="/CrearLibro" v-if="dataReady">
      <router-view></router-view>
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#ff7042" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
      </router-link>
    </div>
  </div>
  
</div>
</template>

<script>
import axios from "axios";
const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};
export default {
  name: "ListLibros",
  data() {
    return {
      libros: [],
      pageOfLibros: [],
      customLabels,
      dataReady:false
    };
  },

  methods: {
    getAllBooks: async function () {
      axios
        .get(
          `https://www.etnassoft.com/api/v1/get/?category=libros_programacion`,
          { headers: {} }
        )

        .then((result) => {
          this.libros = result.data;
          this.libros.forEach((libro) => {
              libro.titleMayus = libro.title.toUpperCase()
          })
          this.dataReady = true;
        })
        .catch(() => {
          alert("FAKE");
        });
    },
    onChangePage(pageOfLibros) {
      // update page of items
      this.pageOfLibros = pageOfLibros;
    },
    addLibro: function(){
      this.$router.push('/CrearLibro')
    },
  },

  created: function () {
    this.getAllBooks();
  },

  props: {
    video: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
