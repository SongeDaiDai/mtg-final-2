window.addEventListener('load', function () {
    setCardType()
})

function setCardType() {
    let cardType = []
    let types = "https://api.magicthegathering.io/v1/types"
    fetch(types).then(r => r.json()).then(data => {
        let cardData = data.types
        if (Object.keys(cardData).length !== 0) {
            for (let type in cardData) {
                console.log("Array?" + cardData[type])
                cardType.push(cardData[type])
            }
            console.log("After" + cardType)
            cardTypeAdd(cardType)
        } else {
            cardType =
                ["Artifact",
                    "Conspiracy",
                    "Creature",
                    "Enchantment",
                    "Instant",
                    "Land",
                    "Phenomenon",
                    "Plane",
                    "Planeswalker",
                    "Scheme",
                    "Sorcery",
                    "Tribal",
                    "Vanguard"
                ]
            cardTypeAdd(cardType)
        }
    })
}
function cardTypeAdd(cardType){
    for (let type in cardType) {
        let newType = document.createElement('option')
        newType.id = `type_${type}`
        document.body.getElementsByClassName("typeSelector")[0].appendChild(newType)
        let typeOption = document.getElementById(`${newType.id}`)
        typeOption.innerHTML =
            `<option id=${newType.id} value="${cardType[type]}">${cardType[type]}</option>`
    }
}


let checkedList = []
let rarityList = ""
let common = document.getElementById("common")
let uncommon = document.getElementById("uncommon")
let rare = document.getElementById("rare")
let mythic = document.getElementById("mythic")
document.getElementById("typeSelector").onchange = search;
document.getElementById("common").onchange = function () {
    if (common.checked) {
        checkedList.push(common.value)
    } else {
        checkedList.splice(checkedList.indexOf(common.value), 1)
    }

}
document.getElementById("uncommon").onchange = function () {
    if (uncommon.checked) {
        checkedList.push(uncommon.value)
    } else {
        checkedList.splice(checkedList.indexOf(uncommon.value), 1)
    }

}
document.getElementById("rare").onchange = function () {
    if (rare.checked) {
        checkedList.push(rare.value)
    } else {
        checkedList.splice(checkedList.indexOf(rare.value), 1)
    }

}
document.getElementById("mythic").onchange = function () {
    if (mythic.checked) {
        checkedList.push(mythic.value)
    } else {
        checkedList.splice(checkedList.indexOf(mythic.value), 1)
    }

}
document.getElementById("raritySelector").onchange = getRarity

let results = false

async function getRarity() {
    let count = 0

    if (checkedList !== []) {
        for (let rarity in checkedList) {
            if (count === 0) {
                rarityList = "r:" + checkedList[rarity]
                console.log(rarityList)
                count++;
            } else {
                rarityList = rarityList + "+r:" + checkedList[rarity]
                console.log(rarityList)
            }
        }
    }
    await search
}

function urlBuilder() {
    let urlCard = `https://api.scryfall.com/cards/search?order=rarity&q=`
    let typeTester = document.getElementById("typeSelector").value
    let type = ""
    if (typeTester !== "Any") {
        type = typeTester
    }
    console.log(type)
    let typeUrlValue
    if (rarityList !== "") {
        typeUrlValue = rarityList
        if (type !== "")
            typeUrlValue = typeUrlValue + "+t:" + type
    } else if (type !== any) {
        typeUrlValue = "t:" + type
    }
    console.log(typeUrlValue)
    return urlCard + typeUrlValue
}

async function clearSearch() {
    let e = document.getElementById("search-results")
    let child = e.lastElementChild
    while (child) {
        e.removeChild(child)
        child = e.lastElementChild
    }
}

async function search() {
    await clearSearch()
    await scryFall(urlBuilder())
}

