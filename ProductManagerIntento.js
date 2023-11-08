const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    try {
      let products = fs.readFileSync(this.path, "utf-8");
      if (products) {
        console.log("archivo encontrado");
      }
      this.products = JSON.parse(products);
    } catch {
      this.products = [];
      fs.writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
    }
  }

  static id = 0;

  readFile = async () => {
    fs.readFile(this.path, "utf-8", (error, data) => {
      if (error) {
        console.log("error al leer el archivo");
      } else {
        this.products = JSON.parse(data);
      }
    });
  };

  writeFile = async (data) => {
    await fs.promises.writeFile(
        this.path,
        JSON.stringify(data, null, "\t")
      );
  } 

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    await this.readFile();
    let codeExists = false;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].code === code) {
        // console.log(`el codigo ${code} esta repetido`);
        codeExists = true;
        break;
      }
    }
    if (!codeExists) {
      let newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      if (!Object.values(newProduct).includes(undefined)) {
        ProductManager.id++;
        this.products.push({
          ...newProduct,
          id: ProductManager.id,
        });
      } else {
        console.log("todos los campos son requeridos");
      }
      // this.products.push(newProduct)

      await this.writeFile(this.products)
    //   await fs.promises.writeFile(
    //     this.path,
    //     JSON.stringify(this.products, null, "\t")
    //   );
    } else {
        console.log(`el codigo ${code} esta repetido `);
    }
  };

  async getProduct() {
    await this.readFile()
    return this.products;
  }

  exists(id) {
    return this.products.find((product) => product.id === id);
  }

  //ternario (transformo if en ternario para simplificar)
  // si encontramos el producto que no coincide con el id = not found , si lo encontramos devuelve el producto
 async getProductById(id) {
    await this.readFile()
     return !this.exists(id) ?  "Not found id " : this.exists(id);
  }

  async deleteProductById(id) {
    await this.readFile()
    if (this.exists(id)){
         const productFilter = this.products.filter(products => products.id != id)
        await this.writeFile(productFilter)
        console.log('producto eliminado')
    } else {
        console.log('No se encontro el id del producto')
    }

   
    

  }
}




const products = new ProductManager("./products.json");
//primera llamada = arreglo vacio
// console.log(products.getProduct())
const testing = async () => {
  await products.addProduct(
    "titulo1",
    "description1",
    1000,
    "thumbnail1",
    "abc123",
    5
  );
  await products.addProduct(
    "titulo2",
    "description2",
    1000,
    "thumbnail2",
    "abc124",
    5
  );
  // //segunda llamada = arreglo con producto
    const getData = await products.getProduct()
  console.log(getData)
    // console.log('Busca producto 2')
    const getDataById = await products.getProductById(2)
    console.log(getDataById)
    const getDataById3 = await products.getProductById(3)
    console.log(getDataById3)
// console.log('Busca producto que no existe')
// products.getProductById(3)
console.log('---------------------')

  await products.deleteProductById(1)

};
// agregamos producto

// products.addProduct('titulo1','description1', 1000, 'thumbnail1', 'abc123', 5)
// products.addProduct('titulo2','description2', 1000, 'thumbnail2', 'abc124', 5)
// products.addProduct('description2', 1000, 'thumbnail2', 'abc124', 5)

// //segunda llamada = arreglo con producto
// console.log(products.getProduct())

// console.log('Busca producto 2')
// products.getProductById(2)
// console.log('Busca producto que no existe')
// products.getProductById(3)
// console.log('---------------------')

// // comprobacion de code repetido
// console.log('busca codigo repetido')
// products.addProduct('titulo2','description2', 1000, 'thumbnail2', 'abc123', 5)
// products.addProduct('titulo3','description3', 1000, 'thumbnail3', 'abc124', 5)
// console.log('---------------------')

// // comprobacion de que todos los campos esten completos
// console.log('Busca campos incompletos')
// products.addProduct('titulo6','description6', 1000, 'thumbnail6', 'abc126', 6)
// products.addProduct('titulo2','description2', 1000, 'thumbnail2', 'abc125')

testing();
