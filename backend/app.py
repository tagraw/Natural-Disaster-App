from flask import Flask, request, jsonify
from flask_cors import CORS
from database import create_app
import requests

app = create_app()

CORS(app)


#route to get disaster info based on user location
@app.route("/disaster-info", methods=["POST"])
def get_disaster_info():
    data = request.get_json()
    lat, lon = data["lat"], data["lon"]
    # TODO: Add logic to fetch regional disaster info based on lat, lon
    # remember to change the return statement to return the actual data
    return jsonify({"disasters": ["tornado", "flood"]})

#route to get real-time weather alerts from the National Weather Service
@app.route("/alerts", methods=["POST"])
def get_alerts():
    data = request.get_json()
    lat, lon = data["lat"], data["lon"]
    url = f"https://api.weather.gov/alerts/active?point={lat},{lon}"
    resp = requests.get(url)
    return jsonify(resp.json())


#run the app only if this file is executed directly
if __name__ == "__main__":
    app.run(debug=True)
