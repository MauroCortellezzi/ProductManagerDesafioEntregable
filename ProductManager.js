class ProductManager {
    constructor (){
        this.products = []
    }

    static id = 0

    addProduct(title,description,price,thumbnail,code,stock){
        for(let i = 0; i < this.products.length; i++){
            if(this.products[i].code === code){
                console.log(`el codigo ${code} esta repetido`)
                break
            }
        }

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        if (!Object.values(newProduct).includes(undefined)){
            ProductManager.id++
            this.products.push({
                ...newProduct,
                id:ProductManager.id,
            })
        } else {
            console.log('todos los campos son requeridos')
        }
        


       
    }

    getProduct(){
        return this.products
    }

    exists(id) {
        return this.products.find((product) => product.id === id)
    }

    //ternario (transformo if en ternario para simplificar)
    // si encontramos el producto que no coincide con el id = not found , si lo encontramos devuelve el producto
    getProductById(id){
       !this.exists(id) ? console.log('Not found') : console.log(this.exists(id))
    }
}

const products = new ProductManager
//primera llamada = arreglo vacio
console.log(products.getProduct())

// agregamos producto
products.addProduct('titulo1','description1', 1000, 'thumbnail1', 'abc123', 5)
products.addProduct('titulo2','description2', 1000, 'thumbnail2', 'abc124', 5)

//segunda llamada = arreglo con producto
console.log(products.getProduct())


console.log('Busca producto 2')
products.getProductById(2)
console.log('Busca producto que no existe')
products.getProductById(3)
console.log('---------------------')

// comprobacion de code repetido
console.log('busca codigo repetido')
products.addProduct('titulo2','description2', 1000, 'thumbnail2', 'abc123', 5)
products.addProduct('titulo3','description3', 1000, 'thumbnail3', 'abc124', 5)
console.log('---------------------')

// comprobacion de que todos los campos esten completos
console.log('Busca campos incompletos')
products.addProduct('titulo6','description6', 1000, 'thumbnail6', 'abc126', 6)
products.addProduct('titulo2','description2', 1000, 'thumbnail2', 'abc125')
