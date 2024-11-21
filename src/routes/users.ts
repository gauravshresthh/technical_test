import { Router } from 'express';
import { getRecommendations } from '../controllers/users-controller';
const router = Router();

/**
 * TODO: Set up the `/users/:userRef/recommendations` GET route.
 *
 * Steps:
 * 1. Use the `getUserRecommendations` controller to handle the request.
 * 2. Ensure the `userRef` parameter is extracted correctly.
 * 3. Handle any errors appropriately.
 *
 * Hints:
 * - No additional validation middleware is required unless you want to validate `userRef`.
 */

// Example (from a different context):

/*
 router.get('/:userRef/suggestions', getUserRecommendations);
 */

router.get('/:userRef/recommendations', getRecommendations);

export default router;
