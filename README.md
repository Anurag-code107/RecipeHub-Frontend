# **Recipe Hub - Frontend**

## **Overview**

Recipe Hub is a full-stack web application that allows food enthusiasts to explore, share, and manage recipes. This repository contains the frontend for the application, which is built using **Angular 18** and styled with **Tailwind CSS** and **Angular Material**.

The frontend connects to the backend built with **Spring Boot 3** and a **MySQL** database.

For the backend, check out the [Recipe Hub Backend repository](https://github.com/Anurag-code107/RecipeHub-Backend).

---

## **Technologies Used**

- **Angular 18**: Frontend framework
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Angular Material**: UI component library for building responsive layouts and components
- **JWT Authentication**: To manage secure access to the application
- **Font Awesome**: For icons in the UI
- **PrimeNG**: UI component library for Angular

---

## **Features**

- **Recipe Display**: Users can view recipes created by them or other users.
- **Recipe Creation**: Authenticated users can create, update, and delete recipes.
- **Like Recipes**: Users can like recipes to show appreciation.
- **User Authentication**: Users can register, log in, and authenticate using JWT.
- **Responsive UI**: The application is fully responsive and designed for both desktop and mobile devices.

---

## **Live Demo**

You can try the live version of the Recipe Hub through the link below:  
[Live Demo](https://recipehub-cwd.pages.dev/)

The project is deployed on Cloudflare Pages (frontend), with a backend deployed on Railway. Note that authentication will be required to fully interact with the application.

---

## **Installation Guide**

### **Pre-requisites**

To run the frontend locally, ensure you have the following tools installed:

- **Node.js** (version 18 or higher)
- **Angular CLI** (version 15 or higher)
- **npm** (Node Package Manager)

### **Clone the Repository**

Clone the repository to your local machine:

```bash
git clone https://github.com/Anurag-code107/RecipeHub-Frontend.git
cd RecipeHub-Frontend
```

### **Install Dependencies**

Install the required dependencies using npm:

```bash
npm install
```

---

## **Running the Application**

### **Start the Development Server**

To start the frontend application in development mode, run the following command:

```bash
ng serve
```

The frontend will be accessible at:  
`http://localhost:4200/`

---

## **Authentication (JWT)**

- The frontend interacts with the backend API for user registration, login, and authentication.
- Upon successful login, the backend will return a **JWT token**, which will be used for accessing protected routes.
- The token is stored in the browser's local storage and added to the headers of requests to the backend.

---

## **API Integration**

The frontend communicates with the backend API to perform actions such as:

- **Get All Recipes**: Fetches a list of all available recipes.
- **Create/Update/Delete Recipes**: Allows authenticated users to manage their recipes.
- **Like Recipes**: Allows users to like recipes, triggering updates to the backend.

---

## **Contributing**

We welcome contributions to this project! Please fork the repository and submit a pull request with your changes.

---

## **License**

This project is licensed under the **MIT License**.

---

## **Support**

If you encounter any issues or have any questions, feel free to open an issue in the [GitHub repository issues page](https://github.com/Anurag-code107/RecipeHub-Frontend/issues) or contact us directly at [anuragnegi2704@gmail.com](mailto:anuragnegi2704@gmail.com).

---

