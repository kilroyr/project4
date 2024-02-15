const Build = require('../models/buildModel');

// Controller function to create a new build
const createBuild = async (req, res) => {
    const { userId, items, totalPrice } = req.body;

    try {
        const build = new Build({
            userId,
            items,
            totalPrice
        });

        const savedBuild = await build.save();
        res.status(201).json(savedBuild);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all builds for a user
const getUserBuilds = async (req, res) => {
    const userId = req.params.userId;

    try {
        const builds = await Build.find({ userId });
        res.json(builds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update a build
const updateBuild = async (req, res) => {
    const buildId = req.params.buildId;
    const { items, totalPrice } = req.body;

    try {
        const updatedBuild = await Build.findByIdAndUpdate(buildId, { items, totalPrice }, { new: true });
        if (!updatedBuild) {
            return res.status(404).json({ message: 'Build not found' });
        }
        res.json(updatedBuild);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete a build
const deleteBuild = async (req, res) => {
    const buildId = req.params.buildId;

    try {
        const deletedBuild = await Build.findByIdAndDelete(buildId);
        if (!deletedBuild) {
            return res.status(404).json({ message: 'Build not found' });
        }
        res.json({ message: 'Build deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBuild, getUserBuilds, updateBuild, deleteBuild };
