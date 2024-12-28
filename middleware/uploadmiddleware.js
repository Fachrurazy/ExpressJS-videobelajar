const multer = require('multer'); // Library untuk menangani unggahan file
const path = require('path'); // Library untuk menangani jalur file

// Konfigurasi penyimpanan untuk multer
const storage = multer.diskStorage({
    // Menentukan folder tempat file disimpan
    destination: (req, file, cb) => {
        cb(null, 'upload/'); // Folder 'upload/' untuk menyimpan file
    },
    // Menentukan nama file yang disimpan
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Membuat nama unik
        const ext = path.extname(file.originalname); // Mendapatkan ekstensi file
        cb(null, uniqueSuffix + ext); // Format nama file dengan timestamp dan ekstensi
    },
});

// Middleware untuk menangani unggahan file
const upload = multer({ storage: storage });

// Ekspor middleware upload
module.exports = upload;