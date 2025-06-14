'use client';
import { useState, useEffect } from 'react';
import { MdEdit, MdToggleOn, MdToggleOff } from 'react-icons/md';

export default function ProductInformation() {
  // 🔹 Datos falsos del producto
  const initialProduct = {
    name: 'Gorra Rosa Edición Limitada',
    description: 'Gorra ajustable de algodón color rosa pastel con logo bordado.',
    price: 11900,
    status: true,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-sehHJAfCx3jSSpAiqrc_eho8ugMC8QN9mQ&s',
  };

  const [product, setProduct] = useState(initialProduct);
  const [originalProduct, setOriginalProduct] = useState(initialProduct);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const changed = JSON.stringify(product) !== JSON.stringify(originalProduct);
    setHasChanges(changed);
  }, [product]);

  const handleChange = (key, value) => {
    setProduct(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdate = () => {
    alert('✅ Producto actualizado (simulado):\n' + JSON.stringify(product, null, 2));
    setOriginalProduct(product);
    setHasChanges(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white text-black p-6 rounded-xl shadow-lg space-y-4 mt-10">
      {/* Imagen */}
      <div className="flex flex-col items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-40 h-40 object-cover rounded-md  p-2 bg-white text-slate-400 text-sm  border border-2 border-amber-400 rounded-md"
        />
        <button
          onClick={() => setIsEditingImage(true)}
          className="  text-slate-400 text-sm hover:underline flex items-center gap-1"
        >
          <MdEdit /> Cambiar imagen
        </button>
        {isEditingImage && (
          <input
            type="text"
            placeholder="Nueva URL de imagen"
            className="   p-2 bg-white text-slate-400 text-sm  border border-2 border-amber-400 rounded-md p-1 w-full text-sm"
            value={product.image}
            onChange={(e) => handleChange('image', e.target.value)}
            onBlur={() => setIsEditingImage(false)}
          />
        )}
      </div>

      {/* Nombre */}
      <div>
        <label className="block text-sm text-slate-400">Nombre</label>
        <input
          type="text"
          className=" p-2 bg-white text-slate-400 text-sm  border border-2 border-amber-400 rounded-md w-full p-2 rounded-md"
          value={product.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm text-slate-400">Descripción</label>
        <textarea
          className=" p-2 bg-white text-slate-400 text-sm  border border-2 border-amber-400 rounded-md w-full p-2 rounded-md"
          value={product.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      {/* Precio */}
      <div>
        <label className="block text-sm text-slate-400">Precio (CRC)</label>
        <input
          type="number"
          className=" p-2 bg-white text-slate-400 text-sm  border border-2 border-amber-400 rounded-md w-full p-2 rounded-md"
          value={product.price}
          onChange={(e) => handleChange('price', parseFloat(e.target.value))}
        />
      </div>

      {/* Status con toggle */}
      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-400">Estado:</label>
        <button onClick={() => handleChange('status', !product.status)}>
          {product.status ? (
            <MdToggleOn size={30} color="green" />
          ) : (
            <MdToggleOff size={30} color="gray" />
          )}
        </button>
        <span className="text-sm text-amber-400">{product.status ? 'Disponible' : 'Agotado'}</span>
      </div>

      {/* Botón de actualizar */}
      <button
        disabled={!hasChanges}
        onClick={handleUpdate}
        className={`w-full mt-4 p-2 rounded-md text-slate-400 text-white transition-all ${
          hasChanges
            ? 'bg-purple-600 hover:bg-purple-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Actualizar producto
      </button>
    </div>
  );
}
