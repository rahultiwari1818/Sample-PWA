import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ImageUpload() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('file', image); // The field name should match the one expected by the backend
    });

    try {
      const response = await fetch('https://storeview.in/api/v1/guest/uploadMultiplePhotos', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setIsLoading(false);
      setMessage(data.message);
      setImages([]);

      toast.success(data.message || 'Images uploaded successfully');
    } catch (error) {
      setIsLoading(false);
      setMessage('An error occurred while uploading images.');
      toast.error('An error occurred while uploading images.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Image Upload</h1>
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="mb-4"
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading || images.length === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Uploading...
          </div>
        ) : (
          'Upload Images'
        )}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default ImageUpload;
