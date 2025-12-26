import React, { useEffect, useState } from 'react';
import { getAllProducts, getProductsByCategory, getAllCategories, deleteProduct, updateProduct, updateHotProduct, deleteCategory, updateCategory } from '@/Services/Productscrud';
import { Eye, Heart, Pencil, Plus, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../ui/use-toast';
import RichTextEditor from '../CreateProduct/RichTextEditor';

interface Product {
  id: string;
  name: string;
  image_url: string;
  short_details: Record<string, string>;
    hot_product: boolean; // 👈 ADD THIS

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
  const [newCategoryName, setNewCategoryName] = useState("");
const [newCategoryDescription, setNewCategoryDescription] = useState("");
  // 🆕 NEW STATE FOR CATEGORY MANAGEMENT
  const [showCategoryDeleteConfirm, setShowCategoryDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  // 🎯 Track if the category has products
  const [categoryHasProducts, setCategoryHasProducts] = useState(false); 
  const [showCategoryEditModal, setShowCategoryEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  
  const navigate = useNavigate();

const fetchCategories = async () => {
    try {
      const result = await getAllCategories<Category[]>();
      setCategories(result.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
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
const handleToggleHotProduct = async (product: Product) => {
  try {
    const updatedStatus = !product.hot_product;

    await updateHotProduct(product.id, {
      hot_product: updatedStatus,
    });

    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, hot_product: updatedStatus } : p
      )
    );

    toast({
      title: "Success",
      description: updatedStatus
        ? "Marked as Hot Product ❤️"
        : "Removed from Hot Products 🤍",
    });
  } catch (error) {
    console.error("Error updating hot product:", error);
    toast({
      title: "Error",
      description: "Failed to update Hot Product status",
    });
  }
};

  const handleEditClick = (productId: string) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleViewClick = (productId: string) => {
    navigate(`/view/${productId}`);
  };
  
const handleEditCategory = (category: Category) => {
  navigate(`/edit-category/${category.id}`);
};

useEffect(() => {
  if (categoryToEdit) {
    setNewCategoryName(categoryToEdit.name);
    setNewCategoryDescription(categoryToEdit.description || "");
  }
}, [categoryToEdit]);



  
  const handleDeleteCategoryClick = async (category: Category) => {
    try {
        setCategoryToDelete(category);
        const productsResult = await getProductsByCategory<Product[]>(category.id);
        const hasProducts = productsResult.data && productsResult.data.length > 0;
        
        setCategoryHasProducts(hasProducts); // Store the result
        setShowCategoryDeleteConfirm(true); // Show the modal
    } catch (error) {
        console.error("Error checking products for category:", error);
        toast({ title: "Error❌", description: "Failed to check category products." });
    }
  };
  
  const confirmDeleteCategory = async () => {
    if (categoryToDelete && !categoryHasProducts) {
      try {
      
        
        await deleteCategory(categoryToDelete.id);
        setCategories(categories.filter((cat) => cat.id !== categoryToDelete.id));
                if (selectedCategory === categoryToDelete.id) {
            setSelectedCategory(null);
        }
        
        setShowCategoryDeleteConfirm(false);
        setCategoryToDelete(null);
        setCategoryHasProducts(false);
            fetchCategories();
        toast({ title: "Success✅", description: "Category deleted successfully!" });
        
      } catch (error) {
        console.error('Error deleting category:', error);
        toast({ title: "Error❌", description: "Error deleting category. Please check console for details." });
      }
    } else if (categoryHasProducts) {
        // This should not happen if the button is disabled, but is a safe fallback
        toast({ 
            title: "🚫 Cannot Delete Category", 
            description: "Please shift all products from this category to another category before deleting it.", 
            variant: "destructive" 
        });
    }
  };


  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r p-4">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          <li
            onClick={() => setSelectedCategory(null)}
            className={`cursor-pointer p-2 rounded-md flex justify-between items-center ${!selectedCategory ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          >
            <span>All Products</span>
          </li>
          {categories?.map((cat) => (
            <li
              key={cat.id}
              className={`p-2 rounded-md flex justify-between items-center ${
                selectedCategory === cat.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              <span
                onClick={() => setSelectedCategory(cat.id)}
                className="cursor-pointer flex-grow"
              >
                {cat.name}
              </span>
              
              {/* 🆕 NEW CATEGORY ACTIONS */}
              <div className="flex space-x-2 ml-2">
                <button
 onClick={(e) => {
    e.stopPropagation();
    handleEditCategory(cat);
  }}                  className={`p-1 rounded-full ${selectedCategory === cat.id ? 'text-blue-500 bg-white hover:bg-gray-100' : 'text-gray-600 hover:text-blue-500'}`}
                  title="Edit Category"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteCategoryClick(cat); }}
                  className={`p-1 rounded-full ${selectedCategory === cat.id ? 'text-red-500 bg-white hover:bg-gray-100' : 'text-gray-600 hover:text-red-500'}`}
                  title="Delete Category"
                >
                  <Trash size={16} />
                </button>
              </div>
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
  onClick={() => handleToggleHotProduct(product)}
  className={`p-2 rounded-full ${
    product.hot_product
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-gray-200 text-red-600 hover:bg-gray-300"
  }`}
  title="Toggle Hot Product"
>
  {product.hot_product ? (
    <Heart size={20} fill="currentColor" />
  ) : (
    <Heart size={20} />
  )}
</button>

                <button
                  onClick={() => handleViewClick(product.id)}
                  className="p-2 bg-green-700 text-white rounded-full hover:bg-green-800"
                  title="View Product Page"
                >
                  <Eye size={20} />
                </button>
                
                {/* 🎯 EDIT Button */}
                <button
                  onClick={() => handleEditClick(product.id)}
                  className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-600"
                  title="Edit Product"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDeleteClick(product.id)}
                  className="p-2 bg-red-800 text-white rounded-full hover:bg-red-900"
                  title="Delete Product"
                >
                  <Trash size={20} />
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* PRODUCT Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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

      {/* 🎯 CATEGORY Delete Confirmation Modal (MODIFIED) */}
      {showCategoryDeleteConfirm && categoryToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className={`text-xl font-bold mb-4 ${categoryHasProducts ? 'text-orange-600' : 'text-red-600'}`}>
                {categoryHasProducts ? 'Deletion Prevented' : 'Confirm Category Deletion'}
            </h2>
            
            <p className='mb-4'>
              Are you sure you want to delete the category: {categoryToDelete.name}?
            </p>
            
            {categoryHasProducts ? (
                 <div className='p-3 bg-red-100 text-red-800 border-l-4 border-red-500'>
                    <p className='text-sm font-semibold'>
                        🚫 Cannot delete while products exist.
                    </p>
                    <p className='text-sm mt-1'>
                        Please **recategorize** its products to another category before attempting to delete this category.
                    </p>
                 </div>
            ) : (
                <p className='text-sm text-gray-600'>
                    This category is empty. Deletion will proceed upon confirmation.
                </p>
            )}

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => { setShowCategoryDeleteConfirm(false); setCategoryToDelete(null); setCategoryHasProducts(false); }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCategory}
                className={`px-4 py-2 text-white rounded-md ${categoryHasProducts ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                disabled={categoryHasProducts} // Disable button if products exist
              >
                {categoryHasProducts ? 'Products Exist' : 'Delete Category'}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ManageProducts;