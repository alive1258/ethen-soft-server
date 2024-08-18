import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { HeroServices } from "./hero.service";

// Controller to handle hero creation
const createHero = catchAsync(async (req, res) => {
  const heroData = req.body;

  const result = await HeroServices.createHeroIntoDB(heroData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hero created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllHeroes = catchAsync(async (req, res) => {
  const result = await HeroServices.getAllHeroesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Heroes retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single hero by ID
const getSingleHero = catchAsync(async (req, res) => {
  const { heroId } = req.params;
  const result = await HeroServices.getSingleHeroFromDB(heroId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Hero not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single hero retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a hero by ID
const updateHero = catchAsync(async (req, res) => {
  const { heroId } = req.params;
  const updateData = req.body;
  const result = await HeroServices.updateHeroInDB(heroId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hero updated successfully",
    data: result,
  });
});

// Controller to handle deleting a hero by ID
const deleteHero = catchAsync(async (req, res) => {
  const { heroId } = req.params;
  const result = await HeroServices.deleteHeroFromDB(heroId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Hero not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hero deleted successfully",
    data: "",
  });
});

export const HeroControllers = {
  getAllHeroes,
  createHero,
  getSingleHero,
  updateHero,
  deleteHero,
};
