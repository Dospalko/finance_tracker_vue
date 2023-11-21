import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entity/Transaction';

const router = Router();

// GET transactions
router.get('/', async (req, res) => {
    const transactionRepository = getRepository(Transaction);
    const transactions = await transactionRepository.find();
    res.json(transactions);
});

// POST a new transaction
router.post('/', async (req, res) => {
    const transactionRepository = getRepository(Transaction);
    const transaction = transactionRepository.create(req.body);
    const result = await transactionRepository.save(transaction);
    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const transactionRepository = getRepository(Transaction);
    const result = await transactionRepository.delete(req.params.id);
    if (result?.affected ?? 0 > 0) {
        res.status(200).send({ message: "Transaction deleted successfully." });
    } else {
        res.status(404).send({ message: "Transaction not found." });
    }
});

// PUT (update) a transaction
router.put('/:id', async (req, res) => {
    const transactionRepository = getRepository(Transaction);
    const transaction = await transactionRepository.findOne({ where: { id: parseInt(req.params.id) } });
    if (transaction) {
        transactionRepository.merge(transaction, req.body);
        const result = await transactionRepository.save(transaction);
        res.status(200).send(result);
    } else {
        res.status(404).send({ message: "Transaction not found." });
    }
});



// Additional routes for PUT, DELETE, etc.

export default router;