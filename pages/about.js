import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <h1 className="text-5xl font-bold text-center mb-10">About Us</h1>
      
      <div className="max-w-4xl mx-auto space-y-8 text-lg leading-relaxed">
        <p>
          Welcome to <span className="text-yellow-400 font-semibold">ShopNest</span>, a modern online shopping system developed as part of our academic project. 
          This platform is designed to streamline the shopping experience for both customers and administrators.
        </p>

        <p>
          The primary objective of this project is to create an easy-to-use web application where users can browse and purchase products,
          while administrators can manage inventory, view orders, and keep track of customer data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 text-yellow-300">Project Features:</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Customer registration and login system</li>
          <li>Product catalog with dynamic filtering and search</li>
          <li>Shopping cart and order placement</li>
          <li>Admin dashboard for managing products and users</li>
          <li>Email notifications using Mail API for order confirmation</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 text-yellow-300">Technology Stack:</h2>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li><span className="text-yellow-200">Frontend:</span> HTML, CSS, Bootstrap, React</li>
          <li><span className="text-yellow-200">Backend:</span> Spring Boot, Java, JDBC</li>
          <li><span className="text-yellow-200">Database:</span> MySQL</li>
        </ul>

        <p className="mt-6">
          Our goal with this project is to enhance our understanding of full-stack development and deliver a feature-rich, practical e-commerce solution.
        </p>
      </div>
    </div>
  );
}
