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
CGHeightSetting=0//Non-adjustable (Fixed)
CGRightSetting=0//Non-adjustable (Fixed)
CGRearSetting=0//Non-adjustable (Fixed)
WedgeSetting=0//N/A (Fixed)
FuelSetting=85//85L (Initial guess, AI adjusts)
FuelCapacitySetting=0//Max Fuel (AI adjusts based on duration)
VirtualEnergySetting=72//72% (AI adjusts based on session)
NumPitstopsSetting=0//N/A (AI calculates)
Pitstop1Setting=88//N/A (Fixed)
Pitstop2Setting=88//N/A (Fixed)
Pitstop3Setting=88//N/A (Fixed)

[LEFTFENDER]
FenderFlareSetting=0//N/A (Fixed)

[RIGHTFENDER]
FenderFlareSetting=0//N/A (Fixed)

[FRONTWING]
FWSetting=1//Standard (Min: 0, Max: 2)
// FWSetting: 0=low, 1=medium, 2=high (AI adjusts based on track type)

[REARWING]
RWSetting=3//P4 (Min: 0, Max: 7)
// RWSetting for Hypercar: 0-7 (P1=low, P7=high)

[BODYAERO]
WaterRadiatorSetting=1//25% (Min: 0, Max: 4)
OilRadiatorSetting=1//25% (Min: 0, Max: 4)
BrakeDuctSetting=1//25% (Min: 0, Max: 3)
BrakeDuctRearSetting=1//25% (Min: 0, Max: 3)

[SUSPENSION]
FrontWheelTrackSetting=0//Non-adjustable (Fixed)
RearWheelTrackSetting=0//Non-adjustable (Fixed)
FrontAntiSwaySetting=16//D-P1 (Min: 0, Max: 20)
RearAntiSwaySetting=0//Detached (Min: 0, Max: 20)
FrontToeInSetting=15//-0.06 deg (Min: 0, Max: 30)
FrontToeOffsetSetting=0//N/A (Fixed)
RearToeInSetting=17//0.06 deg (Min: 0, Max: 30)
RearToeOffsetSetting=0//N/A (Fixed)
LeftCasterSetting=0//Non-adjustable (Fixed)
RightCasterSetting=0//Non-adjustable (Fixed)
LeftTrackBarSetting=0//N/A (Fixed)
RightTrackBarSetting=0//N/A (Fixed)
Front3rdPackerSetting=8//0.8 cm (Min: 0, Max: 20)
Front3rdSpringSetting=8//8 (Min: 0, Max: 15)
Front3rdTenderSpringSetting=0//Detached (Fixed)
Front3rdTenderTravelSetting=0//Detached (Fixed)
Front3rdSlowBumpSetting=0//1 (Min: 0, Max: 10)
Front3rdFastBumpSetting=2//3 (Min: 0, Max: 10)
Front3rdSlowReboundSetting=4//5 (Min: 0, Max: 10)
Front3rdFastReboundSetting=2//3 (Min: 0, Max: 10)
Rear3rdPackerSetting=10//1.0 cm (Min: 0, Max: 20)
Rear3rdSpringSetting=7//7 (Min: 0, Max: 15)
Rear3rdTenderSpringSetting=0//Detached (Fixed)
Rear3rdTenderTravelSetting=0//Detached (Fixed)
Rear3rdSlowBumpSetting=0//1 (Min: 0, Max: 10)
Rear3rdFastBumpSetting=2//3 (Min: 0, Max: 10)
Rear3rdSlowReboundSetting=0//1 (Min: 0, Max: 10)
Rear3rdFastReboundSetting=2//3 (Min: 0, Max: 10)
ChassisAdj00Setting=0//Alternative (Fixed)
ChassisAdj01Setting=0//N/A (Fixed)
ChassisAdj02Setting=0//N/A (Fixed)
ChassisAdj03Setting=0//N/A (Fixed)
ChassisAdj04Setting=0//N/A (Fixed)
ChassisAdj05Setting=0//N/A (Fixed)
ChassisAdj06Setting=0//N/A (Fixed)
ChassisAdj07Setting=0//N/A (Fixed)
ChassisAdj08Setting=0//N/A (Fixed)
ChassisAdj09Setting=0//N/A (Fixed)
ChassisAdj10Setting=0//N/A (Fixed)
ChassisAdj11Setting=0//N/A (Fixed)

[CONTROLS]
SteerLockSetting=0//400 (16) deg (Min: 0, Max: 20)
RearBrakeSetting=16//52.8:47.2 (Min: 0, Max: 40)
BrakeMigrationSetting=0//2.5% F (Min: 0, Max: 10)
BrakePressureSetting=80//120 kgf (100%) (Min: 0, Max: 100)
HandfrontbrakePressSetting=0//0% (Fixed)
HandbrakePressSetting=0//N/A (Fixed)
TCSetting=0//Available (Fixed)
ABSSetting=0//N/A (Fixed)
TractionControlMapSetting=9//9 (Min: 0, Max: 10)
TCPowerCutMapSetting=8//8 (Min: 0, Max: 10)
TCSlipAngleMapSetting=8//8 (Min: 0, Max: 10)
AntilockBrakeSystemMapSetting=0//N/A (Fixed)

[ENGINE]
RevLimitSetting=0//8,500 (Non-adjustable) (Fixed)
EngineBoostSetting=0//N/A (Fixed)
RegenerationMapSetting=10//200kW (AI adjusts for session type: Quali=8-9, Race=10) (Min: 0, Max: 10)
ElectricMotorMapSetting=3//60kW (AI adjusts for hybrid usage: 0=N/A, 1-4 for power modes) (Min: 0, Max: 4)
EngineMixtureSetting=1//Race (AI adjusts for session type: 0=Full, 1=Race, 2=Lean) (Min: 0, Max: 2)
EngineBrakingMapSetting=0//N/A (Fixed)

