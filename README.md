# Warehouse Management System

Sistem Manajemen Gudang berbasis web yang dibangun menggunakan React.js (Frontend) dan Node.js/Express (Backend), dengan integrasi API PT SSMS.

## Tech Stack

- **Frontend:** React.js + Vite + TailwindCSS + Axios
- **Backend:** Node.js + Express + Axios
- **API:** PT SSMS REST API

## Fitur

- Login dengan autentikasi via API
- Menampilkan daftar barang dari API (Nama, Stok, Satuan)
- Tambah barang baru
- Edit barang yang sudah ada
- Hapus barang
- CRUD tetap berfungsi sebelum maupun sesudah data API diambil
- Perubahan lokal tetap tersimpan saat Refresh data
- Responsive design (mobile & desktop)
- Loading skeleton & error handling

## Struktur Project

warehouse-management/
├── backend/
│ ├── index.js
│ ├── routes/
│ │ ├── auth.js
│ │ └── items.js
│ └── package.json
└── frontend/
├── src/
│ ├── pages/
│ │ ├── Login.jsx
│ │ └── Dashboard.jsx
│ ├── components/
│ │ ├── ItemList.jsx
│ │ └── ItemForm.jsx
│ └── services/
│ └── api.js
└── package.json

## Cara Menjalankan Lokal

### Prasyarat

- Node.js v18 atau lebih baru
- npm

### 1. Clone repository

```bash
git clone https://github.com/GalvaNova/warehouse-management.git
cd warehouse-management
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` di folder `backend`:

PORT=5000
API_BASE_URL=https://auth.srs-ssms.com/api/dev

Jalankan backend:

```bash
npm run dev
```

Backend berjalan di `http://localhost:5000`

### 3. Setup Frontend

Buka terminal baru:

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`

### 4. Login

Buka browser ke `http://localhost:5173` dan login dengan:

- **Email:** programmer@da
- **Password:** Prog123!

## API Endpoints

### Login

POST https://auth.srs-ssms.com/api/dev/login
Content-Type: application/x-www-form-urlencoded
Body:
email=programmer@da
password=Prog123!

Response sukses:

```json
{
  "statusCode": 1,
  "message": "Login berhasil.",
  "data": {
    "api_token": "xxx|xxxxx"
  }
}
```

### List Items

GET https://auth.srs-ssms.com/api/dev/list-items
Authorization: Bearer {api_token}

Response sukses:

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
    }
  ]
}
```

## Catatan Teknis

- Backend berfungsi sebagai proxy untuk menghindari CORS error
- Data perubahan lokal (tambah/edit/hapus) disimpan di `useRef` sehingga tidak hilang saat Refresh
- Token disimpan di `localStorage` dan dihapus saat logout
- Komponen Dashboard di-recreate setiap login baru untuk memastikan state bersih

## Screenshots

_(Tambahkan screenshot halaman Login dan Dashboard di sini)_

## Developer

**Gredynov Sitanggang**

- GitHub: [GalvaNova](https://github.com/GalvaNova)
- LinkedIn: [gredynov-sitanggang](https://www.linkedin.com/in/gredynov-sitanggang/)
