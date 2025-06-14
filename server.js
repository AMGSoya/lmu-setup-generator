javascript
// --- server.js (Final Version with Syntax Fix and Improved AI Output Directives) ---

// 1. Load environment variables from .env file
require('dotenv').config();

// 2. Import necessary libraries
const express = require('express');
const path = require('path');
// Node.js v18+ has a built-in fetch API, so node-fetch is no longer needed

// 3. Initialize Express app and define port
const app = express();
const port = process.env.PORT || 3000;

// 4. Middleware to parse JSON bodies
app.use(express.json());

// 5. Serve static files (assuming your index.html and client-side JS are in the same directory)
app.use(express.static(path.join(__dirname)));

// 6. Get your API keys from the .env file
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// The HUGGINGFACE_API_KEY is loaded and available for use,
// but the primary setup generation uses OpenRouter as configured below.
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

// --- Validation for API Keys ---
if (!OPENROUTER_API_KEY) {
    console.error("ERROR: OPENROUTER_API_KEY not found in your .env file.");
    console.error("Please ensure you have a .env file in the same directory as server.js");
    console.error("And it contains the line: OPENROUTER_API_KEY=YOUR_ACTUAL_OPENROUTER_KEY_HERE");
    process.exit(1);
}

if (!HUGGINGFACE_API_KEY) {
    // This is a warning because the primary function uses OpenRouter.
    console.warn("WARN: HUGGINGFACE_API_KEY not found in your .env file.");
    console.warn("The application will continue, but features relying on direct Hugging Face calls will fail.");
}

// 7. Define OpenRouter API endpoint and Model
// The user has requested to use NousResearch/Hermes-2-Pro-Llama-3-8B as the primary model.
// This model is available through the OpenRouter API.
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const PRIMARY_MODEL = 'NousResearch/Hermes-2-Pro-Llama-3-8B';

