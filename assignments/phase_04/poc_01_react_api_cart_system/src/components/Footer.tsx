import { Camera, Send, Play, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5] px-8 py-7">
      <div className="flex flex-col md:flex-row justify-between items-center pt-2 gap-6">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} SCOPE. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-5">
          <Globe className="cursor-pointer hover:text-gray-400" />
          <Camera className="cursor-pointer hover:text-gray-400" />
          <Send className="cursor-pointer hover:text-gray-400" />
          <Play className="cursor-pointer hover:text-gray-400" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
