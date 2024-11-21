'use client';

import { useState, ChangeEvent, MouseEvent } from "react";
import axios, { AxiosError } from "axios";
import Sidebar from "../components/Sidebar";

interface CreateInterestData {
  user_id: string;
  preferences: string[];
}

const CreateInterests: React.FC = () => {
  const [interests, setInterests] = useState<string[]>([""]);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInterestChange = (index: number, value: string): void => {
    const updatedInterests = [...interests];
    updatedInterests[index] = value;
    setInterests(updatedInterests);
  };

  const addInterestField = (): void => setInterests([...interests, ""]);
  const removeInterestField = (index: number): void => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!userId || interests.some(interest => interest.trim() === "")) {
      setError("User ID and interests cannot be empty.");
      setLoading(false);
      return;
    }

    const data: CreateInterestData = { user_id: userId, preferences: interests };

    try {
      const response = await axios.post<CreateInterestData>('http://localhost:8000/recommendations', data);
      console.log('Response:', response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        setError(axiosError.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserId(e.target.value);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-6">
        <h2 className="text-lg font-bold mb-4">Create Interests</h2>
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
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Interests:
          </label>
          {interests.map((interest, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={interest}
                onChange={(e) => handleInterestChange(index, e.target.value)}
                placeholder={`Interest ${index + 1}`}
                className="flex-1 p-2 border rounded-md"
              />
              {interests.length > 1 && (
                <button
                  onClick={() => removeInterestField(index)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  -
                </button>
              )}
            </div>
          ))}
          <button onClick={addInterestField} className="mt-2 text-blue-500">
            + Add Interest
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className={`mt-6 py-2 px-4 rounded-md ${loading ? 'bg-gray-400' : 'bg-green-500 text-white'}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default CreateInterests;
