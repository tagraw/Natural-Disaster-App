const sendMessageToGPT = async (message) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    console.log("Full GPT API data:", data);
    
    // Fix: Handle both success and error cases
    if (data.error) {
      console.error("API Error:", data.error);
      return "Sorry, there was an API error.";
    }
    
    return data.response;
  } catch (error) {
    console.error("GPT API Error:", error);
    return "Sorry, something went wrong.";
  }
};