import mongoose from 'mongoose';
import { errorResponse } from '../utils/httpResponses.js';

export default (req, res, next) => {
  const { siteId } = req.params;
  if (siteId && !mongoose.Types.ObjectId.isValid(siteId)) {
    return errorResponse(res, 400, 'Invalid site ID');
  }
  if (
    req.body.constructionSite &&
    !mongoose.Types.ObjectId.isValid(req.body.constructionSite)
  ) {
    return errorResponse(res, 400, 'Invalid construction site ID');
  }
  next();
};
