import { Router } from "express";
import { createUsuario, getAllUsuarios, removeUsuario, updateUsuario } from "../controllers/usuarios.controller.js";

const router = Router()

router.get('/', getAllUsuarios)
router.post('/', createUsuario)
router.delete('/', removeUsuario)
router.put('/', updateUsuario)

export default router;