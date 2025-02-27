export const formatRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Menghapus angka desimal
    maximumFractionDigits: 0, // Pastikan tidak ada desimal
});