[DRIVELINE]
FinalDriveSetting=3//2.98:1 (AI adjusts for track type: 0=Standard/Short, higher values for Long) (Min: 0, Max: 7. Higher index = longer gear for higher top speed)
ReverseSetting=0//2.07 (6.18) (Fixed)
Gear1Setting=8//2.85 (~100 km/h) (Min: 0, Max: 20)
Gear2Setting=8//2.20 (~130 km/h) (Min: 0, Max: 20)
Gear3Setting=8//1.82 (~160 km/h) (Min: 0, Max: 20)
Gear4Setting=8//1.56 (~190 km/h) (Min: 0, Max: 20)
Gear5Setting=8//1.35 (~220 km/h) (Min: 0, Max: 20)
Gear6Setting=8//1.19 (~250 km/h) (Min: 0, Max: 20)
Gear7Setting=8//1.05 (~280 km/h) (Min: 0, Max: 20)
RatioSetSetting=0//Short (AI adjusts for track type: 0=Standard, 1=Long/High Speed) (Min: 0, Max: 1 or higher based on car)
DiffPumpSetting=0//N/A (Fixed)
DiffPowerSetting=3//25% (Min: 0, Max: 15)
DiffCoastSetting=10//60% (Min: 0, Max: 20)
DiffPreloadSetting=24//120 Nm (Min: 0, Max: 100)
FrontDiffPumpSetting=0//N/A (N/A for RWD) (Fixed)
FrontDiffPowerSetting=0//10% (N/A for RWD) (Fixed)
FrontDiffCoastSetting=0//10% (N/A for RWD) (Fixed)
FrontDiffPreloadSetting=0//0 Nm (N/A for RWD) (Fixed)
RearSplitSetting=0// 0.0:100.0 (Fixed to RWD)
GearAutoUpShiftSetting=0//Off (Manual Shifting) (Fixed)
GearAutoDownShiftSetting=0//Off (Manual Shifting) (Fixed)

[FRONTLEFT]
CamberSetting=26//-1.4 deg (Min: 0, Max: 40)
PressureSetting=5//135 kPa (Min: 0, Max: 10)
PackerSetting=5//0.5 cm (Min: 0, Max: 20)
SpringSetting=10//15.95mm (Min: 0, Max: 20)
TenderSpringSetting=0//Detached (Fixed)
TenderTravelSetting=0//Detached (Fixed)
SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=9//4.9 cm (Min: 0, Max: 30)
SlowBumpSetting=5//6 (Min: 0, Max: 10)
FastBumpSetting=6//7 (Min: 0, Max: 10)
SlowReboundSetting=5//6 (Min: 0, Max: 10)
FastReboundSetting=4//5 (Min: 0, Max: 10)
BrakeDiscSetting=0//4.00 cm (Fixed)
BrakePadSetting=0//1 (Fixed)
CompoundSetting=0//82% Soft (Min: 0, Max: 2)

[FRONTRIGHT]
CamberSetting=26//-1.4 deg (Min: 0, Max: 40)
PressureSetting=5//135 kPa (Min: 0, Max: 10)
PackerSetting=5//0.5 cm (Min: 0, Max: 20)
SpringSetting=10//15.95mm (Min: 0, Max: 20)
TenderSpringSetting=0//Detached (Fixed)
TenderTravelSetting=0//Detached (Fixed)
SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=9//4.9 cm (Min: 0, Max: 30)
SlowBumpSetting=5//6 (Min: 0, Max: 10)
FastBumpSetting=6//7 (Min: 0, Max: 10)
SlowReboundSetting=5//6 (Min: 0, Max: 10)
FastReboundSetting=4//5 (Min: 0, Max: 10)
BrakeDiscSetting=0//4.00 cm (Fixed)
BrakePadSetting=0//1 (Fixed)
CompoundSetting=0//76% Soft (Min: 0, Max: 2)

[REARLEFT]
CamberSetting=35//-0.5 deg (Min: 0, Max: 40)
PressureSetting=5//135 kPa (Min: 0, Max: 10)
PackerSetting=12//1.2 cm (Min: 0, Max: 20)
SpringSetting=0//13.33mm (Min: 0, Max: 20)
TenderSpringSetting=0//Detached (Fixed)
TenderTravelSetting=0//Detached (Fixed)
SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=15//7.5 cm (Min: 0, Max: 30)
SlowBumpSetting=4//5 (Min: 0, Max: 10)
FastBumpSetting=4//5 (Min: 0, Max: 10)
SlowReboundSetting=6//7 (Min: 0, Max: 10)
FastReboundSetting=6//7 (Min: 0, Max: 10)
BrakeDiscSetting=0//4.00 cm (Fixed)
BrakePadSetting=0//1 (Fixed)
CompoundSetting=0//86% Soft (Min: 0, Max: 2)

[REARRIGHT]
CamberSetting=35//-0.5 deg (Min: 0, Max: 40)
PressureSetting=5//135 kPa (Min: 0, Max: 10)
PackerSetting=12//1.2 cm (Min: 0, Max: 20)
SpringSetting=0//13.33mm (Min: 0, Max: 20)
TenderSpringSetting=0//Detached (Fixed)
TenderTravelSetting=0//Detached (Fixed)
SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=15//7.5 cm (Min: 0, Max: 30)
SlowBumpSetting=4//5 (Min: 0, Max: 10)
FastBumpSetting=4//5 (Min: 0, Max: 10)
SlowReboundSetting=6//7 (Min: 0, Max: 10)
FastReboundSetting=6//7 (Min: 0, Max: 10)
BrakeDiscSetting=0//4.00 cm (Fixed)
BrakePadSetting=0//1 (Fixed)
CompoundSetting=0//82% Soft (Min: 0, Max: 2)

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
//CGHeightSetting=0//Non-adjustable (Fixed)
//CGRightSetting=0//Non-adjustable (Fixed)
//CGRearSetting=0//Non-adjustable (Fixed)
//WedgeSetting=0//N/A (Fixed)
FuelSetting=65//65L (AI adjusts based on session duration and track)
//FuelCapacitySetting=0//N/A (Fixed)
//NumPitstopsSetting=0//N/A (AI calculates)
//Pitstop1Setting=50//N/A (Fixed)
//Pitstop2Setting=50//N/A (Fixed)
//Pitstop3Setting=50//N/A (Fixed)

[LEFTFENDER]
//FenderFlareSetting=0//N/A (Fixed)

[RIGHTFENDER]
//FenderFlareSetting=0//N/A (Fixed)

[FRONTWING]
//FWSetting=0//Le Mans (Fixed)

[REARWING]
RWSetting=2//P3 (Min: 0, Max: 8)
// RWSetting for LMP2: 0-8 (P1=low, P8=high)

[BODYAERO]
WaterRadiatorSetting=2//50% (Min: 0, Max: 4)
OilRadiatorSetting=2//50% (Min: 0, Max: 4)
//BrakeDuctSetting=0//Open (Fixed)
BrakeDuctRearSetting=1//25% (Min: 0, Max: 3)

