const API_URL = "http://192.168.0.154:5000/chat"; // Replace with your local or deployed Flask URL

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
    return data.response;
  } catch (error) {
    console.error("GPT API Error:", error);
    return "Sorry, something went wrong.";
  }
};

export default sendMessageToGPT;