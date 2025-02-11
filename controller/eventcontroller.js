const Event = require('../model/eventmodel')


//-----------------------------create event----------------------------------

exports.createEvent = async (req, res) => {

    try {
        const { title, description, location, startDate, endDate, openingTime, closeTime } = req.body;
        const image = req.file ? req.file.filename : null;
        const author = req.user.id;
        // Validate required fields
        if (!title || !description || !location || !startDate || !endDate || !openingTime || !closeTime) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new event
        const newEvent = new Event({
            title,
            description,
            location,
            startDate,
            endDate,
            openingTime,
            closeTime,
            image,
            author
        });

        // Save the event to the database
        await newEvent.save();

        return res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create event', error: error.message });
    }
}



//-----------------------------get all events----------------------------------

exports.getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.find().populate('author', 'username');
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get all events', error: error.message });
    }
}

//-----------------------------get single event----------------------------------

exports.getSingleEvent = async (req, res, next) => {

    const slug = req.params.id;
    console.log(slug)
    try {
        const event = await Event.find({ slug }).populate('author', 'username');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get event', error: error.message });
    }
}


//-----------------------------update event----------------------------------


exports.updateEvent = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { title, description, location, startDate, endDate, openingTime, closeTime } = req.body;
        const image = req.file ? req.file.filename : null;
        const author = req.user.id;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const updatedData = await Event.findByIdAndUpdate(id, {
            title,
            description,
            location,
            startDate,
            endDate,
            openingTime,
            closeTime,
            image,
            author
        })

        return res.status(200).json({ message: "update successfully" })

    } catch (error) {
        return res.status(500).json({ message: "server error", error: error.message })
    }
}


//-----------------------------------delete events-------------------------------------

exports.deleteEvent = async (req, res, next) => {

    const { id } = req.params;
    try {
        const event = await Event.findByIdAndDelete(id);
        return res.status(200).json({message:"deleted successfully"})
        
    } catch (error) {
        return res.status(500).json({message:"server errro",error:error.message})
    }
}