[SUSPENSION]
//FrontWheelTrackSetting=0//Non-adjustable (Fixed)
//RearWheelTrackSetting=0//Non-adjustable (Fixed)
FrontAntiSwaySetting=9//D25 H-H (Min: 0, Max: 20)
RearAntiSwaySetting=1//D7.5 S-S (Min: 0, Max: 20)
FrontToeInSetting=13//-0.18 deg (Min: 0, Max: 30)
//FrontToeOffsetSetting=0//N/A (Fixed)
RearToeInSetting=22//0.35 deg (Min: 0, Max: 30)
//RearToeOffsetSetting=0//N/A (Fixed)
//LeftCasterSetting=0//Non-adjustable (Fixed)
//RightCasterSetting=0//Non-adjustable (Fixed)
//LeftTrackBarSetting=0//N/A (Fixed)
//RightTrackBarSetting=0//N/A (Fixed)
Front3rdPackerSetting=6//0.6 cm (Min: 0, Max: 20)
Front3rdSpringSetting=0//N/A (Fixed)
//Front3rdTenderSpringSetting=0//Detached (Fixed)
//Front3rdTenderTravelSetting=0//Detached (Fixed)
//Front3rdSlowBumpSetting=0//1 (Min: 0, Max: 10)
//Front3rdFastBumpSetting=0//1 (Min: 0, Max: 10)
//Front3rdSlowReboundSetting=0//1 (Min: 0, Max: 10)
//Front3rdFastReboundSetting=0//1 (Min: 0, Max: 10)
Rear3rdPackerSetting=7//0.7 cm (Min: 0, Max: 20)
//Rear3rdSpringSetting=0//N/A (Fixed)
//Rear3rdTenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SlowBumpSetting=0//1 (Min: 0, Max: 10)
//FastBumpSetting=0//1 (Min: 0, Max: 10)
//SlowReboundSetting=0//1 (Min: 0, Max: 10)
//FastReboundSetting=0//1 (Min: 0, Max: 10)
//ChassisAdj00Setting=0//N/A (Fixed)

[CONTROLS]
//SteerLockSetting=3//336 (13) deg (Fixed)
RearBrakeSetting=13//54.1:45.9 (Min: 0, Max: 40)
//BrakeMigrationSetting=0// 0.0 (Fixed)
BrakePressureSetting=60//100 kgf (83%) (Min: 0, Max: 100)
//HandfrontbrakePressSetting=0//0% (Fixed)
//HandbrakePressSetting=0//N/A (Fixed)
//TCSetting=0//Available (Fixed)
//ABSSetting=0//N/A (Fixed)
TractionControlMapSetting=7//7 (Min: 0, Max: 10)
TCPowerCutMapSetting=4//4 (Min: 0, Max: 10)
TCSlipAngleMapSetting=7//Linked (Min: 0, Max: 10)
//AntilockBrakeSystemMapSetting=0//N/A (Fixed)

[ENGINE]
//RevLimitSetting=0//8000 (Non-adjustable) (Fixed)
//EngineBoostSetting=0//N/A (Fixed)
//RegenerationMapSetting=0//0% (N/A for Non-Hybrid) (Fixed)
ElectricMotorMapSetting=0//Not Applicable (N/A for Non-Hybrid) (Fixed)
EngineMixtureSetting=1//Race (Min: 0, Max: 1)
//EngineBrakingMapSetting=0//N/A (Fixed)

[DRIVELINE]
FinalDriveSetting=3//2.88:1 (AI adjusts for track type: 0=Standard/Short, higher values=Long) (Min: 0, Max: 5. Higher index = longer gear for higher top speed)
ReverseSetting=0//2.85 (8.18) (Fixed)
Gear1Setting=5//2.85 (~90 km/h) (Min: 0, Max: 20)
Gear2Setting=5//2.20 (~115 km/h) (Min: 0, Max: 20)
Gear3Setting=5//1.88 (~135 km/h) (Min: 0, Max: 20)
Gear4Setting=5//1.62 (~155 km/h) (Min: 0, Max: 20)
Gear5Setting=5//1.42 (~175 km/h) (Min: 0, Max: 20)
Gear6Setting=5//1.27 (~195 km/h) (Min: 0, Max: 20)
RatioSetSetting=1//High Speed (AI adjusts for track type: 0=Standard, 1=High Speed) (Min: 0, Max: 1 or higher based on car)
//DiffPumpSetting=0//N/A (Fixed)
DiffPowerSetting=0//FF6-60 deg (Min: 0, Max: 15)
DiffCoastSetting=2//FF6-45 deg (Min: 0, Max: 20)
DiffPreloadSetting=17//85 Nm (Min: 0, Max: 100)
//FrontDiffPumpSetting=0//0% (N/A for RWD) (Fixed)
//FrontDiffPowerSetting=0//0% (N/A for RWD) (Fixed)
//FrontDiffCoastSetting=0//0% (N/A for RWD) (Fixed)
//FrontDiffPreloadSetting=0//1 (N/A for RWD) (Fixed)
//RearSplitSetting=0// 0.0:100.0 (Fixed to RWD)
//GearAutoUpShiftSetting=0//Off (Manual Shifting) (Fixed)
//GearAutoDownShiftSetting=0//Off (Manual Shifting) (Fixed)

[FRONTLEFT]
CamberSetting=11//-1.5 deg (Min: 0, Max: 40)
PressureSetting=5//140 kPa (Min: 0, Max: 10)
PackerSetting=3//0.3 cm (Min: 0, Max: 20)
SpringSetting=5//150N/mm (Min: 0, Max: 20)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=10//4.5 cm (Min: 0, Max: 30)
SlowBumpSetting=4//5 (Min: 0, Max: 10)
FastBumpSetting=1//2 (Min: 0, Max: 10)
SlowReboundSetting=2//3 (Min: 0, Max: 10)
FastReboundSetting=1//2 (Min: 0, Max: 10)
//BrakeDiscSetting=0//3.20 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0//Medium (Min: 0, Max: 2)

[FRONTRIGHT]
CamberSetting=11//-1.5 deg (Min: 0, Max: 40)
PressureSetting=5//140 kPa (Min: 0, Max: 10)
PackerSetting=3//0.3 cm (Min: 0, Max: 20)
SpringSetting=5//150N/mm (Min: 0, Max: 20)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=10//4.5 cm (Min: 0, Max: 30)
SlowBumpSetting=4//5 (Min: 0, Max: 10)
FastBumpSetting=1//2 (Min: 0, Max: 10)
SlowReboundSetting=2//3 (Min: 0, Max: 10)
FastReboundSetting=1//2 (Min: 0, Max: 10)
//BrakeDiscSetting=0//3.20 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0//Medium (Min: 0, Max: 2)

[REARLEFT]
CamberSetting=5//-1.0 deg (Min: 0, Max: 40)
PressureSetting=5//140 kPa (Min: 0, Max: 10)
PackerSetting=1//0.1 cm (Min: 0, Max: 20)
SpringSetting=0//1100lbf/in (Min: 0, Max: 20)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=24//7.0 cm (Min: 0, Max: 30)
SlowBumpSetting=0//1 (soft) (Min: 0, Max: 10)
FastBumpSetting=0//1 (soft) (Min: 0, Max: 10)
SlowReboundSetting=1//2 (Min: 0, Max: 10)
FastReboundSetting=0//1 (soft) (Min: 0, Max: 10)
//BrakeDiscSetting=0//3.20 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0//Medium (Min: 0, Max: 2)

