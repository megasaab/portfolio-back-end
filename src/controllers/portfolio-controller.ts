import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { authMiddleware } from "../middleware/auth";
import { PORTFOLIO } from "../model/portfolio";
import { PROJECT } from "../model/project";
import { USER } from "../model/user";

const portfolioRouter = Router();

portfolioRouter.get('/get-all', async (request, response) => {
  try {
    const portfolios = await PORTFOLIO.find();
    return response.json(portfolios);
  } catch (error) {
    return response.status(StatusCodes.NOT_FOUND).json({ success: false, error: error?.toString() })
  }
});

portfolioRouter.get('/get-by-id/:id', async (request, response) => {
  try {
    const result = await PORTFOLIO.findById(request.params.id);

    const projectPromises = [];


    result.projectList.forEach((id: string) => {
      projectPromises.push(PROJECT.findOne({ _id: id }));
    });

    const projects = await Promise.all(projectPromises);

    result.projectList = projects;

    return response.status(StatusCodes.OK).json({ success: true, result });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error?.toString() })
  }
});


portfolioRouter.post('/create-project', authMiddleware, async (request: any, response) => {

  try {
    const project = await PROJECT.create(request.body);

    const user = await USER.findOneAndUpdate({ _id: request.decoded.user_id });
    const portfolio = await PORTFOLIO.findOneAndUpdate({ _id: user.portfolioId }, { $push: { projectList: project._id.toString() } });

    return response.status(StatusCodes.OK).json({ success: true, result: project });

  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error?.toString() })
  }
});



portfolioRouter.get('/get-project-by-id/:id', async (request, response) => {
  try {
    const result = await PROJECT.findById(request.params.id);

    return response.status(StatusCodes.OK).json({ success: true, result });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error?.toString() })
  }
});

export default portfolioRouter;