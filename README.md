# ☀️ PV Segmentation App – Public Demo

A web application for automatically detecting and segmenting photovoltaic panels in aerial imagery using a deep semantic segmentation model (U-Net), trained specifically on satellite imagery.

> 🔐 **Authentication/Login Removed for Public Demo**  
> This app was originally based on the [full-stack-fastapi-template](https://github.com/fastapi/full-stack-fastapi-template).  
> All login/signup logic has been **removed** in this demo version to simplify public usage.

---

## 🌐 Live Demo

👉 [View Live Demo Here](https://your-app-demo-link.com)

---

## 📂 Project Structure

```text
├── backend/         # FastAPI app with PostgreSQL + APIs
├── frontend/        # Vite + React dashboard UI
├── segmentation/    # Semantic segmentation service using U-Net
├── docker-compose.yml
├── .env
└── README.md
```

---

## 🚀 Features

- 🛰️ Photovoltaic panel segmentation in aerial images  
- 📊 PV calculations from segmented masks  
- 🧪 Drag-and-drop interface to test easily 
- ⚡ Fast inference via U-Net
- 🐳 Dockerized development and deployment

---

## 🧪 Try the Segmentation Demo

### 👉 Test with example images:

Right-click and **“Save As”** to download example aerial images:

- ![Image 1](https://raw.githubusercontent.com/NimaAIMLDL/solar-panel-segmentation-app/main/frontend/src/assets/test-data/rooftop_pv_1.png)
- ![Image 2](https://raw.githubusercontent.com/NimaAIMLDL/solar-panel-segmentation-app/main/frontend/src/assets/test-data/rooftop_pv_2.png)
- ![Image 3](https://raw.githubusercontent.com/NimaAIMLDL/solar-panel-segmentation-app/main/frontend/src/assets/test-data/rooftop_pv_3.png)
- ![Image 4](https://raw.githubusercontent.com/NimaAIMLDL/solar-panel-segmentation-app/main/frontend/src/assets/test-data/rooftop_pv_4.png)
- ![Image 5](https://raw.githubusercontent.com/NimaAIMLDL/solar-panel-segmentation-app/main/frontend/src/assets/test-data/rooftop_pv_5.png)

Or find and download them from here: `frontend/src/assets/test-data`

Then drag and drop them into the segmentation interface in the dashboard.

---

## ⚙️ Tech Stack

| Technology | |
|------------|--|
| ![Python](https://img.shields.io/badge/python-3670A0?style=flat&logo=python&logoColor=white) | ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi) |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) |
| ![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white) | ![Keras](https://img.shields.io/badge/Keras-D00000?style=flat&logo=keras&logoColor=white) |
| ![Scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat&logo=scikitlearn&logoColor=white) | ![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=flat&logo=opencv&logoColor=white) 

---

## 🐳 Local Development

Start all services using Docker Compose:

```bash
docker compose --env-file .env -f docker-compose.yml up --build
```

Then access the services:

- 🌐 **Frontend**: [http://localhost:5173](http://localhost:5173)  
- 🧪 **Backend API (docs)**: [http://localhost:8000/docs](http://localhost:8000/docs)  
- 🧠 **Segmentation Server**: [http://localhost:8001](http://localhost:8001)  
- 🗃️ **Adminer (Postgres DB Viewer)**: [http://localhost:8080](http://localhost:8080)

---

## 📄 License

This project is licensed under the MIT License.

See [LICENSE](./LICENSE) and [LICENSES_THIRD_PARTY.md](./LICENSES_THIRD_PARTY.md) for third-party notices.