[REARRIGHT]
CamberSetting=5//-1.0 deg (Min: 0, Max: 40)
PressureSetting=5//140 kPa (Min: 0, Max: 10)
PackerSetting=1//0.1 cm (Min: 0, Max: 20)
SpringSetting=0//1100lbf/in (Min: 0, Max: 20)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=24//7.0 cm (Min: 0, Max: 30)
SlowBumpSetting=0//1 (soft) (Min: 0, Max: 10)
FastBumpSetting=0//1 (soft) (Min: 0, Max: 10)
SlowReboundSetting=1//2 (Min: 0, Max: 10)
FastReboundSetting=0//1 (soft) (Min: 0, Max: 10)
//BrakeDiscSetting=0//4.00 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0//Medium (Min: 0, Max: 2)

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
//CGHeightSetting=0//Non-adjustable (Fixed)
//CGRightSetting=0//Non-adjustable (Fixed)
//CGRearSetting=0//Non-adjustable (Fixed)
//WedgeSetting=0//N/A (Fixed)
FuelSetting=92//0.93 (AI adjusts)
//FuelCapacitySetting=0//93.0l (22.5 laps) (Fixed)
//VirtualEnergySetting=100//100% (22.0 laps) (Fixed)
//NumPitstopsSetting=0//N/A (AI calculates)
//Pitstop1Setting=59//N/A (Fixed)
//Pitstop2Setting=59//N/A (Fixed)
//Pitstop3Setting=59//N/A (Fixed)

[LEFTFENDER]
//FenderFlareSetting=0//N/A (Fixed)

[RIGHTFENDER]
//FenderFlareSetting=0//N/A (Fixed)

[FRONTWING]
//FWSetting=0//Standard (Fixed)

[REARWING]
RWSetting=2//8.3 deg (Min: 0, Max: 5)

[BODYAERO]
//WaterRadiatorSetting=0//No tape (Fixed)
//OilRadiatorSetting=0//No tape (Fixed)
BrakeDuctSetting=3//60mm (Min: 0, Max: 3)
BrakeDuctRearSetting=2//40mm (Min: 0, Max: 2)

[SUSPENSION]
//FrontWheelTrackSetting=0//Non-adjustable (Fixed)
//RearWheelTrackSetting=0//Non-adjustable (Fixed)
FrontAntiSwaySetting=7//P7 (dur) (Min: 0, Max: 10)
RearAntiSwaySetting=4//P4 (Min: 0, Max: 10)
FrontToeInSetting=7//-0.117 deg (Min: 0, Max: 30)
//FrontToeOffsetSetting=0//N/A (Fixed)
RearToeInSetting=8//0 deg (Min: 0, Max: 30)
//RearToeOffsetSetting=0//N/A (Fixed)
//LeftCasterSetting=0//Non-adjustable (Fixed)
//RightCasterSetting=0//Non-adjustable (Fixed)
//LeftTrackBarSetting=0//N/A (Fixed)
//RightTrackBarSetting=0//N/A (Fixed)
//Front3rdPackerSetting=0//N/A (Fixed)
//Front3rdSpringSetting=0//N/A (Fixed)
//Front3rdTenderSpringSetting=0//Détaché (Fixed)
//Front3rdTenderTravelSetting=0//Détaché (Fixed)
//Front3rdSlowBumpSetting=0//N/A (Fixed)
//Front3rdFastBumpSetting=0//N/A (Fixed)
//Front3rdSlowReboundSetting=0//N/A (Fixed)
//Front3rdFastReboundSetting=0//N/A (Fixed)
//Rear3rdPackerSetting=0//N/A (Fixed)
//Rear3rdSpringSetting=0//N/A (Fixed)
//Rear3rdTenderSpringSetting=0//Détaché (Fixed)
//Rear3rdTenderTravelSetting=0//Détaché (Fixed)
//Rear3rdSlowBumpSetting=0//N/A (Fixed)
//Rear3rdFastBumpSetting=0//N/A (Fixed)
//Rear3rdSlowReboundSetting=0//N/A (Fixed)
//Rear3rdFastReboundSetting=0//N/A (Fixed)

[CONTROLS]
SteerLockSetting=4//380° (11.2°) (Min: 0, Max: 15)
RearBrakeSetting=21//51.8:48.2 (Min: 0, Max: 40)
//BrakeMigrationSetting=0// 0.0 (Fixed)
//BrakePressureSetting=80//120 kgf (100%) (Fixed)
//HandfrontbrakePressSetting=0//N/A (Fixed)
//HandbrakePressSetting=0//N/A (Fixed)
//TCSetting=0//Disponible (Fixed)
//ABSSetting=0//Disponible (Fixed)
//TractionControlMapSetting=8//8 (Fixed)
TCPowerCutMapSetting=3//3 (Min: 0, Max: 10)
//TCSlipAngleMapSetting=10//10 (Fixed)
AntilockBrakeSystemMapSetting=11//11 (Min: 0, Max: 15)

[ENGINE]
//RevLimitSetting=0//9,400 (Non-adjustable) (Fixed)
//EngineBoostSetting=0//N/A (Fixed)
//RegenerationMapSetting=0//0% (N/A for Non-Hybrid) (Fixed)
ElectricMotorMapSetting=0//Not Applicable (N/A for Non-Hybrid) (Fixed)
//EngineMixtureSetting=1//Race (Fixed)
//EngineBrakingMapSetting=0//N/A (Fixed)

[DRIVELINE]
FinalDriveSetting=0//Fixed (AI adjusts for track type) (Min: 0, Max: depends on car, often fixed for GT3)
//ReverseSetting=0//Fixed
Gear1Setting=8//Fixed (~95 km/h) (Min: 0, Max: 20)
Gear2Setting=8//Fixed (~130 km/h) (Min: 0, Max: 20)
Gear3Setting=8//Fixed (~160 km/h) (Min: 0, Max: 20)
Gear4Setting=8//Fixed (~190 km/h) (Min: 0, Max: 20)
Gear5Setting=8//Fixed (~220 km/h) (Min: 0, Max: 20)
Gear6Setting=8//Fixed (~250 km/h) (Min: 0, Max: 20)
RatioSetSetting=0//Short (AI adjusts for track type) (Min: 0, Max: 1 or higher based on car)
//DiffPumpSetting=0//Non-adjustable (Fixed)
//DiffCoastSetting=0//Non-adjustable (Fixed)
DiffPreloadSetting=28//78 Nm (Min: 0, Max: 100)
//FrontDiffPumpSetting=0//0% (N/A for RWD) (Fixed)
//FrontDiffPowerSetting=0//0% (N/A for RWD) (Fixed)
//FrontDiffCoastSetting=0//0% (N/A for RWD) (Fixed)
//FrontDiffPreloadSetting=0//1 (N/A for RWD) (Fixed)
//RearSplitSetting=0//RWD (Fixed)
//GearAutoUpShiftSetting=0//Non (Manual Shifting) (Fixed)
//GearAutoDownShiftSetting=0//Non (Manual Shifting) (Fixed)

