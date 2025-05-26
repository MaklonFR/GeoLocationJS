 let map, marker;
    let currentLat, currentLng;

    function getLocation() {
      const locationDiv = document.getElementById('location');
      const errorDiv = document.getElementById('error');
      const mapButton = document.getElementById('mapButton');

      locationDiv.innerHTML = 'Memuat lokasi...';
      errorDiv.classList.add('hidden');
      mapButton.classList.add('hidden');

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            currentLat = position.coords.latitude;
            currentLng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            locationDiv.innerHTML = `
              <p><strong>Latitude:</strong> ${currentLat.toFixed(6)}</p>
              <p><strong>Longitude:</strong> ${currentLng.toFixed(6)}</p>
              <p><strong>Akurasi:</strong> ${accuracy.toFixed(2)} meter</p>
            `;
            mapButton.classList.remove('hidden');
          },
          (error) => {
            let errorMessage;
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = 'Izin akses lokasi ditolak.';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = 'Informasi lokasi tidak tersedia.';
                break;
              case error.TIMEOUT:
                errorMessage = 'Permintaan lokasi timeout.';
                break;
              default:
                errorMessage = 'Terjadi kesalahan: ' + error.message;
            }
            errorDiv.innerHTML = errorMessage;
            errorDiv.classList.remove('hidden');
            locationDiv.innerHTML = 'Gagal mendapatkan lokasi.';
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        errorDiv.innerHTML = 'Geolocation tidak didukung oleh browser ini.';
        errorDiv.classList.remove('hidden');
        locationDiv.innerHTML = 'Gagal mendapatkan lokasi.';
      }
    }

    function openMapModal() {
      document.getElementById('mapModal').classList.remove('hidden');
      initMap();
    }

    function closeMapModal() {
      document.getElementById('mapModal').classList.add('hidden');
      if (map) {
        map.remove(); // Hapus peta untuk mencegah duplikasi
        map = null;
      }
    }

    function initMap() {
      if (!currentLat || !currentLng) return;

      map = L.map('map').setView([currentLat, currentLng], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      marker = L.marker([currentLat, currentLng]).addTo(map)
        .bindPopup('Lokasi Anda')
        .openPopup();
    }