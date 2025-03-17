export default function StoreBoxView({ store }) {
    return (
      <div className="bg-neutral-900 text-white rounded-lg shadow-md p-4 flex flex-col items-center w-72">
        {/* Imagen de la tienda */}
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
  
        {/* Información de la tienda */}
        <h2 className="text-xl font-semibold">{store.name}</h2>
        <p className="text-gray-400">Personal: {store.staffCount} personas</p>
        <p className="text-green-400 font-semibold">
          Total vendido hoy: CRC {store.dailySales.toFixed(2)}
        </p>
      </div>
    );
  }
  