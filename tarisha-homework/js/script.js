document.addEventListener('DOMContentLoaded', function () {
    // Saat halaman dimuat, ambil data dari localStorage dan muat ulang tugas
    loadSubmittedTasks();
});

function submitTask(button, fileId, taskTitle) {
    const fileInput = document.getElementById(fileId);
    if (fileInput.files.length === 0) {
        alert('Silakan pilih file sebelum mengirim tugas.');
        return;
    }

    // Simulasi pengiriman tugas
    alert('Apakah Anda Ingin mengumpul "' + taskTitle + '" ?');

    // Pindahkan tugas ke Tugas Sudah Dikerjakan
    const tugasItem = button.closest('.tugas-item');
    const tugasSudahDikerjakan = document.getElementById('tugasSudahDikerjakan');
    
    // Buat elemen baru untuk tugas yang sudah dikerjakan
    const newTaskItem = document.createElement('div');
    newTaskItem.classList.add('tugas-item', 'border', 'p-3', 'mb-2');
    newTaskItem.innerHTML = `
        <p>Judul Tugas: <strong>${taskTitle}</strong></p>
        <p>Nilai: <strong>- (Menunggu Penilaian)</strong></p>
        <button class="btn btn-danger" onclick="hapusTugas(this, '${taskTitle}')">Hapus Tugas</button>
    `;

    // Tambahkan tugas yang sudah dikerjakan ke bagian atas tugas sudah dikerjakan
    tugasSudahDikerjakan.insertBefore(newTaskItem, tugasSudahDikerjakan.firstChild);

    // Simpan tugas ke localStorage
    saveTaskToLocalStorage(taskTitle);

    // Hapus tugas dari Tugas Belum Dikerjakan
    tugasItem.remove();
}

function hapusTugas(button, taskTitle) {
    // Pindahkan tugas kembali ke kolom tugas belum dikerjakan
    const tugasBelumDikerjakan = document.getElementById('tugasBelumDikerjakan');
    
    // Buat elemen baru untuk tugas yang belum dikerjakan
    const newTaskItem = document.createElement('div');
    newTaskItem.classList.add('tugas-item', 'border', 'p-3', 'mb-2');
    newTaskItem.innerHTML = `
        <p>Judul Tugas: <strong>${taskTitle}</strong></p>
        <input type="file" id="file-${taskTitle}" />
        <button class="btn btn-primary" onclick="submitTask(this, 'file-${taskTitle}', '${taskTitle}')">Kirim Tugas</button>
    `;

    // Tambahkan tugas yang belum dikerjakan ke bagian atas tugas belum dikerjakan
    tugasBelumDikerjakan.insertBefore(newTaskItem, tugasBelumDikerjakan.firstChild);

    // Hapus tugas dari localStorage
    removeTaskFromLocalStorage(taskTitle);

    // Hapus tugas dari Tugas Sudah Dikerjakan
    button.closest('.tugas-item').remove();
}

// Fungsi untuk menyimpan tugas ke localStorage (urutan teratas)
function saveTaskToLocalStorage(taskTitle) {
    let submittedTasks = localStorage.getItem('submittedTasks');
    if (submittedTasks) {
        submittedTasks = JSON.parse(submittedTasks);
    } else {
        submittedTasks = [];
    }
    
    // Masukkan tugas ke urutan teratas
    submittedTasks.unshift(taskTitle);
    
    localStorage.setItem('submittedTasks', JSON.stringify(submittedTasks));
}

// Fungsi untuk menghapus tugas dari localStorage
function removeTaskFromLocalStorage(taskTitle) {
    let submittedTasks = localStorage.getItem('submittedTasks');
    if (submittedTasks) {
        submittedTasks = JSON.parse(submittedTasks);
        submittedTasks = submittedTasks.filter(task => task !== taskTitle);
        localStorage.setItem('submittedTasks', JSON.stringify(submittedTasks));
    }
}

// Fungsi untuk memuat tugas dari localStorage saat halaman dimuat
function loadSubmittedTasks() {
    let submittedTasks = localStorage.getItem('submittedTasks');
    if (submittedTasks) {
        submittedTasks = JSON.parse(submittedTasks);
        const tugasSudahDikerjakan = document.getElementById('tugasSudahDikerjakan');
        
        submittedTasks.forEach(taskTitle => {
            // Buat elemen baru untuk setiap tugas yang sudah dikerjakan
            const newTaskItem = document.createElement('div');
            newTaskItem.classList.add('tugas-item', 'border', 'p-3', 'mb-2');
            newTaskItem.innerHTML = `
                <p>Judul Tugas: <strong>${taskTitle}</strong></p>
                <p>Nilai: <strong>- (Menunggu Penilaian)</strong></p>
                <button class="btn btn-danger" onclick="hapusTugas(this, '${taskTitle}')">Hapus Tugas</button>
            `;
            // Tambahkan tugas ke urutan teratas
            tugasSudahDikerjakan.insertBefore(newTaskItem, tugasSudahDikerjakan.firstChild);
        });
    }
}



// Fungsi untuk menampilkan preview gambar dan menyimpannya ke localStorage
function previewImage(event) {
    const reader = new FileReader();
    const imageField = document.getElementById("profile-image-preview");

    reader.onload = function () {
        if (reader.readyState === 2) {
            imageField.src = reader.result;
            // Simpan gambar ke localStorage
            localStorage.setItem('profileImage', reader.result);
        }
    }
    reader.readAsDataURL(event.target.files[0]);
}

// Fungsi untuk mereset gambar ke default dan menghapus dari localStorage
function resetImage() {
    const imageField = document.getElementById("profile-image-preview");
    imageField.src = "img/default.png"; // Ganti dengan path gambar default Anda
    localStorage.removeItem('profileImage');
}

// Fungsi untuk menyimpan data pengguna ke localStorage
function saveUserData() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        email: email,
        password: password
    };

    // Simpan data ke localStorage dalam bentuk JSON
    localStorage.setItem('userData', JSON.stringify(userData));
    alert("Data berhasil diperbarui!");
}

// Fungsi untuk mengambil data pengguna dari localStorage dan mengisinya ke input
function loadUserData() {
    const savedUserData = localStorage.getItem('userData');
    
    if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        document.getElementById('first-name').value = userData.firstName || '';
        document.getElementById('last-name').value = userData.lastName || '';
        document.getElementById('mobile').value = userData.mobile || '';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('password').value = userData.password || '';
    }
}

// Fungsi untuk menghapus data pengguna dari localStorage
function clearUserData() {
    localStorage.removeItem('userData');
    resetImage(); // Reset gambar profil juga
    alert("Profile data cleared!");
}

// Setel data pengguna dan gambar profil dari localStorage saat halaman dimuat
window.onload = function () {
    loadUserData();  // Panggil fungsi untuk mengisi data pengguna ke input form

    // Mengambil gambar profil yang tersimpan di localStorage
    const savedImage = localStorage.getItem('profileImage');
    const imageField = document.getElementById("profile-image-preview");

    if (savedImage) {
        imageField.src = savedImage;
    }
}

// Simpan data pengguna saat tombol update profile diklik
document.getElementById('update-profile-btn').addEventListener('click', saveUserData);

// Event listener untuk file input
document.getElementById('profile-image').addEventListener('change', previewImage);

// Event listener untuk reset image button
document.getElementById('reset-image-btn').addEventListener('click', resetImage);

// Event listener untuk clear data button
document.getElementById('clear-profile-btn').addEventListener('click', clearUserData);

