import { body, ValidationChain } from 'express-validator';


export const validateRecommendationsRequest: ValidationChain[] = [
  body('user_id')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('User ID is required and must be a non-empty string'),
  body('preferences')
    .isArray({ min: 1 })
    .withMessage('Preferences must be a non-empty array of strings'),
  body('preferences.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each preference must be a non-empty string'),
];

export interface RecommendationsRequestBody {
  user_id: string;
  preferences: string[];
}
