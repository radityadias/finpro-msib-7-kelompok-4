var uppy = new Uppy.Core({
    debug: true,
    autoProceed: false,
    restrictions: {
        maxFileSize: 5000000, 
        maxNumberOfFiles: 20,
        allowedFileTypes: null 
    }
})
.use(Uppy.Dashboard, {
    inline: true,
    target: '#drag-drop-area',
    proudlyDisplayPoweredByUppy: false,
    width: '100%',
    height: 470,
    note: 'Ukuran maksimum untuk berkas baru: 5 MB, lampiran maksimum: 20'
})
.use(Uppy.XHRUpload, {
    endpoint: 'https://your-upload-endpoint.com/upload',
    formData: true,
    fieldName: 'files[]'
});

uppy.on('complete', (result) => {
    console.log('Upload complete! Weve uploaded these files:', result.successful)
});

document.getElementById('submit-button').addEventListener('click', () => {
    uppy.upload().then((result) => {
        console.log('Upload completed:', result);
    }).catch((err) => {
        console.error('Upload failed:', err);
    });
});

document.getElementById('cancel-button').addEventListener('click', () => {
    uppy.reset(); 
    console.log('Upload cancelled.');
});