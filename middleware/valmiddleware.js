import  { body, validationResult } from 'express-validator';

const validateCharacter = [
    body('name').isString().isLength({ min: 2 }).withMessage('Name must be a string with at least 2 characters'),
    body('class').isString().isLength({ min: 1 }).withMessage('Class must be a string with at least 3 characters'),
    body('level').isNumeric().isInt({ min: 0 }).withMessage('Level must be a positive integer'),
    body('power.attack').isNumeric().isInt({ min: 0 }).withMessage('Attack must be a non-negative integer'),
    body('power.defense').isNumeric().isInt({ min: 0 }).withMessage('Defense must be a non-negative integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateCharacter;

