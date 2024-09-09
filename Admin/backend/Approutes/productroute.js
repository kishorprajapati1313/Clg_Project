const express = require("express");
const router = express.Router();
const productmodel = require("../Models/Product.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../3d-model"));
  },
  filename: function (req, file, cb) {
    const customename = "CateGory-Product";
    const randomnumber = Math.floor(Math.random() * 1000);
    const filename = `${customename}_${randomnumber}_${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post('/addproduct', upload.single("model"), async (req, res) => {
  try {
    console.log('Request received for adding a product.');

    // Check if req.file is defined
    if (!req.file) {
      console.log('No file provided in the request.');
      return res.status(400).json({ error: 'No file provided' });
    }

    // Log progress
    console.log('File received:', req.file);

    // Log progress
    console.log('Image converted to base64.');

    // Update productdetail to include base64 img1
    const productdetail = {
      ...req.body,
      model: req.file.filename,
      und1: null,
      und2: null,
      und3: null,
    };

    // Log progress
    // console.log('Product detail:', productdetail);

    // Save product detail to the database
    await productmodel.create(productdetail);

    // Log progress
    console.log('Product created successfully.');

    res.json("Success");
  } catch (error) {
    console.error('Error during product creation:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/addproduct", async(req, res) => {
  try {
    const allproduct = await productmodel.find();
    const productsWithBase64 = allproduct.map((product) => ({
      ...product.toObject(),
      img1: `data:image/png;base64, ${product.img1}`,
    }));
    res.json(productsWithBase64);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete_product/:productId", async (req, res) => {
  const idParam = req.params.productId;
  console.log('ID parameter:', idParam);

  try {
    const deletedProduct = await productmodel.findOneAndDelete({ _id: idParam });

    if (deletedProduct) {
      console.log('Product deleted successfully:', deletedProduct);
      res.status(200).json({ success: true, message: "Product Deleted Successfully" });
    } else {
      console.log('Product not found:', idParam);
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/updateproduct/:id", upload.single("model"), async (req, res) => {
  const pid = req.params.id;

  try {
    let updatedProduct = { ...req.body };

    // Check if req.file is defined (model is being updated)
    if (req.file) {
      // Save the new file and update the model field
      updatedProduct = {
        ...updatedProduct,
        model: req.file.filename,
      };
    }

    // Update the product in the database
    updatedProduct = await productmodel.findOneAndUpdate(
      { _id: pid },
      updatedProduct,
      { new: true }
    );

    if (updatedProduct) {
      res.status(200).json({ success: true, message: "Updated Successfully", updatedProduct });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/productmodel", async(req,res) =>{
  const modelpath = path.join(__dirname,'3d-model');
  res.sendFile(modelpath);
  
})

router.get("/product/:id", async (req, res) => {
  const idparas = req.params.id;
  try {
    const product = await productmodel.findOne({ _id: idparas }).lean();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Now 'product' is a plain JavaScript object, and you can directly modify it
    product.img1 = `data:image/png;base64, ${product.img1}`;

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/productmodel/:id", async (req, res) => {
  const idParam = req.params.id;
  

  try {
    // Find the product by ID
    const product = await productmodel.findOne({ _id: idParam }).lean();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    // Construct the path to the 3D model file
    const modelPath = path.join(__dirname, "../3d-model", product.model);

    // Send the 3D model file
    res.sendFile(modelPath);

    // const filePath = path.join(__dirname, "../3d-model", product.model);
    // const fbxData = fs.readFileSync(filePath);
    
    // res.setHeader('Content-Type', 'application/octet-stream');
    // res.setHeader('Content-Disposition', `attachment; filename=${product.model}`);
    // res.send(fbxData);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
