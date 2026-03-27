import { itemList } from "./simulatedDB.js";

import { cardClass } from "./card.js";


const cardList = document.getElementById("cardWrap")

const cardInfoA = itemList[0]
const cardInfoB = itemList[1]
const cardInfoC = itemList[2]

function ezCreate(cardInfo) {
    const card = new cardClass(
        cardInfo.Title,
        cardInfo.Description,
        cardInfo.Category,
        cardInfo.Tags,
        cardInfo.Phone
    )
    card.createNode(cardList)
}

ezCreate(cardInfoA)
ezCreate(cardInfoB)
ezCreate(cardInfoC)
