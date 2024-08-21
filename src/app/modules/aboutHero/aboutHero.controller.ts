import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AboutHeros } from "./aboutHero.service";
import sendResponse from "../../utils/sendResponse";

// Controller to handle AboutHero creationF
const createAboutHero = catchAsync(async (req, res) => {
  const AboutHeroData = req.body;

  const result = await AboutHeros.createAboutHeroIntoDB(AboutHeroData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AboutHero created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllAboutHero = catchAsync(async (req, res) => {
  const result = await AboutHeros.getAllAboutHeroFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AboutHero retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single AboutHero by ID
const getSingleAboutHero = catchAsync(async (req, res) => {
  const { aboutHeroId } = req.params;
  const result = await AboutHeros.getSingleAboutHeroFromDB(aboutHeroId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "AboutHero data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single AboutHero retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a AboutHero by ID
const updateAboutHero = catchAsync(async (req, res) => {
  const { aboutHeroId } = req.params;
  const updateData = req.body;
  const result = await AboutHeros.updateAboutHeroInDB(aboutHeroId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AboutHero updated successfully",
    data: result,
  });
});

// Controller to handle deleting a AboutHeroId by ID
const deleteAboutHero = catchAsync(async (req, res) => {
  const { aboutHeroId } = req.params;
  const result = await AboutHeros.deleteAboutHeroFromDB(aboutHeroId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "AboutHero not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AboutHero deleted successfully",
    data: "",
  });
});

export const AboutHeroControllers = {
  createAboutHero,
  getAllAboutHero,
  getSingleAboutHero,
  updateAboutHero,
  deleteAboutHero,
};
