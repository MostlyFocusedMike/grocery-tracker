/*jslint plusplus: true */
/*jslint white: true */

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
			nameInput.value = "Type item name here";
		}
	}
	
	function addInputsList(e) {
		var li = e.target,
			liText = li.textContent,
			liItems = document.getElementsByClassName("groceryItem"),
			arrayItems = Array.prototype.slice.call(liItems),
			inputs = '<div id="popUpList"><button id="x">x</button><div><p id="dollar">$</p><input type="text" value="0.00" id="itemPrice"><p>Price</p></div><div><p id="percent">%</p><input type="text" value="0" id="itemSale"><p>Sale</p></div><div><p id="hash">#</p><input type="text" value="1" id="itemAmount"><p>Amount</p></div></div><button id="addToCart">Add Item To Cart</button>',
			i, el, elText, arr;
		
		//formatting liText to remove the popUp text from its textContent		
		if (liText.includes("x$Price")) {
			liText = liText.slice(0, -35);
		}
		li.innerHTML = liText + inputs;


		
		for (i = 0; i < liItems.length; i++) {
			el = arrayItems[i];
			elText = el.textContent;
			if (elText.includes("x$Price")) { //finds the actual text of the grocery item 
				elText = elText.slice(0, -35);  
			}
			if (arrayItems[i] !== e.target) {  //if the clicked item does not match
				el.innerHTML = elText;           //the event object, then the popup menu
			}                                  //menu is replaced with just the text
			
		}
	}
	
	function centerMenu(popUpMenu) {
		var rect = popUpMenu.getBoundingClientRect();
		
		if (rect.top >= 300 && rect.top < 340) {
			window.scrollBy(0, 50);
		} else if (rect.top >= 340 && rect.top < 380) {
			window.scrollBy(0, 100);
		} else if (rect.top >= 380 && rect.top < 420) {
			window.scrollBy(0, 150);
		} else if (rect.top >= 420 && rect.top < 460) {
			window.scrollBy(0, 200);
		} else if (rect.top >= 460 && rect.top < 500) {
			window.scrollBy(0, 250);
		} else if (rect.top >= 500 && rect.top < 545) {
			window.scrollBy(0, 300);
		} else if (rect.top >= 545 && rect.top < 590) {
			window.scrollBy(0, 300);
		} else if (rect.top >= 590 && rect.top < 630) {
			window.scrollBy(0, 300);
		} else if (rect.top >= 630 && rect.top < 650) {
			window.scrollBy(0, 350);
		}
	}

	function xMenu(e) {
		var li = e.target.parentElement.parentElement,
			liText = li.textContent.slice(0, -35);
		li.innerHTML = liText;
	}

	function calculateItemPrice(e) {
		var button = e.target,
			item = button.parentElement.parentElement,
			itemPrice = document.getElementById("itemPrice").value,
			itemAmount = document.getElementById("itemAmount").value,
			itemSale = document.getElementById("itemSale").value / 100,
			finalPrice = ((parseFloat(itemPrice) - (parseFloat(itemPrice) * parseFloat(itemSale))) * parseFloat(itemAmount)).toFixed(2);
		return finalPrice;
	}
	
	function addToCart(e, groceryListObj) {
		var item = e.target.parentElement,
			name = item.textContent.slice(0, -35),
			price = document.getElementById("itemPrice").value,
			sale = document.getElementById("itemSale").value,
			amount = document.getElementById("itemAmount").value,
			groceryList = document.getElementById("groceryList"),
			cart = document.getElementById("shoppingCart"),
			newLi = document.createElement("li"),
			discount = parseFloat(price) * (parseFloat(sale) / 100),
			finalPrice = ((parseFloat(price) - discount) * parseFloat(amount)).toFixed(2),
			text = document.createTextNode(name + ": $" + finalPrice);
		newLi.appendChild(text);
		newLi.className = "cartItem";
		cart.appendChild(newLi);
		groceryList.removeChild(item);
		groceryListObj.names.push(name);
		groceryListObj.prices.push(price);
		groceryListObj.sales.push(sale);
		groceryListObj.amounts.push(amount);
	}
	
	function addInputsCart(e, groceryListObj) {
		var li = e.target,
			liText = li.textContent,
			liItems = document.getElementsByClassName("cartItem"),
			arrayItems = [],
			price,
			inputs,
			i, el, elText, arr, index, sale, amount;
		
		arrayItems = Array.prototype.slice.call(liItems);
		index = arrayItems.indexOf(li);
		price = groceryListObj.prices[index];
		sale = groceryListObj.sales[index];
		amount = groceryListObj.amounts[index];
		
		inputs = '<div id="popUpCart"><button id="xCart">x</button><div><p id="dollarCart">$</p><input type="text" value="' + price + '" id="itemPriceCart"><p>Price</p></div><div><p id="percentCart">%</p><input type="text" value="' + sale + '" id="itemSaleCart"><p>Sale</p></div><div><p id="hashCart">#</p><input type="text" value="' + amount + '" id="itemAmountCart"><p>Amount</p></div></div><div id="buttons"><button id="updateButton">Update Item</button><button id="removalButton">Remove Item</button></div>';
		
		//formatting liText to remove the "add item x" from its textContent		
		if (liText.includes("x$Price")) {
			liText = liText.slice(0, -41);
		}
		li.innerHTML = liText + inputs;
		
		//converts node list to an array, so pop up menu is always removed from non event targets
		
		
		for (i = 0; i < liItems.length; i++) {
			el = arrayItems[i];
			elText = el.textContent;
			if (elText.includes("x$Price")) { //finds the actual text of the grocery item 
				elText = elText.slice(0, -41);  //
			}
			if (arrayItems[i] !== e.target) {  //if the text of the grocery item does not match
				el.innerHTML = elText;  //the text of the event object text, then the popup
			}                         //menu is removed by replacing the html with just the text
			
		}
	}
	
	function xMenuCart(e) {
		var li = e.target.parentElement.parentElement,
			liText = li.textContent.slice(0, -41);
		li.innerHTML = liText;
	}
	
	function calculateTotal(groceryListObj) {
		var i,
			total = 0,
			glObj = groceryListObj,
			finalPrice;
		for (i = 0; i < glObj.prices.length; i++) {
			finalPrice = (glObj.prices[i] - (glObj.prices[i] * (glObj.sales[i] / 100))) * glObj.amounts[i];
			total += parseFloat(finalPrice);
		}
		document.getElementById("total").textContent = "Cart Total: $" + total.toFixed(2);
	}
	
	function cartToRejects(e, rejects, groceryListObj, rejectsObj) {
		var button = e.target,
			item = button.parentElement.parentElement,
			cart = document.getElementById("shoppingCart"),
			cartItems = document.getElementsByClassName("cartItem"),
			arrayItems = [],
			i, indexNum, name, price, textNode, newLi, sale, amount, finalPrice;
			
		
		//finds the index of the item that was clicked
		arrayItems = Array.prototype.slice.call(cartItems);
		indexNum = arrayItems.indexOf(item);

		//copies the values from grocerlylistobj into the rejects obj
		name = groceryListObj.names[indexNum];
		price = groceryListObj.prices[indexNum];
		sale = groceryListObj.sales[indexNum];
		amount = groceryListObj.amounts[indexNum];
		rejectsObj.names.push(name);
		rejectsObj.prices.push(price);
		rejectsObj.sales.push(sale);
		rejectsObj.amounts.push(amount);
		
		
		//deletes the item from the grocerylist obj
		groceryListObj.names.splice(indexNum, 1);
		groceryListObj.prices.splice(indexNum, 1);
		groceryListObj.sales.splice(indexNum, 1);
		groceryListObj.amounts.splice(indexNum, 1);
		
		//adds a <li> to the rejects list
		finalPrice = (price - (price * (sale / 100))) * amount;
		textNode = document.createTextNode(name + ": $" + finalPrice.toFixed(2));
		newLi = document.createElement("li");
		newLi.appendChild(textNode);
		newLi.className = "rejectsItem";
		rejects.appendChild(newLi);
		
		//removes the <li> from the cart
		cart.removeChild(item);
	}
	
	function updateItemPrice(e, rejects, groceryListObj, rejectsObj) {
		var button = e.target,
			item = button.parentElement.parentElement,
			itemPrice = document.getElementById("itemPriceCart").value,
			itemAmount = document.getElementById("itemAmountCart").value,
			itemSale = document.getElementById("itemSaleCart").value,
			itemSaleCalc = itemSale / 100,
			discount = parseFloat(itemPrice) * (parseFloat(itemSale) / 100),
			finalPrice = ((parseFloat(itemPrice) - (discount)) * parseFloat(itemAmount)).toFixed(2),
			cartItems = document.getElementsByClassName("cartItem"),
			arrayItems = [],
			i, indexNum, name, price, sale, amount;
			
		if (itemAmount === "0") {
			cartToRejects(e, rejects, groceryListObj, rejectsObj);
		} else {
			//finds the index of the item that was clicked
			arrayItems = Array.prototype.slice.call(cartItems);
			indexNum = arrayItems.indexOf(item);

			//copies the values from grocerlylistobj into the rejects obj
			name = groceryListObj.names[indexNum];
			groceryListObj.prices[indexNum] = itemPrice;
			groceryListObj.sales[indexNum] = itemSale;
			groceryListObj.amounts[indexNum] = itemAmount;
			item.textContent = name + ': $' + finalPrice;
		}
		
	}
		
	function rejectsToCart(e, rejects, groceryListObj, rejectsObj) {
		var item = e.target,
			cart = document.getElementById("shoppingCart"),
			rejectsItems = document.getElementsByClassName("rejectsItem"),
			arrayItems = [],
			i, indexNum, name, price, textNode, newLi, sale, amount, finalPrice;
			
		//finds the index of the item that was clicked
		arrayItems = Array.prototype.slice.call(rejectsItems);
		indexNum = arrayItems.indexOf(item);
		
		//copies the values from rejects obj  into the grocerlylistobj
		name = rejectsObj.names[indexNum];
		price = rejectsObj.prices[indexNum];
		sale = rejectsObj.sales[indexNum];
		amount = rejectsObj.amounts[indexNum];
		
		groceryListObj.names.push(name);
		groceryListObj.prices.push(price);
		groceryListObj.sales.push(sale);
		groceryListObj.amounts.push(amount);
		
		//deletes the item from the rejectslist obj
		rejectsObj.names.splice(indexNum, 1);
		rejectsObj.prices.splice(indexNum, 1);
		rejectsObj.sales.splice(indexNum, 1);
		rejectsObj.amounts.splice(indexNum, 1);
		//adds a <li> to the rejects list
		
		finalPrice = (price - (price * (sale / 100))) * amount;
		textNode = document.createTextNode(name + ": $" + finalPrice.toFixed(2));
		newLi = document.createElement("li");
		newLi.appendChild(textNode);
		newLi.className = "cartItem";
		cart.appendChild(newLi);
		
		//removes the <li> from the cart
		rejects.removeChild(item);
	}
	
	function switchCartRejects(visible) {
		var cart = document.getElementById("cartWrapper"),
			rejects = document.getElementById("rejectsWrapper");
		if (visible === "cart") {
			visible = "rejects";
			cart.style.display = "none";
			rejects.style.display = "block";
		} else {
			visible = "cart";
			cart.style.display = "block";
			rejects.style.display = "none";
		}
		return visible;
	}
	
	function emptyListFill() {
		var glItems = document.getElementsByClassName("groceryItem"),
			scItems = document.getElementsByClassName("cartItem"),
			rItems = document.getElementsByClassName("rejectsItem");
		
		if (glItems.length === 0) {
			document.getElementById("groceryWarning").style.display = "block";
		} else {
			document.getElementById("groceryWarning").style.display = "none";
		}
		if (scItems.length === 0) {
			document.getElementById("cartWarning").style.display = "block";
		} else {
			document.getElementById("cartWarning").style.display = "none";
		}
		if (rItems.length === 0) {
			document.getElementById("rejectsWarning").style.display = "block";
		} else {
			document.getElementById("rejectsWarning").style.display = "none";
		}

	}
	
	function checkInputs(popUpMenu) {
		var inputs = document.getElementsByTagName("input"),
			i;
		for (i = 0; i < inputs.length; i++) {
			if (popUpMenu === inputs[i].parentElement.parentElement && inputs[i].value === '') {
				window.alert("Whoops, you left a box blank!");
				return false;
			} else if (popUpMenu === inputs[i].parentElement.parentElement && inputs[i].value.includes("%")) {
				window.alert("You don't need to include the '%' sign, just the sale amount.");
				inputs[i].value = 0;
				return false;
			} else if (popUpMenu === inputs[i].parentElement.parentElement && inputs[i].value.includes("$")) {
				window.alert("You don't need to include the '$' sign, just price itself.");
				inputs[i].value = 0;
				return false;
			} else if (popUpMenu === inputs[i].parentElement.parentElement && isNaN(inputs[i].value)) {
				window.alert("Hey, you can only put numbers in those boxes!");
				return false;
			} else if (popUpMenu === inputs[i].parentElement.parentElement && inputs[i].value.includes(".00")) {
				window.alert("You don't need to put the '.00' if a price doesn't need change.");
			} else if (document.getElementById("itemAmount") === inputs[i] && inputs[i].value === "0") {
				window.alert("How are you adding 0 of something to your cart?");
				document.getElementById("itemAmount").value = 1;
				return false;
			}
			
		}
		return true;
	}
