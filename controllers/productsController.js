const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.send("Hola")
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		product = products.find(function(item){
			return (req.params.id == item.id)
		})

		product.price = toThousand(product.price)

		res.render("detail",{product : product})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res, next) => {

		let product_image = ""
				if (req.files[0] !== undefined) {
			let product_image = req.files[0].filename
		}

		products.push ({
			id : products[products.length-1].id + 1,
			image : product_image,
			...req.body
		})

		let archivo = JSON.stringify(products)

		fs.writeFileSync (productsFilePath,archivo)

	    res.redirect("/")
	},

	// Update - Form to edit
	edit: (req, res) => {

		product = products.find(function(item){
			return (req.params.id == item.id)
		})

		product.price = toThousand(product.price)

		res.render("product-edit-form",{product : product})
	},
	
	// Update - Method to update
	update: (req, res, next) => {

		products.forEach (function(item) {
			if (item.id == req.params.id) {
				 item.name = req.body.name;
				 item.price = req.body.price;
				 item.discount = req.body.discount;
				 if (req.files[0] !== undefined) {
				 	item.image = req.files[0].filename;
				 }
				 item.category = req.body.category;
				 item.description = req.body.description;
			 }
		 })    
		 
		 let archivo = JSON.stringify(products)

		 fs.writeFileSync (productsFilePath,archivo)

		res.redirect("/")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let filtro = products.filter (function(item) {
			return (item.id != req.params.id)
		 })    

		 let archivo = JSON.stringify(filtro)

		 fs.writeFileSync (productsFilePath,archivo)

		res.redirect("/")
	}
};

module.exports = controller;