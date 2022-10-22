const fs = require('fs');

class Contenedor {
    constructor(fileJSON) {
        this.fileJSON = fileJSON;
    }

    async getAll() {
        try {
            const products = await fs.promises.readFile(this.fileJSON, 'utf-8')
            return await JSON.parse(products)
        } catch (error) {
            console.log('No es posible obtener los productos de la base de datos', error);
        }
    }

    async getByID(id) {
        try {
            const products = await this.getAll();
            const oneProduct = await products.filter((el) => el.id == id)
            return oneProduct
        } catch (error) {
            console.log('No se puede obtener el producto solicitado', error);
        }
    }

    async addProduct(product) {
        try {
            const products = await this.getAll();
            const { title, description, price, thumbnail, stock } = product
            if (title && description && price && thumbnail && stock) {
                const code = Math.random().toString(36).slice(1, 7)
                const id = products.length + 1
                const date = new Date();
                const newProduct = { ...product, code, id, timestamp: date }
                await products.push(newProduct)
                await fs.promises.writeFile(this.fileJSON, JSON.stringify(products))
                const productsTemplate = await products
                const data = {
                    productsTemplate,
                    isEmpty: false,
                    isAdmin: true,
                    status: 200
                }
                return data
            } else {
                const data = {
                    isEmpty: true,
                    message: "No es posible subir el producto, faltan datos",
                    status: 500
                }
                return data
            }
        } catch (error) {
            console.log('No es posible guardar el articulo', error);
        }
    }

    async updateProduct(id, product) {
        try {
            const products = await this.getAll();
            const { title, description, price, thumbnail, stock } = product
            if (title && description && price && thumbnail && stock) {
                await products.forEach((prod) => {
                    if (prod.id == id) {
                        prod.title = title
                        prod.description = description
                        prod.price = price
                        prod.thumbnail = thumbnail
                        prod.stock = stock
                    }
                });
                await fs.promises.writeFile(this.fileJSON, JSON.stringify(products))
                const productsTemplate = await products
                const data = {
                    productsTemplate,
                    isEmpty: false,
                    isAdmin: true,
                    status: 200
                }
                return data
            } else {
                const data = {
                    isEmpty: true,
                    message: "Hay campos incompletos",
                    status: 500
                }
                return data
            }
        } catch (error) {
            console.log('No es posible actualizar el articulo', error);
        }
    }

    async deleteProduct (id) {
        try {
            const products = await this.getAll();
            const existProduct = await this.getByID(id)
            if (!existProduct.length) {
                const data = {
                    isEmpty: true,
                    message: "No existe el producto seleccionado",
                    status: 500
                }
                return data
            } else {
                await products.forEach((prod, i) => {
                    if (prod.id == id) {
                        products.splice(i, 1)
                    }
                });
                await fs.promises.writeFile(this.fileJSON, JSON.stringify(products))
                const productsTemplate = await products
                const data = {
                    productsTemplate,
                    isEmpty: false,
                    isAdmin: true,
                    status: 200
                }
                return data
            }
        } catch (error) {
            console.log('No es posible borrar el articulo', error);
        }
    }
}

module.exports = Contenedor;