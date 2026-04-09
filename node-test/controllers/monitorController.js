const Monitor = require('../models/Monitors')

exports.create = async (req, res) => {
    try {
        const { name, url, method, expectedStatusCode, interval, timeout } = req.body

        const monitor = await Monitor.create({
            userId: req.user._id,
            name,
            url,
            method,
            expectedStatusCode,
            interval,
            timeout
        })

        res.status(201).json({
            success: true,
            message: "Monitor Created",
            data: monitor
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        })
    }
}

exports.getList = async (req, res) => {
    try {
        const offset = parseInt(req.query.offset) || 1
        const limit = parseInt(req.query.limit) || 10
        const { search, method, isActive } = req.query

        const filter = { userId: req.user._id }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { url: { $regex: search, $options: 'i' } }
            ]
        }

        if (method) filter.method = method.toUpperCase()
        if (isActive !== undefined) filter.isActive = isActive === 'true'

        const skip = (offset - 1) * limit
        const total = await Monitor.countDocuments(filter)
        const monitors = await Monitor.find(filter).skip(skip).limit(limit)

        res.json({
            success: true,
            message: "Monitor List",
            data: {
                total,
                offset,
                limit,
                totalPages: Math.ceil(total / limit),
                records: monitors,
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        })
    }
}

exports.getMonitor = async (req, res) => {
    try {
        const { id } = req.params

        const monitor = await Monitor.findOne({ _id: id, userId: req.user._id })

        if (!monitor) {
            return res.status(404).json({
                success: false,
                message: "Monitor not found",
                data: {}
            })
        }

        res.json({
            success: true,
            message: "Monitor fetched",
            data: monitor
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        })
    }
}

exports.updateMonitor = async (req, res) => {
    try {
        const { id } = req.params
        const { name, url, method, expectedStatusCode, interval, timeout } = req.body

        const monitor = await Monitor.findOne({ _id: id, userId: req.user._id })

        if (!monitor) {
            return res.status(404).json({
                success: false,
                message: "Monitor not found",
                data: {}
            })
        }

        const updatedMonitor = await Monitor.findByIdAndUpdate(
            id,
            { name, url, method, expectedStatusCode, interval, timeout },
            { new: true, runValidators: true }
        )

        res.json({
            success: true,
            message: "Monitor Updated",
            data: updatedMonitor
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        })
    }
}

exports.deleteMonitor = async (req, res) => {
    try {
        const { id } = req.params

        const monitor = await Monitor.findOne({ _id: id, userId: req.user._id })

        if (!monitor) {
            return res.status(404).json({
                success: false,
                message: "Monitor not found",
                data: {}
            })
        }

        await Monitor.findByIdAndDelete(id)

        res.json({
            success: true,
            message: "Monitor Deleted",
            data: {}
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        })
    }
}

exports.toggleMonitor = async (req, res) => {
    try {
        const { id } = req.params

        const monitor = await Monitor.findOne({ _id: id, userId: req.user._id })

        if (!monitor) {
            return res.status(404).json({
                success: false,
                message: "Monitor not found",
                data: {}
            })
        }

        monitor.isActive = !monitor.isActive
        await monitor.save()

        res.json({
            success: true,
            message: `Monitor ${monitor.isActive ? 'activated' : 'deactivated'}`,
            data: monitor
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: {}
        })
    }
}
