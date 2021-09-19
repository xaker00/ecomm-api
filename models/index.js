// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");
// const seedTags = require("../seeds/tag-seeds");

// Products belongsTo Category
Product.belongsTo(Category);

// Categories have many Products
Category.hasMany(Product);

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: { model: "product_tag" } });

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: { model: "product_tag" } });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
