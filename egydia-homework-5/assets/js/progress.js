window.onload = function() {
    let watchedCount = 0; 
    for (let i = 1; i <= 6; i++) {
        const videoStatus = localStorage.getItem('video-' + i + '-status');

        if (videoStatus === 'watched') {
            document.getElementById('video-' + i).classList.add('watched');
            watchedCount++; 
        }
    }
    updateProgress(watchedCount); 
};

for (let i = 1; i <= 6; i++) {
    document.getElementById('video-' + i).addEventListener('click', function() {

      console.log('Video ' + i + ' sedang diputar!');
        localStorage.setItem('video-' + i + '-status', 'watched');
        this.classList.add('watched');
        updateProgress(); 
    });
}


function updateProgress() {
    let watchedCount = 0; 
    const totalVideos = 6; 

    for (let i = 1; i <= totalVideos; i++) {
        if (localStorage.getItem('video-' + i + '-status') === 'watched') {
            watchedCount++;
        }
    }

    const progressValue = (watchedCount / totalVideos) * 100;

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progressValue + '%';
    progressBar.setAttribute('aria-valuenow', progressValue);
    progressBar.textContent = Math.round(progressValue) + '%';
}