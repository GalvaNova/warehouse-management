import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getItems } from "../services/api";
import ItemList from "../components/itemList";
import ItemForm from "../components/itemForm";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("idle");

  // Simpan ID barang yang sudah dihapus & data yang diedit secara lokal
  const deletedIds = useRef(new Set());
  const localEdits = useRef(new Map());
  const localAdds = useRef([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("api_token");
  const userName = localStorage.getItem("user_name");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError("");
    setFetchStatus("loading");
    try {
      const response = await getItems(token);
      if (response.statusCode === 1) {
        // Terapkan perubahan lokal ke data API
        const merged = response.data
          // Hapus item yang sudah didelete secara lokal
          .filter((item) => !deletedIds.current.has(item.id))
          // Terapkan edit lokal
          .map((item) =>
            localEdits.current.has(item.id)
              ? localEdits.current.get(item.id)
              : item
          );

        // Tambahkan item yang ditambah secara lokal
        setItems([...merged, ...localAdds.current]);
        setFetchStatus("success");
      } else {
        setError("Gagal mengambil data barang dari server.");
        setFetchStatus("error");
      }
    } catch {
      setError(
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
      );
      setFetchStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    // Reset semua ref ke kondisi awal
    deletedIds.current = new Set();
    localEdits.current = new Map();
    localAdds.current = [];
    // Reset state
    setItems([]);
    setFetchStatus("idle");
    setError("");
    navigate("/");
  };

  const handleAdd = (newItem) => {
    const newWithId = { ...newItem, id: `local_${Date.now()}` };
    // Simpan ke ref agar tetap ada saat refresh
    localAdds.current = [...localAdds.current, newWithId];
    setItems((prev) => [...prev, newWithId]);
    setShowForm(false);
  };

  const handleEdit = (updatedItem) => {
    // Simpan edit ke ref
    if (String(updatedItem.id).startsWith("local_")) {
      // Jika item lokal, update di localAdds
      localAdds.current = localAdds.current.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
    } else {
      // Jika item dari API, simpan ke localEdits
      localEdits.current.set(updatedItem.id, updatedItem);
    }
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditItem(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus barang ini?")) {
      // Simpan ID yang dihapus ke ref
      if (String(id).startsWith("local_")) {
        // Jika item lokal, hapus dari localAdds
        localAdds.current = localAdds.current.filter((item) => item.id !== id);
      } else {
        // Jika item dari API, tandai sebagai deleted
        deletedIds.current.add(id);
      }
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const openEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };
  const openAdd = () => {
    setEditItem(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-4 md:px-6 py-4 shadow">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-bold text-base md:text-lg leading-tight">
              Manajemen Gudang
            </h1>
            <p className="text-blue-200 text-xs hidden md:block">PT SSMS</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-blue-100 hidden md:block">
              Halo, {userName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Daftar Barang
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {items.length} barang tercatat
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchItems}
              disabled={loading}
              className="flex-1 sm:flex-none text-sm border border-blue-500 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition disabled:opacity-50"
            >
              {loading ? "⏳ Memuat..." : "🔄 Refresh"}
            </button>
            <button
              onClick={openAdd}
              className="flex-1 sm:flex-none text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Tambah
            </button>
          </div>
        </div>

        {/* Status fetch */}
        {fetchStatus === "success" && (
          <div className="bg-green-50 text-green-700 text-sm px-4 py-2.5 rounded-lg mb-4 flex items-center gap-2">
            ✅ Data berhasil dimuat — perubahan lokal Anda tetap tersimpan.
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-4 flex items-start gap-2">
            <span>⚠️</span>
            <div>
              <p className="font-medium">Terjadi kesalahan</p>
              <p className="mt-0.5 text-red-600">{error}</p>
              <button
                onClick={fetchItems}
                className="mt-2 text-xs underline text-red-700 hover:text-red-900"
              >
                Coba lagi
              </button>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex gap-4 items-center">
                <div className="h-4 bg-gray-200 rounded w-6"></div>
                <div className="h-4 bg-gray-200 rounded flex-1"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : (
          <ItemList items={items} onEdit={openEdit} onDelete={handleDelete} />
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <ItemForm
          item={editItem}
          onSubmit={editItem ? handleEdit : handleAdd}
          onClose={() => {
            setShowForm(false);
            setEditItem(null);
          }}
        />
      )}
    </div>
  );
}
