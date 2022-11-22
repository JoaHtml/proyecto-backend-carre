import ContainerMemory from '../../containers/ContainerMemory.js';

const productsBase = [
    {
      title: "Iphone X-18",
      description: "Última generación de Iphones",
      price: 339.4,
      thumbnail: "https://cdn1.iconfinder.com/data/icons/colored-hand-phone/96/android-mobile_phone-256.png",
      stock: 5,
      code: ".ab1cd",
      id: 1,
      timestamp: "2022-09-22T06:12:36.212Z"
    },
    {
      title: "Procesador Intel i6 1ºGen",
      description: "El procesador más económico",
      price: 120,
      thumbnail: "https://cdn4.iconfinder.com/data/icons/computer-and-technologies-1/800/Microprocessor-512.png",
      stock: 10,
      code: 2,
      id: ".66gg1",
      timestamp: "2022-09-22T03:01:25.315Z"
    },
    {
      title: "Teclado Gamer XYZ Pro",
      description: "Insonoro para las noches de vicio en casa de tus padres",
      price: 10,
      thumbnail: "https://cdn4.iconfinder.com/data/icons/computer-and-technologies-1/800/keyboard-512.png",
      stock: 32,
      code: 3,
      id: ".f1hn5",
      timestamp: "2022-08-22T11:11:12.112Z"
    }
  ]

class ProductDaoMemory extends ContainerMemory {
    constructor() {
        super(productsBase);
    }
}

export default ProductDaoMemory;