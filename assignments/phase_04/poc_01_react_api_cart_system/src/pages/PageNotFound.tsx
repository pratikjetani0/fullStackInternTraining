import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f8f8f8] px-6">
      <h1 className="text-8xl font-bold text-black">
        404
      </h1>

      <p className="text-2xl mt-4 font-medium">
        Page Not Found
      </p>

      <p className="text-gray-500 mt-2 text-center">
        The page you're looking for doesn't exist.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-black text-white px-8 py-4 rounded-xl"
      >
        Back to Home
      </button>
    </div>
  );
};

export default PageNotFound;