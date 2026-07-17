# Use lightweight Python slim image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install dependency configuration
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code files
COPY . .

# Run model training to generate pickled similarity models and heatmaps
RUN python train_recommender.py

# Expose Flask API port
EXPOSE 5001

# Start Flask server
CMD ["python", "ai_server.py"]
