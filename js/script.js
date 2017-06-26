/*jslint plusplus: true */
/*jslint white: true */

(function () {
	"use strict";
  
	function addName(groceryListObj) {
		var nameInput = document.getElementById("inputName"),
			newLi = document.createElement("li"),
			newLiText = document.createTextNode(nameInput.value);
		
		if (nameInput.value !== "" && nameInput.value !== "Type item name here") {
			newLi.appendChild(newLiText);
			newLi.className = "groceryItem";
			document.getElementById("groceryList").appendChild(newLi);
      groceryListObj.push(nameInput.value);
      localStorage.groceryList = JSON.stringify(groceryListObj);
      nameInput.value = "Type item name here";
		}
	}
	
	function addInputsList(e) {
		var li = e.target,
			liText = li.textContent,
			liItems = document.getElementsByClassName("groceryItem"),
			arrayItems = Array.prototype.slice.call(liItems),
			inputs = '<div id="popUpList"><button id="x">x</button><div><p id="dollar">$</p><input type="text" value="0.00" id="itemPrice"><p>Price</p></div><div><p id="percent">%</p><input type="text" value="0" id="itemSale"><p>Sale</p></div><div><p id="hash">#</p><input type="text" value="1" id="itemAmount"><p>Amount</p></div></div><div id="buttons"><button id="addToCart">Add Item</button><button id="removeItemButton">Remove Item</button></div>',
			i, el, elText, arr;
		
		if (liText.includes("x$Price")) {
			liText = liText.slice(0, -38);
		}
			li.innerHTML = liText + inputs;
		
		for (i = 0; i < liItems.length; i++) {
			el = arrayItems[i];
			elText = el.textContent;
			if (elText.includes("x$Price")) { //finds the actual text of the grocery item 
				elText = elText.slice(0, -38);  
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
			liText = li.textContent.slice(0, -38);
		li.innerHTML = liText;
	}

	function addToCart(e, groceryListObj, pastItemsObj, cartObj) {
		var item = e.target.parentElement.parentElement,
			name = item.textContent.slice(0, -38),
			price = document.getElementById("itemPrice").value,
			sale = document.getElementById("itemSale").value,
			amount = document.getElementById("itemAmount").value,
			groceryList = document.getElementById("groceryList"),
			cart = document.getElementById("shoppingCart"),
      pastItems = document.getElementById("past"),
			newLi = document.createElement("li"),
			discount = parseFloat(price) * (parseFloat(sale) / 100),
			finalPrice = ((parseFloat(price) - discount) * parseFloat(amount)).toFixed(2),
			text = document.createTextNode(name + ": $" + finalPrice),
      indexNum = groceryListObj.indexOf(name);
		//adds item to cart and it's object, updates storage
		cartObj.names.push(name);
		cartObj.prices.push(price);
		cartObj.sales.push(sale);
		cartObj.amounts.push(amount);
    localStorage.cart = JSON.stringify(cartObj);
    newLi.appendChild(text);
		newLi.className = "cartItem";
		cart.appendChild(newLi);
    
    //adds item to pastItems list and object, updates storage
    newLi = document.createElement("li");
    newLi.innerHTML = '<span class="pastLi">' + name + ' </span><button class="pastX">x</button>';
    newLi.className = "pastItem";
    pastItems.appendChild(newLi);
    pastItemsObj.push(name);
    localStorage.pastItems = (JSON.stringify(pastItemsObj));
    
    //removes item from grocery list and it's object, updates storage
    groceryListObj.splice(indexNum, 1);
    localStorage.groceryList = (JSON.stringify(groceryListObj));
		groceryList.removeChild(item);
	}
  
  function groceryToPast(e, groceryList, groceryListObj, pastItems, pastItemsObj) {
    var item = e.target.parentElement.parentElement,
			name = item.textContent.slice(0, -38),
			newLi = document.createElement("li"),
      indexNum = groceryListObj.indexOf(name);

    //adds item to pastItems list and object, updates storage
    newLi.innerHTML = '<span class="pastLi">' + name + ' </span><button class="pastX">x</button>';
    newLi.className = "pastItem";
    pastItems.appendChild(newLi);
    pastItemsObj.push(name);
    localStorage.pastItems = (JSON.stringify(pastItemsObj));
    
    //removes item from grocery list and it's object, updates storage
    groceryListObj.splice(indexNum, 1);
    localStorage.groceryList = (JSON.stringify(groceryListObj));
		groceryList.removeChild(item);
  }
  
  function pastToGrocery(e, groceryList, groceryListObj, pastItems, pastItemsObj) {
    var span = e.target,
      item = span.parentElement,
      pastItemsList = document.getElementsByClassName("pastItem"),
      arrayItems = Array.prototype.slice.call(pastItemsList),
      indexNum = arrayItems.indexOf(item), 
      newLi = document.createElement("li"),
      name = pastItemsObj[indexNum],
      text;
    
    //add item to grocery list obj and the HTML UL
    groceryListObj.push(name);
    localStorage.groceryList = JSON.stringify(groceryListObj);
    text = document.createTextNode(name);
    newLi.appendChild(text);
    newLi.className = "groceryItem";
    groceryList.appendChild(newLi);
    
    //remove item from past items obj and the HTML UL
    pastItemsObj.splice(indexNum, 1);
    pastItems.removeChild(item); 
  }
  
  function xPast(e, pastItemsObj) {
    var xButton = e.target,
      item = xButton.parentElement,
      pastItemsList = document.getElementsByClassName("pastItem"),
      pastItems = document.getElementById("past"),
      arrayItems = Array.prototype.slice.call(pastItemsList),
      indexNum = arrayItems.indexOf(item); 
    
    pastItems.removeChild(item);
    pastItemsObj.splice(indexNum, 1);
    localStorage.pastItems = JSON.stringify(pastItemsObj);
  }
  
  function deletePast(pastItemsObj) {
    var pastItems = document.getElementById("past");
    
    pastItems.innerHTML = '<li id=pastWarning class="warning">You have no past items</li>';
    pastItemsObj = [];
    localStorage.pastItems = JSON.stringify(pastItemsObj);
  }
  
  function moveGroceryList(groceryListObj, pastItemsObj) {
    var groceryList = document.getElementById("groceryList"),
      pastItems = document.getElementById("past"),
      newLi, text, i;
    
    //copy each grocery item into past item UL
    for (i = 0; i < groceryListObj.length; i++) {
      newLi = document.createElement("li");
      newLi.innerHTML = '<span id="pastLi">' + groceryListObj[i] + ' </span><button class="pastX">x</button>'; 
      newLi.className = "pastItem";
      pastItems.appendChild(newLi);
      pastItemsObj.push(groceryListObj[i]);
    }
    localStorage.pastItems = JSON.stringify(pastItemsObj); //updates storage once at the end
    
    //clean out the grocerylist and its obj
    groceryList.innerHTML = '<li id=groceryWarning class="warning">Your grocery list is empty</li>';
    groceryListObj = [];
    localStorage.groceryList = JSON.stringify(groceryListObj);

  }
  
	function addInputsCart(e, cartObj) {
		var li = e.target,
			liText = li.textContent,
			liItems = document.getElementsByClassName("cartItem"),
			arrayItems = Array.prototype.slice.call(liItems),
			price,
			inputs,
			i, el, elText, arr, index, sale, amount;
		
		index = arrayItems.indexOf(li);
		price = cartObj.prices[index];
		sale = cartObj.sales[index];
		amount = cartObj.amounts[index];
		inputs = '<div id="popUpCart"><button id="xCart">x</button><div><p id="dollarCart">$</p><input type="text" value="' + price + '" id="itemPriceCart"><p>Price</p></div><div><p id="percentCart">%</p><input type="text" value="' + sale + '" id="itemSaleCart"><p>Sale</p></div><div><p id="hashCart">#</p><input type="text" value="' + amount + '" id="itemAmountCart"><p>Amount</p></div></div><div id="buttons"><button id="updateButton">Update Item</button><button id="rejectItemButton">Reject Item</button></div>';
		
		//formatting liText to remove the popUp text from its textContent		
		if (liText.includes("x$Price")) {
			liText = liText.slice(0, -41);
		}
		li.innerHTML = liText + inputs;
		
		for (i = 0; i < liItems.length; i++) {
			el = arrayItems[i];
			elText = el.textContent;
			if (elText.includes("x$Price")) { //finds the actual text of item 
				elText = elText.slice(0, -41); 
			}
			if (arrayItems[i] !== e.target) {  //if the clicked item does not match
				el.innerHTML = elText;           //the event object, then the popup menu
			}                                  //is replaced with the item text
		}
	}
	
	function xMenuCart(e) {
		var li = e.target.parentElement.parentElement,
			liText = li.textContent.slice(0, -41);
		li.innerHTML = liText;
	}
	
	function cartToRejects(e, cart, rejects, cartObj, rejectsObj) {
		var button = e.target,
			item = button.parentElement.parentElement,
			cartItems = document.getElementsByClassName("cartItem"),
			arrayItems = Array.prototype.slice.call(cartItems),
      indexNum = arrayItems.indexOf(item),
      name = cartObj.names[indexNum],
		  price = cartObj.prices[indexNum],
		  sale = cartObj.sales[indexNum],
		  amount = cartObj.amounts[indexNum],
		  textNode, newLi, finalPrice;	
		
    //copies the values from cartObj into the rejectsobj
		rejectsObj.names.push(name);
		rejectsObj.prices.push(price);
		rejectsObj.sales.push(sale);
		rejectsObj.amounts.push(amount);
    localStorage.rejects = JSON.stringify(rejectsObj);
		
		//deletes the item from the grocerylist obj
		cartObj.names.splice(indexNum, 1);
		cartObj.prices.splice(indexNum, 1);
		cartObj.sales.splice(indexNum, 1);
		cartObj.amounts.splice(indexNum, 1);
    localStorage.cart = JSON.stringify(cartObj);
		
		//adds a <li> to the rejects list and removes it from grocery list
		finalPrice = (price - (price * (sale / 100))) * amount;
		textNode = document.createTextNode(name + ": $" + finalPrice.toFixed(2));
		newLi = document.createElement("li");
		newLi.appendChild(textNode);
		newLi.className = "rejectsItem";
		rejects.appendChild(newLi);
		cart.removeChild(item);
	}
	
	function updateItemPrice(e, cart, rejects, cartObj, rejectsObj) {
		var button = e.target,
			item = button.parentElement.parentElement,
			itemPrice = document.getElementById("itemPriceCart").value,
			itemAmount = document.getElementById("itemAmountCart").value,
			itemSale = document.getElementById("itemSaleCart").value,
			itemSaleCalc = itemSale / 100,
			discount = parseFloat(itemPrice) * (parseFloat(itemSale) / 100),
			finalPrice = ((parseFloat(itemPrice) - (discount)) * parseFloat(itemAmount)),
			cartItems = document.getElementsByClassName("cartItem"),
			arrayItems = Array.prototype.slice.call(cartItems),
		  indexNum = arrayItems.indexOf(item),
      name;
		
		//if the user updates an amount to 0 in their cart, the item is removed
		if (itemAmount === "0") {
			cartToRejects(e, cart, rejects, cartObj, rejectsObj);

			
		} else {
			//finds which item was edited, then places the new values into their indexes	
      name = cartObj.names[indexNum];
			cartObj.prices[indexNum] = itemPrice;
			cartObj.sales[indexNum] = itemSale;
			cartObj.amounts[indexNum] = itemAmount;
			item.textContent = name + ': $' + finalPrice.toFixed(2);
      localStorage.cart = JSON.stringify(cartObj);
		}
	}
		
	function rejectsToCart(e, rejects, cartObj, rejectsObj) {
		var item = e.target,
			cart = document.getElementById("shoppingCart"),
			rejectsItems = document.getElementsByClassName("rejectsItem"),
			arrayItems = Array.prototype.slice.call(rejectsItems),
			indexNum = arrayItems.indexOf(item), 
      name = rejectsObj.names[indexNum],
		  price = rejectsObj.prices[indexNum],
		  sale = rejectsObj.sales[indexNum],
		  amount = rejectsObj.amounts[indexNum], 
      textNode, newLi, finalPrice;
	
		//copies the values from rejectsobj into the cartObj		
		cartObj.names.push(name);
		cartObj.prices.push(price);
		cartObj.sales.push(sale);
		cartObj.amounts.push(amount);
    localStorage.cart = JSON.stringify(cartObj);
		
		//deletes the item from the rejectslist obj
		rejectsObj.names.splice(indexNum, 1);
		rejectsObj.prices.splice(indexNum, 1);
		rejectsObj.sales.splice(indexNum, 1);
		rejectsObj.amounts.splice(indexNum, 1);
    localStorage.rejects = JSON.stringify(rejectsObj);
		
		//adds a <li> to the shopingcart and deletes it from rejects list
		finalPrice = (price - (price * (sale / 100))) * amount;
		textNode = document.createTextNode(name + ": $" + finalPrice.toFixed(2));
		newLi = document.createElement("li");
		newLi.appendChild(textNode);
		newLi.className = "cartItem";
		cart.appendChild(newLi);
		rejects.removeChild(item);
	}
  
  function deleteCartRejects(cartObj, rejectsObj) {
    var cart = document.getElementById("shoppingCart"),
      rejects = document.getElementById("rejects");
    
    cart.innerHTML = '<li id=cartWarning class="warning">Your grocery cart is empty</li>';
    rejects.innerHTML = '<li id=rejectsWarning class="warning">You have no rejects</li>';
    alert("hey");
    cartObj = {
			names: [],
			prices: [],
			sales: [],
			amounts: []
		  };
    rejectsObj = {
			names: [],
			prices: [],
			sales: [],
			amounts: []
		  };
    localStorage.cart = JSON.stringify(cartObj);
    localStorage.rejects = JSON.stringify(rejectsObj);
    
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
		window.scrollBy(0, 150);
		return visible;
	}
	
	function emptyListFill() {
		var glItems = document.getElementsByClassName("groceryItem"),
      pItems = document.getElementsByClassName("pastItem"),
			scItems = document.getElementsByClassName("cartItem"),
			rItems = document.getElementsByClassName("rejectsItem");
		
		//if a list is empty, the warning li will become visible
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
    if (pItems.length === 0) {
			document.getElementById("pastWarning").style.display = "block";
		} else {
			document.getElementById("pastWarning").style.display = "none";
		}
	}
	
	function checkInputs(popUpMenu) {
		var inputs = document.getElementsByTagName("input"),
				glAmount = document.getElementById("itemAmount"),
				glList = document.getElementById("groceryList"), i, inputLocation;
		
		for (i = 0; i < inputs.length; i++) {
			inputLocation = inputs[i].parentElement.parentElement;
			if (popUpMenu === inputLocation && inputs[i].value === '') {
				window.alert("Whoops, you left a box blank!");
				return false;
			} else if (popUpMenu === inputLocation && inputs[i].value.includes("%")) {
				window.alert("You don't need to include the '%' sign, just the sale amount.");
				inputs[i].value = inputs[i].value.replace("%", "");
				if (inputs[i].value === "") {
					return false;
				}
			} else if (popUpMenu === inputLocation && inputs[i].value.includes("$")) {
				window.alert("You don't need to include the '$' sign, just price itself.");
				inputs[i].value = inputs[i].value.replace("$", "");
				if (inputs[i].value === "") {
					return false;
				}
			} else if (popUpMenu === inputLocation && isNaN(inputs[i].value)) {
				window.alert("Hey, you can only put numbers in those boxes!");
				inputs[i].value = "";
				return false;
			} else if (popUpMenu === inputLocation && inputs[i].value.includes(".00")) {
				window.alert("You don't need to put the '.00' if a price doesn't need change.");
			} else if ( glList === inputLocation && glAmount.value === "0") { //if the grocery list's amount box is 0
				window.alert("How are you adding 0 of something to your cart?");
				glAmount.value = 1;
				return false;
			}
		}
		return true;
	}
	
	function calculateTotal(cartObj) {
		var total = 0,
			glObj = cartObj,
			discount, finalPrice, i;
		
		for (i = 0; i < glObj.prices.length; i++) {
			discount = (glObj.prices[i] * (glObj.sales[i] / 100));
			finalPrice = (glObj.prices[i] - (discount)) * glObj.amounts[i];
			total += finalPrice;
		}
		document.getElementById("total").textContent = "Cart Total: $" + total.toFixed(2);
	}
  
  function checkStorage() {
    var groceryListObj, pastItemsObj, cartObj, rejectsObj;
    
    if (localStorage.groceryList) {
      groceryListObj = JSON.parse(localStorage.groceryList);
    } else {
      groceryListObj = [];
      localStorage.groceryList = JSON.stringify(groceryListObj);
    }
     
    if (localStorage.pastItems) {
      pastItemsObj = JSON.parse(localStorage.pastItems);
    } else {
      pastItemsObj = [];
      localStorage.pastItems = JSON.stringify(pastItemsObj);
    }
    if (localStorage.cart) {
      cartObj = JSON.parse(localStorage.cart);
    } else {
      cartObj = {
			names: [],
			prices: [],
			sales: [],
			amounts: []
		  };
      localStorage.cart = JSON.stringify(cartObj);
    }
    if (localStorage.rejects) {
      rejectsObj = JSON.parse(localStorage.rejects);
    } else {
      rejectsObj = {
			names: [],
			prices: [],
			sales: [],
			amounts: []
		  };
      localStorage.rejects = JSON.stringify(rejectsObj);
    }
    return [groceryListObj, pastItemsObj, cartObj, rejectsObj];
  }
  
  function setUpLists() {
    //checks if theres any data in storage, then adds them to the appropriate list
    
    var glStored = JSON.parse(localStorage.groceryList),
      piStored = JSON.parse(localStorage.pastItems),
      scStored = JSON.parse(localStorage.cart),
      rStored = JSON.parse(localStorage.rejects),
      i,
			newLi,
			newLiText,
      discount,
      finalPrice,
      text;
    
    if (glStored) {
      for (i = 0; i < glStored.length; i++) {
        newLi = document.createElement("li");
        newLiText = document.createTextNode(glStored[i]);
		    newLi.appendChild(newLiText);
		    newLi.className = "groceryItem";
		    document.getElementById("groceryList").appendChild(newLi);
      }
    }
    if (piStored) {
      for (i = 0; i < piStored.length; i++) {
        newLi = document.createElement("li");
        newLi.innerHTML ='<span id="pastLi">' + piStored[i] + ' </span><button class="pastX">x</button>';
        newLi.className = "pastItem";
        document.getElementById("past").appendChild(newLi);
      } 
    }
    if (scStored) {
      for (i = 0; i < scStored.names.length; i++) {
        discount = scStored.prices[i] * (scStored.sales[i] / 100);
		    finalPrice = ((scStored.prices[i] - discount) * scStored.amounts[i]).toFixed(2);
		    text = document.createTextNode(scStored.names[i] + ": $" + finalPrice);
        newLi = document.createElement("li");
		    newLi.appendChild(text);
		    newLi.className = "cartItem";
		    document.getElementById("shoppingCart").appendChild(newLi);
      } 
    }
    if (rStored) {
      for (i = 0; i < rStored.names.length; i++) {
        discount = rStored.prices[i] * (rStored.sales[i] / 100);
		    finalPrice = ((rStored.prices[i] - discount) * rStored.amounts[i]).toFixed(2);
		    text = document.createTextNode(rStored.names[i] + ": $" + finalPrice);
        newLi = document.createElement("li");
		    newLi.appendChild(text);
		    newLi.className = "rejectsItem";
		    document.getElementById("rejects").appendChild(newLi);
      } 
    }
    
  }
//^ functions   v events////////////////////////////////////////////////////////////////////
	
	var body = document.getElementById("content"),
		background = document.getElementById("background"),
		addButton = document.getElementById("addItem"),
		groceryList = document.getElementById("groceryList"),
		cartWrapper = document.getElementById("cartWrapper"),	
		cart = document.getElementById("shoppingCart"),
    pastWrapper = document.getElementById("pastWrapper"),
    pastItems = document.getElementById("past"),
		rejects = document.getElementById("rejects"),
		rejectsWrapper = document.getElementById("rejectsWrapper"),
		switchVisibility = document.getElementById('switchButton'),
		visible = "cart",
    storageObjs = checkStorage(),
    groceryListObj = storageObjs[0],
    pastItemsObj = storageObjs[1],
    cartObj = storageObjs[2],
    rejectsObj = storageObjs[3];
  
	(function () {
    setUpLists();

//    localStorage.clear(); //DON'T FORGET TO REMOVE THIS ONCE THEY LIST PROPERLY
		emptyListFill(); //runs immediately so when the page opens, the warnings are up
    calculateTotal(cartObj);
  }());
	
	body.addEventListener("click", function (e) {
		if (e.target.type === "text") {
			e.target.value = "";
		}
	}, false);
	
	addButton.addEventListener("click", function () {
		addName(groceryListObj);
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
				addToCart(e, groceryListObj, pastItemsObj, cartObj);
				calculateTotal(cartObj);
			} 
		} else if (e.target.id === "removeItemButton") {
      groceryToPast(e, groceryList, groceryListObj, pastItems, pastItemsObj);
    }
    emptyListFill();
	}, false);
  
  pastWrapper.addEventListener("click", function (e) {
		if (e.target.className === "pastLi") {
			if (pastItemsObj.length > 0) {
        pastToGrocery(e, groceryList, groceryListObj, pastItems, pastItemsObj);
			} 
    } else if (e.target.className === "pastX") {
        xPast(e, pastItemsObj);
    } else if (e.target.id === "deletePastItems") {
        deletePast(pastItemsObj);
    } else if (e.target.id === "moveGroceryItems") {
        moveGroceryList(groceryListObj, pastItemsObj);
    } 
    emptyListFill();
	}, false);
	
	cartWrapper.addEventListener("click", function (e) {
		if (e.target.className === "cartItem") {
			if (cartObj.names.length > 0) {
				addInputsCart(e, cartObj);
				centerMenu(document.getElementById("popUpCart"));
			}
		} else if (e.target.id === "xCart") {
			xMenuCart(e);
		} else if (e.target.id === "cartButton") {
			visible = switchCartRejects(visible);
		} else if (e.target.id === "rejectItemButton") {
			cartToRejects(e, cart, rejects, cartObj, rejectsObj);
			calculateTotal(cartObj);
		} else if (e.target.id === "updateButton") {
			if (checkInputs(document.getElementById("popUpCart"))) {
				updateItemPrice(e, cart, rejects, cartObj, rejectsObj);
				calculateTotal(cartObj);
			}
		}
		emptyListFill();
	}, false);
	
	rejectsWrapper.addEventListener("click", function (e) {
		if (e.target.className === "rejectsItem") {
			if (rejectsObj.names.length > 0) {
				rejectsToCart(e, rejects, cartObj, rejectsObj);
				calculateTotal(cartObj);
				emptyListFill();
			}
		} else if (e.target.id === "rejectsButton") {
			visible = switchCartRejects(visible);
		} else if (e.target.id === "deleteCartRejects") {

        deleteCartRejects(cartObj, rejectsObj);
    }
	}, false);
	
}());