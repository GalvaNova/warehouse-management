export default function ItemList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 bg-white rounded-xl shadow-sm">
        <div className="text-4xl mb-3">📦</div>
        <p>Belum ada data barang.</p>
        <p className="text-sm mt-1">
          Klik "Tambah Barang" atau "Refresh Data".
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Desktop Table — hidden di mobile */}
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-gray-600 font-medium w-10">
                No
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">
                Nama Barang
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium w-20">
                Stok
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium w-24">
                Satuan
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium w-24">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {item.item_name}
                </td>
                <td className="px-6 py-4 text-gray-700">{item.stock}</td>
                <td className="px-6 py-4 text-gray-700">{item.unit}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      title="Edit"
                      className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      title="Hapus"
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards — hidden di desktop */}
      <div className="md:hidden divide-y">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="px-4 py-4 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs text-gray-400 w-5 flex-shrink-0">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="font-medium text-gray-800 text-sm truncate">
                  {item.item_name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Stok:{" "}
                  <span className="font-medium text-gray-700">
                    {item.stock}
                  </span>
                  <span className="mx-1">·</span>
                  {item.unit}
                </p>
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => onEdit(item)}
                title="Edit"
                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition text-base"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
              <button
                onClick={() => onDelete(item.id)}
                title="Hapus"
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition text-base"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
