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
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const PRIMARY_MODEL = 'NousResearch/Hermes-2-Pro-Llama-3-8B';

// --- Define LMU .VEH Example Templates by Category ---
// Templates remain largely the same, the main fix is in the prompt sent to the AI.
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
FWSetting=1//Standard
// FWSetting: 0=low, 1=medium, 2=high (AI adjusts based on track type)

[REARWING]
RWSetting=3//P4 (AI adjusts based on track type)
// RWSetting for Hypercar: 0-7 (P1=low, P7=high)

[BODYAERO]
WaterRadiatorSetting=1//25% (AI adjusts based on temp/session)
OilRadiatorSetting=1//25% (AI adjusts based on temp/session)
BrakeDuctSetting=1//25% (AI adjusts based on temp/track)
BrakeDuctRearSetting=1//25% (AI adjusts based on temp/track)

[SUSPENSION]
FrontWheelTrackSetting=0//Non-adjustable
RearWheelTrackSetting=0//Non-adjustable
FrontAntiSwaySetting=16//D-P1 (AI adjusts for balance)
RearAntiSwaySetting=0//Detached (AI adjusts for balance)
FrontToeInSetting=15//-0.06 deg (AI adjusts for turn-in/stability)
FrontToeOffsetSetting=0//N/A
RearToeInSetting=17//0.06 deg (AI adjusts for stability/rotation)
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
BrakePressureSetting=80//120 kgf (100%) (Adjust for stopping power/lockup: 80-100)
HandfrontbrakePressSetting=0//0%
HandbrakePressSetting=0//N/A
TCSetting=0//Available
ABSSetting=0//N/A
TractionControlMapSetting=9//9 (Adjust for power delivery/grip: 0=off, 1-10)
TCPowerCutMapSetting=8//8 (Adjust for power delivery/grip: 0=off, 1-10)
TCSlipAngleMapSetting=8//8 (Adjust for power delivery/grip: 0=off, 1-10)
AntilockBrakeSystemMapSetting=0//N/A

[ENGINE]
RevLimitSetting=0//8,500
EngineBoostSetting=0//N/A
RegenerationMapSetting=10//200kW (AI adjusts for session type: Quali=8-9, Race=10)
ElectricMotorMapSetting=3//60kW (AI adjusts for hybrid usage: 0=N/A, 1-4 for power modes)
EngineMixtureSetting=1//Race (AI adjusts for session type: 0=Full, 1=Race, 2=Lean)
EngineBrakingMapSetting=0//N/A

[DRIVELINE]
FinalDriveSetting=3//2.98:1 (AI adjusts for track type: 0=Standard/Short, higher values for Long)
ReverseSetting=0//2.07 (6.18)
Gear1Setting=8//2.85 (8.49) (AI adjusts for track type)
Gear2Setting=8//2.20 (6.56) (AI adjusts for track type)
Gear3Setting=8//1.82 (5.44) (AI adjusts for track type)
Gear4Setting=8//1.56 (4.64) (AI adjusts for track type)
Gear5Setting=8//1.35 (4.02) (AI adjusts for track type)
Gear6Setting=8//1.19 (3.55) (AI adjusts for track type)
Gear7Setting=8//1.05 (3.14) (AI adjusts for track type)
RatioSetSetting=0//Short (AI adjusts for track type: 0=Standard, 1=Long/High Speed)
DiffPumpSetting=0//N/A
DiffPowerSetting=3//25% (AI adjusts for on-throttle stability: 0-15%)
DiffCoastSetting=10//60% (AI adjusts for off-throttle stability: 0-20%)
DiffPreloadSetting=24//120 Nm (AI adjusts for overall stability: 0-100 Nm)
FrontDiffPumpSetting=0//N/A
FrontDiffPowerSetting=0//10%
FrontDiffCoastSetting=0//10%
FrontDiffPreloadSetting=0//0 Nm
RearSplitSetting=0// 0.0:100.0
GearAutoUpShiftSetting=0//Off
GearAutoDownShiftSetting=0//Off

[FRONTLEFT]
CamberSetting=26//-1.4 deg (AI adjusts for track: -1.0 to -3.0 deg)
PressureSetting=5//135 kPa (AI adjusts for weather/session: 130-150 kPa)
PackerSetting=5//0.5 cm (AI adjusts for track)
SpringSetting=10//15.95mm (AI adjusts for track)
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=9//4.9 cm (AI adjusts for track/rake)
SlowBumpSetting=5//6 (AI adjusts for weight transfer control)
FastBumpSetting=6//7 (AI adjusts for bumps/curbs)
SlowReboundSetting=5//6 (AI adjusts for weight transfer control)
FastReboundSetting=4//5 (AI adjusts for bumps/curbs)
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//82% Soft (AI adjusts for session/weather: 0=Soft/Wet, 1=Medium, 2=Hard)

