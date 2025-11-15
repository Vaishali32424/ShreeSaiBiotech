import React, { useEffect, useState } from 'react';
import { getAllProducts, getProductsByCategory, getAllCategories, deleteProduct } from '@/Services/Productscrud';
import { Eye, Pencil, Plus, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../ui/use-toast';

interface Product {
  id: string;
  name: string;
  image_url: string;
  short_details: Record<string, string>;
}

interface Category {
  id: string;
  name: string;
}

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch all categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories<Category[]>();
        setCategories(result.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products (either all or by category)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let result;
        if (selectedCategory) {
          result = await getProductsByCategory<Product[]>(selectedCategory);
        } else {
          result = await getAllProducts<Product[]>();
        }
        setProducts(result.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleDeleteClick = (productId: string) => {
    console.log(productId)
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        setProducts(products?.filter((p) => p.id !== productToDelete));
        setShowDeleteConfirm(false);
        setProductToDelete(null);
        toast({ title: "Success✅", description: "Product deleted successfully!" });
      } catch (error) {
        console.error('Error deleting product:', error);
        toast({ title: "Error❌", description: "Error deleting product. Please check console for details." });
      }
    }
  };

  const handleEditClick = (productId: string) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleViewClick = (productId: string) => {
    navigate(`/view/${productId}`);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-100 border-r p-4">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          <li
            onClick={() => setSelectedCategory(null)}
            className={`cursor-pointer p-2 rounded-md ${!selectedCategory ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          >
            All Products
          </li>
          {categories?.map((cat) => (
            <li
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer p-2 rounded-md ${
                selectedCategory === cat.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <a href='/add-product'
            
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            <Plus size={18} /> Add New Product
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
             <div className="flex space-x-3">
                {/* 🎯 VIEW Button */}
                <button
                  onClick={() => handleViewClick(product.id)}
                  className="p-2 bg-green-700 text-white rounded-full hover:bg-green-800"
                  title="View Product Page"
                >
                  <Eye size={24} />
                </button>
                
                {/* 🎯 EDIT Button */}
                <button
                  onClick={() => handleEditClick(product.id)}
                  className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-600"
                  title="Edit Product"
                >
                  <Pencil size={24} />
                </button>
                <button
                  onClick={() => handleDeleteClick(product.id)}
                  className="p-2 bg-red-800 text-white rounded-full hover:bg-red-900"
                  title="Delete Product"
                >
                  <Trash size={24} />
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;