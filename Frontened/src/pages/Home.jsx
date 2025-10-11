import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import {
  Code,
  ShieldCheck,
  GitBranch,
  Server,
  Zap,
  BarChart3,
  CheckCircle2,
  Rocket,
  Gauge,
} from "lucide-react";

export default function Home() {
  const images = [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const services = [
    { icon: <Code size={32} />, title: "Automated Builds" },
    { icon: <ShieldCheck size={32} />, title: "Secure Deployments" },
    { icon: <GitBranch size={32} />, title: "Version Control Integration" },
    { icon: <Server size={32} />, title: "Scalable Infrastructure" },
    { icon: <Zap size={32} />, title: "Fast CI/CD Pipelines" },
    { icon: <BarChart3 size={32} />, title: "Performance Monitoring" },
  ];

  const whyChooseUs = [
    {
      icon: <Rocket size={36} />,
      title: "Lightning Fast Delivery",
      desc: "Reduce your release cycles with automated builds and parallel deployments.",
    },
    {
      icon: <CheckCircle2 size={36} />,
      title: "Reliability You Can Trust",
      desc: "Our pipelines are built with redundancy and error recovery at every step.",
    },
    {
      icon: <Gauge size={36} />,
      title: "Real-Time Insights",
      desc: "Get visibility into builds, test coverage, and deployment success in one dashboard.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
      <Navbar />

      {/* Carousel */}
      <div className="relative w-full h-[65vh] overflow-hidden rounded-xl mt-4 shadow-lg">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Welcome Line */}
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          Welcome to Our CI/CD Pipeline Product
        </h1>
        <p className="mt-2 text-gray-600">
          Streamline your deployment process with automation, speed, and
          reliability.
        </p>
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {services.map((service, i) => (
          <div
            key={i}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="text-indigo-600 mb-3">{service.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">
              {service.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-16 px-6 lg:px-20 mt-6 shadow-inner rounded-t-3xl">
        <h2 className="text-center text-3xl font-bold text-indigo-700 mb-10">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseUs.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-all duration-300"
            >
              <div className="text-indigo-600 mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 max-w-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white text-center py-4 mt-8 rounded-t-2xl">
        <p>
          © {new Date().getFullYear()} CI/CD Pipeline Product — All Rights
          Reserved
        </p>
      </footer>
    </div>
  );
}
