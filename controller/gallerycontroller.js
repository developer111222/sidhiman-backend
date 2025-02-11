const Gallery = require('../model/gallerymodel');


//--------------------create gallery-------------


exports.creategallery = async (req, res) => {
    const image = req.file.filename;

    console.log(image)

    try {

        if (!image) {
            return res.status(400).json({ message: "please upload the file" })
        }

        const gallery = new Gallery({ image });
        await gallery.save();

        return res.status(200).json({ message: "successfully uploaded" })

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}


//-----------------------------------get gallery--------------------------


exports.getgallery = async (req, res) => {

    try {
        const gallery = await Gallery.find();

        return res.status(200).json({ gallery })
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });

    }
}

//------------------------------------gelete gallery---------------------------------

exports.deletegallery = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Gallery.findByIdAndDelete(id);

        return res.status(200).json({ message: "deleted successfully", success: true })

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}