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
// UPGRADED: Added GTE class and made VehicleClassSetting a placeholder for dynamic insertion.
const LMU_VEH_TEMPLATES = {
    'Hypercar': `VehicleClassSetting="[[CAR_NAME]]"
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

    'LMP2': `VehicleClassSetting="[[CAR_NAME]]"
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

    'GT3': `VehicleClassSetting="[[CAR_NAME]]"
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
Custom=1`,
    
    'GTE': `VehicleClassSetting="[[CAR_NAME]]"
UpgradeSetting=(0,0,0,0)

[GENERAL]
Notes=""
Symmetric=1
FuelSetting=100
FuelCapacitySetting=0
NumPitstopsSetting=0

[FRONTWING]
FWSetting=0

[REARWING]
RWSetting=5

[SUSPENSION]
FrontAntiSwaySetting=8
RearAntiSwaySetting=4
FrontToeInSetting=12
RearToeInSetting=18
Front3rdPackerSetting=0
Front3rdSpringSetting=0
Rear3rdPackerSetting=0
Rear3rdSpringSetting=0

[CONTROLS]
SteerLockSetting=15
RearBrakeSetting=15
BrakePressureSetting=95
TCSetting=0
TractionControlMapSetting=5
TCPowerCutMapSetting=5
TCSlipAngleMapSetting=5
AntilockBrakeSystemMapSetting=5

[ENGINE]
RevLimitSetting=0
EngineMixtureSetting=1
EngineBrakingMapSetting=8

[DRIVELINE]
FinalDriveSetting=5
Gear1Setting=10
Gear2Setting=10
Gear3Setting=10
Gear4Setting=10
Gear5Setting=10
Gear6Setting=10
RatioSetSetting=1
DiffPowerSetting=8
DiffCoastSetting=10
DiffPreloadSetting=25

[FRONTLEFT]
CamberSetting=20
PressureSetting=10
PackerSetting=5
SpringSetting=8
RideHeightSetting=10
SlowBumpSetting=10
FastBumpSetting=10
SlowReboundSetting=10
FastReboundSetting=10

[FRONTRIGHT]
CamberSetting=20
PressureSetting=10
PackerSetting=5
SpringSetting=8
RideHeightSetting=10
SlowBumpSetting=10
FastBumpSetting=10
SlowReboundSetting=10
FastReboundSetting=10

[REARLEFT]
CamberSetting=15
PressureSetting=10
PackerSetting=5
SpringSetting=6
RideHeightSetting=20
SlowBumpSetting=10
FastBumpSetting=10
SlowReboundSetting=10
FastReboundSetting=10

[REARRIGHT]
CamberSetting=15
PressureSetting=10
PackerSetting=5
SpringSetting=6
RideHeightSetting=20
SlowBumpSetting=10
FastBumpSetting=10
SlowReboundSetting=10
FastReboundSetting=10

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

    let exampleTemplate = LMU_VEH_TEMPLATES[finalCategory];
    if (!exampleTemplate) {
        return res.status(400).json({ error: `No .VEH template found for car category: ${finalCategory}. Ensure selected car has a valid category.` });
    }

    // UPGRADE: Dynamically insert the user's selected car name into the template
    exampleTemplate = exampleTemplate.replace('[[CAR_NAME]]', car);

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
Your sole mission is to act as an expert LMU race engineer and generate a complete and numerically valid .VEH setup file. You must replace every placeholder value with a calculated, logical number based on a strict engineering hierarchy. Returning a file with '0' for gears or other critical settings is a failure.

// --- PERSONA & PHILOSOPHY ---
You are a world-class Le Mans Ultimate (LMU) race engineer. Your primary philosophy is that a comfortable, confident driver is a fast driver. Your #1 goal is to generate a setup that is predictable, physically realistic, and perfectly suited to the driver's requested style and feedback.

**CRITICAL INSTRUCTION: The template below uses example values. You MUST replace these with your new, calculated, and numerically valid values based on the logic, ranges, and sanity checks provided. You MUST also populate the '[GENERAL] Notes' section with your engineering summary.**

// --- THOUGHT PROCESS & HIERARCHY OF TUNING PRIORITIES (You MUST follow this order) ---
1.  **Driver Feedback is KING:** Is there a specific handling complaint in 'Driver Problem to Solve'? If yes, fixing this is my absolute highest priority. I will immediately consult the 'DRIVER FEEDBACK TROUBLESHOOTING MATRIX' and apply the Primary and Secondary solutions. All other decisions must work around this fix.
2.  **Track & Weather Conditions:** What are the physical demands of the track (e.g., bumpy Sebring vs. smooth Monza) and the weather? I will consult the 'ADVANCED WEATHER & TIRE STRATEGY' and 'SETUP SANITY CHECKS' sections to make baseline decisions about springs, dampers, ride height, and aero that are appropriate for the environment.
3.  **Car Architecture:** What is the car's inherent nature according to the 'CAR ARCHITECTURE PHILOSOPHY'? I will apply gentle adjustments to either tame a car's negative traits (e.g., reduce Porsche entry understeer) or enhance its strengths (e.g., lean on Corvette braking stability).
4.  **Overall Setup Goal:** Finally, I will use the 'Setup Goal' (Safe, Balanced, Aggressive) to fine-tune the settings within the context of the decisions I've already made. 'Aggressive' might mean slightly stiffer settings or a more responsive differential, while 'Safe' means slightly softer settings and more stability.
5.  **Engineer's Notes:** After generating all values, I will write a concise summary in the '[GENERAL] Notes' section explaining my choices, as per 'THE ENGINEER'S NOTES DIRECTIVE'.

// =====================================================================================
// --- CAR ARCHITECTURE PHILOSOPHY ---
// =====================================================================================
// - **Mid-Engine (All Prototypes, Ferrari, Vanwall, Peugeot):** Most balanced layout. Good baseline, but can be sensitive to aero changes.
// - **Rear-Engine (Porsche 911 RSR / GT3 R):** Weight is biased to the rear. Natively has excellent traction but can be prone to entry understeer and snap-oversteer on throttle lift if not managed. Focus on keeping the front loaded and the differential stable.
// - **Front-Engine (Corvette, Aston Martin):** Weight is biased to the front. Natively very stable under braking but can be prone to understeer on corner entry and mid-corner. Focus on changes that help the car rotate.

// =====================================================================================
// --- DRIVER FEEDBACK TROUBLESHOOTING MATRIX (Highest Priority) ---
// =====================================================================================
// IF driver reports "Understeer on corner entry":
//   1st Priority: Reduce 'DiffCoastSetting' (less lock, helps turn-in).
//   2nd Priority: Soften 'FrontAntiSwaySetting' (more front grip).
// IF driver reports "Understeer mid-corner or on exit":
//   1st Priority: Stiffen 'RearAntiSwaySetting' (helps rotation).
//   2nd Priority: Reduce 'DiffPowerSetting' (less lock, less push on-throttle).
// IF driver reports "Oversteer on corner entry" or "Car is too pointy/nervous":
//   1st Priority: Increase 'DiffCoastSetting' (more lock, more stability).
//   2nd Priority: Stiffen 'FrontAntiSwaySetting'.
// IF driver reports "Oversteer on exit" or "Poor traction":
//   1st Priority: Soften 'RearAntiSwaySetting'.
//   2nd Priority: Increase 'DiffPowerSetting' (more lock, pushes car straight).
// IF driver reports "Unstable under braking":
//   1st Priority: Decrease 'RearBrakeSetting' (moves bias rearward slightly).
//   2nd Priority: Increase 'EngineBrakingMapSetting'.

// =====================================================================================
// --- ADVANCED WEATHER & TIRE STRATEGY ---
// =====================================================================================
// - IF Weather is 'Rain' or 'Wet':
//   - CompoundSetting MUST be for Wet tires (e.g., 0 for many cars).
//   - PressureSetting should be INCREASED by 3-5 clicks from a dry setting to help cut through water.
//   - RideHeightSetting MUST be INCREASED significantly (e.g., +10-15 clicks) to avoid aquaplaning.
//   - SpringSetting and all Damper settings should be SOFTER (lower values) to allow for more weight transfer and grip.
//   - TractionControlMapSetting and AntilockBrakeSystemMapSetting should be set HIGHER for more assistance.

// =====================================================================================
// --- SETUP SANITY CHECKS (Core Physics Rules) ---
// =====================================================================================
// 1.  **Ride Height vs. Springs:** A very low RideHeightSetting REQUIRES a high (stiff) SpringSetting to prevent bottoming out.
// 2.  **Aero vs. Springs:** High downforce settings (high RWSetting) REQUIRES stiffer springs to support the load.
// 3.  **Bumps vs. Dampers:** Bumpy tracks (Sebring) REQUIRE softer FastBumpSetting values. Smooth tracks (Monza) can use stiffer settings.
// 4.  **Gearing & Track Type:** DO NOT use short gears (low FinalDriveSetting) at high-speed tracks (Le Mans/Monza).

// =====================================================================================
// --- NEW: THE ENGINEER'S NOTES DIRECTIVE (Mandatory) ---
// =====================================================================================
// You MUST populate the `[GENERAL] Notes=""` field with a concise, multi-line summary formatted exactly like this:
// Notes="Philosophy: [Explain the core goal, e.g., A stable race setup for Monza focused on top speed.]\\nKey Trade-offs: [Explain the main compromise, e.g., Sacrificed some mid-corner grip for higher top speed and braking stability.]\\nFirst Tweak: [Suggest one simple change for the driver, e.g., If you still have understeer, try softening the front anti-roll bar by 1-2 clicks.]\\nFuel: [Provide the fuel estimate, e.g., Estimated for a 45-minute race.]"
// (Use \\n for new lines in the final output string).

// =====================================================================================
// --- FINAL REQUEST DETAILS ---
// =====================================================================================
Car: ${car} (Display Name: ${selectedCarDisplay}, Category: ${finalCategory})
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

This is the required LMU .VEH structure. You must use this exact structure, replacing all placeholder values with valid integers from the guide above. Your response must begin IMMEDIATELY with 'VehicleClassSetting=' and contain ONLY the .VEH file content. Do not include any introductory text, explanations, or markdown formatting.
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
        const rawText = chatCompletion.choices[0].message.content;

        // --- NEW ROBUST PARSING LOGIC ---
        // Find the start of the actual .VEH content. The AI sometimes adds introductory text.
        const setupStartIndex = rawText.indexOf('VehicleClassSetting=');
        
        if (setupStartIndex !== -1) {
            // If the start string is found, extract everything from that point on.
            let setupText = rawText.substring(setupStartIndex);

            // Also remove any trailing markdown code blocks if they exist
             if (setupText.trim().endsWith('```')) {
                 setupText = setupText.trim().slice(0, -3).trim();
            }

            res.json({ setup: setupText });

        } else {
            // If 'VehicleClassSetting=' is not found at all, the response is invalid.
            console.error("AI generated an invalid setup format or empty response (marker not found).");
            console.error("AI Raw Response (first 500 chars):", rawText ? rawText.substring(0, 500) : '[Empty Response]'); // Log a snippet
            res.status(500).json({
                error: `AI generated an invalid setup format. The required 'VehicleClassSetting=' marker was not found in the response. Please try again. Raw AI response snippet: ${rawText ? rawText.substring(0, 200) : '[Empty Response]'}`
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
