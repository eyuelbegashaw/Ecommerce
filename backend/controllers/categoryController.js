import Category from "../models/categoryModel.js";

const createCategory = async (req, res, next) => {
  try {
    const {name} = req.body;
    const category = new Category({
      name,
    });

    const createdCategory = await category.save();
    return res.status(201).json(createdCategory);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    if (categories) return res.status(200).json(categories);
    else return res.status(404).json({message: "No category found"});
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const {name} = req.body;
    const category = await Category.findById(req.params.id);

    if (category) {
      category.name = name;
      const updatedCategory = await category.save();
      return res.status(201).json(updatedCategory);
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      await category.remove();
      return res.status(200).json({message: "Category removed", _id: req.params.id});
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    next(error);
  }
};

export {getCategories, createCategory, updateCategory, deleteCategory};
