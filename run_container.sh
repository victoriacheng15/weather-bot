#!/bin/bash

container_name="the-bot" # Replace with your actual container name

# Check if the Dockerfile has been modified more recently than the existing image
if [[ $(find . -name "Dockerfile" -mmin -1) ]]; then
  echo "Dockerfile has been updated. Would you like to:"
  echo "1. Update the container with the new image"
  echo "2. Run the existing container without updating"

  read -p "Enter your choice (1 or 2): " choice

  if [[ $choice == 1 ]]; then
    echo "Updating container..."

    # Rebuild the image
    docker build -t $container_name .

    # Check if the container is running
    if [[ $(docker ps -q --filter "name=$container_name") ]]; then
      # Stop the existing container
      docker stop $container_name
    fi

    # Remove the existing container (optional, for a clean start)
    docker rm $container_name

    # Create and start a new container from the updated image
    docker run --name $container_name # Add your desired options here

  else
    echo "Running existing container without updates..."
    docker start $container_name
  fi

else
  echo "Dockerfile is up-to-date. Running existing container..."
  docker start $container_name
fi
