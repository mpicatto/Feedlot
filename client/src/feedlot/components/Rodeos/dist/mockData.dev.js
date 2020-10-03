"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yearLabels = exports.caravanas = exports.enfermos = exports.muertes = exports.pesos = exports.cabezas = exports.categorias = exports.establecimientos = void 0;
var establecimientos = [{
  nombre: "Los Abuelos",
  rodeos: [{
    nombre: "Rodeo1",
    caravanas: ["1", "2"],
    cabezas: [105, 125, 103, 130, 135, 117, 120, 133, 132, 121, 114, 123],
    pesos: [360, 355, 360, 353, 348, 365, 355, 357, 370, 364, 353, 355],
    muertes: [2, 1, 0, 5, 3, 0, 0, 1, 2, 0, 0, 1],
    enfermos: [5, 2, 4, 3, 6, 8, 2, 4, 7, 3, 2, 4]
  }]
}, {
  nombre: "Establecimiento El Chacho",
  rodeos: [{
    nombre: "Rodeo1",
    caravanas: ["3", "4"],
    cabezas: [201, 225, 203, 230, 235, 217, 220, 233, 232, 221, 214, 223],
    pesos: [460, 355, 390, 453, 548, 365, 455, 557, 370, 374, 353, 355],
    muertes: [2, 1, 0, 5, 3, 0, 0, 1, 2, 0, 0, 1],
    enfermos: [5, 2, 4, 3, 6, 8, 2, 4, 7, 3, 2, 4]
  }, {
    nombre: "Rodeo2",
    caravanas: ["5", "6"],
    cabezas: [105, 125, 103, 130, 135, 117, 120, 133, 132, 121, 114, 123],
    pesos: [260, 315, 230, 300, 248, 275, 265, 257, 280, 294, 253, 255],
    muertes: [2, 1, 0, 5, 3, 0, 0, 1, 2, 0, 0, 1],
    enfermos: [5, 2, 4, 3, 6, 8, 2, 4, 7, 3, 2, 4]
  }]
}];
exports.establecimientos = establecimientos;
var categorias = ["Novillitos/Vaquillonas Livianos/as (hasta 390kg)", "Novillitos/Vaquillonas Pesados/as (+390kg)", "Novillos/Vacas Livianos/as (hasta 440kg)", "Novillos/Vacas Pesados/as (+ 440kg)"];
exports.categorias = categorias;
var cabezas = [105, 125, 103, 130, 135, 117, 120, 133, 132, 121, 114, 123];
exports.cabezas = cabezas;
var pesos = [360, 355, 360, 353, 348, 365, 355, 357, 370, 364, 353, 355];
exports.pesos = pesos;
var muertes = [2, 1, 0, 5, 3, 0, 0, 1, 2, 0, 0, 1];
exports.muertes = muertes;
var enfermos = [5, 2, 4, 3, 6, 8, 2, 4, 7, 3, 2, 4];
exports.enfermos = enfermos;
var caravanas = [{
  id: "1",
  cug: "JC 432",
  num_manejo: "A345",
  verificador: "8",
  establecimiento: "Los Abuelos",
  rodeo_id: "Rodeo1",
  raza: "Hereford",
  frame: "4",
  sexo: "Macho",
  p_inicial: 180,
  p_actual: 350,
  rodeo: "1",
  estado: "vendido",
  ingreso: "2020-06-12",
  egreso: "2020-08-24",
  precio_compra: 21600,
  precio_venta: 126,
  dias: 90,
  num_venta: 1,
  comprador: "23-05678910-3",
  consignatario: "70-33564896-9",
  vol_alimento: 9,
  costo_alimento: 15,
  veterinaria: 1500,
  otros: 2700
}, {
  id: "2",
  cug: "JC 432",
  num_manejo: "A346",
  verificador: "8",
  establecimiento: "Los Abuelos",
  rodeo_id: "Rodeo1",
  raza: "Aberdeen-Angus",
  frame: "4",
  sexo: "Macho",
  p_inicial: 180,
  p_actual: 350,
  rodeo: "1",
  estado: "vendido",
  ingreso: "2020-06-12",
  egreso: "2020-08-24",
  precio_compra: 21600,
  precio_venta: 126,
  dias: 90,
  num_venta: 2,
  comprador: "30-15356910-3",
  consignatario: "70-33564896-9",
  vol_alimento: 9,
  costo_alimento: 15,
  veterinaria: 1500,
  otros: 2700
}, {
  id: "3",
  cug: "JC 432",
  num_manejo: "A347",
  verificador: "8",
  establecimiento: "Establecimiento El Chacho",
  rodeo_id: "Rodeo1",
  raza: "Braford",
  frame: "4",
  sexo: "Macho",
  p_inicial: 180,
  p_actual: 350,
  rodeo: "1",
  estado: "vendido",
  ingreso: "2020-06-12",
  egreso: "2020-08-24",
  precio_compra: 21600,
  precio_venta: 126,
  dias: 90,
  num_venta: 3,
  comprador: "30-15356910-3",
  consignatario: "70-33564896-9",
  vol_alimento: 9,
  costo_alimento: 15,
  veterinaria: 1500,
  otros: 2700
}, {
  id: "4",
  cug: "JC 432",
  num_manejo: "A348",
  verificador: "8",
  establecimiento: "Establecimiento El Chacho",
  rodeo_id: "Rodeo1",
  raza: "Shorthorn",
  frame: "4",
  sexo: "Macho",
  p_inicial: 180,
  p_actual: 350,
  rodeo: "1",
  estado: "vendido",
  ingreso: "2020-06-12",
  egreso: "2020-08-24",
  precio_compra: 21600,
  precio_venta: 126,
  dias: 90,
  num_venta: 4,
  comprador: "23-05678910-3",
  consignatario: "70-33564896-9",
  vol_alimento: 9,
  costo_alimento: 15,
  veterinaria: 1500,
  otros: 2700
}, {
  id: "5",
  cug: "JC 432",
  num_manejo: "A349",
  verificador: "8",
  establecimiento: "Establecimiento El Chacho",
  rodeo_id: "Rodeo2",
  raza: "Holando",
  frame: "4",
  sexo: "Macho",
  p_inicial: 180,
  p_actual: 350,
  rodeo: "1",
  estado: "vendido",
  ingreso: "2020-06-12",
  egreso: "2020-08-24",
  precio_compra: 21600,
  precio_venta: 126,
  dias: 90,
  num_venta: 5,
  comprador: "30-15356910-3",
  consignatario: "70-33564896-9",
  vol_alimento: 9,
  costo_alimento: 15,
  veterinaria: 1500,
  otros: 2700
}, {
  id: "6",
  cug: "JC 432",
  num_manejo: "A350",
  verificador: "8",
  establecimiento: "Establecimiento El Chacho",
  rodeo_id: "Rodeo2",
  raza: "Brangus",
  frame: "4",
  sexo: "Macho",
  p_inicial: 180,
  p_actual: 350,
  rodeo: "1",
  estado: "vendido",
  ingreso: "2020-06-12",
  egreso: "2020-08-24",
  precio_compra: 21600,
  precio_venta: 126,
  dias: 90,
  num_venta: 6,
  comprador: "23-05678910-3",
  consignatario: "70-33564896-9",
  vol_alimento: 9,
  costo_alimento: 15,
  veterinaria: 1500,
  otros: 2700
}]; //---Labels---//

exports.caravanas = caravanas;
var yearLabels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]; //---Labels---//

exports.yearLabels = yearLabels;