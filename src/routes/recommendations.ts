import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  validateRecommendationsRequest,
  RecommendationsRequestBody,
} from '../utils/schemas';
import { generateRecommendations } from '../controllers/recommendations-controller';

const router = Router();

router.post(
  '/',
  validateRecommendationsRequest,
  (req: Request<{}, {}, RecommendationsRequestBody>, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    generateRecommendations(req, res);
  }
);

export default router;
