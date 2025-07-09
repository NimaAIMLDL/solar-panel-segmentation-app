FROM python:3.10-slim

# Install system dependencies needed by OpenCV (cv2) and Pillow
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
       libgl1 \
       libglib2.0-0 \
       libsm6 \
       libxext6 \
       libxrender1 \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ./app/model_weights /app/model_weights

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY ./app /app/app

EXPOSE 8001

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
