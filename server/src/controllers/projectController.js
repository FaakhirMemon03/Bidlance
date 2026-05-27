const Project = require('../models/Project');

// @desc    Get all projects (with search/filter)
// @route   GET /api/projects
const getProjects = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, bidding, page = 1, limit = 12 } = req.query;

        let query = { status: 'active' };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } },
            ];
        }
        if (category) query.category = category;
        if (bidding === 'true') query.biddingEnabled = true;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const skip = (Number(page) - 1) * Number(limit);
        const total = await Project.countDocuments(query);
        const projects = await Project.find(query)
            .populate('seller', 'name username avatar rating')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            projects,
        });
    } catch (error) {
        console.error('Get Projects Error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('seller', 'name username avatar rating bio');

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found.' });
        }

        res.status(200).json({ success: true, project });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Create a project (Seller only)
// @route   POST /api/projects
const createProject = async (req, res) => {
    try {
        const { title, description, category, price, deliveryTime, biddingEnabled, tags } = req.body;

        const project = await Project.create({
            seller: req.user.id,
            title,
            description,
            category,
            price: Number(price),
            deliveryTime,
            biddingEnabled: biddingEnabled === 'true' || biddingEnabled === true,
            tags: tags ? tags.split(',').map(t => t.trim()) : [],
        });

        res.status(201).json({ success: true, project });
    } catch (error) {
        console.error('Create Project Error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
        if (project.seller.toString() !== req.user.id)
            return res.status(403).json({ success: false, message: 'Not authorized.' });

        const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, project: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
        if (project.seller.toString() !== req.user.id && req.user.role !== 'admin')
            return res.status(403).json({ success: false, message: 'Not authorized.' });

        project.status = 'deleted';
        await project.save();
        res.status(200).json({ success: true, message: 'Project removed.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };
