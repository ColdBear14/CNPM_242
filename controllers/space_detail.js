let {spaces} = require('../data')
const path = require('path');
const fs = require('fs').promises
console.log(spaces)
const getSpace = (req, res) =>{
   
    res.status(200).json({success: true, data: spaces})
}

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
    getSpaceDetail
}