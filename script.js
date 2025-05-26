// Fungsi untuk mengambil koordinat lokasi
function getLocation() {
  // Periksa apakah Geolocation didukung oleh browser
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // Callback sukses
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy; // Akurasi dalam meter

        console.log(`Latitude: ${latitude}`);
        console.log(`Longitude: ${longitude}`);
        console.log(`Akurasi: ${accuracy} meter`);

        // Contoh: Tampilkan di halaman HTML
        document.getElementById("location").innerHTML = 
          `Latitude: ${latitude}, Longitude: ${longitude}, Akurasi: ${accuracy} meter`;
      },
      // Callback error
      (error) => {
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Izin akses lokasi ditolak.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Informasi lokasi tidak tersedia.";
            break;
          case error.TIMEOUT:
            errorMessage = "Permintaan lokasi timeout.";
            break;
          default:
            errorMessage = "Terjadi kesalahan: " + error.message;
        }
        console.error(errorMessage);
        document.getElementById("location").innerHTML = errorMessage;
      },
      // Opsi untuk meningkatkan akurasi
      {
        enableHighAccuracy: true, // Aktifkan akurasi tinggi (GPS)
        timeout: 10000, // Batas waktu 10 detik
        maximumAge: 0 // Tidak menggunakan cache lokasi
      }
    );
  } else {
    console.error("Geolocation tidak didukung oleh browser ini.");
    document.getElementById("location").innerHTML = 
      "Geolocation tidak didukung oleh browser ini.";
  }
}

function showOnMap(position) {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // Callback sukses
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(mapUrl, "_blank");
    },
      // Callback error
      (error) => {
        console.error("Error getting location for map:", error);
        alert("Tidak dapat menampilkan lokasi di peta.");
      }
    );
  }
}
// Panggil fungsi saat halaman dimuat atau tombol diklik
window.onload = getLocation;