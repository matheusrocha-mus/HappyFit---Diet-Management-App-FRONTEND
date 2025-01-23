//LOCAL:
//const API_URL = "http://localhost:8080";

//CLOUD:
const API_URL = "https://happyfit-91d0438f5ccb.herokuapp.com";

async function getData(resource, successMessage) {
    try {
        const response = await fetch(`${resource}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

        if (response.ok) console.log(successMessage);
        else throw new Error(`HTTP error! status: ${response.status}`);

        return response.json();
    } catch (error) {
        console.error("Error fetching JSON::", error);
    }
}

async function postData(resource, requestBody, successMessage) {
    try {
        const response = await fetch(`${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) console.log(successMessage);
        else throw new Error(`HTTP error! status: ${response.status}`);

        return response.json();
    } catch (error) {
        console.error("Error fetching JSON::", error);
    }
}

async function putData(resource, requestBody, successMessage) {
    try {
        const response = await fetch(`${resource}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) console.log(successMessage);
        else throw new Error(`HTTP error! status: ${response.status}`);

        return response.json();
    } catch (error) {
        console.error("Error fetching JSON::", error);
    }
}

async function deleteData(resource, successMessage) {
    try {
        const response = await fetch(`${resource}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

        if (response.ok) console.log(successMessage);
        else throw new Error(`HTTP error! status: ${response.status}`);

        return response.json();
    } catch (error) {
        console.error("Error fetching JSON::", error);
    }
}