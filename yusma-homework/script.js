const navLinks = document.querySelectorAll(".navbar-nav li a");
const navbar = document.getElementById('navbarNav');
const toggler = document.getElementById('toggler');
const overlay = document.getElementById('overlay');

// Fungsi untuk toggle sidebar
function toggleSidebar() {
    navbar.classList.toggle('show');
    overlay.classList.toggle('show');
    toggler.classList.toggle('hide'); // Menggunakan class 'hide' untuk mengontrol toggler
}

// Menghilangkan navbar dan menampilkan toggler setelah mengklik link
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('show')) {
            navbar.classList.remove('show');
            overlay.classList.remove('show');
            toggler.classList.remove('hide'); // Pastikan toggler muncul kembali setelah link diklik
        }

        // Memanggil showSection dengan id dari link yang diklik
        const sectionId = link.getAttribute('href').substring(1); // Mengambil id section dari href
        showSection(sectionId);
    });
});

// Fungsi untuk menampilkan atau menyembunyikan profile
function profile() {
    const infoProfile = document.getElementById('infoProfile');
    const displayProfile = document.getElementById('displayProfile');

    if (infoProfile.classList.contains('d-none')) {
        infoProfile.classList.remove('d-none');
        displayProfile.classList.add('d-none');
    } else {
        infoProfile.classList.add('d-none');
        displayProfile.classList.remove('d-none');
    }
}

const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');
const courseContent = document.getElementById('courseContent');

scrollLeftBtn.addEventListener('click', () => {
    courseContent.scrollBy({
        top: 0,
        left: -200, 
        behavior: 'smooth'
    });
});

scrollRightBtn.addEventListener('click', () => {
    courseContent.scrollBy({
        top: 0,
        left: 200, 
        behavior: 'smooth'
    });
});

// Default tampilkan "Course List" section
document.addEventListener("DOMContentLoaded", function() {
    showSection('course'); // Menampilkan section "Course List" secara default
});

// Fungsi untuk menampilkan section
function showSection(sectionId) {
    // Sembunyikan semua section
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });

    // Tampilkan section yang dipilih
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}
