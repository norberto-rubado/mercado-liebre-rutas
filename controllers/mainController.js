const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		products.forEach(function(item) {
			item.price = toThousand(item.price)
		})
		visited = products.filter(function(item) { return item.category == "visited"});
		in_sale = products.filter(function(item) { return item.category == "in-sale"});
		res.render ("index",{visited : visited, in_sale : in_sale })	
	},
	search: (req, res) => {

		if (req.query.keywords !== "") {
			visited = products.filter(function(item) 
					{return item.category == "visited" && item.name.includes(req.query.keywords)});
			in_sale = products.filter(function(item) 
					{return item.category == "in-sale" && item.name.includes(req.query.keywords)}) }
		else {
			visited = products.filter(function(item) {return item.category == "visited"});
			in_sale = products.filter(function(item) {return item.category == "in-sale"});
		}	

		res.render ("index",{visited : visited, in_sale : in_sale })
	},
};

module.exports = controller;