[FRONTRIGHT]
CamberSetting=26//-1.4 deg (AI adjusts for track)
PressureSetting=5//135 kPa (AI adjusts for weather/session)
PackerSetting=5//0.5 cm (AI adjusts for track)
SpringSetting=10//15.95mm (AI adjusts for track)
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=9//4.9 cm (AI adjusts for track/rake)
SlowBumpSetting=5//6 (AI adjusts for track)
FastBumpSetting=6//7 (AI adjusts for track)
SlowReboundSetting=5//6 (AI adjusts for weight transfer control)
FastReboundSetting=4//5 (AI adjusts for bumps/curbs)
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//76% Soft (AI adjusts for session/weather)

[REARLEFT]
CamberSetting=35//-0.5 deg (AI adjusts for track: -0.5 to -2.5 deg)
PressureSetting=5//135 kPa (AI adjusts for weather/session)
PackerSetting=12//1.2 cm (AI adjusts for track)
SpringSetting=0//13.33mm (AI adjusts for track)
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//7.5 cm (AI adjusts for track)
SlowBumpSetting=4//5 (AI adjusts for track)
FastBumpSetting=4//5 (AI adjusts for track)
SlowReboundSetting=6//7 (AI adjusts for track)
FastReboundSetting=6//7 (AI adjusts for track)
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//86% Soft (AI adjusts for session/weather)

[REARRIGHT]
CamberSetting=35//-0.5 deg (AI adjusts for track)
PressureSetting=5//135 kPa (AI adjusts for weather/session)
PackerSetting=12//1.2 cm (AI adjusts for track)
SpringSetting=0//13.33mm (AI adjusts for track)
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//7.5 cm (AI adjusts for track)
SlowBumpSetting=4//5 (AI adjusts for track)
FastBumpSetting=4//5 (AI adjusts for track)
SlowReboundSetting=6//7 (AI adjusts for track)
FastReboundSetting=6//7 (AI adjusts for track)
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//82% Soft (AI adjusts for session/weather)

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
FuelSetting=65//65L (AI adjusts based on session duration and track)
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
RWSetting=2//P3 (AI adjusts for track)
// RWSetting for LMP2: 0-8 (P1=low, P8=high)

[BODYAERO]
WaterRadiatorSetting=2//50% (AI adjusts based on track temp/session)
OilRadiatorSetting=2//50% (AI adjusts based on track temp/session)
//BrakeDuctSetting=0//Open
BrakeDuctRearSetting=1//25% (AI adjusts for aero efficiency vs. cooling)

[SUSPENSION]
//FrontWheelTrackSetting=0//Non-adjustable
//RearWheelTrackSetting=0//Non-adjustable
FrontAntiSwaySetting=9//D25 H-H (AI adjusts for balance, stiffer=more understeer)
RearAntiSwaySetting=1//D7.5 S-S (AI adjusts for balance, stiffer=more oversteer)
FrontToeInSetting=13//-0.18 deg (AI adjusts for turn-in/stability)
//FrontToeOffsetSetting=0//N/A
RearToeInSetting=22//0.35 deg (AI adjusts for stability/rotation)
//RearToeOffsetSetting=0//N/A
//LeftCasterSetting=0//Non-adjustable
//RightCasterSetting=0//Non-adjustable
//LeftTrackBarSetting=0//N/A
//RightTrackBarSetting=0//N/A
Front3rdPackerSetting=6//0.6 cm (AI adjusts for ride height/suspension travel)
Front3rdSpringSetting=0//N/A
//Front3rdTenderSpringSetting=0//Detached
//Front3rdTenderTravelSetting=0//Detached
//Front3rdSlowBumpSetting=0//1
//Front3rdFastBumpSetting=0//1
//Front3rdSlowReboundSetting=0//1
//Front3rdFastReboundSetting=0//1
Rear3rdPackerSetting=7//0.7 cm (AI adjusts for ride height/suspension travel)
//Rear3rdSpringSetting=0//N/A
//Rear3rdTenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SlowBumpSetting=0//1
//FastBumpSetting=0//1
//SlowReboundSetting=0//1
//FastReboundSetting=0//1
//ChassisAdj00Setting=0//N/A

