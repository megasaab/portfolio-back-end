import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { PORTFOLIO } from "../model/portfolio";

const portfolioRouter = Router();

portfolioRouter.get('/get-all', async (request, response) => {
    try {
        const portfolios = await PORTFOLIO.find();
        return response.json(portfolios);
    } catch (error) {
        return response.status(StatusCodes.NOT_FOUND).json({ success: false, error: error })
    }
});

portfolioRouter.get('/get-by-id/:id', async (request, response) => {
    try {
      const result = await PORTFOLIO.findById(request.params.id);
      return response.status(StatusCodes.OK).json({ success: true, result });
    } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error })
    }
  });

export default portfolioRouter;