# ---- Build Stage ----
# Use an official Node runtime as a parent image
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Set the REACT_APP_API_URL environment variable
ENV REACT_APP_API_URL=https://stingray-app-xuait.ondigitalocean.app

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the React app
RUN npm run build

# ---- Run Stage ----
# Use Nginx to serve the React App
FROM nginx:1.19

# Copy the build folder from the build stage and set it as the nginx root directory
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf 

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]