import { useState } from 'react';
import { Upload, Loader2, Download, Sparkles } from 'lucide-react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setGeneratedImage(null);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) setGeneratedImage(data.imageUrl);
      else alert('Failed: ' + JSON.stringify(data));
    } catch (error) {
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Pickabook Magic Avatar</h1>
        <p>Personalise your storybook character</p>
      </header>
      <div className="card">
        <div className="upload-area">
          {preview ? <img src={preview} className="preview" /> : <div className="placeholder"><Upload /> Upload Photo</div>}
          <input type="file" onChange={handleFileChange} className="file-input" />
        </div>
        <button onClick={handleGenerate} disabled={loading || !selectedFile} className="btn-primary">
          {loading ? <Loader2 className="spin"/> : <Sparkles />} Generate
        </button>
        {generatedImage && (
          <div className="result">
            <img src={generatedImage} className="result-img" />
            <a href={generatedImage} target="_blank" className="btn-secondary"><Download size={16}/> Download</a>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;