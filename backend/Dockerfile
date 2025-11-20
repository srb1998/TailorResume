FROM python:3.12-slim-bookworm

# Set the working directory
WORKDIR /app

# Install system dependencies required for WeasyPrint and PDF generation
# We use the updated package names for Debian Bookworm
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    python3-pip \
    python3-setuptools \
    python3-wheel \
    python3-cffi \
    libcairo2 \
    libpango-1.0-0 \
    libpangoft2-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf-2.0-0 \
    libffi-dev \
    shared-mime-info \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Run the application
CMD sh -c "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"