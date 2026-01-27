import fastf1
import pandas as pd
from pathlib import Path

# -------------------------
# SETUP
# -------------------------
fastf1.Cache.enable_cache("cache")

OUTPUT_DIR = Path("app/data/datasets")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

VALID_COMPOUNDS = ["SOFT", "MEDIUM", "HARD"]
MIN_STINT_LAPS = 5

# -------------------------
# FETCH FUNCTION
# -------------------------
def fetch_year_stints(year):
    stints_all = []

    try:
        calendar = fastf1.get_event_schedule(year)
    except Exception as e:
        print(f"❌ Could not load calendar for {year}: {e}")
        return pd.DataFrame()

    for _, race in calendar.iterrows():
        gp = race["EventName"]
        print(f"🏁 Fetching {year} – {gp}")

        try:
            session = fastf1.get_session(year, gp, "R")
            session.load(telemetry=False, weather=True)

            laps = session.laps
            if laps is None or laps.empty:
                continue

            laps = laps[
                laps["Compound"].isin(VALID_COMPOUNDS) &
                laps["LapTime"].notna() &
                laps["PitOutTime"].isna() &
                laps["PitInTime"].isna()
            ]

            if laps.empty:
                continue

            weather = session.weather_data
            track_temp = weather["TrackTemp"].mean() if "TrackTemp" in weather else None
            air_temp = weather["AirTemp"].mean() if "AirTemp" in weather else None
            rain = weather["Rainfall"].max() if "Rainfall" in weather else 0

            for (driver, stint), stint_laps in laps.groupby(["Driver", "Stint"]):
                stint_laps = stint_laps.sort_values("LapNumber")
                stint_length = len(stint_laps)

                if stint_length < MIN_STINT_LAPS:
                    continue

                stints_all.append({
                    "Year": year,
                    "GrandPrix": gp,
                    "Driver": driver,
                    "Compound": stint_laps["Compound"].iloc[0],
                    "StintLength": stint_length,
                    "TrackTemp": track_temp,
                    "AirTemp": air_temp,
                    "Rain": rain
                })

        except Exception as e:
            print(f"⚠️ Skipped {year} {gp}: {e}")
            continue

    return pd.DataFrame(stints_all)

# -------------------------
# BUILD DATASETS
# -------------------------
print("📊 TRAIN: 2023 + 2024")
df_train = pd.concat(
    [fetch_year_stints(2023), fetch_year_stints(2024)],
    ignore_index=True
)

print("🧪 TEST: 2022")
df_test = fetch_year_stints(2022)

# Cleanup
df_train = df_train.dropna()
df_test = df_test.dropna()

df_train.to_csv(OUTPUT_DIR / "stints_train.csv", index=False)
df_test.to_csv(OUTPUT_DIR / "stints_test.csv", index=False)

print("✅ DONE")
