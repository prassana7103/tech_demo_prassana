# # Use the official Python image from the Docker Hub
# FROM python:3.10-slim

# # Set the working directory in the container
# WORKDIR /app


# # Install system dependencies needed for Python packages
# RUN apt-get update \
#     && apt-get install -y --no-install-recommends \
#     gcc \
#     libpq-dev \
#     pkg-config \
#     default-libmysqlclient-dev \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/*

# # Upgrade pip
# RUN pip install --upgrade pip

# # Copy the requirements file into the container
# COPY requirements.txt .

# # Install Python dependencies
# RUN pip install -r requirements.txt

# # Copy the rest of the application code into the container
# COPY . .

# # Make migrations and start the Django server
# CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
FROM python:3.10-alpine

# Set the working directory in the container
WORKDIR /app

# Install system dependencies needed for Python packages
RUN apk update && apk add --no-cache \
    gcc \
    musl-dev \
    libpq-dev \
    libffi-dev \
    pkgconfig \
    mariadb-dev \
    mariadb-connector-c \
    linux-headers \
    dcron

# Upgrade pip
RUN pip install --upgrade pip

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Add the cron job
RUN echo "*/2 * * * * cd /app && /usr/local/bin/python manage.py fetch_stock_data >> /var/log/cron.log 2>&1" > /etc/crontabs/root

# Expose the port Django will run on
EXPOSE 8000

# Make migrations and start the Django server
CMD ["sh", "-c", "python manage.py migrate && crond && python manage.py runserver 0.0.0.0:8000"]
