import { Router } from 'express';
import { getAll, getById, create, update, remove } from './crudOperations.js';

function crudController(tableName) {
    const router = Router();

    router.get('/', async(req, res) => {
        try {
            const { limit, ...filters } = req.query;
            const data = await getAll(tableName, limit, filters);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    router.get('/:id', async(req, res) => {
        const { id } = req.params;
        try {
            const data = await getById(tableName, id);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    router.post('/', async(req, res) => {
        const newData = req.body;
        try {
            const insertedId = await create(tableName, newData);
            res.status(201).json({ id: insertedId, message: 'Created successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    router.put('/:id', async(req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        try {
            await update(tableName, id, updatedData);
            res.json({ id, message: 'Updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    router.delete('/:id', async(req, res) => {
        const { id } = req.params;
        try {
            await remove(tableName, id);
            res.json({ id, message: 'Deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    return router;
}

export default crudController;