// --- Define LMU .VEH Example Templates by Category ---
// Updated all templates with reasonable default values for Engine and Driveline,
// and clearer comments, instead of "MUST be changed".
const LMU_VEH_TEMPLATES = {
    'Hypercar': `VehicleClassSetting="Ferrari_499P Hypercar WEC2024"
UpgradeSetting=(2,0,0,0)
//UpgradeClass=
//Tyre Restrictions=2
//AI Tweaks=0
//Atmos Conditions=0
//Note: settings commented out if using the default

[GENERAL]
Notes=""
Symmetric=1
CGHeightSetting=0//Non-adjustable
CGRightSetting=0//Non-adjustable
CGRearSetting=0//Non-adjustable
WedgeSetting=0//N/A
FuelSetting=85//85L (Initial guess, AI adjusts)
FuelCapacitySetting=0//Max Fuel (AI adjusts based on duration)
VirtualEnergySetting=72//72% (AI adjusts based on session)
NumPitstopsSetting=0//
Pitstop1Setting=88//N/A
Pitstop2Setting=88//N/A
Pitstop3Setting=88//N/A

[LEFTFENDER]
FenderFlareSetting=0//N/A

[RIGHTFENDER]
FenderFlareSetting=0//N/A

[FRONTWING]
FWSetting=0//Standard
// FWSetting: 0=low, 1=medium, 2=high (AI adjusts based on track type)

[REARWING]
RWSetting=3//P4 (AI adjusts based on track type)
// RWSetting for Hypercar: 0-7 (P1=low, P7=high)

[BODYAERO]
WaterRadiatorSetting=1//25% (AI adjusts based on temp/session)
OilRadiatorSetting=1//25% (AI adjusts based on temp/session)
BrakeDuctSetting=0//Open (AI adjusts based on temp/track)
BrakeDuctRearSetting=0//Open (AI adjusts based on temp/track)

[SUSPENSION]
FrontWheelTrackSetting=0//Non-adjustable
RearWheelTrackSetting=0//Non-adjustable
FrontAntiSwaySetting=16//D-P1 (AI adjusts for balance)
RearAntiSwaySetting=0//Detached (AI adjusts for balance)
FrontToeInSetting=15//-0.06 deg (AI adjusts for turn-in/stability)
FrontToeOffsetSetting=0//N/A
RearToeInSetting=17//0.06 deg (AI adjusts for stability)
RearToeOffsetSetting=0//N/A
LeftCasterSetting=0//Non-adjustable
RightCasterSetting=0//Non-adjustable
LeftTrackBarSetting=0//N/A
RightTrackBarSetting=0//N/A
Front3rdPackerSetting=8//0.8 cm (AI adjusts for ride height/suspension travel)
Front3rdSpringSetting=8//8 (AI adjusts for track surface/aggressiveness)
Front3rdTenderSpringSetting=0//Detached
Front3rdTenderTravelSetting=0//Detached
Front3rdSlowBumpSetting=0//1 (AI adjusts for weight transfer control)
Front3rdFastBumpSetting=2//3 (AI adjusts for bumps/curbs)
Front3rdSlowReboundSetting=4//5 (AI adjusts for weight transfer control)
Front3rdFastReboundSetting=2//3 (AI adjusts for bumps/curbs)
Rear3rdPackerSetting=10//1.0 cm (AI adjusts for ride height/suspension travel)
Rear3rdSpringSetting=7//7 (AI adjusts for track surface/aggressiveness)
Rear3rdTenderSpringSetting=0//Detached
Rear3rdTenderTravelSetting=0//Detached
Rear3rdSlowBumpSetting=0//1 (AI adjusts for weight transfer control)
Rear3rdFastBumpSetting=2//3 (AI adjusts for bumps/curbs)
Rear3rdSlowReboundSetting=0//1 (AI adjusts for weight transfer control)
Rear3rdFastReboundSetting=2//3 (AI adjusts for bumps/curbs)
ChassisAdj00Setting=0//Alternative
ChassisAdj01Setting=0//N/A
ChassisAdj02Setting=0//N/A
ChassisAdj03Setting=0//N/A
ChassisAdj04Setting=0//N/A
ChassisAdj05Setting=0//N/A
ChassisAdj06Setting=0//N/A
ChassisAdj07Setting=0//N/A
ChassisAdj08Setting=0//N/A
ChassisAdj09Setting=0//N/A
ChassisAdj10Setting=0//N/A
ChassisAdj11Setting=0//N/A

[CONTROLS]
SteerLockSetting=0//400 (16) deg
RearBrakeSetting=16//52.8:47.2 (Adjust for stability: 52:48 F to 58:42 F)
BrakeMigrationSetting=0//2.5% F
BrakePressureSetting=80//120 kgf (100%) (Adjust for track/driver preference: 80-100)
HandfrontbrakePressSetting=0//0%
HandbrakePressSetting=0//N/A
TCSetting=0//Available
ABSSetting=0//N/A
TractionControlMapSetting=9//9 (Adjust for track/driver preference: 0=off, 1-10)
TCPowerCutMapSetting=8//8 (Adjust for track/driver preference: 0=off, 1-10)
TCSlipAngleMapSetting=8//8 (Adjust for track/driver preference: 0=off, 1-10)
AntilockBrakeSystemMapSetting=0//N/A

[ENGINE]
RevLimitSetting=0//8,500
EngineBoostSetting=0//N/A
RegenerationMapSetting=10//200kW (Adjust for session type: 8-10)
ElectricMotorMapSetting=3//60kW (Adjust for track/session type: 0=N/A, 1-4)
EngineMixtureSetting=0//Full (Adjust for session type: 0=Full, 1=Race, 2=Lean)
EngineBrakingMapSetting=0//N/A

[DRIVELINE]
FinalDriveSetting=0//2.98:1 (Adjust for track type: 0=Standard/Short, higher values for Long)
ReverseSetting=0//2.07 (6.18)
Gear1Setting=0//2.85 (8.49) (Adjust for track type)
Gear2Setting=0//2.20 (6.56) (Adjust for track type)
Gear3Setting=0//1.82 (5.44) (Adjust for track type)
Gear4Setting=0//1.56 (4.64) (Adjust for track type)
Gear5Setting=0//1.35 (4.02) (Adjust for track type)
Gear6Setting=0//1.19 (3.55) (Adjust for track type)
Gear7Setting=0//1.05 (3.14) (Adjust for track type)
RatioSetSetting=0//Short (Adjust for track type: 0=Standard, 1=Long/High Speed)
DiffPumpSetting=0//N/A
DiffPowerSetting=3//25% (Adjust for on-throttle stability: 0-15)
DiffCoastSetting=10//60% (Adjust for off-throttle stability: 0-20)
DiffPreloadSetting=24//120 Nm (Adjust for overall stability: 0-100 Nm)
FrontDiffPumpSetting=0//N/A
FrontDiffPowerSetting=0//10%
FrontDiffCoastSetting=0//10%
FrontDiffPreloadSetting=0//0 Nm
RearSplitSetting=0// 0.0:100.0
GearAutoUpShiftSetting=0//Off
GearAutoDownShiftSetting=0//Off

[FRONTLEFT]
CamberSetting=26//-1.4 deg (Adjust for track: -1.0 to -3.0 deg)
PressureSetting=0//135 kPa (Adjust for weather/session: 130-150 kPa)
PackerSetting=5//0.5 cm (Adjust for track)
SpringSetting=10//15.95mm (Adjust for track)
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=9//4.9 cm (Adjust for track and rake)
SlowBumpSetting=5//6 (Adjust for track)
FastBumpSetting=6//7 (Adjust for track)
SlowReboundSetting=5//6 (Adjust for track)
FastReboundSetting=4//5 (Adjust for track)
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//82% Soft (Adjust for session/weather: 0=Soft/Wet, 1=Medium, 2=Hard)

[FRONTRIGHT]
CamberSetting=26//-1.4 deg (Adjust for track)
PressureSetting=0//135 kPa (Adjust for weather/session)
PackerSetting=5//0.5 cm (Adjust for track)
SpringSetting=10//15.95mm (Adjust for track)
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=9//4.9 cm (Adjust for track and rake)
SlowBumpSetting=5//6 (Adjust for track)
FastBumpSetting=6//7 (Adjust for track)
SlowReboundSetting=5//6 (Adjust for track)
FastReboundSetting=4//5 (Adjust for track)
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//76% Soft (Adjust for session/weather)

[REARLEFT]
CamberSetting=35//-0.5 deg (Adjust for track: -0.5 to -2.5 deg)
PressureSetting=0//135 kPa (Adjust for weather/session)
PackerSetting=12//1.2 cm (Adjust for track)
SpringSetting=0//13.33mm (Adjust for track)
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//7.5 cm (Adjust for track)
SlowBumpSetting=4//5 (Adjust for track)
FastBumpSetting=4//5 (Adjust for track)
SlowReboundSetting=6//7 (Adjust for track)
FastReboundSetting=6//7 (Adjust for track)
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//86% Soft (Adjust for session/weather)

[REARRIGHT]
CamberSetting=35//-0.5 deg (Adjust for track)
PressureSetting=0//135 kPa (Adjust for weather/session)
PackerSetting=12//1.2 cm (Adjust for track)
SpringSetting=0//13.33mm (Adjust for track)
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//7.5 cm (Adjust for track)
SlowBumpSetting=4//5 (Adjust for track)
FastBumpSetting=4//5 (Adjust for track)
SlowReboundSetting=6//7 (Adjust for track)
FastReboundSetting=6//7 (Adjust for track)
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//82% Soft (Adjust for session/weather)

[BASIC]
Downforce=0.500000
Balance=0.500000
Ride=0.500000
Gearing=0.500000
Custom=1`,

    'LMP2': `VehicleClassSetting="LMP2 Oreca_07"
UpgradeSetting=(12,0,0,0)
//UpgradeClass=
//Fuel tank=0
//Engine cover gurney=0
//Setup=3
//Visor Mod=0
//Note: settings commented out if using the default

[GENERAL]
Notes=""
Symmetric=1
//CGHeightSetting=0//Non-adjustable
//CGRightSetting=0//Non-adjustable
//CGRearSetting=0//Non-adjustable
//WedgeSetting=0//N/A
FuelSetting=11//16L (3laps) (AI adjusts)
//FuelCapacitySetting=0//N/A
//NumPitstopsSetting=0//
//Pitstop1Setting=50//N/A
//Pitstop2Setting=50//N/A
//Pitstop3Setting=50//N/A

[LEFTFENDER]
//FenderFlareSetting=0//N/A

[RIGHTFENDER]
//FenderFlareSetting=0//N/A

[FRONTWING]
//FWSetting=0//Le Mans

[REARWING]
RWSetting=0//P1-P9 (Adjust for track)

[BODYAERO]
WaterRadiatorSetting=2//50% (AI adjusts)
OilRadiatorSetting=2//50% (AI adjusts)
//BrakeDuctSetting=0//Open
BrakeDuctRearSetting=1//25% (AI adjusts)

[SUSPENSION]
//FrontWheelTrackSetting=0//Non-adjustable
//RearWheelTrackSetting=0//Non-adjustable
FrontAntiSwaySetting=9//D25 H-H (Adjust for balance)
RearAntiSwaySetting=1//D7.5 S-S (Adjust for balance)
FrontToeInSetting=13//-0.18 deg (Adjust for turn-in/stability)
//FrontToeOffsetSetting=0//N/A
RearToeInSetting=22//0.35 deg (Adjust for stability)
//RearToeOffsetSetting=0//N/A
//LeftCasterSetting=0//Non-adjustable
//RightCasterSetting=0//Non-adjustable
//LeftTrackBarSetting=0//N/A
//RightTrackBarSetting=0//N/A
Front3rdPackerSetting=6//0.6 cm (Adjust for ride height/suspension travel)
Front3rdSpringSetting=0//N/A
//Front3rdTenderSpringSetting=0//Detached
//Front3rdTenderTravelSetting=0//Detached
//Front3rdSlowBumpSetting=0//1
//Front3rdFastBumpSetting=0//1
//Front3rdSlowReboundSetting=0//1
//Front3rdFastReboundSetting=0//1
Rear3rdPackerSetting=7//0.7 cm (Adjust for ride height/suspension travel)
//Rear3rdSpringSetting=0//N/A
//Rear3rdTenderSpringSetting=0//Detached
//Rear3rdTenderTravelSetting=0//Detached
//Rear3rdSlowBumpSetting=0//1
//Rear3rdFastBumpSetting=0//1
//Rear3rdSlowReboundSetting=0//1
//Rear3rdFastReboundSetting=0//1
//ChassisAdj00Setting=0//N/A
//ChassisAdj01Setting=0//N/A
//ChassisAdj02Setting=0//N/A
//ChassisAdj03Setting=0//N/A
//ChassisAdj04Setting=0//N/A
//ChassisAdj05Setting=0//N/A
//ChassisAdj06Setting=0//N/A
//ChassisAdj07Setting=0//N/A
//ChassisAdj08Setting=0//N/A
//ChassisAdj09Setting=0//N/A
//ChassisAdj10Setting=0//N/A
//ChassisAdj11Setting=0//N/A

[CONTROLS]
//SteerLockSetting=3//336 (13) deg
RearBrakeSetting=13//54.1:45.9 (Adjust for stability: 52:48 F to 56:44 F)
//BrakeMigrationSetting=0// 0.0
BrakePressureSetting=60//100 kgf (83%) (Adjust for track/driver preference: 80-100)
//HandfrontbrakePressSetting=0//0%
//HandbrakePressSetting=0//N/A
//TCSetting=0//Available
//ABSSetting=0//N/A
TractionControlMapSetting=7//7 (Adjust for track/driver preference: 0=off, 1-10)
TCPowerCutMapSetting=4//4 (Adjust for track/driver preference: 0=off, 1-10)
TCSlipAngleMapSetting=7//Linked (Adjust for track/driver preference: 0=off, 1-10)
//AntilockBrakeSystemMapSetting=0//N/A

[ENGINE]
//RevLimitSetting=0//8000
//EngineBoostSetting=0//N/A
//RegenerationMapSetting=0//0%
ElectricMotorMapSetting=0//Not Applicable
EngineMixtureSetting=1//Race (Adjust for session type: 0=Quali, 1=Race)
//EngineBrakingMapSetting=0//N/A

[DRIVELINE]
FinalDriveSetting=0//2.88:1 (Adjust for track type: 0=Standard, higher values=longer)
ReverseSetting=0//2.85 (8.18)
Gear1Setting=0//2.85 (8.18) (Adjust for track type)
Gear2Setting=0//2.20 (6.33) (Adjust for track type)
Gear3Setting=1//1.88 (5.39) (Adjust for track type)
Gear4Setting=1//1.62 (4.67) (Adjust for track type)
Gear5Setting=1//1.42 (4.09) (Adjust for track type)
Gear6Setting=1//1.27 (3.66) (Adjust for track type)
RatioSetSetting=1//High Speed (Adjust for track type: 0=Standard, 1=High Speed)
//DiffPumpSetting=0//N/A
DiffPowerSetting=0//FF6-60 deg (Adjust for on-throttle stability: 0-15)
DiffCoastSetting=2//FF6-45 deg (Adjust for off-throttle stability: 0-20)
DiffPreloadSetting=17//85 Nm (Adjust for overall stability: 0-100 Nm)
//FrontDiffPumpSetting=0//0%
//FrontDiffPowerSetting=0//0%
//FrontDiffCoastSetting=0//0%
//FrontDiffPreloadSetting=0//1
//RearSplitSetting=0// 0.0:100.0
//GearAutoUpShiftSetting=0//Off
//GearAutoDownShiftSetting=0//Off

[FRONTLEFT]
CamberSetting=11//-1.5 deg (Adjust for track: -1.0 to -3.0 deg)
PressureSetting=0//140 kPa (Adjust for weather/session: 130-150 kPa)
PackerSetting=3//0.3 cm (Adjust for track)
SpringSetting=0//150N/mm (Adjust for track)
//TenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SpringRubberSetting=0//Detached
RideHeightSetting=10//4.5 cm (Adjust for track)
SlowBumpSetting=4//5 (Adjust for track)
FastBumpSetting=1//2 (Adjust for track)
SlowReboundSetting=2//3 (Adjust for track)
FastReboundSetting=1//2 (Adjust for track)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
CompoundSetting=0//Medium (Adjust for session/weather: 0=Soft/Wet, 1=Medium, 2=Hard)
//EquippedTireIDSetting=-1//None Available

[FRONTRIGHT]
CamberSetting=11//-1.5 deg (Adjust for track)
PressureSetting=0//140 kPa (Adjust for weather/session)
PackerSetting=3//0.3 cm (Adjust for track)
SpringSetting=0//150N/mm (Adjust for track)
//TenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SpringRubberSetting=0//Detached
RideHeightSetting=10//4.5 cm (Adjust for track)
SlowBumpSetting=4//5 (Adjust for track)
FastBumpSetting=1//2 (Adjust for track)
SlowReboundSetting=2//3 (Adjust for track)
FastReboundSetting=1//2 (Adjust for track)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
CompoundSetting=0//Medium (Adjust for session/weather)
//EquippedTireIDSetting=-1//None Available

[REARLEFT]
CamberSetting=5//-1.0 deg (Adjust for track: -0.5 to -2.5 deg)
PressureSetting=0//140 kPa (Adjust for weather/session)
PackerSetting=1//0.1 cm (Adjust for track)
//SpringSetting=3//1100lbf/in
//TenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SpringRubberSetting=0//Detached
RideHeightSetting=24//7.0 cm (Adjust for track)
SlowBumpSetting=0//1 (soft) (Adjust for track)
FastBumpSetting=0//1 (soft) (Adjust for track)
SlowReboundSetting=1//2 (Adjust for track)
FastReboundSetting=0//1 (soft) (Adjust for track)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
CompoundSetting=0//Medium (Adjust for session/weather)
//EquippedTireIDSetting=-1//None Available

[REARRIGHT]
CamberSetting=5//-1.0 deg (Adjust for track)
PressureSetting=0//140 kPa (Adjust for weather/session)
PackerSetting=1//0.1 cm (Adjust for track)
//SpringSetting=3//1100lbf/in
//TenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SpringRubberSetting=0//Detached
RideHeightSetting=24//7.0 cm (Adjust for track)
SlowBumpSetting=0//1 (soft) (Adjust for track)
FastBumpSetting=0//1 (soft) (Adjust for track)
SlowReboundSetting=1//2 (Adjust for track)
FastReboundSetting=0//1 (soft) (Adjust for track)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
CompoundSetting=0//Medium (Adjust for session/weather)
//EquippedTireIDSetting=-1//None Available

[BASIC]
Downforce=0.500000
Balance=0.500000
Ride=0.500000
Gearing=0.500000
Custom=1`,

    'GT3': `VehicleClassSetting="GT3 Porsche_911_GT3_R_LMGT3 WEC2024"
UpgradeSetting=(3276,0,0,0)
//UpgradeClass=
//Position lights=0
//AI Tweaks=6
//Estimates=6
//BOP=6
//Atmos Conditions=0
//Note: settings commented out if using the default

[GENERAL]
Notes=""
Symmetric=1
//CGHeightSetting=0//Non-adjustable
//CGRightSetting=0//Non-adjustable
//CGRearSetting=0//Non-adjustable
//WedgeSetting=0//N/A
FuelSetting=92//0.93 (AI adjusts)
//FuelCapacitySetting=0//93.0l (22.5 laps)
//VirtualEnergySetting=100//100% (22.0 laps)
//NumPitstopsSetting=0//
//Pitstop1Setting=59//N/A
//Pitstop2Setting=59//N/A
//Pitstop3Setting=59//N/A

[LEFTFENDER]
//FenderFlareSetting=0//N/A

[RIGHTFENDER]
//FenderFlareSetting=0//N/A

[FRONTWING]
//FWSetting=0//Standard

[REARWING]
RWSetting=2//8.3 deg (Adjust for track)

[BODYAERO]
//WaterRadiatorSetting=0//No tape
//OilRadiatorSetting=0//No tape
BrakeDuctSetting=3//60mm (Adjust for track/temp)
BrakeDuctRearSetting=2//40mm (Adjust for track/temp)

[SUSPENSION]
//FrontWheelTrackSetting=0//Non-adjustable
//RearWheelTrackSetting=0//Non-adjustable
FrontAntiSwaySetting=7//P7 (dur) (Adjust for balance)
RearAntiSwaySetting=4//P4 (Adjust for balance)
FrontToeInSetting=7//-0.117 deg (Adjust for turn-in/stability)
//FrontToeOffsetSetting=0//N/A
RearToeInSetting=8//0 deg (Adjust for stability)
//RearToeOffsetSetting=0//N/A
//LeftCasterSetting=0//Non-adjustable
//RightCasterSetting=0//Non-adjustable
//LeftTrackBarSetting=0//N/A
//RightTrackBarSetting=0//N/A
//Front3rdPackerSetting=0//N/A
//Front3rdSpringSetting=0//N/A
//Front3rdTenderSpringSetting=0//Détaché
//Front3rdTenderTravelSetting=0//Détaché
//Front3rdSlowBumpSetting=0//N/A
//Front3rdFastBumpSetting=0//N/A
//Front3rdSlowReboundSetting=0//N/A
//Front3rdFastReboundSetting=0//N/A
//Rear3rdPackerSetting=0//N/A
//Rear3rdSpringSetting=0//N/A
//Rear3rdTenderSpringSetting=0//Détaché
//Rear3rdTenderTravelSetting=0//Détaché
//Rear3rdSlowBumpSetting=0//N/A
//Rear3rdFastBumpSetting=0//N/A
//Rear3rdSlowReboundSetting=0//N/A
//Rear3rdFastReboundSetting=0//N/A
//ChassisAdj00Setting=0//N/A
//ChassisAdj01Setting=0//N/A
//ChassisAdj02Setting=0//N/A
//ChassisAdj03Setting=0//N/A
//ChassisAdj04Setting=0//N/A
//ChassisAdj05Setting=0//N/A
//ChassisAdj06Setting=0//N/A
//ChassisAdj07Setting=0//N/A
//ChassisAdj08Setting=0//N/A
//ChassisAdj09Setting=0//N/A
//ChassisAdj10Setting=0//N/A
//ChassisAdj11Setting=0//N/A

[CONTROLS]
SteerLockSetting=4//380° (11.2°) (Adjust for track)
RearBrakeSetting=21//51.8:48.2 (Adjust for stability)
//BrakeMigrationSetting=0// 0.0
//BrakePressureSetting=80//120 kgf (100%) (Adjust for track/driver)
//HandfrontbrakePressSetting=0//N/A
//HandbrakePressSetting=0//N/A
//TCSetting=0//Disponible
//ABSSetting=0//Disponible
//TractionControlMapSetting=8//8 (Adjust for track/driver)
TCPowerCutMapSetting=3//3 (Adjust for track/driver)
//TCSlipAngleMapSetting=10//10 (Adjust for track/driver)
AntilockBrakeSystemMapSetting=11//11 (Adjust for track/driver)

[ENGINE]
//RevLimitSetting=0//9,400
//EngineBoostSetting=0//N/A
//RegenerationMapSetting=0//0%
ElectricMotorMapSetting=0//Not Applicable
//EngineMixtureSetting=1//Race (Adjust for session type)
//EngineBrakingMapSetting=0//N/A

[DRIVELINE]
FinalDriveSetting=0//Fixed (AI adjusts for track type)
//ReverseSetting=0//Fixed
Gear1Setting=0//Fixed (AI adjusts for track type)
Gear2Setting=0//Fixed (AI adjusts for track type)
Gear3Setting=0//Fixed (AI adjusts for track type)
Gear4Setting=0//Fixed (AI adjusts for track type)
Gear5Setting=0//Fixed (AI adjusts for track type)
Gear6Setting=0//Fixed (AI adjusts for track type)
RatioSetSetting=0//Short (AI adjusts for track type)
//DiffPumpSetting=0//Non-adjustable
//DiffCoastSetting=0//Non-adjustable
DiffPreloadSetting=28//78 Nm (AI adjusts for track)
//FrontDiffPumpSetting=0//0%
//FrontDiffPowerSetting=0//0%
//FrontDiffCoastSetting=0//0%
//FrontDiffPreloadSetting=0//1
//RearSplitSetting=0//RWD
//GearAutoUpShiftSetting=0//Non
//GearAutoDownShiftSetting=0//Non

[FRONTLEFT]
CamberSetting=26//-1.80 deg (Adjust for track)
//PressureSetting=0//140 kPa (Adjust for weather/session)
PackerSetting=9//0.9 cm (Adjust for track)
SpringSetting=3//4 (Adjust for track)
//TenderSpringSetting=0//Standard
//TenderTravelSetting=0//Standard
//SpringRubberSetting=0//N/A
//RideHeightSetting=0//5.0 cm (Adjust for track)
SlowBumpSetting=11//7 (Adjust for track)
FastBumpSetting=2//16 (Adjust for track)
SlowReboundSetting=6//12 (Adjust for track)
FastReboundSetting=4//14 (Adjust for track)
//BrakeDiscSetting=0//3.56 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Medium (Adjust for session/weather)

[FRONTRIGHT]
CamberSetting=26//-1.80 deg (Adjust for track)
//PressureSetting=0//140 kPa (Adjust for weather/session)
PackerSetting=9//0.9 cm (Adjust for track)
SpringSetting=3//4 (Adjust for track)
//TenderSpringSetting=0//Standard
//TenderTravelSetting=0//Standard
//SpringRubberSetting=0//N/A
//RideHeightSetting=0//5.0 cm (Adjust for track)
SlowBumpSetting=11//7 (Adjust for track)
FastBumpSetting=2//16 (Adjust for track)
SlowReboundSetting=6//12 (Adjust for track)
FastReboundSetting=4//14 (Adjust for track)
//BrakeDiscSetting=0//3.56 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Medium (Adjust for session/weather)

[REARLEFT]
CamberSetting=30//-1.40 deg (Adjust for track)
//PressureSetting=0//140 kPa (Adjust for weather/session)
PackerSetting=14//1.4 cm (Adjust for track)
SpringSetting=1//2 (Adjust for track)
//TenderSpringSetting=0//Standard
//TenderTravelSetting=0//Standard
//SpringRubberSetting=0//N/A
//RideHeightSetting=16//6.6 cm (Adjust for track)
SlowBumpSetting=7//11 (Adjust for track)
FastBumpSetting=4//14 (Adjust for track)
SlowReboundSetting=11//7 (Adjust for track)
FastReboundSetting=2//16 (Adjust for track)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Medium (Adjust for session/weather)

[REARRIGHT]
CamberSetting=30//-1.40 deg (Adjust for track)
//PressureSetting=0//140 kPa (Adjust for weather/session)
PackerSetting=14//1.4 cm (Adjust for track)
SpringSetting=1//2 (Adjust for track)
//TenderSpringSetting=0//Standard
//TenderTravelSetting=0//Standard
//SpringRubberSetting=0//N/A
//RideHeightSetting=16//6.6 cm (Adjust for track)
SlowBumpSetting=7//11 (Adjust for track)
FastBumpSetting=4//14 (Adjust for track)
SlowReboundSetting=11//7 (Adjust for track)
FastReboundSetting=2//16 (Adjust for track)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Medium (Adjust for session/weather)

[BASIC]
Downforce=0.500000
Balance=0.500000
Ride=0.500000
Gearing=0.500000
Custom=1`,

    'GTE': `VehicleClassSetting="Ferrari_488_GTE_EVO GTE"
UpgradeSetting=(2,0,0,0)
//UpgradeClass=
//Position lights=0
//Aero package=1
//Note: settings commented out if using the default

[GENERAL]
Notes="setup for Ferrari 488 GTE"
Symmetric=0
//CGHeightSetting=0//Non-adjustable
//CGRightSetting=0//Non-adjustable
//CGRearSetting=0//Non-adjustable
//WedgeSetting=0//N/A
FuelSetting=85//86l (12giri) (AI adjusts)
//FuelCapacitySetting=0//+0l (0giri)
//NumPitstopsSetting=0//
//Pitstop1Setting=49//N/D
//Pitstop2Setting=49//N/D
//Pitstop3Setting=49//N/D

[LEFTFENDER]
//FenderFlareSetting=0//N/D

[RIGHTFENDER]
//FenderFlareSetting=0//N/D

[FRONTWING]
//FWSetting=0//Le Mans

[REARWING]
RWSetting=1//P2 (Adjust for track)

[BODYAERO]
WaterRadiatorSetting=2//50% (AI adjusts)
OilRadiatorSetting=2//50% (AI adjusts)
BrakeDuctSetting=2//66% (Adjust for track/temp)
BrakeDuctRearSetting=2//66% (Adjust for track/temp)

[SUSPENSION]
//FrontWheelTrackSetting=0//Non-adjustable
//RearWheelTrackSetting=0//Non-adjustable
FrontAntiSwaySetting=4//P4 (Adjust for balance)
RearAntiSwaySetting=5//P5 (Adjust for balance)
FrontToeInSetting=16//-0.00 ° (Adjust for turn-in/stability)
//FrontToeOffsetSetting=0//N/D
RearToeInSetting=16//-0.00 ° (Adjust for stability)
//RearToeOffsetSetting=0//N/D
//LeftCasterSetting=0//Non-adjustable
//RightCasterSetting=0//Non-adjustable
//LeftTrackBarSetting=0//N/D
//RightTrackBarSetting=0//N/D
//Front3rdPackerSetting=0//N/D
//Front3rdSpringSetting=0//Separata
//Front3rdTenderSpringSetting=0//Separata
//Front3rdTenderTravelSetting=0//Separata
//Front3rdSlowBumpSetting=0//N/A
//Front3rdFastBumpSetting=0//N/A
//Front3rdSlowReboundSetting=0//N/A
//Front3rdFastReboundSetting=0//N/A
//Rear3rdPackerSetting=0//N/D
//Rear3rdSpringSetting=0//Separata
//Rear3rdTenderSpringSetting=0//Separata
//Rear3rdTenderTravelSetting=0//Separata
//Rear3rdSlowBumpSetting=0//N/A
//Rear3rdFastBumpSetting=0//N/A
//Rear3rdSlowReboundSetting=0//N/A
//Rear3rdFastReboundSetting=0//N/A
//ChassisAdj00Setting=0//N/A
//ChassisAdj01Setting=0//N/A
//ChassisAdj02Setting=0//N/A
//ChassisAdj03Setting=0//N/A
//ChassisAdj04Setting=0//N/A
//ChassisAdj05Setting=0//N/A
//ChassisAdj06Setting=0//N/A
//ChassisAdj07Setting=0//N/A
//ChassisAdj08Setting=0//N/A
//ChassisAdj09Setting=0//N/A
//ChassisAdj10Setting=0//N/A
//ChassisAdj11Setting=0//N/A

[CONTROLS]
//SteerLockSetting=6//540 (18)°
RearBrakeSetting=15//52.0:48.0 (Adjust for stability)
//BrakeMigrationSetting=0// 0.0
BrakePressureSetting=50//67 kgf (84%) (Adjust for preference)
//HandfrontbrakePressSetting=0//N/A
//HandbrakePressSetting=0//N/A
//TCSetting=0//
//ABSSetting=0//N/D
TractionControlMapSetting=5//5 (Adjust for track/driver)
TCPowerCutMapSetting=5//5 (Adjust for track/driver)
TCSlipAngleMapSetting=5//5 (Adjust for track/driver)
//AntilockBrakeSystemMapSetting=0//N/A

[ENGINE]
//RevLimitSetting=0//7,500
//EngineBoostSetting=0//N/A
//RegenerationMapSetting=0//0%
ElectricMotorMapSetting=0//Not Applicable
EngineMixtureSetting=1//Race (Adjust for session type)
//EngineBrakingMapSetting=0//N/A

[DRIVELINE]
FinalDriveSetting=0//Fixed (Adjust for track type)
ReverseSetting=0//2.846
Gear1Setting=0//2.846 (Adjust for track type)
Gear2Setting=0//2.200 (Adjust for track type)
Gear3Setting=0//1.800 (Adjust for track type)
Gear4Setting=1//1.421 (Adjust for track type)
Gear5Setting=0//1.238 (Adjust for track type)
Gear6Setting=0//1.053 (Adjust for track type)
RatioSetSetting=0//Le Mans (Adjust for track type)
//DiffPumpSetting=0//N/A
DiffPowerSetting=10//40% (Adjust for on-throttle stability)
DiffCoastSetting=10//100% (Adjust for off-throttle stability)
DiffPreloadSetting=15//125 Nm (Adjust for overall stability)
//FrontDiffPumpSetting=0//0%
//FrontDiffPowerSetting=0//0%
//FrontDiffCoastSetting=0//0%
//FrontDiffPreloadSetting=0//1
//RearSplitSetting=0//RWD
//GearAutoUpShiftSetting=0//
//GearAutoDownShiftSetting=0//

[FRONTLEFT]
CamberSetting=28//-2.2 ° (Adjust for track)
PressureSetting=3//143 kPa (Adjust for weather/session)
PackerSetting=26//2.6 cm (Adjust for track)
SpringSetting=2//160 N/mm (Adjust for track)
//TenderSpringSetting=0//Separata
//TenderTravelSetting=0//Separata
//SpringRubberSetting=0//Separata
RideHeightSetting=7//5.7 cm (Adjust for track)
SlowBumpSetting=3//3 (Adjust for track)
FastBumpSetting=1//1 (Adjust for track)
SlowReboundSetting=5//5 (Adjust for track)
FastReboundSetting=8//8 (Adjust for track)
//BrakeDiscSetting=0//3.50 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Morbida (Adjust for session/weather)
EquippedTireIDSetting=-1//None Available

[FRONTRIGHT]
CamberSetting=28//-2.2 ° (Adjust for track)
PressureSetting=3//143 kPa (Adjust for weather/session)
PackerSetting=26//2.6 cm (Adjust for track)
SpringSetting=2//160 N/mm (Adjust for track)
//TenderSpringSetting=0//Separata
//TenderTravelSetting=0//Separata
//SpringRubberSetting=0//Separata
RideHeightSetting=7//5.7 cm (Adjust for track)
SlowBumpSetting=3//3 (Adjust for track)
FastBumpSetting=1//1 (Adjust for track)
SlowReboundSetting=5//5 (Adjust for track)
FastReboundSetting=8//8 (Adjust for track)
//BrakeDiscSetting=0//3.50 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Morbida (Adjust for session/weather)
EquippedTireIDSetting=-1//None Available

[REARLEFT]
CamberSetting=29//-1.6 ° (Adjust for track)
//PressureSetting=0//140 kPa (Adjust for weather/session)
PackerSetting=24//2.4 cm (Adjust for track)
SpringSetting=1//140 N/mm (Adjust for track)
//TenderSpringSetting=0//Separata
//TenderTravelSetting=0//Separata
//SpringRubberSetting=0//Separata
RideHeightSetting=4//5.4 cm (Adjust for track)
SlowBumpSetting=1//1 (Adjust for track)
FastBumpSetting=1//1 (Adjust for track)
SlowReboundSetting=3//3 (Adjust for track)
FastReboundSetting=4//4 (Adjust for track)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Morbida (Adjust for session/weather)
EquippedTireIDSetting=-1//None Available

[REARRIGHT]
CamberSetting=28//-1.7 ° (Adjust for track)
//PressureSetting=0//140 kPa (Adjust for weather/session)
PackerSetting=24//2.4 cm (Adjust for track)
SpringSetting=1//140 N/mm (Adjust for track)
//TenderSpringSetting=0//Separata
//TenderTravelSetting=0//Separata
//SpringRubberSetting=0//Separata
RideHeightSetting=4//5.4 cm (Adjust for track)
SlowBumpSetting=1//1 (Adjust for track)
FastBumpSetting=1//1 (Adjust for track)
SlowReboundSetting=3//3 (Adjust for track)
FastReboundSetting=4//4 (Adjust for track)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Morbida (Adjust for session/weather)
EquippedTireIDSetting=-1//None Available

[BASIC]
Downforce=0.500000
Balance=0.500000
Ride=0.500000
Gearing=0.500000
Custom=1`
};

