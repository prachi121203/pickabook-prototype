# Architecture Diagram 

+---------------------+        +----------------------+
|   User (Browser)    |        |   Replicate Cloud    |
|                     |        |                      |
|  [ React Frontend ] |        |  [ AI Model Host ]   |
+----------+----------+        +-----------+----------+
           |                               ^
           | 1. Upload Photo               | 3. Send Request
           v                               |    (Image + Prompt)
+---------------------+                    |
|   Node.js Server    |--------------------+
|                     |
|  [ API Controller ] |<-------------------+
|  [ Multer Upload ]  |    4. Return URL
+---------------------+       (Generated Image)



# Engineering Notes

## 1. Model Choice: InstantID via Replicate
I chose **InstantID** hosted on **Replicate** for this prototype.

**Rationale:** The assignment requires personalizing a specific illustration style with a user's face. Standard Stable Diffusion approaches (like img2img) often lose the user's identity or distort the target style.
**Why InstantID?** It utilizes a "IdentityNet" control mechanism that decouples facial features from the style. This allows for "Zero-shot" personalization—meaning we can map a child's face onto the Pickabook 3D template without needing to fine-tune a custom LoRA model for every single user (which would take 20+ minutes per user).
**Why Replicate?** Using a serverless GPU API was a pragmatic choice to avoid managing infrastructure (Docker/CUDA) and to ensure the prototype is easily reproducible by the review team without hardware constraints.

## 2. Limitations Encountered
**Cold Boots:** As the model is hosted on a serverless architecture, the first request after a period of inactivity can take 1–2 minutes to "warm up" the GPU. Subsequent requests are fast (~5s).
**Strict Safety Filters:** The commercially hosted model has strict NSFW/safety filters. Occasionally, innocent images (e.g., a child in a swimsuit) might trigger a false positive and block generation.
**Lighting Bias:** If the uploaded user photo has harsh lighting or deep shadows, it sometimes bleeds into the 3D render, affecting the "Pixar" aesthetic.

## 3. Improvements for v2
If moving this from prototype to production, I would implement:
**Asynchronous Queue (Redis/BullMQ):** Currently, the HTTP request hangs until generation is complete. A production app should offload this to a background worker and use WebSockets or Polling to update the UI.
**S3 Storage:** The current prototype processes images in memory/base64 to keep the architecture simple. v2 would upload images to AWS S3 first and pass the URL to the AI to reduce bandwidth load.
**Face Pre-validation:** Implement a lightweight model (like MediaPipe) on the frontend to warn the user if no face is detected *before* they upload, saving server costs.
