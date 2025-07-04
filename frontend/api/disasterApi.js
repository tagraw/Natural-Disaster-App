import axios from 'axios'; // Import axios for making HTTP requests 
// axios allows developers to send asynchronous requests to servers and handle responses, simplifying the process of interacting with APIs.

const fetchDisasterInfo = async (lat, lon) => { // Function to fetch disaster information based on latitude and longitude
  try {
    const res = await axios.post("http://192.168.0.154:5000/disaster-info", { lat, lon }); 
    return res.data.disasters;
  } catch (err) {
    console.error("Error fetching disaster info:", err);
    return [];
  }
};

export default fetchDisasterInfo;