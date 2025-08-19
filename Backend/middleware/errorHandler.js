import { errorResponse } from '../utils/httpResponses.js';

export default (err, req, res, next) => {
  console.error(err.stack);
  errorResponse(res, 500, 'Internal Server Error');
};
