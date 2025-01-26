const notesService = require("../services/notesService");
const { v4: uuidv4 } = require("uuid");

const createNote = async (req, res) => {
  try {
    const { name, tags, videos, workout, note } = req.body;

    const user = {
      id: uuidv4(),
      name,
      tags,
      videos,
      workout,
      note
    };
    await notesService.createNote(user);
    return res.status(201).json({ message: "Nota criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar nota!", error });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await notesService.getNoteById(id);

    if (!note) {
      return res.status(404).json({ message: "Nota não encontradq!" });
    }
    const result = {
      name: note.name,
      tags: note.tagd,
      videos: note.videos,
      workout: note.workout,
      note: note.note
    };
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar nota!", error });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await notesService.getNotes();

    const result = notes.map((user) => {
      return {
        name: notes.name,
        tags: notes.tagd,
        videos: notes.videos,
        workout: notes.workout,
        note: notes.note
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar notas!", error });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, tags, videos, workout, note } = req.body;

    const nota = await notesService.updateNote(id, {
      name,
      tags,
      videos,
      workout,
      note
    });

    if (!nota) {
      return res.status(404).json({ message: "Nota não encontrada!" });
    }

    return res.status(200).json({ message: "Nota Atualizada!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar nota!", error });
  }
};

module.exports = {
  createNote,
  getNoteById,
  getNotes,
  updateNote
};
