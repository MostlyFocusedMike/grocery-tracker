/*jslint plusplus: true */

(function () {
	"use strict";
  
	function addName() {
		var nameInput = document.getElementById("inputName"),
			newLi = document.createElement("li"),
			newLiText = document.createTextNode(nameInput.value);
		
		if (nameInput.value !== "" && nameInput.value !== "Type item name here") {
			newLi.appendChild(newLiText);
			newLi.className = "groceryItem";
			document.getElementById("groceryList").appendChild(newLi);
			nameInput.value = "";
		}
	}
	
	function addInputsList(e) {
		var li = e.target,
			liText = li.textContent,
			liItems = document.getElementsByClassName("groceryItem"),
			arrayItems = [],
			inputs = '<div class="popUp"><button id="x">x</button><input type="text" value="0.00" id="itemPrice"><input type="text" value="1" id="itemAmount"><input type="text" value="0" id="itemSale"><button id="addToCart">Add Item To Cart</button></div>',
			formatter, i, el, elText, arr;
		
		//formatting liText to remove the "add item x" from its textContent
		arr = Array.prototype.slice.call(liItems);
		formatter = arr.indexOf("xAdd Item To Cart");
		if (formatter !== -1) {
			liText = liText.slice(0, -17);
		}
	
		li.innerHTML = liText + inputs;
		
		//converts node list to an array, so pop up menu is always removed from non event targets
		for (i = 0; i < liItems.length; i++) {
			arrayItems[i] = liItems[i];
		}
		
		for (i = 0; i < liItems.length; i++) {
			el = arrayItems[i];
			elText = el.textContent;
			formatter = elText.indexOf("xAdd Item To Cart");
			if (formatter !== -1) {
				elText = elText.slice(0, -17);
			}
			
			if (elText !== liText) {
				el.innerHTML = elText;
			}
			
		}
	}
	
	function xMenu(e) {
		var li = e.target.parentElement.parentElement,
			liText = li.textContent.slice(0, -17);
		li.innerHTML = liText;
	}

	
	function calculateItemPrice(e) {
		var button = e.target,
			item = button.parentElement.parentElement,
			itemText = item.textContent.slice(0, -9),
			itemPrice = document.getElementById("itemPrice").value,
			itemAmount = document.getElementById("itemAmount").value,
			itemSale = document.getElementById("itemSale").value / 100,
			finalPrice = ((parseFloat(itemPrice) - (parseFloat(itemPrice) * parseFloat(itemSale))) * parseFloat(itemAmount)).toFixed(2);
		return finalPrice;
	}
	
	function addToCart(e, finalPrice, groceryListObj) {
		var item = e.target.parentElement.parentElement,
			name = item.textContent.slice(0, -17),
			price = finalPrice,
			groceryList = document.getElementById("groceryList"),
			cart = document.getElementById("shoppingCart"),
			newLi = document.createElement("li"),
			text = document.createTextNode(name + ": $" + price);
		newLi.appendChild(text);
		newLi.className = "cartItem";
		cart.appendChild(newLi);
		groceryList.removeChild(item);
		groceryListObj.names.push(name);
		groceryListObj.prices.push(price);
	}
	
	function calculateTotal(groceryListObj) {
		var i,
			total = 0;
		for (i = 0; i < groceryListObj.prices.length; i++) {
			total += parseFloat(groceryListObj.prices[i]);
		}
		document.getElementById("total").textContent = "Total: $" + total.toFixed(2);
	}
	
	function cartToRejects(e, rejects, groceryListObj, rejectsObj) {
		var item = e.target,
			groceryList = item.parentElement,
			cart = document.getElementById("shoppingCart"),
			cartItems = document.getElementsByClassName("cartItem"),
			arrayItems = [],
			i, indexNum, name, price, textNode, newLi;
			
		
		//finds the index of the item that was clicked
		
		arrayItems = Array.prototype.slice.call(cartItems);
		indexNum = arrayItems.indexOf(item);
		
		//copies the values from grocerlylistobj into the rejects obj
		name = groceryListObj.names[indexNum];
		price = groceryListObj.prices[indexNum];
		rejectsObj.names.push(name);
		rejectsObj.prices.push(price);
		
		//deletes the item from the grocerylist obj
		groceryListObj.names.splice(indexNum, 1);
		groceryListObj.prices.splice(indexNum, 1);
		
		//adds a <li> to the rejects list
		
		textNode = document.createTextNode(name + ": $" + price);
		newLi = document.createElement("li");
		newLi.appendChild(textNode);
		newLi.className = "rejectsItem";
		rejects.appendChild(newLi);
		
		//removes the <li> from the cart
		cart.removeChild(item);
	}
	
	function rejectsToCart(e, rejects, groceryListObj, rejectsObj) {
		var item = e.target,
			rejectsList = item.parentElement,
			cart = document.getElementById("shoppingCart"),
			cartItems = document.getElementsByClassName("cartItem"),
			rejectsItems = document.getElementsByClassName("rejectsItem"),
			arrayItems = [],
			i, indexNum, name, price, textNode, newLi;
			
		//finds the index of the item that was clicked
		arrayItems = Array.prototype.slice.call(rejectsItems);
		indexNum = arrayItems.indexOf(item);
		
		//copies the values from rejects obj  into the grocerlylistobj
		name = rejectsObj.names[indexNum];
		price = rejectsObj.prices[indexNum];
		groceryListObj.names.push(name);
		groceryListObj.prices.push(price);
		
		//deletes the item from the rejectslist obj
		rejectsObj.names.splice(indexNum, 1);
		rejectsObj.prices.splice(indexNum, 1);
		
		//adds a <li> to the rejects list
		
		textNode = document.createTextNode(name + ": $" + price);
		newLi = document.createElement("li");
		newLi.appendChild(textNode);
		newLi.className = "cartItem";
		cart.appendChild(newLi);
		
		//removes the <li> from the cart
		rejects.removeChild(item);
	}
	
	function switchCartRejects(visible) {
		var cart = document.getElementById("shoppingCart"),
			rejects = document.getElementById("rejects");
		if (visible === "cart") {
			visible = "rejects";
		} else {
			visible = "cart";
		}
		
		if (visible === "cart") {
			cart.style.display = "block";
			rejects.style.display = "none";
		} else {
			cart.style.display = "none";
			rejects.style.display = "block";
		}
		return visible;	
		
			
	}
//^ functions   v events////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	
	var body = document.getElementById("content"),
		button = document.getElementById("addItem"),
		groceryList = document.getElementById("groceryList"),
		cart = document.getElementById("shoppingCart"),
		rejects = document.getElementById("rejects"),
		groceryListObj = {
			names: ['cart'],
			prices: [1.33]
		},
		rejectsObj = {
			names: ["rejects"],
			prices: [1.66]
		},
		visible = "cart",
		switchVisibility = document.getElementById('switchButton');
	
	body.addEventListener("click", function (e) {
		if (e.target.type === "text") {
			e.target.value = "";
		}
	}, false);
	
	button.addEventListener("click", function () {
		addName();
		var troubleShoot = document.getElementById("troubleShoot");
		troubleShoot.textContent = "hello";
	}, false);
  
	
	groceryList.addEventListener("click", function (e) {
		if (e.target.className === "groceryItem") {
			addInputsList(e);
		} else if (e.target.id === "x") {
			xMenu(e);
		} else if (e.target.id === "addToCart") {
			var finalPrice = calculateItemPrice(e);
			addToCart(e, finalPrice, groceryListObj);
			calculateTotal(groceryListObj);
		}
		
	}, false);
	
	cart.addEventListener("click", function (e) {
		if (e.target.className === "cartItem") {
			if (groceryListObj.names.length > 0) {
				cartToRejects(e, rejects, groceryListObj, rejectsObj);
				calculateTotal(groceryListObj);
			}
		}
	}, false);
	
	rejects.addEventListener("click", function (e) {
		if (e.target.className === "rejectsItem") {
			if (rejectsObj.names.length > 0) {
				rejectsToCart(e, rejects, groceryListObj, rejectsObj);
				calculateTotal(groceryListObj);
			}
		}
	}, false);
	
	switchVisibility.addEventListener("click", function () {
		visible = switchCartRejects(visible);
	}, false);
	
}());