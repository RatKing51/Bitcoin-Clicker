/*
some of the code from javascript is ideas from the game by Ortell Cookie Clicker.
Other Resources used are the world wide web.... lol
Stack Overflow
*/

function getElement(element) {return document.getElementById(element)};

var user = {
    money: 0,
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
            user.totalMoney++;
            getElement("money").textContent = Math.floor(user.money);
        }
    },


    display: {
        clickerContainer: function(){
            getElement("money").textContent = Math.floor(user.money);
            getElement("moneyPerSecond").textContent = Math.floor(user.moneyPerSecond);
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

        fadeIn: function(element, duration, finalOpacity, callback){
            let opacity = 0;

            let elementFadingInterval = window.setInterval(function() {
                opacity += 50 / duration;

                if (opacity >= finalOpacity){
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

           clicker.appendChild(element);

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
            shopContainer.innerHTML = "";
            for(i=0; i<game.buildings.title.length; i++){
                if (game.buildings.owned[i] == true){
                    shopContainer.innerHTML += `
                    <div class="shop-card" id="${game.buildings.id[i]}" title="${game.buildings.description[i]}, Income: ${game.buildings.income[i]}" onclick="game.buildings.purchase(${i})">
                        <img src="${game.buildings.img[i]}">
                        <div class="shop-info-container">
                            <h1>${game.buildings.title[i]}</h1>
                            <h2>Cost: ${game.buildings.cost[i]}</h2>
                        </div>
                        <h1>${game.buildings.amount[i]}</h1>
                    </div>
                `;
                    /*if (!game.buildings.spawned[i]){
                        this.fadeIn(getElement(game.buildings.id[i]), 2, 1, function(){
                            game.buildings.spawned[i] = true
                        })
                    }
                    */
                    
                }
            }
        },

        displayBuildings: function(){
            var humanContainer = getElement("humanContainer");
            var oldComputerContainer = getElement("oldComputerContainer");
            var betterKeyboardContainer = getElement("betterKeyboardContainer");
            var betterMouseContainer = getElement("betterMouseContainer");
            var betterDeskContainer = getElement("betterDeskContainer");
            if (game.buildings.amount[0] <= 0){
                humanContainer.style.visibility = "hidden";
            }
            if (game.buildings.amount[0] > 0){
                humanContainer.style.visibility = "visible";
                humanContainer.innerHTML = "";
                for(i=0; i<game.buildings.amount[0]; i++){
                    let element = document.createElement("img");
                    element.src = game.buildings.img[0];
                    element.classList.add("building-display-img");
                    let left;
                    if(i == 0){
                        left = 0;
                    }
                    else{
                        left = (i * 100) - 75;
                    }
                    const top = Math.random() * 25;
                    element.style.left = left + "px";
                    element.style.top = top + "px";
                    

                    humanContainer.appendChild(element);
                }
            }
            if (game.buildings.amount[1] <= 0){
                oldComputerContainer.style.visibility = "hidden";
            }
            if (game.buildings.amount[1] > 0){
                oldComputerContainer.style.visibility = "visible";
                oldComputerContainer.innerHTML = "";
                for(i=0; i<game.buildings.amount[1]; i++){
                    let element = document.createElement("img");
                    element.src = game.buildings.img[1];
                    element.classList.add("building-display-img")
                    let left;
                    if(i == 0){
                        left = 0;
                    }
                    else{
                        left = (i * 100) - 75;
                    }
                    const top = Math.random() * 25;
                    element.style.left = left + "px";
                    element.style.top = top + "px";
                    

                    oldComputerContainer.appendChild(element);
                }
            }
            if (game.buildings.amount[2] <= 0){
                betterKeyboardContainer.style.visibility = "hidden";
            }
            if (game.buildings.amount[2] > 0){
                betterKeyboardContainer.style.visibility = "visible";
                betterKeyboardContainer.innerHTML = "";
                for(i=0; i<game.buildings.amount[2]; i++){
                    let element = document.createElement("img");
                    element.src = game.buildings.img[2];
                    element.classList.add("building-display-img");
                    let left;
                    if(i == 0){
                        left = 0;
                    }
                    else{
                        left = (i * 100) - 75;
                    }
                    const top = Math.random() * 25;
                    element.style.left = left + "px";
                    element.style.top = top + "px";
                    

                    betterKeyboardContainer.appendChild(element);
                }
            }
            if (game.buildings.amount[3] <= 0){
                betterMouseContainer.style.visibility = "hidden";
            }
            if (game.buildings.amount[3] > 0){
                betterMouseContainer.style.visibility = "visible";
                betterMouseContainer.innerHTML = "";
                for(i=0; i<game.buildings.amount[3]; i++){
                    let element = document.createElement("img");
                    element.src = game.buildings.img[3];
                    element.classList.add("building-display-img");
                    let left;
                    if(i == 0){
                        left = 0;
                    }
                    else{
                        left = (i * 100) - 75;
                    }
                    const top = Math.random() * 25;
                    element.style.left = left + "px";
                    element.style.top = top + "px";
                    

                    betterMouseContainer.appendChild(element);
                }
            }
            if (game.buildings.amount[4] <= 0){
                betterDeskContainer.style.visibility = "hidden";
            }
            if (game.buildings.amount[4] > 0){
                betterDeskContainer.style.visibility = "visible";
                betterDeskContainer.innerHTML = ""
                for(i=0; i<game.buildings.amount[4]; i++){
                    let element = document.createElement("img");
                    element.src = game.buildings.img[4];
                    element.classList.add("building-display-img");
                    let left;
                    if(i == 0){
                        left = 0;
                    }
                    else{
                        left = (i * 100) - 75;
                    }
                    const top = Math.random() * 25;
                    element.style.left = left + "px";
                    element.style.top = top + "px";
                    

                    betterDeskContainer.appendChild(element);
                }
            }
            
            
        },

        displayUpgrade: function() {
            var container = getElement("upgradesContainer");
            container.innerHTML = "";
            for(i=0; i < game.upgrades.title.length; i++){
                if(game.upgrades.owned[i] == false){
                    if (game.upgrades.type[i] == 0){
                        if(game.upgrades.need[i] <= game.buildings.amount[game.upgrades.i[i]]){
                            
                            container.innerHTML += `
                            <img class="upgrade-img" src="${game.upgrades.img[i]}" title="${game.upgrades.title[i]}. ${game.upgrades.description[i]}. Cost:${game.upgrades.cost[i]}" onclick="game.upgrades.purchase(${i})"/>
                            `;
                        }
                    }
                    if (game.upgrades.type[i] == 1){
                        if(game.upgrades.need[i] <= user.totalClicks){
                            container.innerHTML += `
                            <img class="upgrade-img" src="${game.upgrades.img[i]}" title="${game.upgrades.title[i]}. ${game.upgrades.description[i]}. Cost:${game.upgrades.cost[i]}" onclick="game.upgrades.purchase(${i})"/>
                            `;
                        }
                    }
                }
                else{
                    container.innerHTML += "";
                }
            }
        },
        updateStats: function(){
            var mpsElement = getElement("moneyPerSecond");
            var totalMoneyElement = getElement("totalMoney");
            var totalClicksElement = getElement("totalClicks");
            var moneyPerClickElement = getElement("moneyPerClick");
            mpsElement.textContent = user.moneyPerSecond
            totalMoneyElement.textContent = user.totalMoney;
            totalClicksElement.textContent = user.totalClicks;
            moneyPerClickElement.textContent = user.moneyPerClick;

        },

        displayAchievement: function(name, description, img, i){
            var container = getElement("achievementContainer");
            container.innerHTML += `
            <div class="achievement-card" id="achievementCard${i}" title="${description}" onclick="game.achievements.removeAchievement(${i})">
                <img src="${img}"/>
                <p>${name}</p>
            </div
            `;
        }
    },

    buildings: {
        title: [
            "Human",
            "Slow Computer",
            "Better Keyboard",
            "Better Mouse",
            "Better Desk"
        ],
        cost: [
            150,
            500,
            1350,
            4000,
            7000
        ],
        income: [
            0.5,
            1,
            3,
            5,
            10,
        ],
        amount: [
            0,
            0,
            0,
            0,
            0
        ],
        description: [
            "A human to mine your crypto",
            "This mines crypto but it sucks like crap",
            "Keyboard to get type crypto faster.",
            "You can click faster for more crypto",
            "This gives you more desk space for more monitors."
        ],
        img: [
            "./imgs/human-image.png",
            "./imgs/old-computer.png",
            "./imgs/better-keyboard.jpeg",
            "./imgs/better-mouse.jpeg",
            "./imgs/better-desk.jpeg",
        ],

        id: [
            "humanId",
            "slowComputerId",
            "betterKeyboardId",
            "betterMouseId",
            "betterDeskId"
        ],

        owned: [
            false,
            false,
            false,
            false,
            false
        ],

        need: [
            1,
            250,
            500,
            750,
            1000
        ],

        spawned: [
            false,
            false,
            false,
            false,
            false
        ],

        purchase: function(i){
            if (user.money >= this.cost[i]){
                user.money -= this.cost[i];
                this.amount[i] += 1;
                this.cost[i] = Math.floor(this.cost[i] * 1.25);
                game.display.spawnBuildings();
                game.display.clickerContainer();
                user.moneyPerSecond += this.income[i];
                game.display.displayBuildings();
                game.display.displayUpgrade();
                this.checkPrice();
            }
        },

        checkPrice: function(){
            for (i=0; i<this.title.length; i++){
                if (this.owned[i] == true){
                    if(user.money >= this.cost[i]){
                        getElement(this.id[i]).style.borderColor = "black";
                    }
                    else{
                        getElement(this.id[i]).style.borderColor = "grey";
                    }
                }
            }
        },

        checkOwned: function() {
            for(i=0; i<this.title.length; i++){
                if(user.money >= game.buildings.need[i] && game.buildings.owned[i] == false){
                    game.buildings.owned[i] = true;
                }
            }
        }
    },

    upgrades: {
        title: [
            "Faster Workers",
            "More Clicker",
            "Beter Keycaps",
            "More Ram",
            "Faster DPI"
        ],
        cost: [
            1500,
            1500,
            5000,
            3500,
            5500
        ],
        description: [
            "This will doubles your workers income!!",
            "This will double your cursors income",
            "This will double your better keyboard income.",
            "This will double your old computer income.",
            "This will double your better mouse income."
        ],
        img: [
            "./imgs/human-image.png",
            "./imgs/cursor.webp",
            "./imgs/better-keyboard.jpeg",
            "./imgs/old-computer.png",
            "./imgs/better-mouse.jpeg"
        ],
        // 0 = building 1 = clicker 2 = click add
        type:[
            0,
            1,
            0,
            0,
            0
        ],
        outcome: [
            2,
            2,
            2,
            2,
            2
        ],
        need: [
            1,
            1,
            1,
            1,
            1
        ],
        owned: [
            false,
            false,
            false,
            false,
            false
        ],
        i: [
            0,
            false,
            2,
            1,
            3
        ],
        purchase: function(i) {
            if(user.money >= this.cost[i] && this.owned[i] == false){
                if (this.type[i] == 0){
                    user.money -= this.cost[i];
                    this.owned[i] = true;
                    game.buildings.income[this.i[i]] += game.buildings.income[this.i[i]] * this.outcome[i];
                    game.display.clickerContainer();
                    game.display.displayBuildings();
                    game.display.displayUpgrade();
                    game.display.spawnBuildings();
                    game.buildings.checkPrice();
                }
                if (this.type[i] == 1){
                    user.money -= this.cost[i];
                    this.owned[i] = true;
                    user.moneyPerClick = this.outcome[i] * user.moneyPerClick;
                    game.display.clickerContainer();
                    game.display.displayBuildings();
                    game.display.displayUpgrade();
                    game.display.spawnBuildings();
                    game.buildings.checkPrice();
                }
            }
            
        }
    },

    achievements: {
        name: [
            "One Starts All"
        ],

        description: [
            "You Clicked the Bitcoin"
        ],
        // 0 click 1 building
        type: [
            0       
        ],

        whatNeeded: [
            1
        ],

        owned: [
            false
        ],

        img: [
            "./imgs/cursor.webp"
        ],

        achieve: function(){
            for(i=0; i<this.name.length; i++){
                if(this.owned[i] == false){
                    if(this.type[i] == 0){
                        if(this.whatNeeded[i] <= user.totalClicks){
                            game.display.displayAchievement(this.name[i], this.description[i], this.img[i], i);
                            this.owned[i] = true;
                        }
                    }
                }
            }
        },

        removeAchievement: function(i){
            getElement("achievementCard" + i).style.visibility = "hidden";
        }

    },

    save: {
        saveGame: function(){
            var gameSave = {
                money: user.money,
                moneyPerClick: user.moneyPerClick,
                totalClicks: user.totalClicks,
                totalMoney: user.totalMoney,
                moneyPerSecond: user.moneyPerSecond,
                buildingCost: game.buildings.cost,
                buildingAmount: game.buildings.amount,
                buildingIncome: game.buildings.income,
                buildingOwned:game.buildings.owned,
                buidlingSpawned: game.buildings.spawned,
                upgradeOwned: game.upgrades.owned,
                achievementOwned: game.achievements.owned
            }
            localStorage.setItem("gameSave", JSON.stringify(gameSave));
        },

        loadGame: function(){
            var savedGame = JSON.parse(localStorage.getItem("gameSave"))
            if (localStorage.getItem("gameSave") !== null){
                if (typeof savedGame.money !== "undefined") user.money = savedGame.money;
                if (typeof savedGame.moneyPerClick !== "undefined") user.moneyPerClick = savedGame.moneyPerClick;
                if (typeof savedGame.totalClicks !== "undefined") user.totalClicks = savedGame.totalClicks;
                if (typeof savedGame.totalMoney !== "undefined") user.totalMoney = savedGame.totalMoney;
                if (typeof savedGame.moneyPerSecond !== "undefined") user.moneyPerSecond = savedGame.moneyPerSecond;
                if (typeof savedGame.buildingCost !== "undefined"){
                    for (i=0; i<savedGame.buildingCost.length; i++){
                        game.buildings.cost[i] = savedGame.buildingCost[i];
                    }
                }
                if (typeof savedGame.buildingAmount !== "undefined"){
                    for (i=0; i<savedGame.buildingAmount.length; i++){
                        game.buildings.amount[i] = savedGame.buildingAmount[i];
                    }
                }
                if (typeof savedGame.buildingIncome !== "undefined"){
                    for (i=0; i<savedGame.buildingIncome.length; i++){
                        game.buildings.income[i] = savedGame.buildingIncome[i];
                    }
                }
                if (typeof savedGame.buildingOwned !== "undefined"){
                    for (i=0; i<savedGame.buildingOwned.length; i++){
                        game.buildings.owned[i] = savedGame.buildingOwned[i];
                    }
                }
                if (typeof savedGame.buidlingSpawned !== "undefined"){
                    for (i=0; i<savedGame.buidlingSpawned.length; i++){
                        game.buildings.spawned[i] = savedGame.buidlingSpawned[i];
                    }
                }
                if (typeof savedGame.upgradeOwned !== "undefined"){
                    for (i=0; i<savedGame.upgradeOwned.length; i++){
                        game.upgrades.owned[i] = savedGame.upgradeOwned[i];
                    }
                }
                if (typeof savedGame.achievementOwned !== "undefined"){
                    for (i=0; i<savedGame.achievementOwned.length; i++){
                        game.achievements.owned[i] = savedGame.achievementOwned[i];
                    }
                }
            }
        },

        resetGame: function(){
            if (confirm("Are you sure you want to reset your game?")){
                var gameSave = {};
                localStorage.setItem("gameSave", JSON.stringify(gameSave));
                location.reload();
            }
        }
    },

    addMoneyPerSecond: function(){
        user.money += user.moneyPerSecond;
        user.totalMoney += user.moneyPerSecond
    }
}

// Event Listners
getElement("clickContainer").addEventListener('click', function(event){
    game.inputs.click();
    game.display.addClickNumber(event);
    game.display.displayUpgrade();
    game.buildings.checkPrice();
    game.achievements.achieve();
    game.buildings.checkOwned();
}, false);

getElement("statsButton").addEventListener("mouseover", () => {
    getElement("statContainer").style.visibility = "visible";
    game.display.updateStats();
})

getElement("statsButton").addEventListener("mouseout", () => {
    getElement("statContainer").style.visibility = "hidden";
})

getElement("aboutButton").addEventListener("mouseover", () => {
    getElement("aboutContainer").style.visibility = "visible";
})

getElement("aboutButton").addEventListener("mouseout", () => {
    getElement("aboutContainer").style.visibility = "hidden";
})
getElement("resetButton").addEventListener("click", game.save.resetGame);



// tick
var tick = setInterval(() => {
    game.display.clickerContainer();
    game.display.spawnBuildings();
    game.addMoneyPerSecond();
    game.display.displayUpgrade();
    game.display.updateStats();
    game.achievements.achieve();
    game.buildings.checkPrice();
    game.buildings.checkOwned();
}, 1000)

var tick30 = setInterval(() => {
    game.save.saveGame();
}, 30000)

window.onload = () =>{
    tick;
    game.save.loadGame();
    game.display.displayBuildings();
    game.save.saveGame();
}

