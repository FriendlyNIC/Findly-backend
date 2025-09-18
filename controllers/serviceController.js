import Service from '../models/serviceModel.js';

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  const services = await Service.find({}).populate('user', 'name');
  res.json(services);
};

// @desc    Fetch single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
  const service = await Service.findById(req.params.id).populate('user', 'name profilePicture');
  if (service) {
    return res.json(service);
  }
  res.status(404).send('Service not found');
};

// @desc    Create a new service
// @route   POST /api/services
// @access  Private
const createService = async (req, res) => {
  const { title, description, category, price, images, location } = req.body;

  const service = new Service({
    user: req.user._id,
    title,
    description,
    category,
    price,
    images,
    location,
  });

  const createdService = await service.save();
  res.status(201).json(createdService);
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private
const updateService = async (req, res) => {
  const { title, description, category, price, images, location } = req.body;
  const service = await Service.findById(req.params.id);

  if (service) {
    // Vérifier que c'est bien le propriétaire du service qui modifie
    if (service.user.toString() !== req.user._id.toString()) {
      res.status(401).send('User not authorized');
      return;
    }
    service.title = title;
    service.description = description;
    service.category = category;
    service.price = price;
    service.images = images;
    service.location = location;

    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404).send('Service not found');
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private
const deleteService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    if (service.user.toString() !== req.user._id.toString()) {
      res.status(401).send('User not authorized');
      return;
    }

    await service.deleteOne();
    res.json({ message: 'Service removed' });
  } else {
    res.status(404).send('Service not found');
  }
};

export {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};