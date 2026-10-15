import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { deleteProduct, fetchProducts, editProduct, addProduct, fetchLimitedProducts } from '../../redux/slices/productSlice'
import toast from "react-hot-toast";
export default function ManageProducts() {

  const products = useSelector((state) => state.products.items)
  const pages = useSelector((state) => state.products.pages)
  // console.log(products)
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image : ''
  })
  const [page, setPage] = useState(1)
  const [editingId, setEditingId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLimitedProducts(page))
    // console.log(fetchProductss)
  }, [dispatch, page])


  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleEdit = (product) => {

    setEditingId(product.productId);
    // console.log(product.productId);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image : product.image,
      imageFile : product.imageFile,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("Name",form.name);
    formData.append("Category",form.category);
    formData.append("Price", form.price);
    formData.append("Stock",form.stock);
    formData.append("Description",form.description);
    formData.append("Rating", form.rating || "0");

    formData.append("Image", form.image || "pending");

    if(form.imageFile){
      formData.append("ImageFile",form.imageFile);
    }

    try{

      if(editingId){
        await dispatch(
          editProduct({id : editingId, form: formData})
        ).unwrap();
         toast.success('Product Updated');
      }else{
        await dispatch(addProduct(formData)).unwrap();
        toast.success('Product added successfully');

      }

      setForm({
        name : "",
        price : "",
        category : "",
        stock: "",
        description: "",
        image: "",
        imageFile: null,
        rating: "",
      });
    }catch(error){
    console.error("Product save failed:", error);
    }
    
  }


  const handeDelete = (product) => {
    // console.log(product.productId)
    dispatch(deleteProduct(product.productId))
  }
  return (
    <div className="min-h-screen bg-[#2b0b08] text-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-400">
          Manage Products
        </h1>
      </div>

    <form
  onSubmit={handleSubmit}
  className="bg-[#3b140f] p-8 rounded-2xl shadow-lg"
>
  <h2 className="text-2xl font-bold text-orange-400 mb-6">
    {editingId ? 'Edit Product' : 'Add Product'}
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <div>
      <label className="block text-sm font-medium text-orange-200 mb-2">
        Product Name
      </label>
      <input
        type="text"
        name="name"
        value={form.name}
        placeholder='Product name'
        onChange={handleInput}
        className="w-full bg-[#522019] border border-[#6a2a20]
        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
        p-3 rounded-lg outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-orange-200 mb-2">
        Price
      </label>
      <input
        type="number"
        name="price"
        value={form.price}
        placeholder='price'
        onChange={handleInput}
        className="w-full bg-[#522019] border border-[#6a2a20]
        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
        p-3 rounded-lg outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-orange-200 mb-2">
        Category
      </label>
      <input
        type="text"
        name="category"
        value={form.category}
        placeholder='category'
        onChange={handleInput}
        className="w-full bg-[#522019] border border-[#6a2a20]
        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
        p-3 rounded-lg outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-orange-200 mb-2">
        Stock
      </label>
      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleInput}
        placeholder='stock'
        className="w-full bg-[#522019] border border-[#6a2a20]
        focus:border-orange-400 focus:ring-1 focus:ring-orange-400
        p-3 rounded-lg outline-none"
      />
    </div>


{/* Product Image */}
<div className="md:col-span-1">
  <label
    htmlFor="imageFile"
    className="block text-sm font-medium text-orange-200 mb-2"
  >
    Product Image
  </label>

  <input
    id="imageFile"
    type="file"
    accept="image/*"
    onChange={(e) => {
      setForm((prev) => ({
        ...prev,
        imageFile: e.target.files[0],
      }));
    }}
    required={!editingId}
    className="w-full bg-[#522019] border border-[#6a2a20]
    focus:border-orange-400 focus:ring-1 focus:ring-orange-400
    p-3 rounded-lg outline-none text-orange-100
    file:mr-4 file:py-2 file:px-4 file:rounded-md
    file:border-0 file:bg-orange-400 file:text-[#3b160f]
    file:font-medium file:cursor-pointer
    hover:file:bg-orange-300"
  />
</div>

{/* Description */}
<div>
  <label className="block text-sm font-medium text-orange-200 mb-2">
    Description
  </label>

  <textarea
    rows={2}
    name="description"
    value={form.description}
    placeholder="Description"
    onChange={handleInput}
    className="w-full bg-[#522019] border border-[#6a2a20]
    focus:border-orange-400 focus:ring-1 focus:ring-orange-400
    p-2 rounded-lg outline-none resize-none"
  />
</div>


    
  </div>

  <button
    type="submit"
    className="w-full mt-6 bg-orange-500 hover:bg-orange-600
    transition p-3 rounded-lg font-semibold"
  >
    {editingId ? 'Update Product' : 'Add Product'}
  </button>
</form>

      {/* Table */}
      <div className="overflow-x-auto bg-[#3b140f] rounded-2xl p-4">

        <table className="w-full">

          <thead>
            <tr className="border-b border-gray-600 text-orange-300">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-b border-gray-700 hover:bg-[#522019]"
              >

                <td className="p-3 font-medium">{product.name.toUpperCase()}</td>

                <td className="p-3 font-medium">
                  ₹ {product.price}
                </td>

                <td className="p-3 font-medium">
                  {product.category}
                </td>

                <td className="p-3 font-medium">
                  {product.stock}
                </td>

                <td className="p-3 flex gap-3">

                  <button
                    onClick={() => handleEdit(product)}
                    className="
      px-4 py-2 rounded-xl
      font-semibold text-white bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-amber-500 shadow-lg hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
                  >Edit
                  </button>

                  <button
                    onClick={() => handeDelete(product)}
                    className="
      px-4 py-2 rounded-xl 
      font-semibold text-white bg-gradient-to-r from-rose-500 to-amber-600 hover:from-red-500 hover:to-rose-600 shadow-lg hover:shadow-red-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      <div className="flex gap-4 mt-6">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-orange-500 px-4 py-2 rounded"
        >
          Prev
        </button>

        <span className="text-lg font-bold">
          Page {page}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="bg-orange-500 px-4 py-2 rounded"
        >
          Next
        </button>

      </div>
    </div>
  )
}
