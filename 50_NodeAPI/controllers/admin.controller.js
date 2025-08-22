
module.exports.adminRegister = async(req, res) =>{
try{

    return res.status(201).json({ message: 'Admin registered successfully' });

}catch(error){
    console.error('Error occurred during admin registration:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}