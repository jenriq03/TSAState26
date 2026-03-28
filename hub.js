
import { itemList } from "./simulatedDB.js"

import { cardClass } from "./card.js"


const cardList = document.getElementById("cardWrap")
const CategoryFilter = document.getElementById("catFilter")
const textFilter = document.getElementById("textFilter")
const sortBy = document.getElementById("sortBy")
const clearFilterBtn = document.getElementById("clearFilters")

const losePageBtn = document.getElementById("losePage")
const gainPageBtn = document.getElementById("gainPage")
const pageNumLabel = document.getElementById("pageNumLabel")

const cardsPerPage = 15

let allCards = []
let possibleCards = []

function clearItems() {
    cardList.innerHTML = ""
    allCards=[]
    possibleCards=[]
}

function loadItems(items, max, offset, filters) {

    const requiredTitle = filters.Title
    const requiredCategory = filters.Category
    const requiredPhone = filters.Phone
    const requiredDescription = filters.Description
    const generalSearch = filters.General

    switch (filters.Sort) {
        case "name":
            items.sort(function(a, b){
                let x = a.Title.toLowerCase();
                let y = b.Title.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
                });
            break;
        case "category":
            items.sort(function(a, b){
                let x = a.Category.toLowerCase();
                let y = b.Category.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
                });
            break;
        default:
            break;
    }

    for (let index = 0; index < items.length; index++) {

        //check if last item
        if (items[index]==null) {
            break
        }

        const element = items[index];

        //checks for filters

        if (filters!={}) {
            //Do Repeat Yourself
            if (requiredTitle && !element.Title.toLowerCase().includes(requiredTitle.toLowerCase())) {
                continue
            }
            if (requiredCategory && !element.Category.toLowerCase().includes(requiredCategory.toLowerCase())) {
                continue
            }
            if (requiredPhone && !element.Phone.toLowerCase().includes(requiredPhone.toLowerCase())) {
                continue
            }
            if (requiredDescription && !element.Description.toLowerCase().includes(requiredDescription.toLowerCase())) {
                continue
            }
            if (generalSearch) {
                if (
                    !element.Title.toLowerCase().includes(generalSearch.toLowerCase()) && 
                    !element.Description.toLowerCase().includes(generalSearch.toLowerCase()) &&
                    !(element.Tags || "").toLowerCase().includes(generalSearch.toLowerCase())
                )
                {
                    continue
                }
            }
        }

        possibleCards.push(element)

        // check max or not at offset
        console.log(index,offset,element.Title)
        if (allCards.length>max || index<offset) {
            continue
        }

        const newCard = new cardClass(
            element.Title,
            element.Description,
            element.Category,
            (element.Tags=="" || element.Tags==undefined) ? "No Tags" : element.Tags,
            element.Phone,
        )
        newCard.createNode(cardList)
        allCards.push(newCard)
    }
}

function refreshItems(items, pageNum, filters) {
    clearItems()
    loadItems(items,cardsPerPage-1,pageNum*cardsPerPage, filters)
    console.log(possibleCards,cardsPerPage,Math.ceil(possibleCards.length/cardsPerPage))
    maxPages = Math.ceil(possibleCards.length/cardsPerPage)-1
    currentPage=Math.min(maxPages,currentPage)
    pageNumLabel.textContent="Page " + String(currentPage+1) + "/" + String(maxPages+1)
}

function quickUpdate() {
    refreshItems(
        itemList,
        currentPage,
        {
            General: textFilter.value,
            Category: CategoryFilter.value,
            Sort: sortBy.value
        }
    )
}

let currentPage = 0
let maxPages = 0

quickUpdate()

textFilter.addEventListener("input", quickUpdate)
CategoryFilter.addEventListener("input", quickUpdate)
sortBy.addEventListener("input", quickUpdate)

clearFilterBtn.addEventListener("click", function(params) {
    textFilter.value=""
    CategoryFilter.value=""
    sortBy.value="name"
    quickUpdate()
})

gainPageBtn.addEventListener("click", function() {
    currentPage=Math.min(maxPages,currentPage+1)
    quickUpdate()
})
losePageBtn.addEventListener("click", function(params) {
    currentPage=Math.max(0,currentPage-1)
    quickUpdate()
})