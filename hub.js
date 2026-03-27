
const TagList = {
    Food: "Food",
    Health: "Health",
    Housing: "Housing",
    Legal: "Legal",
    Youth: "Youth",
    Education: "Education",
    Veteran: "Veteran",
    Crisis: "Crisis",
}

itemList = [
    {
        Title: "Title-1",
        Description: "desc-1",
        Tag: "Veteran",
        Phone: "(915) 123-456"
    },
    {
        Title: "Title-2",
        Description: "desc-2",
        Tag: "Housing",
        Phone: "(915) 654-321"
    },
    {
        Title: "Emergence Health Network Crisis Line",
        Description: "For mental health emergencies and substance use support.",
        Tag: "Crisis",
        Phone: "(915) 779-1800"
    },
    {
        Title: "Opportunity Center for the Homeless",
        Description: "Offers emergency shelter, meals, and laundry services.",
        Tag: TagList.Housing,
        Phone: "(915) 577-0069"
    },
    {
        Title: "El Pasoans Fighting Hunger Food Bank",
        Description: "They operate mobile pantries and home delivery for seniors/homebound individuals.",
        Tag: TagList.Food,
        Phone: "(915) 298-0353"
    },
    {
        Title: "City of El Paso Public Health",
        Description: "Offers dental clinics, immunizations, and WIC services (food assistance for women and children).",
        Tag: TagList.Health,
        Phone: "(915) 212-0200"
    },
    {
        Title: "County Veterans Assistance Office",
        Description: "Helps veterans navigate earned benefits and entitlements.",
        Tag: TagList.Veteran,
        Phone: "(915) 273-3454"
    },
    {
        Title: "Youth resource example",
        Description: "Helping kids throughout their life.",
        Tag: TagList.Youth,
        Phone: "(915) you-tube"
    },
    {
        Title: "Education resource example",
        Description: "Need help studying, give us a call!",
        Tag: TagList.Education,
        Phone: "(915) edu-1234"
    },
    {
        Title: "Legal resouce example",
        Description: "We help you win any case in three minutes",
        Tag: TagList.Legal,
        Phone: "(915) 136-4100"
    }
]

cardList = document.getElementById("cardWrap")
tagFilter = document.getElementById("catFilter")
textFilter = document.getElementById("textFilter")
sortBy = document.getElementById("sortBy")
clearFilterBtn = document.getElementById("clearFilters")
class cardClass{
    constructor(Title, Description, Tag, Phone) {
        this.Title = Title
        this.Description = Description
        this.Tag = Tag
        this.Phone = Phone
        this.HTMLNodes = null
    }
    createNode() {
        //creates article
        const articleNode = document.createElement("article")
        articleNode.className="card"
        articleNode.role="listitem"
        cardList.appendChild(articleNode)
        
        //creates header
        const headerText = document.createElement("h3")
        headerText.textContent = this.Title + " "
        articleNode.appendChild(headerText)

        //creates Tag badge
        const TagText = document.createElement("span")
        TagText.className="badge"
        TagText.textContent = this.Tag
        headerText.appendChild(TagText)

        //creates phone badge
        const phoneText = document.createElement("span")
        phoneText.className="badge"
        phoneText.textContent = this.Phone
        headerText.appendChild(phoneText)

        //creates description
        const descriptionText = document.createElement("p")
        descriptionText.className="meta"
        descriptionText.textContent = this.Description
        articleNode.appendChild(descriptionText)

        //sets html nodes variable
        this.HTMLNodes={
            articleNode:articleNode,
            headerText:headerText,
            TagText:TagText,
            phoneText:phoneText,
            descriptionText:descriptionText,
        }
    }
}

allCards = []

function clearItems() {
    cardList.innerHTML = ""
    allCards=[]
}

function loadItems(items, max, offset, filters) {

    requiredTitle = filters.Title
    requiredTag = filters.Tag
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
                let x = a.Tag.toLowerCase();
                let y = b.Tag.toLowerCase();
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
            if (requiredTitle && !element.Title.toLowerCase().includes(requiredTitle.toLowerCase())) {
                continue
            }
            if (requiredTag && !element.Tag.toLowerCase().includes(requiredTag.toLowerCase())) {
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
                    !element.Description.toLowerCase().includes(generalSearch.toLowerCase()))
                {
                    console.log("skip")
                    continue
                }
            }
        }

        newCard = new cardClass(
            element.Title,
            element.Description,
            element.Tag,
            element.Phone
        )
        newCard.createNode()
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
    console.log(tagFilter.value)
    refreshItems(
        itemList,
        0,
        18,
        {
            General: textFilter.value,
            Tag: tagFilter.value,
            Sort: sortBy.value
        }
    )
}

textFilter.addEventListener("input", quickUpdate)
tagFilter.addEventListener("input", quickUpdate)
sortBy.addEventListener("input", quickUpdate)