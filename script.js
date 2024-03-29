/*
This is a clicker game made by Gage Billinger, some of the code from javascript is ideas from the game by Ortell Cookie Clicker.
Other Resources used are the world wide web.... lol
Stack Overflow
*/

function getElement(element) {return document.getElementById(element)}

var user = {
    money: 0 ,
    moneyPerClick: 1,
    moneyPerSecond: 0,
    totalMoney: 0,
    totalClicks: 0
}

var game = {
    inputs: {
        click: function(){
            user.money += user.moneyPerClick;
            user.totalClicks++;
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
            var oldComputerContainer = getElement("oldComputerContainer")
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
            if (game.buildings.amount[1] <= 0){
                oldComputerContainer.style.visibility = "hidden";
            }
            if (game.buildings.amount[1] > 0){
                oldComputerContainer.style.visibility = "visible";
                oldComputerContainer.innerHTML = ""
                for(i=0; i<game.buildings.amount[1]; i++){
                    let element = document.createElement("img");
                    element.src = game.buildings.img[1];
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
                    

                    oldComputerContainer.appendChild(element)
                }
            }
            
        },

        displayUpgrade: function() {
            var container = getElement("upgradesContainer");
            container.innerHTML = ""
            for(i=0; i < game.upgrades.title.length; i++){
                if(game.upgrades.owned[i] == false){
                    if (game.upgrades.type[i] == 0){
                        if(game.upgrades.need[i] <= game.buildings.amount[game.upgrades.i[i]]){
                            
                            container.innerHTML += `
                            <img class="upgrade-img" src="${game.upgrades.img[i]}" title="${game.upgrades.title[i]}. ${game.upgrades.description[i]}. Cost:${game.upgrades.cost[i]}" onclick="game.upgrades.purchase(${i})"/>
                            `
                        }
                    }
                    if (game.upgrades.type[i] == 1){
                        if(game.upgrades.need[i] <= user.totalClicks){
                            container.innerHTML += `
                            <img class="upgrade-img" src="${game.upgrades.img[i]}" title="${game.upgrades.title[i]}. ${game.upgrades.description[i]}. Cost:${game.upgrades.cost[i]}" onclick="game.upgrades.purchase(${i})"/>
                            `
                        }
                    }
                }
                else{
                    container.innerHTML += ""
                }
            }
        }
    },

    buildings: {
        title: [
            "Human",
            "Slow Computer"
        ],
        cost: [
            150,
            500
        ],
        income: [
            0.5,
            1
        ],
        amount: [
            0,
            0
        ],
        description: [
            "A human to mine your crypto",
            "This mines crypto but it sucks like crap"
        ],
        img: [
            "human-image.jpeg",
            "old-computer.jpg"
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
                game.display.displayUpgrade()
            }
        }
    },

    upgrades: {
        title: [
            "Faster Workers",
            "More Clicker"
        ],
        cost: [
            1500,
            1500
        ],
        description: [
            "This will doubles your workers income!!",
            "This will double your cursors income"
        ],
        img: [
            "human-image.jpeg",
            "cursor.webp"
        ],
        // 0 = building 1 = clicker 2 = click add
        type:[
            0,
            1
        ],
        outcome: [
            2,
            2
        ],
        need: [
            1,
            1
        ],
        owned: [
            false,
            false
        ],
        i: [
            0,
            false
        ],
        purchase: function(i) {
            
            if(user.money >= this.cost[i] && this.owned[i] == false){
                if (this.type[i] == 0){
                    user.money -= this.cost[i];
                    this.owned[i] = true;
                    game.buildings.income[this.i[i]] += game.buildings.income[this.i[i]] * this.outcome[i]
                    game.display.clickerContainer()
                    game.display.displayBuildings()
                    game.display.displayUpgrade()
                    game.display.spawnBuildings()
                }
                if (this.type[i] == 1){
                    user.money -= this.cost[i];
                    this.owned[i] = true;
                    user.moneyPerClick = this.outcome[i] * user.moneyPerClick
                    game.display.clickerContainer()
                    game.display.displayBuildings()
                    game.display.displayUpgrade()
                    game.display.spawnBuildings()
                }
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
    game.display.displayUpgrade()
}, false);


// tick
var tick = setInterval(() => {
    game.display.clickerContainer()
    game.display.spawnBuildings()
    game.addMoneyPerSecond()
    game.display.displayUpgrade()
}, 1000)