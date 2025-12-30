import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "@/Services/Productscrud";
import RichTextEditor from "../CreateProduct/RichTextEditor";
import { toast } from "../ui/use-toast";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  /* ---------------- FETCH CATEGORY ---------------- */
  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        const res = await getCategoryById(id);

        console.log("Category Response:", res.data);

        setName(res.data.category_name || "");
        setDescription(res.data.description || "");
      } catch (err) {
        console.error("Failed to fetch category", err);
      }
    };

    fetchCategory();
  }, [id]);


  /* ---------------- UPDATE CATEGORY ---------------- */
  const handleSave = async () => {
    try {
      await updateCategory(id, {
        categoryName: name.trim(),
        description: description || null,
      });

      toast({
        title: "Success ✅",
        description: "Category updated successfully",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error ❌",
        description: "Failed to update category",
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Edit Category : {name || "Loading..."}
      </h1>

      {/* CATEGORY NAME */}
      <label className="block mb-1 font-medium">Category Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-md px-3 py-2 mb-4"
        placeholder="Enter category name"
      />

      <label className="block mb-1 font-medium">Category Description</label>
      <div className="border rounded-md mb-6">
 
    <RichTextEditor
      key={description}   // 👈 IMPORTANT

  initialContent={description}
                onChange={(content) => setDescription(content)}
               />


      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditCategory;
