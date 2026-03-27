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