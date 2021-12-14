<template>
<div class="container-fluid h-100" style="width: 40%;">
    <div class="row pt-3 mt-3 pb-3 mb-3 justify-content-center">
        <h2 align="center">Agregar nuevo libro</h2>
    </div>
    <div class="row pt-3 mt-3 pb-3 mb-3 justify-content-center">
        <input
        class="form-control"
        type="text"
        id="nombreLibro"
        name="nombreLibro"
        v-model="nombreLibro"
        placeholder="Nombre como placeholder"
        />
        <small id="nombreLibroHelp" v-if = "!formValid.validNombreLibro" class="text-danger">
          El nombre del libro no puede estar vacio ni superar los 100 caracteres.
        </small>  
    </div>
    <div class="row justify-content-center align-items-center h-100" >
        <select class="form-control" id="autorLibro" v-model="autorLibro">
        <option value="Autor" selected>Autor</option>
        <option v-for="autor in autores" :value="autor" :key="autor">{{
           autor
        }}</option>
        </select>
        <small id="autoreLibroHelp" v-if = "!formValid.validAutorLibro" class="text-danger">
          Se debe seleccionar un autor para el libro
        </small>  
    </div>
    <div class="row pt-3 mt-3 pb-3 mb-3 justify-content-center">
        <textarea 
        class="form-control"
        type="text"
        id="descripcionLibro"
        name="descripcionLibro"
        v-model="descripcionLibro"
        placeholder="Descripcion como placeholder"
        />
        <small id="descripcionLibroHelp" v-if = "!formValid.validDescripcionLibro" class="text-danger">
          La descripción del libro no puede estar vacia ni superar los 800 caracteres
        </small>  
    </div>
    
    <div class="form-group row pb-3 mb-3">
        <div class="col-xs-6 col-sm-6 col-md-6">
            <div class="form-group row">
                <label for="paginasLibro" class="col-form-label p-0 pt-2 col-sm-3 ">Páginas: </label>
                <div class="col-sm-8">
                    <input
                    class="form-control p-2"
                    type="number"
                    id="paginasLibro"
                    name="paginasLibro"
                    v-model="paginasLibro"
                    placeholder="Número"
                    step="1"
                    />
                    <small id="paginasLibroHelp" v-if = "!formValid.validPaginasLibro" class="text-danger">
                        El número de páginas no puede ser negativo ni nulo
                    </small> 
                </div>
            </div>
        </div>
    </div>
    <div class="text-rigth" align="end">
        <div class="row">
            <div class="col-10 pr-1" >
            <button type="button" class="btn btn-outline-secondary" v-on:click="goBack" >Cancelar</button>
            </div>
            <div class="col-2 p-0">
            <button type="submit" class="btn btn-primary" v-on:click="saveLibro">Guardar</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "CrearLibro",
  data: function() {
    return {
      nombreLibro:"",
      autorLibro:"Autor",
      descripcionLibro:"",
      autores: [],
      paginasLibro:"",
      formValid:{
          validNombreLibro:true,
          validAutorLibro:true,
          validDescripcionLibro:true,
          validPaginasLibro:true
      },
      isValidForm:true,
    };
  },
  methods: {
    getAllBooks: async function () {
      axios
        .get(
          `https://randommer.io/api/Name?nameType=fullname&quantity=20`,
          {headers: {
            "accept": "*/*",
             "X-Api-Key": "162a4a8690664633bbb4b0cad9e62531",
            }}
        )

        .then((result) => {
          this.autores = result.data;
          this.dataReady = true;
        })
        .catch(() => {
          alert("FAKE");
        });
    },
     resetForm: function() {
      this.nombreLibro = ""
      this.autorLibro="Autor",
      this.descripcionLibro = ""
      this.paginasLibro = ""
    },
    goBack: function() {
        this.resetForm()
       this.$router.push({ name: "ListLibros" });
    },
    validateForm: function() {
        Object.keys(this.formValid).forEach(key => {
            this.formValid[key] = true
        });
        this.isValidForm= true
        if(this.nombreLibro.length >100 || this.nombreLibro.length <1){
            this.formValid["validNombreLibro"] = false
            this.isValidForm= false
        }
        if(this.autorLibro == "Autor"){
            this.formValid["validAutorLibro"] = false
            this.isValidForm= false
        }
        if(this.descripcionLibro.length >800 || this.descripcionLibro.length<1){
            this.formValid["validDescripcionLibro"] = false
            this.isValidForm= false
        }
        if(this.paginasLibro <1){
            this.formValid["validPaginasLibro"] = false
            this.isValidForm= false
        }
    },
    saveLibro: function() {
        this.validateForm()
        if (this.isValidForm){
            alert("Se ha guardado correctamente el libro con la siguiente información: \nTitulo: " + this.nombreLibro + ". \nAutor: " + this.autorLibro + ". \nDescripción: " + this.descripcionLibro.substring(0,15) + ".... \nNumero Paginas: " + String(this.paginasLibro))
            this.resetForm()
        }
    }
    
   
  },
created: function () {
    this.getAllBooks();
  },

};
</script>

<style>
*{box-sizing:border-box;}

form{
	width:300px;
	padding:16px;
	border-radius:10px;
	margin:auto;
	background-color:#ccc;
}

form label{
	width:72px;
	font-weight:bold;
	display:inline-block;
}

form input[type="text"],
form input[type="email"]{
	width:180px;
	padding:3px 10px;
	border:1px solid #f6f6f6;
	border-radius:3px;
	background-color:#f6f6f6;
	margin:8px 0;
	display:inline-block;
}

form input[type="submit"]{
	width:100%;
	padding:8px 16px;
	margin-top:32px;
	border:1px solid #000;
	border-radius:5px;
	display:block;
	color:#fff;
	background-color:#000;
} 

form input[type="submit"]:hover{
	cursor:pointer;
}

textarea{
	width:100%;
	height:100px;
	border:1px solid #f6f6f6;
	border-radius:3px;
	background-color:#f6f6f6;			
	margin:8px 0;
	/*resize: vertical | horizontal | none | both*/
	resize:none;
	display:block;
}
</style>