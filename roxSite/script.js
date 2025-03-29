const addItemForm = document.getElementById("add-item-form");
addItemForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const keyName = document.getElementById("key-name").value;
    let keyValue = document.getElementById("key-value").value;

    const lines = keyValue.split(/\r?\n/);

    try {
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine) {
                const response = await fetch(`http://localhost:3000/adicionar-item/${keyName}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ value: trimmedLine }),
                });
                if (!response.ok) {
                    throw new Error("Failed to add item.");
                }
            }
        }
        alert("Items added successfully!");
        addItemForm.reset();
    } catch (error) {
        console.error("Error adding item:", error);
        alert("Error adding item. Please try again.");
    }
});
const loadKeysButton = document.getElementById("load-keys");
loadKeysButton.addEventListener("click", async () => {
    try {
        const response = await fetch("https://localhost:3000/keys");
        if (response.ok) {
            const keys = await response.json();
            let formattedKeys = '';
            for (const key in keys) {
                if (keys.hasOwnProperty(key)) {
                    formattedKeys += `${key}: ${JSON.stringify(keys[key])}\n`;
                }
            }
            document.getElementById("keys").innerText = formattedKeys;
        } else {
            throw new Error("Failed to load keys.");
        }
    } catch (error) {
        console.error("Error loading keys:", error);
        alert("Error loading keys. Please try again.");
    }
});


const removeItemButton = document.getElementById("remove-item");
removeItemButton.addEventListener("click", async () => {
    const keyName = document.getElementById("key-name").value;
    const keyValue = document.getElementById("key-value").value;
    try {
        const response = await fetch(`https://localhost:3000/remover-item/${keyName}/${keyValue}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Item removed successfully!");
            const keysElement = document.getElementById("keys");
            const keysText = keysElement.innerText;
            const regex = new RegExp(`${keyName}:\\s*${JSON.stringify([keyValue])}`, "g");
            keysElement.innerText = keysText.replace(regex, '');
            const keysResponse = await fetch("https://localhost:3000/keys");
            if (keysResponse.ok) {
                const keys = await keysResponse.json();
                let formattedKeys = '';
                for (const key in keys) {
                    if (keys.hasOwnProperty(key)) {
                        formattedKeys += `${key}: ${JSON.stringify(keys[key])}\n`;
                    }
                }
                document.getElementById("keys").innerText = formattedKeys;
            } else {
                throw new Error("Failed to fetch updated keys.");
            }
        } else {
            throw new Error("Failed to remove item.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error occurred. Please try again.");
    }
});
