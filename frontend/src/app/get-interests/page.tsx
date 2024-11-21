'use client'
import { useState, ChangeEvent, MouseEvent } from "react";
import Sidebar from "../components/Sidebar";
import axios, { AxiosError } from "axios";

interface RecommendationResponse {
  recommendations: string[];
}

const GetInterests: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUserInterests = async (userRef: number): Promise<RecommendationResponse | null> => {
    try {
      const response = await axios.get<RecommendationResponse>(`http://localhost:8000/users/${userRef}/recommendations`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        setError(axiosError.message);
      } else {
        setError("An unexpected error occurred");
      }
      return null;
    }
  };

  const fetchInterests = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    setInterests([]);
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userRef = Number(userId);
    if (!userId || isNaN(userRef)) {
      setError("Invalid user ID");
      setLoading(false);
      return;
    }

    const data = await getUserInterests(userRef);
    if (data) {
      setInterests(data.recommendations);
    } else {
      setInterests([]);
    }

    setLoading(false);
  };

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserId(e.target.value);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-6">
        <h2 className="text-lg font-bold mb-4">Get Interests</h2>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-gray-700 font-medium">
            User ID:
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={handleUserIdChange}
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>
        <button
          onClick={fetchInterests}
          className={`mb-6 py-2 px-4 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Interests"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <h3 className="text-gray-700 font-medium mb-2">Interests:</h3>
          <ul className="list-disc list-inside">
            {interests.length > 0 ? (
              interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))
            ) : (
              <li>No interests found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GetInterests;
