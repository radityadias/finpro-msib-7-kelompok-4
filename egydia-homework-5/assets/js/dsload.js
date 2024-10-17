window.onload = function() {
    updateProgress(); 
};


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