
import { itemList } from "./simulatedDB"

import { cardClass } from "./card"

cardList = document.getElementById("cardWrap")
CategoryFilter = document.getElementById("catFilter")
textFilter = document.getElementById("textFilter")
sortBy = document.getElementById("sortBy")
clearFilterBtn = document.getElementById("clearFilters")

allCards = []

function clearItems() {
    cardList.innerHTML = ""
    allCards=[]
}

function loadItems(items, max, offset, filters) {

    requiredTitle = filters.Title
    requiredCategory = filters.Category
    requiredPhone = filters.Phone
    requiredDescription = filters.Description
    generalSearch = filters.General

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

        const element = items[index+offset];

        // check max and last item
        if (allCards.length>max || items[index+offset]==null) {
            break
        }

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
                console.log(element.Title);
                    console.log(!element.Title.toLowerCase().includes(generalSearch.toLowerCase()))
                    console.log(!element.Description.toLowerCase().includes(generalSearch.toLowerCase()));
                    console.log(
                        element.Tags!=undefined,
                        !(element.Tags || "hello").toLowerCase().includes(generalSearch.toLowerCase())
                    );
                if (
                    !element.Title.toLowerCase().includes(generalSearch.toLowerCase()) && 
                    !element.Description.toLowerCase().includes(generalSearch.toLowerCase()) &&
                    !(element.Tags || "hello").toLowerCase().includes(generalSearch.toLowerCase())
                )
                {
                    console.log("skip")
                    
                    
                    continue
                }
            }
        }

        newCard = new cardClass(
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

function refreshItems(items, pageNum, perPage, filters) {
    clearItems()
    loadItems(items,perPage-1,pageNum*perPage, filters)
}

refreshItems(
    itemList,
    0,
    18,
    {
        Sort: "name"
    }
)

function quickUpdate() {
    console.log(CategoryFilter.value)
    refreshItems(
        itemList,
        0,
        18,
        {
            General: textFilter.value,
            Category: CategoryFilter.value,
            Sort: sortBy.value
        }
    )
}

textFilter.addEventListener("input", quickUpdate)
CategoryFilter.addEventListener("input", quickUpdate)
sortBy.addEventListener("input", quickUpdate)