function fade(element, op, time) {
    let x = document.getElementById(element);
    x.style.display = ""
    let timer = setInterval(function () {
        if (op === 0.1) {
            if (op >= 1) {
                clearInterval(timer);
            }
        } else if (op <= 0.1) {
            clearInterval(timer)
        }
        x.style.opacity = op;
        x.style.filter = 'alpha(opacity=' + op * 100 + ")";
        if (time === 10) {
            op += op * 0.1;
        } else {
            op -= op * 0.1;
        }
    }, time);
}

function noResults() {
    results = false;
    alert("There's no card result for your research.");
}


async function scryFall(urlCard) {
    let count = 0;
    await fetch(urlCard)
        .then(r => r.json())
        .then(async cards => {
                if (Object.keys(cards).length !== 0) {
                    for (let card in cards.data) {
                        let cardData = cards.data[card]
                        let cardUrl = cardData.uri
                        let cardRarity = cardData.rarity
                        let cardName = cardData.name
                        let cardImage = cardData.image_uris
                        let cardType = cardData.type_line
                        let cardText = cardData.oracle_text
                        await createCard(count, cardUrl)
                        await setImage(cardImage, count, cardName)
                        setTypeCard(cardType, count)
                        setCardName(cardName, count)
                        setRarity(cardRarity, count)
                        await setText(cardText, count)
                        fade(`card_${count}`, 0.1, 10)
                        count++
                    }
                } else {
                await noResults
                }

            }
        ).catch(err => console.log(err))
}

function setCardName(name, count) {
    let capName = capitalizeFirstLetter(name);
    if (capName === undefined) {
    } else {
        document.getElementById(`card_name_${count}`).innerHTML += capName
    }
}

function setTypeCard(type, count) {
    let name = capitalizeFirstLetter(type);
    if (name === undefined) {
    } else {
        document.getElementById(`card_${count}_text`).innerHTML += `<p class="card-h1"><span class="card-section"><b>Type:</b> </span><span class="card-padding"> ${name}</span></p>`
    }
}

async function setImage(image, count, name) {
    let img = document.getElementById(`img_${count}`)
    if (image === undefined) {
        image = "./assets/img/img.png"
    } else {
        image = "png" in image ? image.png
            : "large" in image ? image.large : "normal" in image ? image.normal : image.small
    }
    img.src = image
    img.alt = name
}

function createCard(count, url) {
    let newCard = document.createElement('div')
    newCard.id = `card_${count}`
    newCard.className = "card"
    document.body.getElementsByClassName("card-group")[0].appendChild(newCard)
    let card = document.getElementById(`${newCard.id}`)
    card.innerHTML =
        `
            <div id="card_${count}" class="card">
                <div id="card_${count}_head" class="card-header" >
                </div>
            <div id="card_${count}_img_top" class="card-img-top" >
                <div id="card_${count}_img" class="" ><a id="book_url_${count}" href="${url}" target="_blank">\`<img id="img_${count}" alt="#" width="100%" /></a></div>
            </div>
            <div id="card_${count}_bod" class="card-body" >
                <div id="card_${count}_title" class="card-title" >
                    <b id="card_name_${count}"></b>
                </div>
                    <div id="card_${count}_text" class="card-text" >
                    </div>
                </div>
            <div id="card_${count}_footer" class="card-footer" ></div>
        </div>      
                `

}

function setRarity(rarity, count) {
    if (rarity !== undefined) {
        rarity = capitalizeFirstLetter(rarity)
        document.getElementById(`card_${count}_text`).innerHTML += `<p class="card-h1" ><i class="card-section" >Rarity: </i><span class="card-padding" > ${rarity}</span></p>`
    } else {
        document.getElementById(`card_${count}_text`).innerHTML += ""
    }
}

function setText(text, count) {
    if (text !== undefined) {
        document.getElementById(`card_${count}_text`).innerHTML += `<p><i class="card-padding" style="font-size:0.91em">${text}<span  id="card_${count}_sub"></span></i></p>`
    } else {
        document.getElementById(`card_${count}_text`).innerHTML += ""
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}