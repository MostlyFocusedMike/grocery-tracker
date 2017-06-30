/*jslint plusplus: true */
/*jslint white: true */

(function () {
	"use strict";
  //Grocery List functions//////////////////////////////////////////////////////////////
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
	
  function createPopUpList(e, addPopUp) {
		var li = e.target,
			liText = li.textContent,
			liItems = document.getElementsByClassName("groceryItem"),
			arrayItems = Array.prototype.slice.call(liItems),
			inputs = '<div id="popUpList"><button id="x">x</button><div><p id="dollar">$</p><input type="text" value="0.00" id="itemPrice"><p>Price</p></div><div><p id="percent">%</p><input type="text" value="0" id="itemSale"><p>Sale</p></div><div><p id="hash">#</p><input type="text" value="1" id="itemAmount"><p>Amount</p></div></div><div id="buttons"><button id="addToCart">Add Item</button><button id="removeItemButton">Remove Item</button></div>',
      sliceNum = -38; //the two pop ups have a different amount of extra text to remove
    
    addPopUp(e, li, liText, liItems, arrayItems, inputs, sliceNum);  
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
  
  //Past Items functions///////////////////////////////////////////////////////////////
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
   
    text = document.createTextNode(name);
    newLi.appendChild(text);
    newLi.className = "groceryItem";
    groceryList.appendChild(newLi);
    groceryListObj.push(name);
    localStorage.groceryList = JSON.stringify(groceryListObj);
    
    //remove item from past items obj and the HTML UL
    pastItemsObj.splice(indexNum, 1);
    pastItems.removeChild(item); 
    localStorage.pastItems = JSON.stringify(pastItemsObj);
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
    pastItemsObj.length = 0;
    localStorage.pastItems = JSON.stringify(pastItemsObj);
  }
  
  function moveGroceryList(groceryListObj, pastItemsObj) {
    var groceryList = document.getElementById("groceryList"),
      pastItems = document.getElementById("past"),
      newLi, text, i;
    
    //copy each grocery item into past item UL
    for (i = 0; i < groceryListObj.length; i++) {
      newLi = document.createElement("li");
      newLi.innerHTML = '<span class="pastLi">' + groceryListObj[i] + ' </span><button class="pastX">x</button>'; 
      newLi.className = "pastItem";
      pastItems.appendChild(newLi);
      pastItemsObj.push(groceryListObj[i]);
    }
    localStorage.pastItems = JSON.stringify(pastItemsObj); //updates storage once at the end
    
    //clean out the grocerylist and its obj
    groceryList.innerHTML = '<li id=groceryWarning class="warning">Your grocery list is empty</li>';
    groceryListObj.length = 0;
    localStorage.groceryList = JSON.stringify(groceryListObj);

  }
  
  //Shopping Cart/rejects functions////////////////////////////////////////////////////
	function createPopUpCart(e, cartObj, addPopUp) {
		var li = e.target,
			liText = li.textContent,
			liItems = document.getElementsByClassName("cartItem"),
			arrayItems = Array.prototype.slice.call(liItems),
      index = arrayItems.indexOf(li),
		  price = cartObj.prices[index],
		  sale = cartObj.sales[index],
		  amount = cartObj.amounts[index],
		  inputs = '<div id="popUpCart"><button id="xCart">x</button><div><p id="dollarCart">$</p><input type="text" value="' + price + '" id="itemPriceCart"><p>Price</p></div><div><p id="percentCart">%</p><input type="text" value="' + sale + '" id="itemSaleCart"><p>Sale</p></div><div><p id="hashCart">#</p><input type="text" value="' + amount + '" id="itemAmountCart"><p>Amount</p></div></div><div id="buttons"><button id="updateButton">Update Item</button><button id="rejectItemButton">Reject Item</button></div>',
      sliceNum = -41;
    
		addPopUp(e, li, liText, liItems, arrayItems, inputs, sliceNum);
	}
	                   
	function updateItemPrice(e, cart, rejects, cartObj, rejectsObj, moveCartRejects) {
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
			moveCartRejects(e, cart, rejects, cartObj, rejectsObj, "cartItem", "rejectsItem", "cart", "rejects"); 

			
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
  
  function moveCartRejects(e, fList, tList, fObj, tObj, fClass, tClass, fStore, tStore) {
		//f = from, t = to. as in going fromThisLocation -> toThisLocation
    var button = e.target,
			item = button.parentElement.parentElement,
			fromItems = document.getElementsByClassName(fClass),
      arrayItems, indexNum, name, price, sale, amount, textNode, newLi, finalPrice;
		
    if (fClass === "rejectsItem") {
      item = e.target; //the rejects list has no button, the target is the list element itself
    }
    
    fromItems = document.getElementsByClassName(fClass);
    arrayItems = Array.prototype.slice.call(fromItems);
    indexNum = arrayItems.indexOf(item); // list: UL of cart/rejects, obj: cartObj/rejectObj
    name = fObj.names[indexNum];      // class: "cartitem"/"rejectsitem", store: "cart"/"rejects"
    price = fObj.prices[indexNum];    // they're arranged in duos, the first is where the items 
    sale = fObj.sales[indexNum];      // are going from, and the second is their destination
    amount = fObj.amounts[indexNum];  
                                         

    //copies the values from cartObj into the rejectsobj
		tObj.names.push(name);
		tObj.prices.push(price);
		tObj.sales.push(sale);
		tObj.amounts.push(amount);
    localStorage.setItem(tStore, JSON.stringify(tObj));
		
		//deletes the item from the grocerylist obj
		fObj.names.splice(indexNum, 1);
		fObj.prices.splice(indexNum, 1);
		fObj.sales.splice(indexNum, 1);
		fObj.amounts.splice(indexNum, 1);
    localStorage.setItem(fStore, JSON.stringify(fObj));
		
		//adds a <li> to the rejects list and removes it from grocery list
		finalPrice = (price - (price * (sale / 100))) * amount;
		textNode = document.createTextNode(name + ": $" + finalPrice.toFixed(2));
		newLi = document.createElement("li");
		newLi.appendChild(textNode);
		newLi.className = tClass;
		tList.appendChild(newLi);
		fList.removeChild(item);
	}
	
  function deleteCartRejects(cartObj, rejectsObj) {
    var cart = document.getElementById("shoppingCart"),
      rejects = document.getElementById("rejects");
    
    cart.innerHTML = '<li id=cartWarning class="warning">Your grocery cart is empty</li>';
    rejects.innerHTML = '<li id=rejectsWarning class="warning">You have no rejects</li>';
    cartObj.names.length = 0;
    cartObj.prices.length = 0;
    cartObj.sales.length = 0;
    cartObj.amounts.length =0;
    rejectsObj.names.length = 0;
    rejectsObj.prices.length = 0;
    rejectsObj.sales.length = 0;
    rejectsObj.amounts.length = 0;

    localStorage.cart = JSON.stringify(cartObj);
    localStorage.rejects = JSON.stringify(rejectsObj);
    
  }
	
  //multi-area functions///////////////////////////////////////////////////////////////
          //updates objects with any data from storage
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
          //checks if theres any data in storage, then adds them to the appropriate list
  function setUpLists() {
   
    
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
        newLi.innerHTML ='<span class="pastLi">' + piStored[i] + ' </span><button class="pastX">x</button>';
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
         
          //these next 3 apply to popUp menus in the grocery list and shopping cart
  function addPopUp(e, li, liText, liItems, arrayItems, inputs, sliceNum) {
      var i, el, elText, arr;
    
      if (liText.includes("x$Price")) {     //if menu text content has already been added 
        liText = liText.slice(0, sliceNum); //it removes it, before adding it back
      }                                     //Meaning, multiple clicks can never pile on
        li.innerHTML = liText + inputs;     //multiple menues //remove it to see what i mean

      for (i = 0; i < liItems.length; i++) {
        el = arrayItems[i];
        elText = el.textContent;
        if (elText.includes("x$Price")) { //finds the actual text of the grocery item 
          elText = elText.slice(0, sliceNum);  
        }
        if (arrayItems[i] !== e.target) {  //if the clicked item does not match
          el.innerHTML = elText;           //the event object, then the popup menu
        }                                  // is removed
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
		var li = e.target.parentElement.parentElement;
    li.innerHTML = li.textContent.slice(0, -38);
    if (li.className === "cartItem") {li.innerHTML = li.textContent.slice(0, -3);}
	}
  
  
  function switchView(visible, groceryWrapper, pastWrapper, cartWrapper, rejectsWrapper) {
		switch(visible) {
      case "groceryList":
        visible = "pastItems";
        groceryWrapper.style.display = "none";
        pastWrapper.style.display = "block";
        return visible;
      case "pastItems":
        visible = "groceryList";
        groceryWrapper.style.display = "block";
        pastWrapper.style.display = "none";
        return visible;
      case "cart":
        visible = "rejects";
        cartWrapper.style.display = "none";
        rejectsWrapper.style.display = "block";
        return visible;
      case "rejects":
        visible = "cart";
        cartWrapper.style.display = "block";
        rejectsWrapper.style.display = "none";
        return visible;
    }
	}

	function emptyListFill() {
		var glItems = document.getElementsByClassName("groceryItem"),
      pItems = document.getElementsByClassName("pastItem"),
			scItems = document.getElementsByClassName("cartItem"),
			rItems = document.getElementsByClassName("rejectsItem");
		
		//if a list is empty, the warning li will become visibleCR
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
  
//^ function definitions/////////////////////////////////////////////////////////////////////   
//v main code////////////////////////////////////////////////////////////////////////////////
	var body = document.getElementById("content"),
		background = document.getElementById("background"),
		addButton = document.getElementById("addItem"),
		groceryList = document.getElementById("groceryList"),
    groceryWrapper = document.getElementById("listWrapper"),
		cartWrapper = document.getElementById("cartWrapper"),	
		cart = document.getElementById("shoppingCart"),
    pastWrapper = document.getElementById("pastWrapper"),
    pastItems = document.getElementById("past"),
		rejects = document.getElementById("rejects"),
		rejectsWrapper = document.getElementById("rejectsWrapper"),
		switchVisibility = document.getElementById('switchButton'),
		visibleCR = "cart",              //used to decide if cart or rejects is visible
    visibleGP = "groceryList",       //used to decide if groceries or past is visible
    storageObjs = checkStorage(),
    groceryListObj = storageObjs[0],
    pastItemsObj = storageObjs[1],
    cartObj = storageObjs[2],
    rejectsObj = storageObjs[3];
  
  //initial function to set up the page
  (function () {
    setUpLists();
		emptyListFill();
    calculateTotal(cartObj);
  }());
  
	body.addEventListener("click", function (e) {
		if (e.target.type === "text") {
			e.target.value = "";
		} else if (e.target.id === "background") {
      document.getElementById("bkgHead").style.visibility = 'visible';
    }
	}, false);
	
	groceryWrapper.addEventListener("click", function (e) {
		if (e.target.className === "groceryItem") {
			createPopUpList(e, addPopUp);
			centerMenu(document.getElementById("popUpList"));
		} 
    switch(e.target.id) {
      case "groceryButton":
        visibleGP = switchView(visibleGP, groceryWrapper, pastWrapper, cartWrapper, rejectsWrapper);
        break;
      case "addItem":
        addName(groceryListObj);
        break;
      case "x":
        xMenu(e);
        break;
      case "addToCart":
        if (checkInputs(document.getElementById("popUpList"))) {
				  addToCart(e, groceryListObj, pastItemsObj, cartObj);
				  calculateTotal(cartObj);
			  }
        break;
      case "removeItemButton":
        groceryToPast(e, groceryList, groceryListObj, pastItems, pastItemsObj);
        break;
    }
    emptyListFill();
	}, false);
  
  pastWrapper.addEventListener("click", function (e) {
		if (e.target.className === "pastLi") {
        pastToGrocery(e, groceryList, groceryListObj, pastItems, pastItemsObj);
    } else if (e.target.className === "pastX") {
        xPast(e, pastItemsObj);
    }
    switch(e.target.id) {
      case "deletePastItems":
        deletePast(pastItemsObj);
        break;
      case "moveGroceryItems":
        moveGroceryList(groceryListObj, pastItemsObj);
        break;
      case "pastButton":
        visibleGP = switchView(visibleGP, groceryWrapper, pastWrapper, cartWrapper, rejectsWrapper);
        break;
    }
    emptyListFill();
	}, false);
	
	cartWrapper.addEventListener("click", function (e) {
		if (e.target.className === "cartItem") {
		  createPopUpCart(e, cartObj, addPopUp);
		  centerMenu(document.getElementById("popUpCart"));
		}
    switch(e.target.id) {
      case "xCart":
		    xMenu(e);
        break;
      case "cartButton":
        visibleCR = switchView(visibleCR, groceryWrapper, pastWrapper, cartWrapper, rejectsWrapper);
        break;
      case "rejectItemButton":
        moveCartRejects(e, cart, rejects, cartObj, rejectsObj, "cartItem", "rejectsItem", "cart", "rejects"); 
        calculateTotal(cartObj);
        break;
      case "updateButton":
        if (checkInputs(document.getElementById("popUpCart"))) {
				  updateItemPrice(e, cart, rejects, cartObj, rejectsObj, moveCartRejects);
				  calculateTotal(cartObj);
        }
        break;
    }
		emptyListFill();
	}, false);
	
	rejectsWrapper.addEventListener("click", function (e) {
		if (e.target.className === "rejectsItem") {
      moveCartRejects(e, rejects, cart, rejectsObj, cartObj, "rejectsItem", "cartItem", "rejects", "cart"); 
      calculateTotal(cartObj);
      emptyListFill();
		} else if (e.target.id === "rejectsButton") {
			visibleCR = switchView(visibleCR, groceryWrapper, pastWrapper, cartWrapper, rejectsWrapper);
		} else if (e.target.id === "deleteCartRejects") {
      deleteCartRejects(cartObj, rejectsObj);
      calculateTotal(cartObj);
    }
	}, false);
  
}());