import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Prestamo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [
        {
          id: 1,
          nombre: "Mouse",
          marca: "Razer",
          modelo: "Deathhadder v2",
          precio: 150,
          estado: "nuevo",
        },
        {
          id: 2,
          nombre: "Teclado",
          marca: "Razer",
          modelo: "Blackwidow lite",
          precio: 300,
          estado: "nuevo",
        },
        {
          id: 3,
          nombre: "Headset",
          marca: "Corsair",
          modelo: "void rgb elite wireless",
          precio: 300,
          estado: "nuevo",
        },
        {
          id: 4,
          nombre: "Laptop",
          marca: "Apple",
          modelo: "Macbook air m1",
          precio: 4300,
          estado: "nuevo",
        },
      ],
      titulo: "Nuevo",
      id: 0,
      pos: null,
      nombre: "",
      marca: "",
      modelo: "",
      precio: "",
      estado: "",
    };
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioMarca = this.cambioMarca.bind(this);
    this.cambioModelo = this.cambioModelo.bind(this);
    this.cambioPrecio = this.cambioPrecio.bind(this);
    this.cambioEstado = this.cambioEstado.bind(this);
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
  /* END CAMBIOS */

  /* Mostrar*/
  mostrar(index) {
    const row = this.state.productos[index];
    if (row) {
      this.setState({
        pos: index,
        id: index,
        titulo: "Editar",
        nombre: row.nombre,
        marca: row.marca,
        modelo: row.modelo,
        precio: row.precio,
        estado: row.estado,
      });
    } else {
      return;
    }
  }

  /* Guardar */
  guardar(e) {
    e.preventDefault();
    let cod = this.state.id;
    let datos = {
      nombre: this.state.nombre,
      marca: this.state.marca,
      modelo: this.state.modelo,
      precio: this.state.precio,
      estado: this.state.estado,
    };
    if (cod > 0) {
      //Actualizar un registro
      let indx = Number(cod);
      var temp = this.state.productos;
      temp[indx] = datos;
      this.setState({
        titulo: "Nuevo",
        pos: null,
        id: 0,
        nombre: "",
        marca: "",
        modelo: "",
        precio: "",
        estado: "",
        productos: temp,
      });
    } else {
      //Nuevo Registro
      this.state.productos.push(datos);
      let temp = this.state.productos;
      this.setState({
        id: 0,
        nombre: "",
        marca: "",
        modelo: "",
        precio: "",
        estado: "",
        productos: temp,
      });
    }
  }

  eliminar(index) {
    let rpta = window.confirm("Desea eliminar?");
    if (rpta) {
      let temp = this.state.productos.filter(
        (producto) => producto.id !== index
      );
      this.setState({
        productos: temp,
      });
    }
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
              <th colspan="2">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.productos.map((producto, index) => {
              return (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.marca}</td>
                  <td>{producto.modelo}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.estado}</td>
                  <td>
                    <button onClick={() => this.mostrar(index)}>Editar</button>
                  </td>
                  <td>
                    <button onClick={() => this.eliminar(index)}>
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
        <form onSubmit={this.guardar}>
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
          <br></br>
          <input class="btn btn-primary mb-3" type="submit"></input>
        </form>
      </div>
    );
  }
}
export default Prestamo;
