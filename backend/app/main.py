from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

# ✅ Correct import (relative to app/)
from app.track_metadata import TRACK_METADATA

# -------------------------
# FASTAPI APP
# -------------------------
app = FastAPI(title="F1 Stint Length Predictor")

# -------------------------
# CORS (REQUIRED FOR REACT)
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite
        "http://localhost:3000",  # CRA
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# LOAD MODEL ONCE
# -------------------------
model = joblib.load("app/models/stint_predictor.pkl")
print("✅ ML model loaded")

# -------------------------
# REQUEST SCHEMA
# -------------------------
class PredictionRequest(BaseModel):
    Year: int
    GrandPrix: str
    Driver: str
    Compound: str
    RaceMode: str
    TrackTemp: float
    AirTemp: float
    Rain: int

# -------------------------
# HEALTH CHECK
# -------------------------
@app.get("/")
def health():
    return {"status": "ok", "message": "F1 Stint Predictor API running"}

# -------------------------
# PREDICTION ENDPOINT
# -------------------------
@app.post("/predict")
def predict_stint(data: PredictionRequest):

    # 🔍 Debug: confirm frontend data
    print("📥 Incoming request:", data.dict())

    # Track metadata lookup
    if data.GrandPrix not in TRACK_METADATA:
        return {"error": "Invalid Grand Prix name"}

    track = TRACK_METADATA[data.GrandPrix]

    # Model input
    input_data = {
        "Driver": data.Driver,
        "Compound": data.Compound,
        "TrackType": track["type"],
        "RaceMode": data.RaceMode,
        "TrackAbrasion": track["abrasion"],
        "LapLengthKm": track["lap_length"],
        "TrackTemp": data.TrackTemp,
        "AirTemp": data.AirTemp,
        "Rain": data.Rain,
        "Year": data.Year
    }

    df = pd.DataFrame([input_data])

    prediction = model.predict(df)[0]

    return {
        "predicted_stint_length": int(round(prediction)),
        "driver": data.Driver,
        "grand_prix": data.GrandPrix
    }
