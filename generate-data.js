const casual = require("casual");
const fs = require("fs");

const getCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];
  for (var i = 1; i <= n; i++) {
    const category = {
      id: casual._uuid(),
      name: casual._company_name(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  }

  return categoryList;
};

const getProductList = (categoryList, n) => {
  if (n <= 0) return [];
  const productList = [];
  for (const category of categoryList) {
    for (var i = 1; i <= n; i++) {
      const product = {
        categoryID: category.id,
        id: casual._uuid(),
        name: casual._name(),
        color: casual._color_name(),
        price: casual.integer((from = 0), (to = 100)),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      productList.push(product);
    }
  }

  return productList;
};

(() => {
  // random
  const cateoryList = getCategoryList(4);
  const productList = getProductList(cateoryList, 5);

  // prepare db object
  const db = {
    categories: cateoryList,
    products: productList,
    profile: {
      name: "Po",
    },
  };

  // write db object to db.json
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("data write success");
  });
})();
