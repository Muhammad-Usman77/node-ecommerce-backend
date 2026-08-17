const Product = require("../model/productModel");

async function createProduct(req, res) {
  const body = req.body;

  if (
    !body ||
    !body.name ||
    !body.description ||
    body.price === undefined ||
    !body.category ||
    body.stock === undefined
  ) {
    return res.json({ msg: `these field are required` });
  }

  const product = await Product.create({
    name: body.name,
    description: body.description,
    price: body.price,
    category: body.category,
    stock: body.stock,
    images: body.images,
    brand: body.brand,
    rating: body.rating,
    isActive: body.isActive,
  });

  return res.status(201).json({
    msg: `product created successfully`,
    data: product,
  });
}

async function getProducts(req, res) {
  const getAll = await Product.find({});

  return res.json({ msg: `all product`, data:getAll });
}

async function getProductById(req, res) {
  const product = await Product.findById(req.params.id);

  if(!product){
    return res.status(404).json({msg:`product not found`})
  }
  return res.json({ msg: `Product By Id`,data: product });
}

async function deleteProductById(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if(!product){
    return res.status(404).json({msg:`product not found`})
  }
  return res.json({ msg: `deleted By Id`, data: product });
}

async function updateProductByIdPatch(req, res) {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
     { $set: req.body,}, 
    {  new:true }
);

  return res.json({ msg: `Product updated particially`, data: product });
}


async function updateProductPutById(req, res) {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
      req.body, 
    {  new:true }
);

  return res.json({ msg: `Product updated particially`, data: product });
}

async function searchByName(req, res){
  const product = await Product.find({
       name:req.query.name
  })
  return res.json({
    msg:`Search By Name`,
    data:product
  })
}


async function filterByCategory(req, res){
  const product = await Product.find({
       category:req.query.category
  })
  return res.json({
    msg:`filter by category`,
    data:product
  })
}


async function productFilter(req, res) {
  const { category, brand, minPrice, maxPrice } = req.query;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (brand) {
    filter.brand = brand;
  }

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const product = await Product.find(filter);

  return res.json({
    msg: "Products filtered successfully",
    data: product,
  });
}

async function filterByPrice(req, res) {
  const minPrice = Number(req.query.minPrice);
  const maxPrice = Number(req.query.maxPrice);

  const filter = {};

  if (!isNaN(minPrice)) {
    filter.price = { ...filter.price, $gte: minPrice };
  }

  if (!isNaN(maxPrice)) {
    filter.price = { ...filter.price, $lte: maxPrice };
  }

  const product = await Product.find(filter);

  return res.json({
    msg: "Products filtered by price",
    data: product,
  });
}
async function pagenation(req, res){
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page-1) * limit;

  const product = await Product.find().skip(skip).limit(limit)

  return res.json({
    msg:`products fetch seccessfully`,
    page:page,
    limit:limit,
    data:product,
  })
}
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductByIdPatch,
};