[FRONTLEFT]
CamberSetting=26//-1.80 deg (Min: 0, Max: 40)
PressureSetting=5//140 kPa (Min: 0, Max: 10)
PackerSetting=9//0.9 cm (Min: 0, Max: 20)
SpringSetting=3//4 (Min: 0, Max: 20)
//TenderSpringSetting=0//Standard (Fixed)
//TenderTravelSetting=0//Standard (Fixed)
//SpringRubberSetting=0//N/A (Fixed)
//RideHeightSetting=0//5.0 cm (Min: 0, Max: 30)
SlowBumpSetting=11//7 (Min: 0, Max: 10)
FastBumpSetting=2//16 (Min: 0, Max: 10)
SlowReboundSetting=6//12 (Min: 0, Max: 10)
FastReboundSetting=4//14 (Min: 0, Max: 10)
//BrakeDiscSetting=0//3.56 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
//CompoundSetting=0//Medium (Min: 0, Max: 2)

[FRONTRIGHT]
CamberSetting=26//-1.80 deg (Min: 0, Max: 40)
PressureSetting=5//140 kPa (Min: 0, Max: 10)
PackerSetting=9//0.9 cm (Min: 0, Max: 20)
SpringSetting=3//4 (Min: 0, Max: 20)
//TenderSpringSetting=0//Standard (Fixed)
//TenderTravelSetting=0//Standard (Fixed)
//SpringRubberSetting=0//N/A (Fixed)
//RideHeightSetting=0//5.0 cm (Min: 0, Max: 30)
SlowBumpSetting=11//7 (Min: 0, Max: 10)
FastBumpSetting=2//16 (Min: 0, Max: 10)
SlowReboundSetting=6//12 (Min: 0, Max: 10)
FastReboundSetting=4//14 (Min: 0, Max: 10)
//BrakeDiscSetting=0//3.56 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
//CompoundSetting=0//Medium (Min: 0, Max: 2)

[REARLEFT]
CamberSetting=30//-1.40 deg (Min: 0, Max: 40)
//PressureSetting=0//140 kPa (Min: 0, Max: 10)
PackerSetting=14//1.4 cm (Min: 0, Max: 20)
SpringSetting=1//2 (Min: 0, Max: 20)
//TenderSpringSetting=0//Standard (Fixed)
//TenderTravelSetting=0//Standard (Fixed)
//SpringRubberSetting=0//N/A (Fixed)
//RideHeightSetting=16//6.6 cm (Min: 0, Max: 30)
SlowBumpSetting=7//11 (Min: 0, Max: 10)
FastBumpSetting=4//14 (Min: 0, Max: 10)
SlowReboundSetting=11//7 (Min: 0, Max: 10)
FastReboundSetting=2//16 (Min: 0, Max: 10)
//BrakeDiscSetting=0//3.20 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
//CompoundSetting=0//Medium (Min: 0, Max: 2)

[REARRIGHT]
CamberSetting=30//-1.40 deg (Min: 0, Max: 40)
//PressureSetting=0//140 kPa (Min: 0, Max: 10)
PackerSetting=14//1.4 cm (Min: 0, Max: 20)
SpringSetting=1//2 (Min: 0, Max: 20)
//TenderSpringSetting=0//Standard (Fixed)
//TenderTravelSetting=0//Standard (Fixed)
//SpringRubberSetting=0//N/A (Fixed)
//RideHeightSetting=16//6.6 cm (Min: 0, Max: 30)
SlowBumpSetting=7//11 (Min: 0, Max: 10)
FastBumpSetting=4//14 (Min: 0, Max: 10)
SlowReboundSetting=11//7 (Min: 0, Max: 10)
FastReboundSetting=2//16 (Min: 0, Max: 10)
//BrakeDiscSetting=0//3.20 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
//CompoundSetting=0//Medium (Min: 0, Max: 2)

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
FuelSetting=100//100L (AI adjusts based on duration)
FuelCapacitySetting=0//Max Fuel (AI adjusts based on duration) (Fixed)
NumPitstopsSetting=0//N/A (AI calculates) (Fixed)

[FRONTWING]
FWSetting=0//Standard (Min: 0, Max: 2)

[REARWING]
RWSetting=5//High Downforce (Min: 0, Max: 10)

[SUSPENSION]
FrontAntiSwaySetting=8//Medium (Min: 0, Max: 15)
RearAntiSwaySetting=4//Soft (Min: 0, Max: 15)
FrontToeInSetting=12//-0.10 deg (Min: 0, Max: 20)
RearToeInSetting=18//0.05 deg (Min: 0, Max: 20)
Front3rdPackerSetting=0//N/A (Fixed)
Front3rdSpringSetting=0//N/A (Fixed)
Rear3rdPackerSetting=0//N/A (Fixed)
Rear3rdSpringSetting=0//N/A (Fixed)

[CONTROLS]
SteerLockSetting=15//360 deg (Min: 0, Max: 20)
RearBrakeSetting=15//55:45 (Min: 0, Max: 30)
BrakePressureSetting=95//95% (Min: 0, Max: 100)
TCSetting=0//Available (Fixed)
TractionControlMapSetting=5//Medium (Min: 0, Max: 10)
TCPowerCutMapSetting=5//Medium (Min: 0, Max: 10)
TCSlipAngleMapSetting=5//Medium (Min: 0, Max: 10)
AntilockBrakeSystemMapSetting=5//Medium (Min: 0, Max: 15)

[ENGINE]
RevLimitSetting=0//Fixed (Non-adjustable) (Fixed)
EngineMixtureSetting=1//Race (Min: 0, Max: 2)
EngineBrakingMapSetting=8//Medium (Min: 0, Max: 10)

