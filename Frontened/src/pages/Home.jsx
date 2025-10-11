import Navbar from "../components/Navbar.jsx";


export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center h-screen px-4">
        <h1 className="text-5xl font-bold text-indigo-700 mb-4 mt-16">
          Welcome to MyApp
        </h1>
        <p className="text-gray-600 text-lg mb-6 max-w-md">
          Streamline your workflow and stay connected with ease.  
          Login or sign up to access your dashboard.
        </p>
        <img
          src="https://cdn.dribbble.com/users/2704418/screenshots/7466903/media/9d0b6b8960e97c544ebce31edc0eb45b.png"
          alt="Welcome illustration"
          className="w-2/3 md:w-1/3 rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
}


