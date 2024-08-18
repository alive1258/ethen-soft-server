import { TTestimonial } from "./testimonial.interface";
import { Testimonial } from "./testimonial.module";

// Service to create a new Testimonial in the database
const createTestimonialIntoDB = async (testimonialData: TTestimonial) => {
  const result = await Testimonial.create(testimonialData);

  return result;
};

// Service to retrieve all Testimonial from the database
const getAllTestimonialFromDB = async () => {
  const result = await Testimonial.find();
  return result;
};

// Service to retrieve a single Testimonial from the database by ID
const getSingleTestimonialFromDB = async (_id: string) => {
  const result = await Testimonial.findOne({ _id });
  return result;
};

// Service to update a Testimonial in the database by ID
const updateTestimonialInDB = async (
  _id: string,
  updateData: Partial<TTestimonial>
) => {
  const result = await Testimonial.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new Error("Testimonial Data not found");
  }

  return result;
};

// Service to delete a Testimonial from the database by ID
const deleteTestimonialFromDB = async (_id: string) => {
  const result = await Testimonial.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("Testimonial Data not found");
  }

  return result;
};

// Export the Testimonial services as an object for use in other parts of the application
export const TestimonialServices = {
  createTestimonialIntoDB,
  getAllTestimonialFromDB,
  getSingleTestimonialFromDB,
  updateTestimonialInDB,
  deleteTestimonialFromDB,
};
