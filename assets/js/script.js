/* ============================================
   JavaScript untuk Website Wisata Daerahku
   ============================================ */

// Menunggu DOM siap sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // LOADER OVERLAY
    // ============================================
    const loaderTemplate = `
        <div id="pageLoader" class="loader-overlay">
            <div class="loader-card">
                <div class="loader-orbit">
                    <span class="loader-plane">
                        <i class="bi bi-airplane-fill"></i>
                    </span>
                </div>
                <p class="loader-text">Menjelajahi pesona Lombok untukmu...</p>
                <p class="loader-subtext">Menyiapkan pengalaman wisata terbaik</p>
            </div>
        </div>
    `;

    if (!document.getElementById('pageLoader')) {
        document.body.insertAdjacentHTML('afterbegin', loaderTemplate);
    }

    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        pageLoader.addEventListener('transitionend', event => {
            if (event.propertyName !== 'opacity') {
                return;
            }
            if (pageLoader.classList.contains('is-hidden')) {
                pageLoader.style.visibility = 'hidden';
                pageLoader.setAttribute('aria-hidden', 'true');
            } else {
                pageLoader.style.visibility = 'visible';
                pageLoader.removeAttribute('aria-hidden');
            }
        });

        // Pastikan loader tampak saat halaman pertama kali dibuka
        pageLoader.style.visibility = 'visible';

        window.addEventListener('load', () => {
            setTimeout(() => {
                pageLoader.classList.add('is-hidden');
            }, 750);
        });
    }
    if (pageLoader) {
        const navigationLinks = Array.from(document.querySelectorAll('a[href]')).filter(link => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
                return false;
            }
            if (link.target && link.target !== '_self') {
                return false;
            }
            if (/^https?:\/\//i.test(href) && !href.startsWith(window.location.origin)) {
                return false;
            }
            if (link.hasAttribute('download')) {
                return false;
            }
            return true;
        });

        navigationLinks.forEach(link => {
            link.addEventListener('click', event => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                    return;
                }

                event.preventDefault();
                const destination = link.getAttribute('href');

                pageLoader.style.visibility = 'visible';
                pageLoader.classList.remove('is-hidden');
                pageLoader.removeAttribute('aria-hidden');

                // force reflow to restart transition
                void pageLoader.offsetWidth;

                setTimeout(() => {
                    window.location.href = destination;
                }, 650);
            });
        });
    }

    // ============================================
    // FUNGSI UNTUK HALAMAN DETAIL.HTML
    // ============================================
    
    // Fungsi untuk menampilkan info cuaca acak
    const btnCuaca = document.getElementById('btnCuaca');
    const infoCuaca = document.getElementById('infoCuaca');
    const statusCuaca = document.getElementById('statusCuaca');
    
    if (btnCuaca) {
        btnCuaca.addEventListener('click', function() {
            // Array status cuaca acak
            const cuacaOptions = [
                'Cerah, suhu 28°C, angin tenang',
                'Berawan, suhu 26°C, angin ringan',
                'Hujan ringan, suhu 24°C, angin sedang',
                'Cerah berawan, suhu 27°C, angin tenang',
                'Mendung, suhu 25°C, angin ringan',
                'Cerah, suhu 29°C, angin tenang',
                'Hujan deras, suhu 23°C, angin kencang',
                'Cerah, suhu 30°C, angin tenang'
            ];
            
            // Pilih cuaca acak
            const randomCuaca = cuacaOptions[Math.floor(Math.random() * cuacaOptions.length)];
            
            // Tampilkan info cuaca
            statusCuaca.innerText = randomCuaca;
            infoCuaca.classList.remove('d-none');
            
            // Animasi fade in
            infoCuaca.style.opacity = '0';
            setTimeout(() => {
                infoCuaca.style.opacity = '1';
                infoCuaca.style.transition = 'opacity 0.5s ease';
            }, 10);
        });
    }
    
    // Fungsi kalkulator estimasi biaya perjalanan
    const kalkulatorForm = document.getElementById('kalkulatorForm');
    const hasilKalkulator = document.getElementById('hasilKalkulator');
    
    if (kalkulatorForm) {
        kalkulatorForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah reload halaman
            
            // Ambil nilai dari form
            const jarak = parseFloat(document.getElementById('jarak').value);
            const transportasi = document.getElementById('transportasi').value;
            
            // Validasi input
            if (isNaN(jarak) || jarak <= 0) {
                alert('Masukkan jarak yang valid!');
                return;
            }
            
            if (!transportasi) {
                alert('Pilih jenis transportasi!');
                return;
            }
            
            // Tarif per km berdasarkan transportasi
            let tarifPerKm = 0;
            let namaTransportasi = '';
            
            switch(transportasi) {
                case 'motor':
                    tarifPerKm = 2000;
                    namaTransportasi = 'Sepeda Motor';
                    break;
                case 'mobil':
                    tarifPerKm = 5000;
                    namaTransportasi = 'Mobil Pribadi';
                    break;
                case 'bus':
                    tarifPerKm = 3000;
                    namaTransportasi = 'Bus';
                    break;
                case 'kereta':
                    tarifPerKm = 4000;
                    namaTransportasi = 'Kereta Api';
                    break;
            }
            
            // Hitung total biaya
            const totalBiaya = jarak * tarifPerKm;
            
            // Tampilkan hasil
            document.getElementById('hasilJarak').innerText = jarak;
            document.getElementById('hasilTransportasi').innerText = namaTransportasi;
            document.getElementById('totalBiaya').innerText = totalBiaya.toLocaleString('id-ID');
            
            // Tampilkan div hasil
            hasilKalkulator.classList.remove('d-none');
            
            // Animasi fade in
            hasilKalkulator.style.opacity = '0';
            setTimeout(() => {
                hasilKalkulator.style.opacity = '1';
                hasilKalkulator.style.transition = 'opacity 0.5s ease';
            }, 10);
        });
    }
    
    // Fungsi untuk load data destinasi berdasarkan URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const destinasiParam = urlParams.get('dest');
    
    if (destinasiParam && document.getElementById('destinasiNama')) {
        // Data destinasi wisata Lombok
        const destinasiData = {
            'pantai-senggigi': {
                nama: 'Pantai Senggigi',
                deskripsi: 'Pantai Senggigi adalah salah satu destinasi wisata pantai paling populer di Lombok. Terletak di pesisir barat Lombok, pantai ini menawarkan pasir putih yang halus, air laut yang jernih, dan pemandangan sunset yang sangat memukau. Pantai ini memiliki ombak yang relatif tenang, cocok untuk berenang dan berbagai aktivitas air. Sepanjang pantai terdapat berbagai resort, hotel, restoran, dan warung makan yang menyajikan hidangan laut segar. Aktivitas yang bisa dilakukan antara lain snorkeling, diving, berjemur, atau sekadar menikmati keindahan pantai sambil menunggu sunset. Fasilitas yang tersedia meliputi area parkir, toilet, tempat penyewaan peralatan snorkeling, dan berbagai akomodasi.',
                lokasi: 'Jl. Raya Senggigi, Kecamatan Batu Layar, Kabupaten Lombok Barat, Nusa Tenggara Barat',
                gambar: 'assets/img/pantai senggigi.jpg'
            },
            'gili-trawangan': {
                nama: 'Gili Trawangan',
                deskripsi: 'Gili Trawangan adalah pulau kecil yang menjadi destinasi wisata paling terkenal di Lombok. Pulau ini terkenal dengan pantai pasir putih yang eksotis, terumbu karang yang indah, dan kehidupan malam yang ramai. Gili Trawangan adalah yang terbesar dari tiga pulau Gili (Gili Trawangan, Gili Meno, dan Gili Air). Di sini tidak ada kendaraan bermotor, transportasi utama menggunakan sepeda atau cidomo (kereta kuda). Aktivitas populer meliputi snorkeling, diving untuk melihat penyu dan ikan hias, berkeliling pulau dengan sepeda, menikmati sunset di bar-bar tepi pantai, dan berpartisipasi dalam berbagai kegiatan air. Pulau ini juga terkenal dengan suasana santai dan backpacker-friendly.',
                lokasi: 'Gili Trawangan, Kecamatan Pemenang, Kabupaten Lombok Utara, Nusa Tenggara Barat',
                gambar: 'assets/img/gili trawangan.jpg'
            },
            'gunung-rinjani': {
                nama: 'Gunung Rinjani',
                deskripsi: 'Gunung Rinjani adalah gunung tertinggi kedua di Indonesia dengan ketinggian 3.726 meter di atas permukaan laut. Gunung ini merupakan destinasi pendakian yang sangat populer bagi para pendaki dari seluruh dunia. Di dalam kawah gunung terdapat Danau Segara Anak yang indah dengan air berwarna biru kehijauan. Pendakian Gunung Rinjani membutuhkan waktu 2-3 hari dengan tingkat kesulitan yang menantang. Di puncak gunung, pendaki akan disuguhkan pemandangan sunrise yang spektakuler dan pemandangan Pulau Lombok dari ketinggian. Terdapat beberapa jalur pendakian seperti jalur Sembalun dan jalur Senaru. Pendakian harus dilakukan dengan guide berpengalaman dan peralatan yang memadai. Gunung Rinjani juga memiliki sumber air panas alami di sekitar kaki gunung.',
                lokasi: 'Taman Nasional Gunung Rinjani, Kabupaten Lombok Utara dan Lombok Timur, Nusa Tenggara Barat',
                gambar: 'assets/img/gunung-rinjani.jpg'
            },
            'pantai-kuta-lombok': {
                nama: 'Pantai Kuta Lombok',
                deskripsi: 'Pantai Kuta Lombok adalah destinasi wisata pantai yang terkenal dengan ombaknya yang cocok untuk surfing. Berbeda dengan Pantai Kuta di Bali, Pantai Kuta Lombok menawarkan suasana yang lebih tenang dan alami. Pantai ini dikelilingi bukit-bukit hijau yang menciptakan pemandangan yang sangat indah. Pasir pantai berwarna putih dan halus, air laut berwarna biru jernih. Pantai ini memiliki beberapa spot surfing yang terkenal seperti Pantai Gerupuk, Pantai Mawi, dan Pantai Selong Belanak. Selain surfing, pengunjung juga bisa berenang, berjemur, atau menikmati keindahan pantai. Di sekitar pantai terdapat berbagai warung makan yang menyajikan makanan lokal dan internasional. Pantai ini juga menjadi tempat yang populer untuk menikmati sunset.',
                lokasi: 'Desa Kuta, Kecamatan Pujut, Kabupaten Lombok Tengah, Nusa Tenggara Barat',
                gambar: 'assets/img/pantai kuta lombok.jpg'
            },
            'air-terjun-benang-stokel': {
                nama: 'Air Terjun Benang Stokel',
                deskripsi: 'Air Terjun Benang Stokel adalah salah satu air terjun paling terkenal di Lombok dengan ketinggian sekitar 30 meter. Air terjun ini terletak di tengah hutan yang hijau dan asri, menciptakan suasana yang sangat sejuk dan menenangkan. Air terjun ini memiliki kolam alami di bawahnya yang cocok untuk berenang. Airnya yang jernih dan sejuk membuat tempat ini menjadi destinasi favorit untuk melepas penat. Perjalanan menuju air terjun melewati jalan setapak yang dikelilingi pepohonan hijau dan suara alam yang menenangkan. Terdapat juga Air Terjun Benang Kelambu yang tidak jauh dari lokasi ini. Fasilitas yang tersedia meliputi area parkir, warung makan sederhana, dan tempat istirahat. Cocok untuk wisata keluarga dan pecinta alam.',
                lokasi: 'Desa Aik Berik, Kecamatan Batu Keliang Utara, Kabupaten Lombok Tengah, Nusa Tenggara Barat',
                gambar: 'assets/img/air terjun benang stokel.jpg'
            },
            'desa-sade': {
                nama: 'Desa Sade',
                deskripsi: 'Desa Sade adalah kampung adat Suku Sasak yang mempertahankan tradisi dan budaya asli Lombok. Desa ini menjadi destinasi wisata budaya yang sangat populer di Lombok. Pengunjung dapat melihat rumah adat Sasak yang terbuat dari bambu dan atap alang-alang, serta mempelajari cara hidup tradisional masyarakat Sasak. Di desa ini, pengunjung dapat melihat proses pembuatan tenun ikat khas Lombok yang merupakan kerajinan tradisional yang sangat terkenal. Terdapat juga pertunjukan budaya tradisional seperti tarian dan musik khas Sasak. Pengunjung dapat berinteraksi langsung dengan penduduk lokal dan belajar tentang adat istiadat dan tradisi yang masih dipertahankan. Desa ini juga menawarkan berbagai produk kerajinan tangan sebagai oleh-oleh.',
                lokasi: 'Desa Sade, Kecamatan Pujut, Kabupaten Lombok Tengah, Nusa Tenggara Barat',
                gambar: 'assets/img/desa sade.jpg'
            },
            'pantai-pink': {
                nama: 'Pantai Pink (Tangsi)',
                deskripsi: 'Pantai Pink atau Pantai Tangsi adalah salah satu pantai paling unik di Indonesia dengan pasir berwarna pink yang sangat langka. Warna pink pada pasir berasal dari campuran pasir putih dengan serpihan karang merah yang hancur. Pantai ini terletak di bagian selatan Lombok dan membutuhkan perjalanan yang cukup menantang untuk mencapainya. Pantai ini memiliki pemandangan yang sangat eksotis dengan air laut berwarna biru kehijauan yang kontras dengan pasir pink. Pantai ini relatif masih alami dan belum terlalu banyak dikunjungi, sehingga menawarkan suasana yang tenang dan damai. Waktu terbaik untuk mengunjungi pantai ini adalah saat cuaca cerah di mana warna pink pasir akan terlihat lebih jelas. Perjalanan menuju pantai melewati jalan berbatu dan membutuhkan kendaraan yang tangguh.',
                lokasi: 'Desa Sekaroh, Kecamatan Jerowaru, Kabupaten Lombok Timur, Nusa Tenggara Barat',
                gambar: 'assets/img/pantai pink.jpg'
            },
            'taman-narmada': {
                nama: 'Taman Narmada',
                deskripsi: 'Taman Narmada adalah taman peninggalan kerajaan yang dibangun pada abad ke-19 oleh Raja Mataram Lombok. Taman ini terletak di kaki Gunung Rinjani dan memiliki kolam renang alami yang airnya berasal dari mata air pegunungan. Taman ini dirancang sebagai replika Danau Segara Anak yang ada di kawah Gunung Rinjani, sehingga raja bisa menikmati keindahan danau tanpa harus mendaki gunung. Taman ini memiliki pemandangan yang sangat asri dengan berbagai pohon rindang, kolam-kolam, air mancur, dan bangunan-bangunan bersejarah. Air kolam di taman ini dipercaya memiliki khasiat untuk kesehatan dan awet muda. Taman ini juga memiliki Pura Lingsar yang merupakan pura terbesar di Lombok dan menjadi tempat ibadah bagi umat Hindu dan Islam Wetu Telu. Cocok untuk wisata keluarga dan edukasi sejarah.',
                lokasi: 'Desa Lembuak, Kecamatan Narmada, Kabupaten Lombok Barat, Nusa Tenggara Barat',
                gambar: 'assets/img/taman narmada.jpg'
            }
        };
        
        // Update konten berdasarkan parameter
        const data = destinasiData[destinasiParam];
        if (data) {
            document.getElementById('destinasiNama').innerText = data.nama;
            document.getElementById('destinasiDeskripsi').innerText = data.deskripsi;
            document.getElementById('destinasiLokasi').innerText = data.lokasi;
            document.getElementById('destinasiImage').src = data.gambar;
        }
    }
    
    // ============================================
    // FUNGSI UNTUK HALAMAN GALERI.HTML
    // ============================================
    
    // Toggle untuk menampilkan/menyembunyikan foto tambahan
    const btnToggleFoto = document.getElementById('btnToggleFoto');
    const fotoTambahan = document.getElementById('fotoTambahan');
    
    if (btnToggleFoto && fotoTambahan) {
        let isExpanded = false;

        btnToggleFoto.addEventListener('click', function() {
            isExpanded = !isExpanded;

            if (isExpanded) {
                fotoTambahan.classList.remove('d-none');
                fotoTambahan.setAttribute('aria-hidden', 'false');
                btnToggleFoto.innerText = 'Sembunyikan';

                setTimeout(() => {
                    fotoTambahan.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 80);
            } else {
                fotoTambahan.classList.add('d-none');
                fotoTambahan.setAttribute('aria-hidden', 'true');
                btnToggleFoto.innerText = 'Tampilkan Semua';
            }
        });
    }
    
    // ============================================
    // FUNGSI UNTUK HALAMAN KONTAK.HTML
    // ============================================
    
    // Validasi form kontak
    const formKontak = document.getElementById('formKontak');
    const pesanSukses = document.getElementById('pesanSukses');
    
    if (formKontak) {
        formKontak.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah reload halaman
            
            // Ambil nilai dari form
            const nama = document.getElementById('nama').value.trim();
            const email = document.getElementById('email').value.trim();
            const pesan = document.getElementById('pesan').value.trim();
            const rating = document.getElementById('rating').value;
            
            // Reset error states
            let isValid = true;
            const fields = ['nama', 'email', 'pesan', 'rating'];
            fields.forEach(field => {
                const element = document.getElementById(field);
                const errorElement = document.getElementById('error' + field.charAt(0).toUpperCase() + field.slice(1));
                element.classList.remove('is-invalid');
                if (errorElement) {
                    errorElement.innerText = '';
                }
            });
            
            // Validasi Nama
            if (!nama) {
                document.getElementById('nama').classList.add('is-invalid');
                document.getElementById('errorNama').innerText = 'Nama wajib diisi!';
                isValid = false;
            }
            
            // Validasi Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                document.getElementById('email').classList.add('is-invalid');
                document.getElementById('errorEmail').innerText = 'Email wajib diisi!';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('email').classList.add('is-invalid');
                document.getElementById('errorEmail').innerText = 'Format email tidak valid!';
                isValid = false;
            }
            
            // Validasi Pesan
            if (!pesan) {
                document.getElementById('pesan').classList.add('is-invalid');
                document.getElementById('errorPesan').innerText = 'Pesan wajib diisi!';
                isValid = false;
            }
            
            // Validasi Rating
            if (!rating) {
                document.getElementById('rating').classList.add('is-invalid');
                document.getElementById('errorRating').innerText = 'Rating wajib dipilih!';
                isValid = false;
            } else {
                const ratingNum = parseInt(rating);
                if (ratingNum < 1 || ratingNum > 5) {
                    document.getElementById('rating').classList.add('is-invalid');
                    document.getElementById('errorRating').innerText = 'Rating harus antara 1-5!';
                    isValid = false;
                }
            }
            
            // Jika semua valid, tampilkan pesan sukses
            if (isValid) {
                // Sembunyikan form
                formKontak.style.display = 'none';
                
                // Tampilkan pesan sukses
                pesanSukses.classList.remove('d-none');
                
                // Animasi fade in
                pesanSukses.style.opacity = '0';
                setTimeout(() => {
                    pesanSukses.style.opacity = '1';
                    pesanSukses.style.transition = 'opacity 0.5s ease';
                }, 10);
                
                // Scroll ke pesan sukses
                pesanSukses.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    
    // ============================================
    // FUNGSI UMUM
    // ============================================
    
    // Smooth scroll untuk semua anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Console log untuk debugging
    console.log('Script Wisata Daerahku loaded successfully!');
});