// 8. Define a route for AI setup requests
app.post('/generate-setup', async (req, res) => {
    // Safely destructure all possible values from the request body
    const { car, track, request, selectedCarCategory,
        selectedCarDisplay, selectedTrackDisplay, setupGoal,
        sessionGoal, selectedWeather, trackTemp, specificRequest, driverFeedback
    } = req.body;

    // Validate essential parameters (using 'request' as setupGoal is expected by the server now)
    if (!car || !track || !setupGoal || !selectedCarCategory) {
        return res.status(400).json({ error: "Please provide Car, Track, Setup Goal, and Car Category details." });
    }
    
    // Handle potential category key mismatch (e.g., front-end sends 'LMGT3' but template key is 'GT3')
    let finalCategory = selectedCarCategory;
    if (selectedCarCategory === 'LMGT3' && LMU_VEH_TEMPLATES['GT3']) { // If LMGT3 sent, but template is GT3
        finalCategory = 'GT3';
    } else if (selectedCarCategory === 'GT3' && LMU_VEH_TEMPLATES['LMGT3']) { // If GT3 sent, but template is LMGT3
        finalCategory = 'LMGT3';
    }

    const exampleTemplate = LMU_VEH_TEMPLATES[finalCategory];
    if (!exampleTemplate) {
        return res.status(400).json({ error: `No .VEH template found for car category: ${finalCategory}. Ensure selected car has a valid category.` });
    }

    // Capture or define additional prompt variables with default fallbacks
    // These are already destructured and will be undefined if not provided, so use default directly
    const sessionDuration = req.body.sessionDuration || 'N/A'; // Default to N/A if not provided
    const fuelEstimateRequest = (sessionGoal === 'race' && sessionDuration !== 'N/A' && !isNaN(parseInt(sessionDuration))) ?
                                `Estimate fuel for a ${sessionDuration} minute race.` : '';
    const weatherGuidance = `Current weather is ${selectedWeather}.`;
    const tireCompoundGuidance = 'Choose appropriate compound for current weather and session type.';


    // Construct the prompt for the AI
    // Removed problematic hyphen and ensured consistent phrasing.
    const prompt = `
// --- PRIME DIRECTIVE ---
Your sole mission is to act as an expert LMU race engineer and generate a complete .VEH setup file. The final setup MUST be a direct and logical response to the user's primary selections for **Setup Goal (Safe, Balanced, Aggressive)**, **Track**, **Car**, and any specific **Driver Feedback**. Every parameter you choose must be justified by these inputs. This is your primary directive.

// --- PERSONA & PHILOSOPHY ---
You are a world-class Le Mans Ultimate (LMU) race engineer. Your primary philosophy is that a comfortable, confident driver is a fast driver. Your #1 goal is to generate a setup that is predictable and perfectly suited to the driver's requested style and feedback.

**Thought Process (Follow these steps internally):**
1.  **Prioritize the Driver:** My main objective is to create a setup that is SUITABLE FOR THE DRIVER. First, I will analyze the 'Setup Goal' ('Safe', 'Balanced', 'Aggressive') and any specific problem in the 'Driver Problem to Solve' field. These are my most important instructions.
2.  **Formulate a Plan:** Based on the driver's needs and the track characteristics, I will form a plan. For example: "The driver wants a 'Safe' setup for Le Mans and is reporting 'unstable braking'. I will use slightly higher wings than optimal, soften the suspension, and move brake bias forward to address this first."
3.  **Generate Values:** I will generate numerical values for every parameter, always keeping the driver's needs as my primary guide.
4.  **Review and Refine:** I will look over the generated values to ensure they are logical and directly address the driver's request.
5.  **Format Output:** I will format the final output strictly as a .VEH file with no other text.

**CRITICAL INSTRUCTION: The template below uses example values and placeholder comments (e.g., '//Adjust for track type'). You MUST replace these with your new, calculated, and numerically valid values. A setup returned with generic example values or comments like 'Adjust for X' or 'MUST be changed' is a complete failure and will be rejected. Remove ALL such placeholder comments and replace them with actual calculations or 'N/A'/'Non-adjustable' where appropriate.**

Crucial LMU Setup Principles to Apply:

// --- NEW IMPROVEMENT TO MAKE SETUPS BETTER ---
Track-Type Philosophy: My entire setup approach must change based on the track. 
- For High-Speed tracks (e.g., Circuit de la Sarthe (Le Mans), Monza, Spa-Francorchamps), I must prioritize top speed by using low wing angles, longer gear ratios (numerically higher FinalDriveSetting values, numerically lower individual gears like Gear1-7), and stiffer springs/dampers for high-speed stability.
- For Technical/Bumpy tracks (e.g., Sebring International Raceway, Autódromo Internacional do Algarve (Portimão)), I must prioritize braking stability and cornering grip by using higher wing angles (if beneficial for downforce balance), shorter gear ratios for acceleration (numerically lower FinalDriveSetting values, numerically higher individual gears), and softer, more compliant suspension settings.

Driver-Centric Adjustments:
- For a 'Safe' or 'Stable' request, I will prioritize predictability: using slightly softer suspension settings, higher wing angles for stability (if appropriate for track type), and less aggressive differential locking.
- For an 'Aggressive' request, I will prioritize responsiveness and rotation: using stiffer springs and dampers, more negative front camber for sharp turn-in, and differential settings that allow the rear to rotate.
- If the driver reports 'understeer', I will focus on changes that increase front-end grip (e.g., soften front anti-roll bar, stiffen rear anti-roll bar, more negative front camber, slightly increase front ride height).
- If the driver reports 'oversteer', I will focus on changes that increase rear-end stability (e.g., stiffen front anti-roll bar, soften rear anti-roll bar, less negative rear camber, slightly reduce rear ride height).

Qualifying vs. Race Philosophy: For a race setup, I will prioritize stability and tire preservation over ultimate one-lap pace. For qualifying, maximize raw pace.

Engineer's Commentary in Notes: The [GENERAL] Notes section is critical. I must use it to briefly explain the setup's core philosophy (e.g., "Le Mans setup: Low wings for top speed, stiff springs for stability.") and include the fuel calculation.

**Specific Guidance for ENGINE and DRIVELINE (Crucial for fixing the issue):**
- **RegenerationMapSetting (for Hybrids like Hypercars):** For Race sessions, aim for 10 (max regen). For Qualifying, a lower value like 8 or 9 might be used. For non-hybrids, this should be 0//N/A.
- **ElectricMotorMapSetting (for Hybrids like Hypercars):** For Race sessions, use 3 or 4 for usable electric power. For Qualifying, 4 for maximum boost. For non-hybrids (LMP2, GT3, GTE), this *must* be 0//Not Applicable. Do NOT output "safety-car" or any other non-numerical value.
- **EngineMixtureSetting:** For Qualifying, use 0//Full. For Race sessions, use 1//Race unless fuel saving is a very specific request, then consider 2//Lean.
- **FinalDriveSetting & Gears (Gear1Setting-Gear7Setting):** These are paramount for track type.
    - **High-Speed Tracks (e.g., Le Mans, Monza):** Choose a longer FinalDriveSetting (e.g., 5-7 for higher top speed) and adjust individual gears to stretch them for top speed. The comments for individual gears should reflect the calculated speed.
    - **Technical Tracks (e.g., Sebring, Imola):** Choose a shorter FinalDriveSetting (e.g., 0-3 for better acceleration) and adjust individual gears for quicker acceleration out of corners.
- **DiffPowerSetting (on-throttle):** Higher for more traction, lower for more rotation. Adjust based on setup goal and driver feedback. (e.g., 0-15 typical range).
- **DiffCoastSetting (off-throttle):** Higher for more stability on lift-off, lower for more rotation. Adjust based on setup goal and driver feedback. (e.g., 0-20 typical range).
- **DiffPreloadSetting:** Affects low-speed stability. Higher for more stability, lower for more maneuverability. (e.g., 0-100 Nm typical range).
- **RatioSetSetting:** 0 for Standard, 1 for Long/High Speed, etc. Adjust based on track type.

Here are the details for the setup request:
Car: ${car} (Display Name: ${selectedCarDisplay}, Category: ${selectedCarCategory})
Track: ${track} (Display Name: ${selectedTrackDisplay})
Setup Goal: ${setupGoal}
Driver Problem to Solve: ${driverFeedback}
Session Goal: ${sessionGoal}
Session Duration: ${sessionDuration} minutes
Weather: ${selectedWeather} (${weatherGuidance})
Track Temperature: ${trackTemp}°C
Specific User Request: ${specificRequest}
${fuelEstimateRequest}
${tireCompoundGuidance}

This is the required LMU .VEH structure and format. You must use this exact structure, replacing all placeholder values (especially those with "MUST be changed" comments).
${exampleTemplate}

Now, generate the complete and valid .VEH file. Your response must contain ONLY the file content and nothing else.
`;

    try {
        const openrouterResponse = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://test-hrwc.onrender.com', // Your app's URL
                'X-Title': 'LMU Setup Generator',
            },
            body: JSON.stringify({
                model: PRIMARY_MODEL,
                messages: [{ role: "user", content: prompt }],
                max_tokens: 4096,
                temperature: 0.4, // Keep temperature low to encourage adherence to format
            }),
        });

        if (!openrouterResponse.ok) {
            const errorData = await openrouterResponse.json();
            console.error("Error from OpenRouter API:", openrouterResponse.status, errorData);
            return res.status(openrouterResponse.status).json({
                error: `OpenRouter API Error: ${errorData.error ? errorData.error.message : 'Unknown API error'} (Status: ${openrouterResponse.status})`
            });
        }

        const chatCompletion = await openrouterResponse.json();
        let text = chatCompletion.choices[0].message.content;

        // Trim leading/trailing whitespace AND remove markdown code blocks (if present)
        text = text.trim();
        if (text.startsWith('```') && text.endsWith('```')) {
            text = text.replace(/^```[a-zA-Z]*\n|\n```$/g, '').trim();
        }

        if (text && text.startsWith('VehicleClassSetting=')) {
            res.json({ setup: text });
        } else {
            console.error("AI generated an invalid setup format or empty response.");
            console.error("AI Raw Response (first 500 chars):", text ? text.substring(0, 500) : '[Empty Response]'); // Log a snippet
            res.status(500).json({
                error: `AI generated an invalid setup format. Please refine your request or try again. Raw AI response snippet: ${text ? text.substring(0, 200) : '[Empty Response]'}`
            });
        }

    } catch (error) {
        console.error("Error communicating with OpenRouter or generating setup:", error);
        res.status(500).json({
            error: `Failed to connect to OpenRouter. Check VS Code terminal. Error: ${error.message}`
        });
    }
});

// 9. Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Open your web browser and navigate to http://localhost:${port}`);
    console.log("Keep this terminal window open while using the generator.");
});
