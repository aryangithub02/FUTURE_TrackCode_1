import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("📤 Sending form data:", formData);
  
      const response = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      console.log("📥 Raw response:", response);
  
      const text = await response.text(); // get raw response first
      console.log("📄 Response text:", text);
  
      let result;
      try {
        result = JSON.parse(text); // attempt to parse
      } catch (err) {
        throw new Error("Invalid JSON response from server");
      }
  
      if (response.ok) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("❌ Error: " + (result.error || "Something went wrong"));
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("⚠️ Server error. Please try again.");
    }
  };
  
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Get In{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6"></div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Let's discuss your next project or just say hello!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p className="text-gray-400 mb-6">
              Feel free to reach out through any of the platforms below.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400 w-5 h-5" />
                <span className="text-gray-300">aryanmotghare92@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaGithub className="text-blue-400 w-5 h-5" />
                <a
                  href="https://github.com/aryangithub02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400"
                >
                  github.com/aryangithub02
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaLinkedin className="text-blue-400 w-5 h-5" />
                <a
                  href="https://linkedin.com/in/aryan-motghare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400"
                >
                  linkedin.com/in/aryan-motghare
                </a>
              </div>
           
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Your Message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