[CONTROLS]
//SteerLockSetting=3//336 (13) deg
RearBrakeSetting=13//54.1:45.9 (Adjust for braking stability: 52:48 F to 56:44 F)
//BrakeMigrationSetting=0// 0.0
BrakePressureSetting=60//100 kgf (83%) (Adjust for stopping power/lockup: 80-100)
//HandfrontbrakePressSetting=0//0%
//HandbrakePressSetting=0//N/A
//TCSetting=0//Available
//ABSSetting=0//N/A
TractionControlMapSetting=7//7 (Adjust for power delivery/grip: 0=off, 1-10)
TCPowerCutMapSetting=4//4 (Adjust for power delivery/grip: 0=off, 1-10)
TCSlipAngleMapSetting=7//Linked (Adjust for power delivery/grip: 0=off, 1-10)
//AntilockBrakeSystemMapSetting=0//N/A

[ENGINE]
//RevLimitSetting=0//8000
//EngineBoostSetting=0//N/A
//RegenerationMapSetting=0//0%
ElectricMotorMapSetting=0//Not Applicable
EngineMixtureSetting=1//Race (Adjust for session type: 0=Quali, 1=Race)
//EngineBrakingMapSetting=0//N/A

[DRIVELINE]
FinalDriveSetting=3//2.88:1 (AI adjusts for track type: 0=Standard/Short, higher values=Long)
ReverseSetting=0//2.85 (8.18)
Gear1Setting=5//2.85 (8.18) (AI adjusts for track type)
Gear2Setting=5//2.20 (6.33) (AI adjusts for track type)
Gear3Setting=5//1.88 (5.39) (AI adjusts for track type)
Gear4Setting=5//1.62 (4.67) (AI adjusts for track type)
Gear5Setting=5//1.42 (4.09) (AI adjusts for track type)
Gear6Setting=5//1.27 (3.66) (AI adjusts for track type)
RatioSetSetting=1//High Speed (AI adjusts for track type: 0=Standard, 1=High Speed)
//DiffPumpSetting=0//N/A
DiffPowerSetting=0//FF6-60 deg (AI adjusts for on-throttle stability: 0-15%)
DiffCoastSetting=2//FF6-45 deg (AI adjusts for off-throttle stability: 0-20%)
DiffPreloadSetting=17//85 Nm (AI adjusts for overall stability: 0-100 Nm)
//FrontDiffPumpSetting=0//0%
//FrontDiffPowerSetting=0//0%
//FrontDiffCoastSetting=0//0%
//FrontDiffPreloadSetting=0//1
//RearSplitSetting=0// 0.0:100.0
//GearAutoUpShiftSetting=0//Off
//GearAutoDownShiftSetting=0//Off

[FRONTLEFT]
CamberSetting=11//-1.5 deg (AI adjusts for track: -1.0 to -3.0 deg)
PressureSetting=5//140 kPa (AI adjusts for weather/session: 130-150 kPa)
PackerSetting=3//0.3 cm (AI adjusts for track)
SpringSetting=5//150N/mm (AI adjusts for track)
//TenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SpringRubberSetting=0//Detached
RideHeightSetting=10//4.5 cm (AI adjusts for track/rake)
SlowBumpSetting=4//5 (AI adjusts for weight transfer control)
FastBumpSetting=1//2 (AI adjusts for bumps/curbs)
SlowReboundSetting=2//3 (AI adjusts for weight transfer control)
FastReboundSetting=1//2 (AI adjusts for bumps/curbs)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
CompoundSetting=0//Medium (AI adjusts for session/weather: 0=Soft/Wet, 1=Medium, 2=Hard)
//EquippedTireIDSetting=-1//None Available

[FRONTRIGHT]
CamberSetting=11//-1.5 deg (AI adjusts for track)
PressureSetting=5//140 kPa (AI adjusts for weather/session)
PackerSetting=3//0.3 cm (AI adjusts for track)
SpringSetting=5//150N/mm (AI adjusts for track)
//TenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SpringRubberSetting=0//Detached
RideHeightSetting=10//4.5 cm (AI adjusts for track/rake)
SlowBumpSetting=4//5 (AI adjusts for track)
FastBumpSetting=1//2 (AI adjusts for track)
SlowReboundSetting=2//3 (AI adjusts for weight transfer control)
FastReboundSetting=1//2 (AI adjusts for bumps/curbs)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
CompoundSetting=0//Medium (AI adjusts for session/weather)
//EquippedTireIDSetting=-1//None Available

