let { spaces } = require('../storeage/space.json');
const path = require('path');
const fs = require('fs').promises
console.log("Spaces Loaded:", spaces); // Check if spaces is loaded properly
const getSpace = (req, res) =>{
   
    res.status(200).json({success: true, data: spaces})
}

const returnRoom = async (req, res) => {
    const { type } = req.params;
    
    const typeToCourt = {
        single: 'BK.B1',
        group: 'BK.B2',
        meeting: 'BK.B3'
    };

    const court = typeToCourt[type];
    if (!court) {
        return res.status(400).json({ success: false, msg: 'Invalid room type' });
    }

    try {
        const data = await fs.readFile(path.join(__dirname, '../storeage/space.json'), 'utf8');
        const { spaces } = JSON.parse(data);

        if (!Array.isArray(spaces)) {
            return res.status(500).json({ 
                success: false, 
                msg: 'Invalid data format: spaces should be an array' 
            });
        }

        const filteredRooms = spaces.filter(space => 
            space.Court === court && space.Available === true
        );

        return res.status(200).json({ 
            success: true, 
            data: filteredRooms,
            count: filteredRooms.length
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ 
            success: false, 
            msg: 'Internal server error' 
        });
    }
};



const getSpaceDetail = (req, res) => {
    let id = req.params.id  // Extract just the id property
    const result = spaces.find((result) => result.id === Number(id))
    console.log(result)
    if(!result){
        return res.status(404).json({success: false, msg: 'Spaces is not exist!'})
    }
    return res.status(200).json({success: true, data: result})
}

const updateSpace = async (req, res) => {
    try {
        let id = Number(req.params.id);
        let { status } = req.body;
        console.log(status)
        // Tìm không gian có id tương ứng
        let spaceIndex = spaces.findIndex((space) => space.id === id);
        console.log(spaceIndex)

        if (spaceIndex === -1) {
            
            return res.status(404).json({ success: false, msg: 'Space does not exist!' });
        }

        // Cập nhật trạng thái
        spaces[spaceIndex].status = status;
        
        // Ghi lại vào file data.js
        const filePath = path.join(__dirname, '../data.js');
        
        const updatedData = `let spaces = ${JSON.stringify(spaces, null, 2)};\n\nmodule.exports = { spaces };`;
        
        await fs.writeFile(filePath, updatedData);
        console.log('hello world')
        res.status(200).json({ success: true, msg: 'Space updated successfully!', data: spaces[spaceIndex] });
    } catch (error) {
        console.error('Error updating space:', error);
        res.status(500).json({ success: false, msg: 'Failed to update space!' });
    }
}


module.exports = {
    getSpace,
    updateSpace,
    getSpaceDetail,
    returnRoom
};