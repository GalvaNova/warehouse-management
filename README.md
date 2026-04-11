# 📦 Warehouse Management System

> Sistem Manajemen Gudang berbasis web dengan integrasi REST API PT SSMS — dibangun menggunakan React.js dan Node.js/Express.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

---

## ✨ Fitur Utama

| Fitur                     | Keterangan                                         |
| ------------------------- | -------------------------------------------------- |
| 🔐 **Login**              | Autentikasi via API dengan Bearer Token            |
| 📋 **Tampil Barang**      | Ambil data dari API — Nama, Stok, Satuan           |
| ➕ **Tambah Barang**      | Tambah data barang baru ke daftar                  |
| ✏️ **Edit Barang**        | Ubah data barang yang sudah ada                    |
| 🗑️ **Hapus Barang**       | Hapus barang dari daftar                           |
| 🔄 **Persistent CRUD**    | Perubahan lokal tetap ada setelah Refresh data API |
| ⚡ **Offline-first CRUD** | CRUD tetap bisa dilakukan sebelum data API dimuat  |
| 📱 **Responsive**         | Tampilan optimal di mobile & desktop               |
| ⏳ **Loading & Error**    | Skeleton loading dan pesan error yang informatif   |

---

## 🛠️ Tech Stack

### Frontend

- **React.js** + **Vite** — UI framework & build tool
- **TailwindCSS** — utility-first styling
- **Axios** — HTTP client untuk konsumsi API
- **React Router DOM** — client-side routing

### Backend

- **Node.js** + **Express** — server & API proxy
- **Axios** — forward request ke API PT SSMS
- **dotenv** — manajemen environment variables
- **CORS** — cross-origin request handler

---

## 📁 Struktur Project

```
warehouse-management/
├── backend/
│   ├── index.js              ← Entry point Express server
│   ├── routes/
│   │   ├── auth.js           ← Route login & autentikasi
│   │   └── items.js          ← Route data barang
│   ├── .env                  ← Environment variables (tidak di-commit)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx     ← Halaman login
    │   │   └── Dashboard.jsx ← Halaman utama + CRUD
    │   ├── components/
    │   │   ├── ItemList.jsx  ← Tabel/list daftar barang
    │   │   └── ItemForm.jsx  ← Modal form tambah & edit
    │   └── services/
    │       └── api.js        ← Semua axios API calls
    └── package.json
```

---

## 🚀 Cara Menjalankan Lokal

### Prasyarat

- **Node.js** v18 atau lebih baru → [Download](https://nodejs.org)
- **npm** (otomatis terpasang bersama Node.js)
- **Git** → [Download](https://git-scm.com)

### 1. Clone Repository

```bash
git clone https://github.com/GalvaNova/warehouse-management.git
cd warehouse-management
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat file **`.env`** di dalam folder `backend/`:

```env
PORT=5000
API_BASE_URL=https://auth.srs-ssms.com/api/dev
```

Jalankan backend:

```bash
npm run dev
```

✅ Backend berjalan di `http://localhost:5000`

### 3. Setup Frontend

Buka **terminal baru** (jangan tutup terminal backend):

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend berjalan di `http://localhost:5173`

### 4. Buka Aplikasi

Buka browser dan akses `http://localhost:5173`, lalu login dengan:

```
Email    : programmer@da
Password : Prog123!
```

---

## 🔌 API Endpoints

### 🔐 Login

```http
POST https://auth.srs-ssms.com/api/dev/login
Content-Type: application/x-www-form-urlencoded
```

**Request Body:**

```
email=programmer@da&password=Prog123!
```

**Response Sukses:**

```json
{
  "statusCode": 1,
  "message": "Login berhasil.",
  "data": {
    "email": "programmer@da",
    "name": "I'm Programmer",
    "department": "Digital Architect",
    "position": "Programmer",
    "api_token": "xxx|xxxxx"
  }
}
```

---

### 📋 List Items

```http
GET https://auth.srs-ssms.com/api/dev/list-items
Authorization: Bearer {api_token}
```

**Response Sukses:**

```json
{
  "statusCode": 1,
  "message": "List items warehouse successfully retrieved.",
  "data": [
    {
      "id": 15,
      "item_name": "Lem dextone Plastic steel 48g",
      "stock": 15,
      "unit": "Pcs"
    },
    {
      "id": 16,
      "item_name": "Dextone Silicone Red 70g",
      "stock": 7,
      "unit": "Pcs"
    },
    {
      "id": 17,
      "item_name": "Kabel NYYHY 4x1,5",
      "stock": 5,
      "unit": "Roll"
    },
    {
      "id": 18,
      "item_name": "Kabel NYM 2x1,5",
      "stock": 2,
      "unit": "Roll"
    },
    {
      "id": 19,
      "item_name": "Kabel NYYHY 3x1,5",
      "stock": 1,
      "unit": "Roll"
    }
  ]
}
```

---

## 🧠 Catatan Teknis

| Aspek                         | Penjelasan                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 🔁 **Proxy Backend**          | Backend Express berfungsi sebagai proxy untuk menghindari CORS error saat frontend memanggil API eksternal                |
| 💾 **Persistent Local State** | Perubahan CRUD disimpan di `useRef` (`deletedIds`, `localEdits`, `localAdds`) sehingga tidak hilang saat Refresh data API |
| 🔑 **Token Management**       | `api_token` disimpan di `localStorage` dan dihapus otomatis saat logout                                                   |
| 🔄 **Clean State on Login**   | Komponen Dashboard di-recreate setiap sesi login baru menggunakan `key={token}` untuk memastikan state bersih             |
| ⚡ **Offline CRUD**           | CRUD tetap berfungsi meskipun backend sedang mati — data tersimpan di state lokal dan akan digabung saat koneksi kembali  |

---

## 📸 Screenshots

| Login                                                                                                                                | Dashboard                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| _<img width="587" height="476" alt="Image" src="https://github.com/user-attachments/assets/d8b2d712-271c-4f2b-935c-225051c6c07e" />_ | _<img width="1134" height="730" alt="Image" src="https://github.com/user-attachments/assets/e38c6374-8606-4936-b7c5-a4dfbb73fa42" />_ |

---

## Developer

**Gredynov Sitanggang**

[![GitHub](https://img.shields.io/badge/GitHub-GalvaNova-181717?style=flat&logo=github)](https://github.com/GalvaNova)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-gredynov--sitanggang-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/gredynov-sitanggang/)

---