[DRIVELINE]
FinalDriveSetting=5//Long (AI adjusts for track type, Min: 0, Max: 10. Higher index = longer gear for higher top speed)
Gear1Setting=10//~80 km/h (Min: 0, Max: 20)
Gear2Setting=10//~120 km/h (Min: 0, Max: 20)
Gear3Setting=10//~150 km/h (Min: 0, Max: 20)
Gear4Setting=10//~180 km/h (Min: 0, Max: 20)
Gear5Setting=10//~210 km/h (Min: 0, Max: 20)
Gear6Setting=10//~240 km/h (Min: 0, Max: 20)
RatioSetSetting=1//High Speed (Min: 0, Max: 1 or higher based on car)
DiffPowerSetting=8//Medium (Min: 0, Max: 15)
DiffCoastSetting=10//Medium (Min: 0, Max: 20)
DiffPreloadSetting=25//Medium (Min: 0, Max: 100)
FrontDiffPumpSetting=0//N/A (N/A for RWD) (Fixed)
FrontDiffPowerSetting=0//N/A (N/A for RWD) (Fixed)
FrontDiffCoastSetting=0//N/A (N/A for RWD) (Fixed)
FrontDiffPreloadSetting=0//N/A (N/A for RWD) (Fixed)
RearSplitSetting=0//RWD (Fixed)
GearAutoUpShiftSetting=0//Off (Manual Shifting) (Fixed)
GearAutoDownShiftSetting=0//Off (Manual Shifting) (Fixed)`
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
## --- PRIME DIRECTIVE ---
## Your sole mission is to act as a virtual LMU race engineer and generate a complete, physically realistic, and numerically valid .VEH setup file. You must replace every placeholder value with a calculated, logical number based on a strict engineering hierarchy. Returning a file with '0' for gears or other critical settings where a non-zero, adjustable value is applicable is a failure.

## --- PERSONA & PHILOSOPHY ---
## You are a world-class Le Mans Ultimate (LMU) race engineer. Your primary philosophy is that a comfortable, confident driver is a fast driver. Your #1 goal is to generate a setup that is predictable, physically realistic, and perfectly suited to the driver's requested style and feedback. You must explain your decisions in the "Notes" section.

## **CRITICAL INSTRUCTION: You MUST populate the '[GENERAL] Notes' section with your engineering debrief, using the exact format specified in 'THE ENGINEER'S DEBRIEF DIRECTIVE'. This is not optional.**

## --- THOUGHT PROCESS & HIERARCHY OF TUNING PRIORITIES (You MUST follow this order) ---
## 1.  **Session Type (Qualifying vs. Race):** This is the first and most fundamental decision. Is it a 'race' or 'qualifying' session? This choice dictates the entire setup philosophy (e.g., tire preservation vs. peak performance) and must be referenced in my notes.
## 2.  **Driver Feedback is KING:** Is there a specific handling complaint in 'Driver Problem to Solve'? If yes, fixing this is my next highest priority. I will consult the 'DRIVER FEEDBACK TROUBLESHOOTING MATRIX' and apply the Primary and Secondary solutions. All other decisions must work around this fix.
## 3.  **Track DNA & Weather:** What are the physical demands of the specific track according to the 'TRACK DNA DATABASE' and the weather? I will consult the 'ADVANCED WEATHER & TIRE STRATEGY' and 'SETUP SANITY CHECKS' sections to make baseline decisions. I must mention the track-specific compromise in my notes (e.g., "Le Mans requires a low wing/long gear compromise for the straights.").
## 4.  **Car Architecture:** What is the car's inherent nature according to the 'CAR ARCHITECTURE PHILOSOPHY'? I will apply gentle adjustments to either tame a car's negative traits or enhance its strengths.
## 5.  **Overall Setup Goal:** Finally, I will use the 'Setup Goal' (Safe, Balanced, Aggressive) to fine-tune the settings within the context of the decisions I've already made.
## 6.  **Engineer's Debrief:** After generating all values, I will write a concise summary in the '[GENERAL] Notes' section explaining my choices, as per 'THE ENGINEER'S DEBRIEF DIRECTIVE'.

## =====================================================================================
## --- LMU PHYSICS & TUNING REFERENCE ---
## =====================================================================================
## This section provides key physics principles and their impact on vehicle behavior. Use this knowledge to make informed decisions for each setting.
##
## **Aero:**
## - **Front Wing/Rear Wing (Downforce):** Increases grip at speed by pushing tires into the ground. More downforce means higher cornering speeds but lower top speed due to drag. Balance between front and rear wings dictates aero balance (understeer/oversteer at speed).
## - **Brake Ducts:** Controls brake temperature. More open ducts cool brakes better but increase aerodynamic drag. Closed ducts improve aero but risk overheating brakes.

## **Suspension:**
## - **Springs (Packer/SpringSetting):** Primary control over ride height and overall stiffness. Stiffer springs reduce body roll and dive/squat, improving responsiveness but can make the car nervous over bumps. Softer springs improve mechanical grip and ride quality over bumps but increase body motion.
## - **Dampers (Slow Bump/Fast Bump, Slow Rebound/Fast Rebound):** Control the rate of suspension movement.
##    - **Bump:** Controls wheel movement *into* the chassis. "Slow" affects weight transfer (e.g., braking, acceleration, cornering entry). "Fast" affects reaction to bumps and curbs.
##    - **Rebound:** Controls wheel movement *out of* the chassis. "Slow" affects weight transfer release. "Fast" affects how quickly the wheel returns to the road after hitting a bump.
##    - **Stiffer Bump:** More resistance to compression, can make car "jumpy" over bumps.
##    - **Softer Bump:** More compression, better bump absorption.
##    - **Stiffer Rebound:** Holds wheel down longer after compression, can "pack down" over consecutive bumps.
##    - **Softer Rebound:** Allows wheel to extend quickly, maintaining tire contact over undulations.
## - **Anti-Roll Bars (AntiSwaySetting):** Controls body roll and affects load transfer across the axle. Stiffer anti-roll bar on an axle transfers more load to the outside tire, increasing grip on that axle at the expense of grip on the other axle (e.g., stiffer front increases understeer, stiffer rear increases oversteer).
## - **Camber Setting:** The vertical angle of the tire. Negative camber ($<0$) allows the tire to sit flatter when the suspension compresses and the car rolls, maximizing tire contact patch during cornering. Too much negative camber reduces straight-line grip and braking performance.
## - **Toe In/Out (ToeInSetting):** The horizontal angle of the tires.
##    - **Toe-in ($>0$):** Tires point inwards. Increases straight-line stability, reduces turn-in sharpness.
##    - **Toe-out ($<0$):** Tires point outwards. Increases turn-in sharpness, reduces straight-line stability.
## - **Ride Height:** Distance between the chassis and the ground. Lower ride height reduces drag and lowers the center of gravity, improving stability and aero performance. Too low can cause bottoming out on bumps/kerbs. Rake (front vs. rear ride height) impacts aero balance.
## - **Packers:** Limit suspension travel. Prevents bottoming out on stiff setups or very bumpy tracks.

