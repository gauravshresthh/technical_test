import { Request, Response } from 'express';
import { RecommendationModel } from '../models/recommendation';
export const getRecommendations = async (req: Request, res: Response) => {
  const { userRef } = req.params;

  try {
    const recommendations = await RecommendationModel.findOne({ userRef });

    if (!recommendations) {
      return res.status(404).json({
        error: `No recommendations found for user with ID ${userRef}`,
      });
    }

    return res.status(200).json({
      userRef,
      recommendations: recommendations.suggestions,
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return res.status(500).json({
      error:
        'Unable to fetch recommendations at this time. Please try again later.',
    });
  }
};
