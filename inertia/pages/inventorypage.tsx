import React, { useState, useEffect } from 'react';

const InventoryPage = () => {
  // Dados estáticos para inventários, categorias e produtos
  const staticInventories = [
    { id: 1, name: 'Inventory A' },
    { id: 2, name: 'Inventory B' },
    { id: 3, name: 'Inventory C' },
  ];

  const staticCategories = {
    1: [
      { id: 1, name: 'Category A1' },
      { id: 2, name: 'Category A2' },
    ],
    2: [
      { id: 3, name: 'Category B1' },
      { id: 4, name: 'Category B2' },
    ],
    3: [
      { id: 5, name: 'Category C1' },
      { id: 6, name: 'Category C2' },
    ],
  };

  const staticProducts = {
    1: [
      { id: 1, name: 'Product A1-1', description: 'Description for Product A1-1', alert: true, quantity: 10, seducCode: '12345' },
      { id: 2, name: 'Product A1-2', description: 'Description for Product A1-2', alert: false, quantity: 5, seducCode: '67890' },
    ],
    2: [
      { id: 3, name: 'Product A2-1', description: 'Description for Product A2-1', alert: false, quantity: 8, seducCode: '54321' },
    ],
  };

  const [inventories] = useState(staticInventories);
  const [categories, setCategories] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState<number | null>(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Carregar produtos do localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Salvar produtos no localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleInventoryClick = (inventoryId: number) => {
    setSelectedInventory(inventoryId);
    setCategories(staticCategories[inventoryId] || []);
    setProducts(staticProducts[inventoryId] || []);
    setSelectedProduct(null); // Reset selected product
  };

  const handleCategoryClick = (categoryId: number) => {
    setProducts(staticProducts[categoryId] || []);
    setSelectedProduct(null); // Reset selected product
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: 'New Product',
      description: 'New product description',
      alert: false,
      quantity: 0,
      seducCode: '',
    };
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (updatedProduct: any) => {
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
    setSelectedProduct(null); // Close the panel after editing
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
    setSelectedProduct(null); // Close the panel after deleting
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-6">
            <div className="rounded-full bg-gray-300 w-10 h-10"></div>
            <span className="ml-3 font-semibold">Cristiano Araújo</span>
          </div>

          <p className="text-xs text-gray-500 uppercase mb-2">Inventories</p>
          <ul className="space-y-1 text-blue-600">
            {inventories.map((inventory) => (
              <li
                key={inventory.id}
                className={`cursor-pointer ${
                  selectedInventory === inventory.id ? 'font-bold text-black' : ''
                }`}
                onClick={() => handleInventoryClick(inventory.id)}
              >
                {inventory.name}
              </li>
            ))}
          </ul>

          {selectedInventory && (
            <>
              <p className="text-xs text-gray-500 uppercase mt-4 mb-2">Categories</p>
              <ul className="space-y-1 text-blue-600">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="cursor-pointer"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="space-y-2 text-sm">
          <div className="text-red-600">Notificações ●</div>
          <div>Configurações</div>
          <div>Sair</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {products.length > 0 ? (
          <>
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h1 className="text-xl font-semibold">Products</h1>
                <p className="text-gray-600">List of products in the selected category</p>
              </div>
              <button
                onClick={handleAddProduct}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Product
              </button>
            </div>

            <div className="bg-white rounded shadow divide-y divide-gray-200">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center p-4 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div>
                    <h2 className="font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xl">
                    {product.alert && <span className="text-red-500">⚠️</span>}
                    <span className="text-gray-400">➡️</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-gray-600">Select a category to view products.</div>
        )}
      </main>

      {/* Product Details Panel */}
      {selectedProduct && (
        <aside className="w-80 bg-white border-l p-4">
          <h2 className="text-lg font-semibold mb-4">Product Details</h2>
          <div className="mb-4">
            <strong>Quantity:</strong> <span>{selectedProduct.quantity}</span>
          </div>
          <div className="mb-4">
            <strong>SEDUC Code:</strong> <span>{selectedProduct.seducCode}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleEditProduct({ ...selectedProduct, name: 'Edited Product' })}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(selectedProduct.id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default InventoryPage;