[REARLEFT]
CamberSetting=5//-1.0 deg (AI adjusts for track: -0.5 to -2.5 deg)
PressureSetting=5//140 kPa (AI adjusts for weather/session)
PackerSetting=1//0.1 cm (AI adjusts for track)
//SpringSetting=3//1100lbf/in
//TenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SpringRubberSetting=0//Detached
RideHeightSetting=24//7.0 cm (AI adjusts for track)
SlowBumpSetting=0//1 (soft) (AI adjusts for track)
FastBumpSetting=0//1 (soft) (AI adjusts for track)
SlowReboundSetting=1//2 (AI adjusts for track)
FastReboundSetting=0//1 (soft) (AI adjusts for track)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
CompoundSetting=0//Medium (AI adjusts for session/weather)
//EquippedTireIDSetting=-1//None Available

[REARRIGHT]
CamberSetting=5//-1.0 deg (AI adjusts for track)
PressureSetting=5//140 kPa (AI adjusts for weather/session)
PackerSetting=1//0.1 cm (AI adjusts for track)
//SpringSetting=3//1100lbf/in
//TenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SpringRubberSetting=0//Detached
RideHeightSetting=24//7.0 cm (AI adjusts for track)
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
Gear1Setting=8//Fixed (AI adjusts for track type)
Gear2Setting=8//Fixed (AI adjusts for track type)
Gear3Setting=8//Fixed (AI adjusts for track type)
Gear4Setting=8//Fixed (AI adjusts for track type)
Gear5Setting=8//Fixed (AI adjusts for track type)
Gear6Setting=8//Fixed (AI adjusts for track type)
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
PressureSetting=5//140 kPa (Adjust for weather/session)
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
PressureSetting=5//140 kPa (Adjust for weather/session)
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
Custom=1`
};

// 8. Define a route for AI setup requests
app.post('/generate-setup', async (req, res) => {
    // Safely destructure all possible values from the request body
    const { car, track, request, selectedCarCategory,
        selectedCarDisplay, selectedTrackDisplay, setupGoal,
        sessionGoal, selectedWeather, trackTemp, specificRequest, driverFeedback
    } = req.body;

    // Validate essential parameters
    if (!car || !track || !setupGoal || !selectedCarCategory) {
        return res.status(400).json({ error: "Please provide Car, Track, Setup Goal, and Car Category details." });
    }
    
    // Handle potential category key mismatch
    let finalCategory = selectedCarCategory;
    if (selectedCarCategory === 'LMGT3' && LMU_VEH_TEMPLATES['GT3']) {
        finalCategory = 'GT3';
    } else if (selectedCarCategory === 'GT3' && LMU_VEH_TEMPLATES['LMGT3']) {
        finalCategory = 'LMGT3';
    }

    const exampleTemplate = LMU_VEH_TEMPLATES[finalCategory];
    if (!exampleTemplate) {
        return res.status(400).json({ error: `No .VEH template found for car category: ${finalCategory}. Ensure selected car has a valid category.` });
    }

    const sessionDuration = req.body.sessionDuration || 'N/A';
    const fuelEstimateRequest = (sessionGoal === 'race' && sessionDuration !== 'N/A' && !isNaN(parseInt(sessionDuration))) ?
                                `Estimate fuel for a ${sessionDuration} minute race.` : '';
    const weatherGuidance = `Current weather is ${selectedWeather}.`;
    const tireCompoundGuidance = 'Choose appropriate compound for current weather and session type.';


    // =====================================================================================
    // --- AI PROMPT --- THIS IS THE CRITICAL SECTION THAT HAS BEEN IMPROVED ---
    // =====================================================================================
    const prompt = `
// --- PRIME DIRECTIVE ---
Your sole mission is to act as an expert LMU race engineer and generate a complete and numerically valid .VEH setup file. You must replace every placeholder value with a calculated, logical number based on the user's request and the provided parameter ranges. Returning a file with '0' for gears or other critical settings is a failure.

// --- PERSONA & PHILOSOPHY ---
You are a world-class Le Mans Ultimate (LMU) race engineer. Your primary philosophy is that a comfortable, confident driver is a fast driver. Your #1 goal is to generate a setup that is predictable and perfectly suited to the driver's requested style and feedback.