//^ functions   v events////////////////////////////////////////////////////////////////////
	
	var body = document.getElementById("content"),
		button = document.getElementById("addItem"),
		groceryList = document.getElementById("groceryList"),
		cart = document.getElementById("shoppingCart"),
		cartWrapper = document.getElementById("cartWrapper"),
		rejects = document.getElementById("rejects"),
		rejectsWrapper = document.getElementById("rejectsWrapper"),
		background = document.getElementById("background"),
		groceryListObj = {
			names: [],
			prices: [],
			sales: [],
			amounts: []
		},
		rejectsObj = {
			names: [],
			prices: [],
			sales: [],
			amounts: []
		},
		visible = "cart",
		switchVisibility = document.getElementById('switchButton'),
		check;
	
	(function () {
		emptyListFill();
	}());
	body.addEventListener("click", function (e) {
		if (e.target.type === "text") {
			e.target.value = "";
		}
	}, false);
	
	button.addEventListener("click", function () {
		addName();
		emptyListFill();
	}, false);
  
	background.addEventListener("click", function () {
		document.getElementById("bkgHead").style.visibility = 'visible';
	}, false);
	
	groceryList.addEventListener("click", function (e) {
		if (e.target.className === "groceryItem") {
			addInputsList(e);
			centerMenu(document.getElementById("popUpList"));
		} else if (e.target.id === "x") {
			xMenu(e);
		} else if (e.target.id === "addToCart") {
			if (checkInputs(document.getElementById("popUpList"))) {
				addToCart(e, groceryListObj);
				calculateTotal(groceryListObj);
				emptyListFill();
			}
		}
		emptyListFill();
	}, false);
	
	cartWrapper.addEventListener("click", function (e) {
		if (e.target.className === "cartItem") {
			if (groceryListObj.names.length > 0) {
				addInputsCart(e, groceryListObj);
				centerMenu(document.getElementById("popUpCart"));
			}
		} else if (e.target.id === "xCart") {
			xMenuCart(e);
		} else if (e.target.id === "cartButton") {
			visible = switchCartRejects(visible);
		} else if (e.target.id === "removalButton") {
			cartToRejects(e, rejects, groceryListObj, rejectsObj);
			calculateTotal(groceryListObj);
		} else if (e.target.id === "updateButton") {
			if (checkInputs(document.getElementById("popUpCart"))) {
				updateItemPrice(e, rejects, groceryListObj, rejectsObj);
				calculateTotal(groceryListObj);
			}
		}

		emptyListFill();
	}, false);
	
	rejectsWrapper.addEventListener("click", function (e) {
		if (e.target.className === "rejectsItem") {
			if (rejectsObj.names.length > 0) {
				rejectsToCart(e, rejects, groceryListObj, rejectsObj);
				calculateTotal(groceryListObj);
			}
		} else if (e.target.id === "rejectsButton") {
			visible = switchCartRejects(visible);
		}
		emptyListFill();
	}, false);
	
}());