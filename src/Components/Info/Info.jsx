import React, { useState } from "react";
import "./Info.css";
import { useNavigate } from "react-router-dom";

export default function Info() {
  const faqs = [
    {
      question: "Do I need to register to browse cars?",
      answer:
        "You can browse car listings freely, but to view detailed information or favorite cars, registration and login are required.",
    },
    {
      question: "How can I add my own car listing?",
      answer:
        "After logging in, you can add a new car by navigating to the 'Add Car' section and filling out the required details.",
    },
    {
      question: "Can I edit or delete my car listings?",
      answer:
        "Yes, you have full control over your own listings. You can edit or delete them anytime from your profile dashboard.",
    },
    {
      question: "What happens if I forget my password?",
      answer:
        "Currently, password recovery is not available. Please contact support or register a new account.",
    },
    {
      question: "How can I favorite a car?",
      answer:
        "You must be logged in to favorite a car. Simply click the heart icon on the car card to add it to your favorites.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, CarShop uses JWT token-based authentication and secure storage practices to protect your data.",
    },
    {
      question: "Can I view the cars I have posted?",
      answer:
        "Yes, in your profile area, you can view a list of all cars you have added to the platform.",
    },
  ];

  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="info-container">
      <div className="info-box animate-in">
        <h2>Welcome to CarShop!</h2>
        <p>
          <strong>CarShop</strong> is your trusted platform to find, share, and
          manage car listings.
        </p>

        <h3>📌 What you can do as a user:</h3>
        <ul>
          <li>
            <strong>Register / Log in</strong> to get full access
          </li>
          <li>
            <strong>View full car details</strong> (only available after login)
          </li>
          <li>
            <strong>Mark cars as Favorite</strong> and keep track of your
            favorite ones
          </li>
          <li>
            <strong>Add your own car</strong> to the marketplace
          </li>
          <li>
            <strong>Edit or delete</strong> your own car listings anytime
          </li>
          <li>
            <strong>Update your profile</strong> information from your account
          </li>
          <li>
            <strong>View your personal car list</strong> (My Cars section)
          </li>
        </ul>

        <h3>🔐 Why you need to register?</h3>
        <ul>
          <li>To protect your listings and personalize your experience</li>
          <li>To save your favorite cars</li>
          <li>To enable profile and listing management features</li>
        </ul>

        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="faq-question">{item.question}</h3>
                {activeIndex === index && (
                  <p className="faq-answer">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
