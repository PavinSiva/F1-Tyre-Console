import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

df = pd.read_csv("app/data/datasets/stints_train_features.csv")

FEATURES = [
    "Driver",       # 🔥 NEW
    "Compound",
    "TrackType",
    "RaceMode",
    "TrackAbrasion",
    "LapLengthKm",
    "TrackTemp",
    "AirTemp",
    "Rain",
    "Year"
]

X = df[FEATURES]
y = df["StintLength"]

categorical = ["Driver", "Compound", "TrackType", "RaceMode"]
numerical = ["TrackAbrasion", "LapLengthKm", "TrackTemp", "AirTemp", "Rain", "Year"]

preprocessor = ColumnTransformer([
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
    ("num", "passthrough", numerical),
])

model = RandomForestRegressor(
    n_estimators=500,
    max_depth=15,
    random_state=42,
    n_jobs=-1
)

pipeline = Pipeline([
    ("prep", preprocessor),
    ("model", model)
])

X_train, X_val, y_train, y_val = train_test_split(
    X, y, test_size=0.2, random_state=42
)

pipeline.fit(X_train, y_train)

preds = pipeline.predict(X_val)
mae = mean_absolute_error(y_val, preds)
print(f"✅ MAE: {mae:.2f} laps")

os.makedirs("app/models", exist_ok=True)
joblib.dump(pipeline, "app/models/stint_predictor.pkl")
print("💾 Model saved")
