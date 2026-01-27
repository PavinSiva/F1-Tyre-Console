import joblib
import pandas as pd

model = joblib.load("app/models/stint_predictor.pkl")

input_data = {
    "Driver": "VER",            
    "Compound": "SOFT",
    "TrackType": "power",
    "RaceMode": "TYRE_SAVING",
    "TrackAbrasion": 0.65,
    "LapLengthKm": 5.281,
    "TrackTemp": 49,
    "AirTemp": 32,
    "Rain": 0,
    "Year": 2027
}

df_input = pd.DataFrame([input_data])

prediction = model.predict(df_input)

print(f"🏁 Predicted Stint Length for {input_data['Driver']}: {int(round(prediction[0]))} laps")
