import { Request, Response } from 'express';
import axios from 'axios';
import { RecommendationModel } from '../models/recommendation';

export const generateRecommendations = async (req: Request, res: Response) => {
  /**
   * Controller for generating personalized recommendations by calling a mock external service.
   *
   * Steps:
   * 1. Extract `user_id` and `preferences` from the request body.
   * 2. Validate the input data:
   *    - Ensure `user_id` is a non-empty string.
   *    - Ensure `preferences` is a non-empty array of strings.
   * 3. Call the WireMock API at `/llm/generate` to get recommendations based on preferences.
   * 4. Save the generated recommendations to the database.
   * 5. Return the recommendations in the response.
   *
   * Error handling is done using try-catch.
   */

  const WIREMOCK_BASE_URL = process.env.WIREMOCK_URL || 'http://wiremock:8080';
  const { user_id, preferences } = req.body;

  try {
    if (
      !user_id ||
      !preferences ||
      !Array.isArray(preferences) ||
      preferences.length === 0
    ) {
      return res
        .status(400)
        .json({
          error: 'Invalid input data: user_id and preferences are required',
        });
    }

    const response = await axios.post(`${WIREMOCK_BASE_URL}/llm/generate`, {
      preferences: preferences,
    });

    const recommendations = response.data.recommendations;

    const newRecommendation = new RecommendationModel({
      userRef: user_id,
      suggestions: recommendations,
    });

    await newRecommendation.save();

    return res.json({
      user_id,
      recommendations: newRecommendation.suggestions,
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);

    return res.status(500).json({
      error:
        'Unable to generate recommendations at this time. Please try again later.',
    });
  }
};
