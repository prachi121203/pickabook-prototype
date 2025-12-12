require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Replicate = require('replicate');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const TEMPLATE_IMAGE_URL = "piclumen-1744033346326.png"; 

const bufferToDataURI = (buffer, mimetype) => {
  return `data:${mimetype};base64,${buffer.toString('base64')}`;
};

app.post('/api/generate', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image provided' });

    console.log('Generating...');
    const imageURI = bufferToDataURI(req.file.buffer, req.file.mimetype);

    const output = await replicate.run(
  "zsxkib/instant-id",
  {
    input: {
      image: imageURI,
      pose_image: "https://yourdomain.com/piclumen-1744033346326.png",
      prompt: "3d style, disney pixar cartoon style, cute girl, vibrant colors, 4k",
      negative_prompt: "photo, realistic, text, watermark, ugly, low quality",
      style_strength: 0.8,
      identity_strength: 0.8,
      num_inference_steps: 30,
      guidance_scale: 5
    }
  }
);

    res.json({ success: true, imageUrl: output[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