## **Drivetrain:**
## - **Final Drive Setting:** The overall gearing ratio. A *higher index* (longer final drive) results in higher top speeds but slower acceleration. A *lower index* (shorter final drive) results in quicker acceleration but lower top speeds.
## - **Individual Gear Settings:** Fine-tunes the ratio for each specific gear. Longer gears provide higher speed per gear, shorter gears provide faster acceleration. Must be chosen logically relative to the Final Drive and track type.
## - **Differential (DiffPower, DiffCoast, DiffPreload):** Controls how power is distributed between the drive wheels.
##    - **Diff Power (on-throttle):** Higher locking provides more traction on acceleration but can induce understeer on exit. Lower allows more rotation.
##    - **Diff Coast (off-throttle):** Higher locking provides more stability on lift-off/braking but can cause snap oversteer. Lower allows more rotation on entry.
##    - **Diff Preload:** Constant locking effect. Higher preload provides more stability and traction at very low speeds, but can cause understeer.

## **Brakes:**
## - **Brake Pressure (BrakePressureSetting):** Controls overall braking force. Higher pressure means more stopping power but higher risk of wheel lockup.
## - **Brake Bias (RearBrakeSetting):** Distributes braking force between front and rear axles. More front bias increases stability under braking but can lead to front lockup. More rear bias increases rotation but risks rear lockup and instability.
## - **Brake Migration (BrakeMigrationSetting):** Changes brake bias with brake pressure. Allows fine-tuning of bias during braking.

## =====================================================================================
## --- LMU TUNING GUIDELINES & RANGES (Practical Values) ---
## =====================================================================================
## Use these typical in-game numerical ranges and common practices for your adjustments. Always prioritize realistic values.
##
## **Tires:**
## - **PressureSetting:** (Min: 0 / ~130 kPa, Max: 10 / ~170 kPa). Adjust based on track temp, session, and desired grip/wear. Higher pressure reduces rolling resistance but can reduce contact patch. Wet: Increase slightly.
## - **CompoundSetting:** (Min: 0 / Soft/Wet, Max: 2 / Hard). 0 for Soft/Wet, 1 for Medium, 2 for Hard.
##
## **Aero:**
## - **FrontWing/RearWing (FWSetting/RWSetting):** Indices (0=low, higher=more downforce). Max values are car-specific.
##    - Hypercar FW: (Min: 0, Max: 2). Hypercar RW: (Min: 0, Max: 7).
##    - LMP2 RW: (Min: 0, Max: 8).
##    - GT3 RW: (Min: 0, Max: 5).
##    - GTE RW: (Min: 0, Max: 10).
##    - General Rule: High-speed tracks = lower indices. Technical tracks = higher indices.
## - **BrakeDucts:** Indices (0=open/max cooling, higher=more closed/less cooling/more aero). Max values are car-specific (e.g., Max: 3 for Hypercar, 2 for GT3).
##
## **Suspension:**
## - **RideHeightSetting:** (Min: 0 / ~4.0 cm, Max: 30 / ~8.0 cm). Lower for aero, higher for bumps. Rake (rear height > front height) is common.
## - **SpringSetting:** (Min: 0, Max: 20). Higher index = stiffer spring. Adjust according to track bumps and aero requirements.
## - **AntiSwaySetting (ARB):** (Min: 0, Max: 20). Higher index = stiffer ARB.
## - **CamberSetting:** (Min: 0 / ~-0.5 deg, Max: 40 / ~-4.0 deg). Most racing cars use negative camber. Front typically more negative than rear.
## - **ToeInSetting/RearToeInSetting:** (Min: 0 / ~-0.2 deg, Max: 30 / ~+0.2 deg). Slight toe-out on front for turn-in, slight toe-in on rear for stability.
## - **Damper Settings (Slow/Fast Bump/Rebound):** (Min: 0, Max: 10). Relative adjustments are key.
##    - Soft = lower index (0-3). Medium = mid-index (4-7). Stiff = higher index (8-10).
##    - Bumpy tracks need softer Fast Bump/Rebound. High-speed stability needs balanced/stiffer Slow Bump/Rebound.
##
## **Drivetrain:**
## - **FinalDriveSetting:** (Min: 0, Max: typically 5-10 depending on car. Higher index = longer gear for higher top speed).
## - **Gear1Setting-Gear7Setting:** (Min: 0, Max: 20). Each represents an index for a preset ratio. Higher index generally means a shorter gear (more acceleration), lower index a longer gear (higher top speed). **You MUST select a non-zero index for each gear unless the template explicitly shows it as fixed or non-adjustable for that car.**
## - **DiffPowerSetting:** (Min: 0, Max: 15).
## - **DiffCoastSetting:** (Min: 0, Max: 20).
## - **DiffPreloadSetting:** (Min: 0, Max: 100).
## - **RatioSetSetting:** (Min: 0, Max: 1 or higher). 0=Standard, 1=High Speed.
##
## **Brakes:**
## - **RearBrakeSetting (Bias):** (Min: 0, Max: 40). Lower value = more front bias. Higher value = more rear bias.
## - **BrakePressureSetting:** (Min: 0, Max: 100). Max pressure for qualifying.
## - **AntilockBrakeSystemMapSetting (ABS):** (Min: 0, Max: 15). Higher value = more ABS intervention.
## - **TractionControlMapSetting (TC):** (Min: 0, Max: 10). Higher value = more TC intervention.
##
## =====================================================================================
## --- TRACK DNA DATABASE (Key characteristics for setup decisions) ---
## =====================================================================================
## - **Circuit de la Sarthe (Le Mans):** High-speed. Focus: LOWEST possible drag (low wings, **long gears**). Compromise: Must have enough stability for Porsche Curves. Bumps on straights require good high-speed damping.
## - **Sebring International Raceway:** Extremely bumpy. Focus: SOFT suspension, especially fast dampers, and higher ride height to absorb bumps. Compromise: Softness can hurt responsiveness in slow corners.
## - **Spa-Francorchamps:** High-speed with significant elevation change (Eau Rouge/Raidillon). Focus: High-speed stability with good aero balance. Requires stiff springs for compression in Eau Rouge.
## - **Autodromo Nazionale Monza:** Very high-speed. Focus: LOWEST drag, even more than Le Mans. **Long gears** are essential. Compromise: Must be stable on the brakes for heavy braking zones into chicanes.
## - **Fuji Speedway:** Long main straight but a very tight, technical final sector. Focus: A major compromise between top speed and low-speed agility. Can't sacrifice too much downforce.
## - **Autódromo Internacional do Algarve (Portimão):** "Rollercoaster" with lots of elevation and blind crests. Focus: A predictable, stable platform is crucial. Medium downforce and compliant suspension.
## - **Bahrain International Circuit:** High grip, smooth surface, often hot. Focus: Good braking stability and traction out of slow corners. Tire wear can be high.

