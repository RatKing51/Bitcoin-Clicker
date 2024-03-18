/*
This is a clicker game made by Gage Billinger, some of the code from javascript is ideas from the game by Ortell Cookie Clicker.
Other Resources used are the world wide web.... lol
Stack Overflow
*/

function getElement(element) {return document.getElementById(element)}

var user = {
    money: 9999999,
    moneyPerClick: 1,
    moneyPerSecond: 0,
    totalMoney: 0
}

var game = {
    inputs: {
        click: function(){
            user.money += user.moneyPerClick;
            game.display.clickerContainer()
        }
    },


    display: {
        clickerContainer: function(){
            getElement("money").textContent = Math.floor(user.money);
            getElement("moneyPerSecond").textContent = Math.floor(user.moneyPerSecond);
            if (user.moneyPerSecond == 0.1){
                getElement("moneyPerSecond").textContent = "0.1";
            }
            if (user.moneyPerSecond == 0.2){
                getElement("moneyPerSecond").textContent = "0.2";
            }
            if (user.moneyPerSecond == 0.3){
                getElement("moneyPerSecond").textContent = "0.3";
            }
            if (user.moneyPerSecond == 0.4){
                getElement("moneyPerSecond").textContent = "0.4";
            }
            if (user.moneyPerSecond == 0.5){
                getElement("moneyPerSecond").textContent = "0.5";
            }
            if (user.moneyPerSecond == 0.6){
                getElement("moneyPerSecond").textContent = "0.6";
            }
            if (user.moneyPerSecond == 0.7){
                getElement("moneyPerSecond").textContent = "0.7";
            }
            if (user.moneyPerSecond == 0.8){
                getElement("moneyPerSecond").textContent = "0.8";
            }
            if (user.moneyPerSecond == 0.9){
                getElement("moneyPerSecond").textContent = "0.9";
            }
            if (user.moneyPerSecond == 1){
                getElement("moneyPerSecond").textContent = "1";
            }
        },

        fadeOut: function(element, duration, finalOpacity, callback){
            let opacity = 1;

            let elementFadingInterval = window.setInterval(function() {
                opacity -= 50 / duration;

                if (opacity <= finalOpacity){
                    clearInterval(elementFadingInterval);
                    callback();
                }

                element.style.opacity = opacity;
            })
        },

        addClickNumber: function(event){
           let clicker = getElement("clickContainer");
           
           let clickerOffset = clicker.getBoundingClientRect();
           let position = {
            x: event.pageX - clickerOffset.left,
            y: event.pageY - clickerOffset.top
           };

           let element = document.createElement("div");
           element.textContent = "+" + user.moneyPerClick;
           element.classList.add("number");
           element.style.left = position.x + "px";
           element.style.top = position.y  + "px";

           clicker.appendChild(element)

           let movementInterval = window.setInterval(() => {
                if(typeof element == "undefined" && element == null){ clearInterval(movementInterval)};

                position.y--;
                element.style.top = position.y + "px";
           }, 10);

           this.fadeOut(element, 10000, 0.5, function(){
                element.remove();
           })
        },

        spawnBuildings: function(){
            var shopContainer = getElement("shopContainer");
            shopContainer.innerHTML = ""
            for(i=0; i<game.buildings.title.length; i++){
                shopContainer.innerHTML += `
                <div class="shop-card" id="shopCard" title="${game.buildings.description[i]}" onclick="game.buildings.purchase(${i})">
                    <img src="${game.buildings.img[i]}">
                    <div class="shop-info-container">
                        <h1>${game.buildings.title[i]}</h1>
                        <h2>Cost: ${game.buildings.cost[i]}</h2>
                    </div>
                    <h1>${game.buildings.amount[i]}</h1>
                </div>
                `
            }
        },

        displayBuildings: function(){
            var humanContainer = getElement("humanContainer");
            if (game.buildings.amount[0] <= 0){
                humanContainer.style.visibility = "hidden";
            }
            if (game.buildings.amount[0] > 0){
                humanContainer.style.visibility = "visible";
                humanContainer.innerHTML = ""
                for(i=0; i<game.buildings.amount[0]; i++){
                    let element = document.createElement("img");
                    element.src = game.buildings.img[0];
                    element.classList.add("building-display-img")
                    let left;
                    if(i == 0){
                        left = 0
                    }
                    else{
                        left = (i * 100) - 75;
                    }
                    const top = Math.random() * 75
                    element.style.left = left + "px"
                    element.style.top = top + "px"
                    

                    humanContainer.appendChild(element)
                }
            }
            
        }
    },

    buildings: {
        title: [
            "Human"
        ],
        cost: [
            150
        ],
        income: [
            0.1
        ],
        amount: [
            0
        ],
        description: [
            "A human to mine your crypto"
        ],
        img: [
            "/src/imgs/human-image.jpeg"
        ],

        purchase: function(i){
            if (user.money >= this.cost[i]){
                user.money -= this.cost[i];
                user.totalMoney -= this.cost[i];
                this.amount[i] += 1;
                this.cost[i] = Math.floor(this.cost[i] * 1.25);
                game.display.spawnBuildings()
                game.display.clickerContainer()
                user.moneyPerSecond += this.income[i];
                game.display.displayBuildings()
            }
        }
    },

    addMoneyPerSecond: function(){
        user.money += user.moneyPerSecond
    }
}

// Event Listners
getElement("clickContainer").addEventListener('click', function(event){
    game.inputs.click();
    game.display.addClickNumber(event)
}, false);


// tick
var tick = setInterval(() => {
    game.display.clickerContainer()
    game.display.spawnBuildings()
    game.addMoneyPerSecond()
}, 1000)