**CRITICAL INSTRUCTION: The template below uses example values. You MUST replace these with your new, calculated, and numerically valid values based on the logic and ranges provided. Remove ALL placeholder comments like '(AI adjusts for...)' and replace them with just the value and a brief justification (e.g., 'RWSetting=2//Low for Monza speed').**

// --- THOUGHT PROCESS (Internal) ---
1.  **Analyze Request:** What is the Setup Goal (Safe, Balanced, Aggressive), Track, Car, and Driver Feedback?
2.  **Consult Parameter Guide:** Review the mandatory "PARAMETER RANGE GUIDE" below to understand the valid numerical limits for each setting.
3.  **Formulate a Plan:** Based on the driver's needs and track type (High-Speed vs. Technical), form a plan. Example: "Driver wants a 'Safe' setup for Le Mans. I will use low wing settings from the guide for top speed, but slightly softer suspension settings and more stable differential settings to ensure predictability."
4.  **Generate Values:** For EVERY parameter, choose a specific integer from within its valid range in the guide. For gears, '0' is almost never a valid choice. I must output a logical number.
5.  **Write Justification:** In the [GENERAL] Notes section, I will explain my core tuning philosophy and the fuel estimate.

// =====================================================================================
// --- MANDATORY PARAMETER RANGE GUIDE (You MUST adhere to these values) ---
// =====================================================================================
// For each setting, pick an integer within the specified [Min - Max] range.
// Logic: Low end of range = Softer/Less/Lower. High end of range = Stiffer/More/Higher.

// [AERO]
// RWSetting (Rear Wing): [0 - 12] (Lower for high speed tracks like Monza/Le Mans, higher for technical tracks like Sebring)
// BrakeDuctSetting: [0 - 6] (Higher for more cooling, lower for less drag)

// [SUSPENSION]
// FrontAntiSwaySetting: [0 - 20] (Stiffer increases understeer)
// RearAntiSwaySetting: [0 - 20] (Stiffer increases oversteer)
// FrontToeInSetting: [0 - 30] (Negative values are typical, this is the setting index)
// RearToeInSetting: [0 - 30]
// PackerSetting: [0 - 20] (Affects bump stop engagement)
// SpringSetting: [0 - 20] (Higher is stiffer)
// RideHeightSetting: [0 - 40] (Higher is more ride height)
// SlowBumpSetting: [0 - 20] (Controls slow suspension movement)
// FastBumpSetting: [0 - 20] (Controls fast suspension movement, like curbs)
// SlowReboundSetting: [0 - 20] (Controls slow suspension movement)
// FastReboundSetting: [0 - 20] (Controls fast suspension movement)

// [CONTROLS]
// RearBrakeSetting (Bias): [0 - 30] (Higher value moves bias to the front)
// BrakePressureSetting: [70 - 100] (Percent of max pressure)
// TractionControlMapSetting: [0 - 12] (0 is off, higher is more intervention)
// TCPowerCutMapSetting: [0 - 12]
// AntilockBrakeSystemMapSetting (ABS): [0 - 12] (0 is off, higher is more intervention)

// [ENGINE]
// RegenerationMapSetting (Hybrid): [0 - 10] (Race: 10, Quali: 8-9. If not hybrid, must be 0)
// ElectricMotorMapSetting (Hybrid): [1 - 4] (Race: 3, Quali: 4. If not hybrid, must be 0 and commented as '//Not Applicable')
// EngineMixtureSetting: [0 - 2] (0=Quali, 1=Race, 2=Lean)

// [DRIVELINE] - THIS IS THE MOST IMPORTANT SECTION TO FIX
// FinalDriveSetting: [0 - 15] (Higher for longer overall gearing / top speed)
// RatioSetSetting: [0 - 2] (e.g., 0=Short, 1=Standard, 2=Long)
// Gear1Setting - Gear7Setting: [1 - 30] (You MUST pick a non-zero integer. Higher numbers mean longer/taller gears for higher top speed. Lower numbers mean shorter gears for better acceleration. DO NOT use 0.)
// DiffPowerSetting: [0 - 20] (On-throttle lock. Higher is more lock/stability, can cause understeer)
// DiffCoastSetting: [0 - 20] (Off-throttle lock. Higher is more lock/stability on entry)
// DiffPreloadSetting: [0 - 50] (Static lock. Higher is more stable overall)
// =====================================================================================

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

This is the required LMU .VEH structure. You must use this exact structure, replacing all placeholder values with valid integers from the guide above.
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