## =====================================================================================
## --- QUALIFYING VS. RACE PHILOSOPHY ---
## =====================================================================================
## - **If Session Goal is 'qualifying':** The only goal is one-lap pace. Use softest tires, minimal fuel (2-3 laps worth), more aggressive camber, higher brake pressure (near 100%) to ride the limit of lockup, and more aggressive differential settings for maximum rotation. Tire wear is irrelevant. Tire pressures might be slightly higher for peak grip for a short duration.
## - **If Session Goal is 'race':** The goal is consistency and stability over a stint. Use more durable tires, a full fuel tank (calculated fuel), less aggressive camber to protect tire life, and more stable suspension and differential settings. The car must be easy to drive for a long time. Tire pressures should be optimized for consistency over a stint (often slightly lower than quali).

## =====================================================================================
## --- CAR ARCHITECTURE PHILOSOPHY ---
## =====================================================================================
## - **Mid-Engine (All Prototypes, Ferrari, Vanwall, Peugeot):** Most balanced layout. Often flexible with setups.
## - **Rear-Engine (Porsche 911 RSR / GT3 R):** Natively has excellent traction but can be prone to entry understeer due to weight distribution. Benefit from more aggressive front-end (e.g., softer front ARB, more negative front camber) to help turn-in.
## - **Front-Engine (Corvette, Aston Martin):** Natively stable under braking but can be prone to understeer on entry. Often benefit from more rear-end rotation (e.g., stiffer rear ARB, more aggressive diff settings) to overcome understeer.

## =====================================================================================
## --- DRIVER FEEDBACK TROUBLESHOOTING MATRIX (High Priority) ---
## =====================================================================================
## IF "Understeer on corner entry": 1st: Reduce 'DiffCoastSetting' (less diff lock off-throttle). 2nd: Soften 'FrontAntiSwaySetting'. 3rd: Increase 'FrontToeInSetting' (more toe-out effect).
## IF "Understeer mid-corner or on exit": 1st: Stiffen 'RearAntiSwaySetting'. 2nd: Reduce 'DiffPowerSetting' (less diff lock on-throttle). 3rd: Increase 'FrontCamberSetting' (more negative front camber).
## IF "Oversteer on corner entry" or "nervous": 1st: Increase 'DiffCoastSetting' (more diff lock off-throttle). 2nd: Stiffen 'FrontAntiSwaySetting'. 3rd: Decrease 'RearToeInSetting' (less toe-in).
## IF "Oversteer on exit" or "Poor traction": 1st: Soften 'RearAntiSwaySetting'. 2nd: Increase 'DiffPowerSetting' (more diff lock on-throttle). 3rd: Decrease 'RearCamberSetting' (less negative rear camber).
## IF "Unstable under braking": 1st: Decrease 'RearBrakeSetting' (move bias forward). 2nd: Increase 'EngineBrakingMapSetting'. 3rd: Increase 'DiffCoastSetting'.

## =====================================================================================
## --- ADVANCED WEATHER & TIRE STRATEGY ---
## =====================================================================================
## - IF Weather is 'Rain' or 'Wet': Use Wet tires (CompoundSetting=0), INCREASE PressureSetting (+3-5 clicks from dry base), INCREASE RideHeightSetting (+10-15 clicks) for water clearance, SOFTER Springs/Dampers for compliance, HIGHER TC/ABS settings for control. Set BrakeDucts to more open for cooling.
## - IF Track Temp is high (e.g., >30C): Consider slightly lower tire pressures or harder compounds to manage overheating. Consider opening brake ducts slightly.
## - IF Track Temp is low (e.g., <15C): Consider slightly higher tire pressures or softer compounds to build temperature. Consider closing brake ducts slightly.

## =====================================================================================
## --- SETUP SANITY CHECKS (Core Physics Rules & LMU Specifics) ---
## =====================================================================================
## 1. Low RideHeight REQUIRES Stiff Springs (to prevent bottoming out).
## 2. High Aero (RWSetting) REQUIRES Stiff Springs (to support downforce).
## 3. Bumpy Tracks (Sebring, Portimão) REQUIRE Softer Fast Damping (for bump absorption).
## 4. DO NOT use short gears (lower FinalDriveSetting index, higher GearXSetting indices) at high-speed tracks (Le Mans/Monza). Conversely, DO NOT use overly long gears at technical tracks.
## 5. **Physics Check:** Ensure toe and camber settings are physically realistic for a racing car (e.g., negative camber for cornering grip, slight toe-out on front for sharper turn-in, slight toe-in on rear for stability).
## 6. **Physics Check:** Ensure damper settings (bump/rebound) logically complement spring stiffness and track type. Softer springs often pair with softer damping, stiffer with stiffer.
## 7. **Balance Consistency:** Aero balance, mechanical balance (springs/ARBs), and differential settings should ideally work in harmony towards the overall setup goal and driver feedback.
## 8. **FinalDrive & Gears Cohesion:** Ensure the chosen FinalDriveSetting (index) and all individual GearXSetting indices form a logical progression and provide appropriate top speeds for the track. A higher FinalDrive index should correspond to overall higher top speeds for each gear, and vice-versa.

## =====================================================================================
## --- THE ENGINEER'S DEBRIEF DIRECTIVE (Mandatory for Notes field) ---
## =====================================================================================
## You MUST populate the \`[GENERAL] Notes=""\` field with a concise, multi-line summary formatted EXACTLY like this (using \\n for new lines):
## "Philosophy: [Explain the core setup philosophy based on driver goal, session, track, and how it leverages car architecture. e.g., 'Aggressive setup for qualifying, focusing on peak performance at high-speed track (Le Mans), maximizing top speed while maintaining stability through high-speed corners.']\\nKey Adjustments: [List the 3-5 most impactful changes made and explain their purpose, *referencing the LMU Physics Reference and Tuning Guidelines* for justification. e.g., 'Lengthened final drive and adjusted individual gears (indices X-Y) for optimal top speed (approx. Z km/h in 6th gear). Stiffened front anti-roll bar (index A) to reduce entry understeer based on driver feedback. Increased negative camber (index B) for better cornering grip.']\\nFine-Tuning Guide: [Suggest 1-2 simple adjustments the driver can make in-game *with specific parameter names*. e.g., 'If oversteer persists, try increasing Rear AntiSwaySetting by 1-2 clicks. Adjust Brake PressureSetting down if locking front wheels on entry.']\\nFuel & Tires: [Provide the calculated fuel for session and recommended tire compound, justifying the compound choice by weather/session. e.g., 'Fuel set to [X]L for a [Y]-minute race. Recommended Medium compound for balanced performance in dry conditions.']"

## =====================================================================================
## --- FINAL REQUEST DETAILS ---
## =====================================================================================
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

This is the required LMU .VEH structure. You must use this exact structure, replacing all placeholder values with valid integers and dynamically calculated comments. Your response must begin IMMEDIATELY with 'VehicleClassSetting=' and contain ONLY the .VEH file content. Do not include any introductory text, explanations, or markdown formatting.
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
                temperature: 0.85, // Increased slightly for more nuanced physics-based decisions and adherence to complex instructions
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
