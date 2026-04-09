const express = require('express')
const router = express.Router()
const { create, getList, getMonitor, updateMonitor, deleteMonitor, toggleMonitor } = require('../controllers/monitorController')
const { protect } = require('../middlewares/authMiddleware')

router.post('/', protect, create)
router.get('/', protect, getList)
router.get('/:id', protect, getMonitor)
router.put('/:id', protect, updateMonitor)
router.delete('/:id', protect, deleteMonitor)
router.patch('/:id/toggle', protect, toggleMonitor)

module.exports = router