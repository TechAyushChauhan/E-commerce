const express = require('express');
const router = express.Router();
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const productmodel=require('../database/models/productmodel');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
  })
  
  const upload = multer({ storage: storage });
  router.use(cors());
  router.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self' cdn.example.com;"
    );
    next();
  });


router.post('/upload', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(500).json({error: err.message});
      }
      if (!req.file) {
        return res.status(400).json({error: "No file uploaded."});
      }
      const filePath = req.file.path;
      
      let url = req.file.path.replace(/\\/g, "/");
      
      res.json({url: url});
    });
  });

router.get("/",async(req,res)=>{
  try{
    let product = await productmodel.find()
    
    if(!product){
        res.status(400).json({status:'failure',message:'bad request'})
        return
    }

    res.status(200).json({status:'success',data:product})
}

catch(error){
    res.status(500).json({status:'failure',message:error.message})
}
}
);
router.get('/item/:id', async(req,res)=>{
  try{
    
    let product = await productmodel.findOne({_id: req.params.id})
    
    if(!product){
        res.status(400).json({status:'failure',message:'bad request'})
        return
    }

    res.status(200).json({status:'success',data:product})
}

catch(error){
    res.status(500).json({status:'failure',message:error.message})
}
});
router.put('/edit/:id', async(req,res)=>{
  try{
    let product = await productmodel.updateOne({ _id: req.params.id }, { $set: req.body })
    
    if(!product){
        res.status(400).json({status:'failure',message:'bad request'})
        return
    }
    res.status(200).json({status:'success',data:product})
   
}

catch(error){
    res.status(500).json({status:'failure',message:error.message})
}
});
router.delete('/delete/:id', async(req,res)=>{
  try{
    let product = await productmodel.deleteOne({ _id: req.params.id })
   
    
    if(!product){
        res.status(400).json({status:'failure',message:'bad request'})
        return
    }

    res.status(200).json({status:'success',data:product})
}

catch(error){
    res.status(500).json({status:'failure',message:error.message})
}
});

router.post('/add', async (req,res)=>{
  const data = req.body

  try{
      let product = await productmodel.create(data)
      
      if(!product){
          res.status(400).json({status:'failure',message:'bad request'})
          return
      }

      res.status(200).json({status:'success',data:product})
  }
  
  catch(error){
      res.status(500).json({status:'failure',message:error.message})
  }
})
router.get('/api/search', async (req, res) => {
  const { query } = req.query;
  
  try {
    const regexp = new RegExp(`^${query.split('').map(char => `(?=.*${char})`).join('')}.*`, 'i'); 
    const suggestions = await productmodel.find({ name: regexp })
      .limit(10) 
      .select('name'); 
      res.status(200).json({status:'success',data:suggestions})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/search', async (req, res) => {
  const { query } = req.query;
  

  try {
    const regexp = new RegExp(`^${query}`, 'i'); 
    const products = await productmodel.find({ name: regexp })

     
      res.status(200).json({status:'success',data:products})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router