const express = require("express");
const router = express.Router();
// Importa el modelo de Libro
const Libro = require("../models/libroModel");

const { getAllLibros, getLibroById, createLibro, updateLibro, deleteLibro} = require("../controllers/libroController");


// Importamos la libreria para validar scopes
const { requiredScopes } = require("express-oauth2-jwt-bearer");

// Ruta para obtener todos los libros
router.get("/", requiredScopes("read:libros"), async (req, res) => {
    try {
      const libros = await Libro.find();
      res.status(200).json(libros);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los libros" });
    }
  });

// Ruta para obtener un libro por su ID
router.get("/:id", requiredScopes("read:libros"), async (req, res) => {
    try {
      const libro = await Libro.findById(req.params.id);
  
      if (!libro) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
  
      res.status(200).json(libro);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el libro" });
    }
  });

// Ruta para crear un nuevo libro
router.post("/", requiredScopes("write:libros"), async (req, res) => {
    try {
      const nuevoLibro = await Libro.create(req.body);
      await nuevoLibro.save();
      res.status(201).json(nuevoLibro);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el libro" });
    }
  });

// Ruta para actualizar un libro por su ID
router.put("/:id", requiredScopes("write:libros"), async (req, res) => {
    try {
      const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      if (!libro) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
  
      res.status(200).json(libro);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el libro" });
    }
  });

// Ruta para eliminar un libro por su ID
router.delete("/:id", requiredScopes("write:libros"), async (req, res) => {
    try {
      const libro = await Libro.findByIdAndDelete(req.params.id);
  
      if (!libro) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
  
      res.status(200).json({ message: "Libro eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el libro" });
    }
  });

module.exports = router;
