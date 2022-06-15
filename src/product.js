import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const url = process.env.REACT_APP_URL;

class Prestamo extends Component {
  async handleChange(e) {
    try {
      e.preventDefault();
      this.setState({
        imagen: e.target.files[0],
      });
    } catch (error) {}
  }
  async componentDidMount() {
    try {
      axios.get(url).then((res) => {
        this.setState({ productos: res.data });
      });
    } catch (error) {
      console.error(error);
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      titulo: "Nuevo",
      _id: 0,
      pos: null,
      nombre: "",
      marca: "",
      modelo: "",
      precio: "",
      estado: "",
      /* imagen: "" */
    };
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioMarca = this.cambioMarca.bind(this);
    this.cambioModelo = this.cambioModelo.bind(this);
    this.cambioPrecio = this.cambioPrecio.bind(this);
    this.cambioEstado = this.cambioEstado.bind(this);
    this.cambioImagen = this.cambioImagen.bind(this);
    this.mostrar = this.mostrar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.guardar = this.guardar.bind(this);
  }

  /* CAMBIOS */
  cambioNombre(e) {
    this.setState({
      nombre: e.target.value,
    });
  }

  cambioMarca(e) {
    this.setState({
      marca: e.target.value,
    });
  }

  cambioModelo(e) {
    this.setState({
      modelo: e.target.value,
    });
  }

  cambioPrecio(e) {
    this.setState({
      precio: e.target.value,
    });
  }
  cambioEstado(e) {
    this.setState({
      estado: e.target.value,
    });
  }
  cambioImagen(e) {
    this.setState({
      imagen: e.target.value,
    });
  }
  /* END CAMBIOS */

  /* Mostrar*/
  async mostrar(cod, index) {
    try {
      axios.get(url + cod + "/").then((res) => {
        this.setState({
          pos: index,
          _id: cod,
          titulo: "Editar",
          nombre: res.data.nombre,
          marca: res.data.marca,
          modelo: res.data.modelo,
          precio: res.data.precio,
          estado: res.data.estado,
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  /* Guardar */
  async guardar(e) {
    e.preventDefault();
    let cod = this.state._id;
    let datos = {
      nombre: this.state.nombre,
      marca: this.state.marca,
      modelo: this.state.modelo,
      precio: this.state.precio,
      estado: this.state.estado,
      imagen: this.state.imagen,
    };
    console.log(cod);
    console.log(datos);
    if (cod) {
      //Actualizar un registro
      axios
        .put(url + cod + "/", datos)
        .then((res) => {
          let indx = this.state.pos;
          var temp = this.state.productos;
          temp[indx] = datos;
          this.setState({
            titulo: "Nuevo",
            pos: null,
            _id: 0,
            nombre: "",
            marca: "",
            modelo: "",
            precio: "",
            estado: "",
            productos: temp,
          });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //Nuevo Registro
      axios
        .post(url, datos)
        .then((res) => {
          this.state.productos.push(res.data);
          var temp = this.state.productos;
          this.setState({
            id: 0,
            nombre: "",
            marca: "",
            modelo: "",
            precio: "",
            estado: "",
            productos: temp,
          });
        })
        .catch((error) => {
          console.log(error.toString());
        });
    }
  }

  async eliminar(cod) {
    try {
      let rpta = window.confirm("Desea eliminar?");
      if (rpta) {
        axios.delete(url + cod + "/").then((res) => {
          var temp = this.state.productos.filter(
            (producto) => producto._id !== cod
          );
          this.setState({
            productos: temp,
          });
        });
      }
    } catch (error) {}
  }

  render() {
    return (
      <div class="container">
        <h1>Lista de Productos</h1>
        <table className="table table-striped table-bordered table-hover table-condensed col-sm-8 text-center">
          <thead>
            <tr class="table-success">
              <th>Nombre</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Imagen</th>
              <th colspan="2">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.productos.map((producto, index) => {
              return (
                <tr key={producto._id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.marca}</td>
                  <td>{producto.modelo}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.estado}</td>
                  <td>
                    <img
                      src={producto.imagen}
                      width="50px"
                      height="50px"
                      alt={producto.nombre}
                    ></img>
                  </td>
                  <td>
                    <button onClick={() => this.mostrar(producto._id, index)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    <button onClick={() => this.eliminar(producto._id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br></br>
        <h1>{this.state.titulo}</h1>
        {/* Formulario */}
        <form onSubmit={this.guardar} enctype="multipart/form-data">
          <input type="hidden" value={this.state.id}></input>
          <p class="mb-3 row">
            <label class="col-sm-3 col-form-label">Ingrese Nombre:</label>
            <input
              class="col-sm-4"
              type="text"
              value={this.state.nombre}
              onChange={this.cambioNombre}
            ></input>
          </p>
          <p class="mb-3 row">
            <label class="col-sm-3 col-form-label">Ingrese Marca:</label>
            <input
              class="col-sm-4"
              type="text"
              value={this.state.marca}
              onChange={this.cambioMarca}
            ></input>
          </p>
          <p class="mb-3 row">
            <label class="col-sm-3 col-form-label">Ingrese Modelo:</label>
            <input
              class="col-sm-4"
              type="text"
              value={this.state.modelo}
              onChange={this.cambioModelo}
            ></input>
          </p>
          <p class="mb-3 row">
            <label class="col-sm-3 col-form-label">Ingrese Precio:</label>
            <input
              class="col-sm-4"
              type="text"
              value={this.state.precio}
              onChange={this.cambioPrecio}
            ></input>
          </p>
          <p class="mb-3 row">
            <label class="col-sm-3 col-form-label">Ingrese Estado:</label>
            <input
              class="col-sm-4"
              type="text"
              value={this.state.estado}
              onChange={this.cambioEstado}
            ></input>
          </p>
          <p class="mb-3 row">
            <label class="col-sm-3 col-form-label">Subir Imagen:</label>
            <input
              class="col-sm-4"
              type="file"
              name="image"
              //value={this.state.imagen}
              onChange={this.handleChange}
            ></input>
          </p>
          <br></br>
          <input class="btn btn-primary mb-3" type="submit"></input>
        </form>
      </div>
    );
  }
}
export default Prestamo;
