const Note = require("../models/note.model");

/* [GET] View All Notes */
const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json({ notes });
  } catch (error) {
    next(error);
  }
};

/* [GET] View a Note by ID */
const getNoteById = async (req, res, next) => {
  const noteId = req.params.id;
  try {
    const note = await Note.findOne({ _id: noteId, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ note });
  } catch (error) {
    next(error);
  }
};

/* [POST] Create a Note */
const createNote = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const note = await Note.create({ title, description, user: req.user._id });
    res.status(201).json({ note });
  } catch (error) {
    next(error);
  }
};

/* [PUT] Update Note */
const updateNoteById = async (req, res, next) => {
  const noteId = req.params.id;
  const { title, description } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, user: req.user._id },
      { title, description },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ note });
  } catch (error) {
    next(error);
  }
};

/* [DELETE] Delete Note */
const deleteNoteById = async (req, res, next) => {
  const noteId = req.params.id;
  try {
    const note = await Note.findOneAndDelete({
      _id: noteId,
      user: req.user._id,
    });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ success: "Record deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNoteById,
  deleteNoteById,
};
