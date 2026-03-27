//import { itemList } from "./simulatedDB";


const CategoryList = {
    Food: "Food",
    Health: "Health",
    Housing: "Housing",
    Legal: "Legal",
    Youth: "Youth",
    Education: "Education",
    Veteran: "Veteran",
    Crisis: "Crisis",
}



export const itemList = [
    {
        Title: "El Paso VA Medical Center",
        Description: "The main outpatient hub for primary care and mental health",
        Category: "Veteran",
        Phone: "(915) 564-6100",
        Tags: "Support,Mental health"
    },
    {
        Title: "Project Bravo",
        Description: "Low Income and Energy Assistance Program",
        Category: "Housing",
        Phone: "(915) 562-4100",
        Tags: "Financial"
    },
    {
        Title: "Emergence Health Network Crisis Line",
        Description: "For mental health emergencies and substance use support.",
        Category: "Crisis",
        Phone: "(915) 779-1800",
        Tags: "Mmental health,Support"
    },
    {
        Title: "Opportunity Center for the Homeless",
        Description: "Offers emergency shelter, meals, and laundry services.",
        Category: CategoryList.Housing,
        Phone: "(915) 577-0069",
        Tags: "Shelter,Homeless"
    },
    {
        Title: "El Pasoans Fighting Hunger Food Bank",
        Description: "They operate mobile pantries and home delivery for seniors/homebound individuals.",
        Category: CategoryList.Food,
        Phone: "(915) 298-0353",
        Tags: "Hunger"
    },
    {
        Title: "City of El Paso Public Health",
        Description: "Offers dental clinics, immunizations, and WIC services (food assistance for women and children).",
        Category: CategoryList.Health,
        Phone: "(915) 212-0200",
        Tags: "Clinic"
    },
    {
        Title: "County Veterans Assistance Office",
        Description: "Helps veterans navigate earned benefits and entitlements.",
        Category: CategoryList.Veteran,
        Phone: "(915) 273-3454",
        Tags: "Benefits"
    },
    {
        Title: "Aliviane",
        Description: "Promote wellness for young people between ages 13 and 21.",
        Category: CategoryList.Youth,
        Phone: "(915) 782-4023",
        Tags: "Health"
    },
    {
        Title: "El Paso Community Foundation",
        Description: "Classroom Fund for teachers in the Community",
        Category: CategoryList.Education,
        Phone: "(915) 533-4020",
        Tags: "Financial"
    },
    {
        Title: "El Paso County Bar Association Lawyer Referral Service",
        Description: "Connects public with qualified lawyers.",
        Category: CategoryList.Legal,
        Phone: "(915) 136-4100",
        Tags: "Law"
    }
]

//import { cardClass } from "./card";

class cardClass{
    constructor(Title, Description, Category, Tags, Phone) {
        this.Title = Title
        this.Description = Description
        this.Category = Category
        this.Phone = Phone
        this.Tags = Tags.split(",")
    }
    createNode(parentNode) {
        //creates article
        const articleNode = document.createElement("article")
        articleNode.className="card"
        articleNode.role="listitem"
        parentNode.appendChild(articleNode)
        
        //creates header
        const headerText = document.createElement("h3")
        headerText.textContent = this.Title + " "
        articleNode.appendChild(headerText)

        //creates category badge
        const CategoryText = document.createElement("span")
        CategoryText.className="badge"
        CategoryText.textContent = this.Category
        headerText.appendChild(CategoryText)

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

        //creates Tags badges
        const TagParagraph = document.createElement("p")
        articleNode.appendChild(TagParagraph)
        for (let index = 0; index < this.Tags.length; index++) {
            const element = this.Tags[index];
            //<p><span class="Tags">mental health</span> <span class="Tags">support</span></p>
            const TagSpan = document.createElement("span")
            TagSpan.className="tag"
            TagSpan.textContent=element
            TagParagraph.appendChild(TagSpan)
        }

        //sets html nodes variable
        this.HTMLNodes={
            articleNode:articleNode,
            headerText:headerText,
            CategoryText:CategoryText,
            phoneText:phoneText,
            descriptionText:descriptionText,
            TagParagraph:TagParagraph,
        }
    }
}


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
