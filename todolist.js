const submitBtn = document.querySelector(".submit")
        const inputEl = document.querySelector(".inputEl")
        const groceries = document.querySelector(".groceries")
        const clearBtn = document.querySelector(".clear")
        const deleteButton = document.querySelectorAll(".deleteBtn")
        const editButton = document.querySelectorAll(".editBtn")
        const history = document.querySelector(".history")

        let isEditing = false   
        let currentEditingItem = null
        
        document.addEventListener("DOMContentLoaded", () => {
            const savedItems = JSON.parse(localStorage.getItem("groceryList")) || [];
            savedItems.forEach(item => {
                appendList(item);
            });
            if (savedItems.length > 0) clearBtn.classList.add("display");
        });

        function saveList() {
            const items = Array.from(groceries.querySelectorAll("li")).map(item => item.firstChild.textContent);
            localStorage.setItem("groceryList", JSON.stringify(items));
        }

        submitBtn.addEventListener("click", event => {
            if(inputEl.value !== "") {
                if(isEditing) {
                    currentEditingItem.textContent = inputEl.value
                    setBackToDefault()
                    displayHistory("Item Updated", "editHistory")
                } else {
                    appendList(inputEl.value)
                    displayHistory(`${inputEl.value} Is Added To The List`, "addHistory")
                }
                saveList()
            }

            inputEl.value = ""
        })

        clearBtn.addEventListener("click", event => {
            groceries.textContent = ""
            clearBtn.classList.remove("display")
            setBackToDefault()
            localStorage.removeItem("groceryList")
        })

        function appendList(value) {
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("deleteBtn");

            deleteBtn.addEventListener("click", event => {
                event.target.parentElement.remove()
                saveList();
                if (groceries.getElementsByTagName("li").length === 0) {
                    clearBtn.classList.remove("display");
                }
                setBackToDefault()
                displayHistory("Item Removed", "deleteHistory")
            });

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.classList.add("editBtn");

            editBtn.addEventListener("click", event => {
                isEditing = true
                currentEditingItem = event.target.previousSibling
                inputEl.value = event.target.previousSibling.textContent
                submitBtn.textContent = "Edit"
            })
            
            const listItem = document.createElement("li");
            listItem.textContent = value;
            listItem.appendChild(editBtn);
            listItem.appendChild(deleteBtn);

            groceries.appendChild(listItem);

            clearBtn.classList.add("display")            
        }

        function displayHistory(text, action) {
            history.textContent = text
            history.classList.add(action)

            setTimeout(() => {
                history.classList.remove(action);
                history.textContent = ""
            }, 1000);
        }

        function setBackToDefault() {
            inputEl.value = ""
            isEditing = false
            currentEditingItem = null
            submitBtn.textContent = "Submit"
        }