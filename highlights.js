import { itemList } from "./simulatedDB";

import { cardClass } from "./card";


cardList = document.getElementById("cardWrap")

cardInfoA = itemList[0]
cardInfoB = itemList[1]
cardInfoC = itemList[2]

function ezCreate(cardInfo) {
    card = new cardClass(
        cardInfo.Title,
        cardInfo.Description,
        cardInfo.Category,
        cardInfo.Tag,
        cardInfo.Phone
    )
    card.createNode(cardList)
}

ezCreate(cardInfoA)
ezCreate(cardInfoB)
ezCreate(cardInfoC)
