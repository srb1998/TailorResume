FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Install the system dependencies required by WeasyPrint on Linux
# This is the equivalent of what you did on Windows with MSYS2
RUN apt-get update && apt-get install -y \
    libgtk-3-0 \
    libpango-1.0-0 \
    libgdk-pixbuf2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy your Python requirements file and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your backend code into the container
COPY . .

# Command to run your FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]