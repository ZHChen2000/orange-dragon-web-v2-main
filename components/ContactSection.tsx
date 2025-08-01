"use client";
import React from "react";

export default function ContactSection() {
  const [showEmailPopup, setShowEmailPopup] = React.useState(false);

  const handleShowEmailPopup = () => {
    setShowEmailPopup(true);
  };

  const handleCloseEmailPopup = () => {
    setShowEmailPopup(false);
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8 text-orange-600">联系我们</h2>
        <p className="text-gray-600 mb-8">如有合作意向或业务咨询，欢迎随时联系我们</p>
        <div className="flex justify-center space-x-6">
          {/* Send Email Button - Opens Popup */}
          <button
            className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 text-lg font-semibold flex items-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={handleShowEmailPopup}
          >
            <span className="text-xl">✉️</span>发送邮件
          </button>
          {/* Online Consultation Link */}
          <a
            href="/chat"
            className="bg-white border-2 border-orange-500 text-orange-600 px-8 py-3 rounded-full hover:bg-orange-50 hover:border-orange-600 hover:text-orange-700 transition-all duration-300 text-lg font-semibold flex items-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="text-xl">💬</span>在线咨询
          </a>
        </div>
      </div>

      {/* Email Popup */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseEmailPopup}>
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm mx-auto text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">我们的邮箱</h3>
            <p className="text-orange-600 text-2xl font-bold mb-4">zhchen2000@foxmail.com</p>
            <button
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
              onClick={handleCloseEmailPopup}
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </section>
  );
} 