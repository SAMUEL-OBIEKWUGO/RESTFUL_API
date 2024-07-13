const Resource = require('../models/resource');

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a resource by ID
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new resource
exports.createResource = async (req, res) => {
  const { name, description } = req.body;
  const newResource = new Resource({ name, description });

  try {
    const resource = await newResource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a resource
exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json(resource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a resource
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json({ message: 'Resource deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
