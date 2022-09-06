const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    
    {
        id: String,
        name: String,
        //description: String,
        price: String,
        image: String,
        //categoryId: String
    }
)

    const product = mongoose.model('products', productSchema);
    module.exports = product;