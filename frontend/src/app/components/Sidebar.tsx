'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
    const pathname = usePathname()

  return (
    <div className="w-1/4 bg-gray-100 h-screen p-4">
      <h1 className="text-lg font-bold mb-6">OB Technical Test</h1>
      <div className="space-y-2">
        <Link href="/create-interests" legacyBehavior>
          <a
            className={`block py-2 px-4 rounded-md ${
              pathname === "/create-interests"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Create Interests
          </a>
        </Link>
        <Link href="/get-interests" legacyBehavior>
          <a
            className={`block py-2 px-4 rounded-md ${
              pathname === "/get-interests"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Get Interests
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
