// --- server.js (Combined and Refined for LMU Setup Generation) ---

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
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY; // Loaded, but not primarily used in this setup

// --- Validation for API Keys ---
if (!OPENROUTER_API_KEY) {
    console.error("ERROR: OPENROUTER_API_KEY not found in your .env file.");
    console.error("Please ensure you have a .env file in the same directory as server.js");
    console.error("And it contains the line: OPENROUTER_API_KEY=YOUR_ACTUAL_OPENROUTER_KEY_HERE");
    process.exit(1);
}

if (!HUGGINGFACE_API_KEY) {
    console.warn("WARN: HUGGINGFACE_API_KEY not found in your .env file.");
    console.warn("The application will continue, but features relying on direct Hugging Face calls will fail.");
}

// 7. Define OpenRouter API endpoint and Model
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const PRIMARY_MODEL = 'NousResearch/Hermes-2-Pro-Llama-3-8B';

// --- Define LMU .VEH Example Templates by Category ---
// IMPORTANT: Every adjustable setting MUST have "(MUST BE OVERWRITTEN)" to force AI calculation.
// Remove example values from adjustable settings, rely on AI to generate.
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
FuelSetting=85// (AI calculates fuel for session) (MUST BE OVERWRITTEN)
FuelCapacitySetting=0//Max Fuel (AI adjusts based on duration) (Fixed)
VirtualEnergySetting=72// (AI adjusts based on session type and hybrid strategy) (MUST BE OVERWRITTEN)
NumPitstopsSetting=0//N/A (AI calculates) (Fixed)
Pitstop1Setting=88//N/A (Fixed)
Pitstop2Setting=88//N/A (Fixed)
Pitstop3Setting=88//N/A (Fixed)

[LEFTFENDER]
FenderFlareSetting=0//N/A (Fixed)

[RIGHTFENDER]
FenderFlareSetting=0//N/A (Fixed)

[FRONTWING]
FWSetting=1// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)
// FWSetting: 0=low, 1=medium, 2=high (AI adjusts based on track type)

[REARWING]
RWSetting=3// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
// RWSetting for Hypercar: 0-10 (P1=low, P10=high)

[BODYAERO]
WaterRadiatorSetting=1// (Min: 0, Max: 4) (MUST BE OVERWRITTEN)
OilRadiatorSetting=1// (Min: 0, Max: 4) (MUST BE OVERWRITTEN)
BrakeDuctSetting=1// (Min: 0, Max: 3) (MUST BE OVERWRITTEN)
BrakeDuctRearSetting=1// (Min: 0, Max: 3) (MUST BE OVERWRITTEN)

[SUSPENSION]
FrontWheelTrackSetting=0//Non-adjustable (Fixed)
RearWheelTrackSetting=0//Non-adjustable (Fixed)
FrontAntiSwaySetting=16// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
RearAntiSwaySetting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
FrontToeInSetting=15// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
FrontToeOffsetSetting=0//N/A (Fixed)
RearToeInSetting=17// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
RearToeOffsetSetting=0//N/A (Fixed)
LeftCasterSetting=0//Non-adjustable (Fixed)
RightCasterSetting=0//Non-adjustable (Fixed)
LeftTrackBarSetting=0//N/A (Fixed)
RightTrackBarSetting=0//N/A (Fixed)
Front3rdPackerSetting=8// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Front3rdSpringSetting=8// (Min: 0, Max: 15) (MUST BE OVERWRITTEN)
Front3rdTenderSpringSetting=0//Detached (Fixed)
Front3rdTenderTravelSetting=0//Detached (Fixed)
Front3rdSlowBumpSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
Front3rdFastBumpSetting=2// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
Front3rdSlowReboundSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
Front3rdFastReboundSetting=2// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
Rear3rdPackerSetting=10// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Rear3rdSpringSetting=7// (Min: 0, Max: 15) (MUST BE OVERWRITTEN)
Rear3rdTenderSpringSetting=0//Detached (Fixed)
Rear3rdTenderTravelSetting=0//Detached (Fixed)
Rear3rdSlowBumpSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
Rear3rdFastBumpSetting=2// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
Rear3rdSlowReboundSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
Rear3rdFastReboundSetting=2// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
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
SteerLockSetting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
RearBrakeSetting=16// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
BrakeMigrationSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
BrakePressureSetting=80// (Min: 0, Max: 100) (MUST BE OVERWRITTEN)
HandfrontbrakePressSetting=0//0% (Fixed)
HandbrakePressSetting=0//N/A (Fixed)
TCSetting=0//Available (Fixed)
ABSSetting=0//N/A (Fixed)
TractionControlMapSetting=9// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
TCPowerCutMapSetting=8// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
TCSlipAngleMapSetting=8// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
AntilockBrakeSystemMapSetting=0//N/A (Fixed)

[ENGINE]
RevLimitSetting=0//8,500 (Non-adjustable) (Fixed)
EngineBoostSetting=0//N/A (Fixed)
RegenerationMapSetting=10// (For Hybrid: Min: 0, Max: 10; AI adjusts for session type) (MUST BE OVERWRITTEN for Hybrid)
ElectricMotorMapSetting=3// (For Hybrid: Min: 0, Max: 4; AI adjusts for hybrid usage) (MUST BE OVERWRITTEN for Hybrid)
EngineMixtureSetting=1// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)
EngineBrakingMapSetting=0//N/A (Fixed)

[DRIVELINE]
FinalDriveSetting=3// (Min: 0, Max: 7) (MUST BE OVERWRITTEN)
ReverseSetting=0//2.07 (6.18) (Fixed)
Gear1Setting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear2Setting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear3Setting=1// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear4Setting=2// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear5Setting=3// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear6Setting=4// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear7Setting=5// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
RatioSetSetting=0// (Min: 0, Max: 1 or higher based on car) (MUST BE OVERWRITTEN)
DiffPumpSetting=0//N/A (Fixed)
DiffPowerSetting=3// (Min: 0, Max: 15) (MUST BE OVERWRITTEN)
DiffCoastSetting=10// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
DiffPreloadSetting=24// (Min: 0, Max: 100) (MUST BE OVERWRITTEN)
FrontDiffPumpSetting=0//N/A (N/A for RWD) (Fixed)
FrontDiffPowerSetting=0//10% (N/A for RWD) (Fixed)
FrontDiffCoastSetting=0//10% (N/A for RWD) (Fixed)
FrontDiffPreloadSetting=0//0 Nm (N/A for RWD) (Fixed)
RearSplitSetting=0// 0.0:100.0 (Fixed to RWD)
GearAutoUpShiftSetting=0//Off (Manual Shifting) (Fixed)
GearAutoDownShiftSetting=0//Off (Manual Shifting) (Fixed)

[FRONTLEFT]
CamberSetting=26// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=5// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
SpringSetting=10// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
TenderSpringSetting=0//Detached (Fixed)
TenderTravelSetting=0//Detached (Fixed)
SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=9// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=6// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
BrakeDiscSetting=0//4.00 cm (Fixed)
BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[FRONTRIGHT]
CamberSetting=26// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=5// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
SpringSetting=10// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
TenderSpringSetting=0//Detached (Fixed)
TenderTravelSetting=0//Detached (Fixed)
SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=9// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=6// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
BrakeDiscSetting=0//4.00 cm (Fixed)
BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[REARLEFT]
CamberSetting=20// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=12// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
SpringSetting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
TenderSpringSetting=0//Detached (Fixed)
TenderTravelSetting=0//Detached (Fixed)
SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=15// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=6// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=6// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
BrakeDiscSetting=0//4.00 cm (Fixed)
BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[REARRIGHT]
CamberSetting=20// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=12// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
SpringSetting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
TenderSpringSetting=0//Detached (Fixed)
TenderTravelSetting=0//Detached (Fixed)
SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=15// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=6// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=6// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
BrakeDiscSetting=0//4.00 cm (Fixed)
BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[BASIC]
Downforce= // AI MUST CALCULATE
Balance= // AI MUST CALCULATE
Ride= // AI MUST CALCULATE
Gearing= // AI MUST CALCULATE
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
FuelSetting=65// (AI calculates fuel for session) (MUST BE OVERWRITTEN)
//FuelCapacitySetting=0//N/A (Fixed)
//NumPitstopsSetting=0//N/A (AI calculates) (Fixed)
//Pitstop1Setting=50//N/A (Fixed)
//Pitstop2Setting=50//N/A (Fixed)
//Pitstop3Setting=50//N/A (Fixed)

[LEFTFENDER]
//FenderFlareSetting=0//N/A (Fixed)

[RIGHTFENDER]
//FenderFlareSetting=0//N/A (Fixed)

[FRONTWING]
//FWSetting=0//N/A (Fixed)

[REARWING]
RWSetting=2// (Min: 0, Max: 9) (MUST BE OVERWRITTEN)
// RWSetting for LMP2: 0-9 (P1=low, P9=high)

[BODYAERO]
WaterRadiatorSetting=2// (Min: 0, Max: 4) (MUST BE OVERWRITTEN)
OilRadiatorSetting=2// (Min: 0, Max: 4) (MUST BE OVERWRITTEN)
//BrakeDuctSetting=0//Open (Fixed)
BrakeDuctRearSetting=1// (Min: 0, Max: 3) (MUST BE OVERWRITTEN)

[SUSPENSION]
//FrontWheelTrackSetting=0//Non-adjustable (Fixed)
//RearWheelTrackSetting=0//Non-adjustable (Fixed)
FrontAntiSwaySetting=9// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
RearAntiSwaySetting=1// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
FrontToeInSetting=13// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
//FrontToeOffsetSetting=0//N/A (Fixed)
RearToeInSetting=22// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
//RearToeOffsetSetting=0//N/A (Fixed)
//LeftCasterSetting=0//Non-adjustable (Fixed)
//RightCasterSetting=0//Non-adjustable (Fixed)
//LeftTrackBarSetting=0//N/A (Fixed)
//RightTrackBarSetting=0//N/A (Fixed)
Front3rdPackerSetting=6// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Front3rdSpringSetting=0//N/A (Fixed)
//Front3rdTenderSpringSetting=0//Detached (Fixed)
//Front3rdTenderTravelSetting=0//Detached (Fixed)
//Front3rdSlowBumpSetting=0//1 (Min: 0, Max: 10)
//Front3rdFastBumpSetting=0//1 (Min: 0, Max: 10)
//Front3rdSlowReboundSetting=0//1 (Min: 0, Max: 10)
//Front3rdFastReboundSetting=0//1 (Min: 0, Max: 10)
Rear3rdPackerSetting=7// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
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
RearBrakeSetting=13// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
//BrakeMigrationSetting=0// 0.0 (Fixed)
BrakePressureSetting=60// (Min: 0, Max: 100) (MUST BE OVERWRITTEN)
//HandfrontbrakePressSetting=0//0% (Fixed)
//HandbrakePressSetting=0//N/A (Fixed)
//TCSetting=0//Available (Fixed)
//ABSSetting=0//N/A (Fixed)
TractionControlMapSetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
TCPowerCutMapSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
TCSlipAngleMapSetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//AntilockBrakeSystemMapSetting=0//N/A (Fixed)

[ENGINE]
//RevLimitSetting=0//8000 (Non-adjustable) (Fixed)
//EngineBoostSetting=0//N/A (Fixed)
RegenerationMapSetting=0//0% (N/A for Non-Hybrid) (Fixed)
ElectricMotorMapSetting=0//Not Applicable (N/A for Non-Hybrid) (Fixed)
EngineMixtureSetting=1// (Min: 0, Max: 1) (MUST BE OVERWRITTEN)
//EngineBrakingMapSetting=0//N/A (Fixed)

[DRIVELINE]
FinalDriveSetting=3// (Min: 0, Max: 5) (MUST BE OVERWRITTEN)
ReverseSetting=0//2.85 (8.18) (Fixed)
Gear1Setting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear2Setting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear3Setting=1// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear4Setting=2// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear5Setting=3// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear6Setting=4// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
RatioSetSetting=1// (Min: 0, Max: 1 or higher based on car) (MUST BE OVERWRITTEN)
//DiffPumpSetting=0//N/A (Fixed)
DiffPowerSetting=0// (Min: 0, Max: 15) (MUST BE OVERWRITTEN)
DiffCoastSetting=2// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
DiffPreloadSetting=17// (Min: 0, Max: 100) (MUST BE OVERWRITTEN)
FrontDiffPumpSetting=0//N/A (N/A for RWD) (Fixed)
FrontDiffPowerSetting=0//0% (N/A for RWD) (Fixed)
FrontDiffCoastSetting=0//0% (N/A for RWD) (Fixed)
FrontDiffPreloadSetting=0//1 (N/A for RWD) (Fixed)
RearSplitSetting=0// 0.0:100.0 (Fixed to RWD)
GearAutoUpShiftSetting=0//Off (Manual Shifting) (Fixed)
GearAutoDownShiftSetting=0//Off (Manual Shifting) (Fixed)

[FRONTLEFT]
CamberSetting=11// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=3// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
SpringSetting=5// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=10// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=1// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=2// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=1// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//BrakeDiscSetting=0//3.20 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[FRONTRIGHT]
CamberSetting=11// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=3// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
SpringSetting=5// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=10// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=1// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=2// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=1// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//BrakeDiscSetting=0//3.20 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[REARLEFT]
CamberSetting=20// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=12// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
SpringSetting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=24// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=1// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//BrakeDiscSetting=0//3.20 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[REARRIGHT]
CamberSetting=20// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=12// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
SpringSetting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=24// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=1// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//BrakeDiscSetting=0//4.00 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[BASIC]
Downforce= // AI MUST CALCULATE
Balance= // AI MUST CALCULATE
Ride= // AI MUST CALCULATE
Gearing= // AI MUST CALCULATE
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
//CGRRightSetting=0//Non-adjustable (Fixed)
//CGRearSetting=0//Non-adjustable (Fixed)
//WedgeSetting=0//N/A (Fixed)
FuelSetting=92// (AI calculates fuel for session) (MUST BE OVERWRITTEN)
//FuelCapacitySetting=0//93.0l (22.5 laps) (Fixed)
//VirtualEnergySetting=100//100% (22.0 laps) (Fixed)
//NumPitstopsSetting=0//N/A (AI calculates) (Fixed)
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
RWSetting=2// (Min: 0, Max: 7) (MUST BE OVERWRITTEN)

[BODYAERO]
//WaterRadiatorSetting=0//No tape (Fixed)
//OilRadiatorSetting=0//No tape (Fixed)
BrakeDuctSetting=3// (Min: 0, Max: 3) (MUST BE OVERWRITTEN)
BrakeDuctRearSetting=2// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[SUSPENSION]
//FrontWheelTrackSetting=0//Non-adjustable (Fixed)
//RearWheelTrackSetting=0//Non-adjustable (Fixed)
FrontAntiSwaySetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
RearAntiSwaySetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FrontToeInSetting=7// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
//FrontToeOffsetSetting=0//N/A (Fixed)
RearToeInSetting=8// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
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
SteerLockSetting=4// (Min: 0, Max: 15) (MUST BE OVERWRITTEN)
RearBrakeSetting=21// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
//BrakeMigrationSetting=0// 0.0 (Fixed)
//BrakePressureSetting=80//120 kgf (100%) (Fixed)
//HandfrontbrakePressSetting=0//N/A (Fixed)
//HandbrakePressSetting=0//N/A (Fixed)
//TCSetting=0//Disponible (Fixed)
//ABSSetting=0//Disponible (Fixed)
//TractionControlMapSetting=8//8 (Fixed)
TCPowerCutMapSetting=3// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//TCSlipAngleMapSetting=10//10 (Fixed)
AntilockBrakeSystemMapSetting=11// (Min: 0, Max: 15) (MUST BE OVERWRITTEN)

[ENGINE]
//RevLimitSetting=0//9,400 (Non-adjustable) (Fixed)
//EngineBoostSetting=0//N/A (Fixed)
RegenerationMapSetting=0//0% (N/A for Non-Hybrid) (Fixed)
ElectricMotorMapSetting=0//Not Applicable (N/A for Non-Hybrid) (Fixed)
//EngineMixtureSetting=1//Race (Fixed)
//EngineBrakingMapSetting=0//N/A (Fixed)

[DRIVELINE]
FinalDriveSetting=0//Fixed (AI adjusts for track type) (Min: 0, Max: depends on car, often fixed for GT3) (MUST BE OVERWRITTEN)
//ReverseSetting=0//Fixed
Gear1Setting=8// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear2Setting=8// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear3Setting=8// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear4Setting=8// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear5Setting=8// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear6Setting=8// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
RatioSetSetting=0// (Min: 0, Max: 1 or higher based on car) (MUST BE OVERWRITTEN)
//DiffPumpSetting=0//Non-adjustable (Fixed)
//DiffCoastSetting=0//Non-adjustable (Fixed)
DiffPreloadSetting=28// (Min: 0, Max: 100) (MUST BE OVERWRITTEN)
//FrontDiffPumpSetting=0//0% (N/A for RWD) (Fixed)
//FrontDiffPowerSetting=0//0% (N/A for RWD) (Fixed)
//FrontDiffCoastSetting=0//0% (N/A for RWD) (Fixed)
//FrontDiffPreloadSetting=0//1 (N/A for RWD) (Fixed)
//RearSplitSetting=0//RWD (Fixed)
//GearAutoUpShiftSetting=0//Non (Manual Shifting) (Fixed)
//GearAutoDownShiftSetting=0//Non (Manual Shifting) (Fixed)

[FRONTLEFT]
CamberSetting=26// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=9// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
SpringSetting=3// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
//TenderSpringSetting=0//Standard (Fixed)
//TenderTravelSetting=0//Standard (Fixed)
//SpringRubberSetting=0//N/A (Fixed)
//RideHeightSetting=0//5.0 cm (Min: 0, Max: 30)
SlowBumpSetting=11// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=2// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=6// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//BrakeDiscSetting=0//3.56 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[FRONTRIGHT]
CamberSetting=26// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=9// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
SpringSetting=3// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
//TenderSpringSetting=0//Standard (Fixed)
//TenderTravelSetting=0//Standard (Fixed)
//SpringRubberSetting=0//N/A (Fixed)
//RideHeightSetting=0//5.0 cm (Min: 0, Max: 30)
SlowBumpSetting=11// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=2// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=6// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//BrakeDiscSetting=0//3.56 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[REARLEFT]
CamberSetting=25// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=14// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
SpringSetting=1// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
//TenderSpringSetting=0//Standard (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=16// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=11// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=2// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//BrakeDiscSetting=0//3.20 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[REARRIGHT]
CamberSetting=25// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=5// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=14// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
SpringSetting=1// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=16// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=11// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=2// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//BrakeDiscSetting=0//3.20 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)

[BASIC]
Downforce= // AI MUST CALCULATE
Balance= // AI MUST CALCULATE
Ride= // AI MUST CALCULATE
Gearing= // AI MUST CALCULATE
Custom=1`,

    'GTE': `VehicleClassSetting="[[CAR_NAME]]"
UpgradeSetting=(0,0,0,0)
//Aero package=0
//Note: settings commented out if using the default

[GENERAL]
Notes=""
Symmetric=1
//CGHeightSetting=0//Non-adjustable (Fixed)
//CGRightSetting=0//Non-adjustable (Fixed)
//CGRearSetting=0//Non-adjustable (Fixed)
//WedgeSetting=0//N/A (Fixed)
FuelSetting=33// (AI calculates fuel for session) (MUST BE OVERWRITTEN)
//FuelCapacitySetting=0//+0L (0laps) (Fixed)
//NumPitstopsSetting=0// (Fixed)
//Pitstop1Setting=49//N/A (Fixed)
//Pitstop2Setting=49//N/A (Fixed)
//Pitstop3Setting=49//N/A (Fixed)

[LEFTFENDER]
//FenderFlareSetting=0//Standard (Fixed)

[RIGHTFENDER]
//FenderFlareSetting=0//Standard (Fixed)

[FRONTWING]
//FWSetting=0//Standard (Fixed)

[REARWING]
RWSetting=2// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)

[BODYAERO]
//WaterRadiatorSetting=0//No tape (Fixed)
//OilRadiatorSetting=0//No tape (Fixed)
BrakeDuctSetting=1// (Min: 0, Max: 3) (MUST BE OVERWRITTEN)
BrakeDuctRearSetting=1// (Min: 0, Max: 3) (MUST BE OVERWRITTEN)

[SUSPENSION]
//FrontWheelTrackSetting=0//Non-adjustable (Fixed)
//RearWheelTrackSetting=0//Non-adjustable (Fixed)
FrontAntiSwaySetting=5// (Min: 0, Max: 15) (MUST BE OVERWRITTEN)
RearAntiSwaySetting=1// (Min: 0, Max: 15) (MUST BE OVERWRITTEN)
FrontToeInSetting=6// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
//FrontToeOffsetSetting=0//N/A (Fixed)
RearToeInSetting=12// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
//RearToeOffsetSetting=0//N/A (Fixed)
//LeftCasterSetting=0//Non-adjustable (Fixed)
//RightCasterSetting=0//Non-adjustable (Fixed)
//LeftTrackBarSetting=0//N/A (Fixed)
//RightTrackBarSetting=0//N/A (Fixed)
//Front3rdPackerSetting=0//N/A (Fixed)
//Front3rdSpringSetting=0//Detached (Fixed)
//Front3rdTenderSpringSetting=0//Detached (Fixed)
//Front3rdTenderTravelSetting=0//Detached (Fixed)
//Front3rdSlowBumpSetting=0//N/A (Fixed)
//Front3rdFastBumpSetting=0//N/A (Fixed)
//Front3rdSlowReboundSetting=0//N/A (Fixed)
//Front3rdFastReboundSetting=0//N/A (Fixed)
//Rear3rdPackerSetting=0//N/A (Fixed)
//Rear3rdSpringSetting=0//Detached (Fixed)
//Rear3rdTenderSpringSetting=0//Detached (Fixed)
//Rear3rdTenderTravelSetting=0//Detached (Fixed)
//Rear3rdSlowBumpSetting=0//N/A (Fixed)
//Rear3rdFastBumpSetting=0//N/A (Fixed)
//Rear3rdSlowReboundSetting=0//N/A (Fixed)
//Rear3rdFastReboundSetting=0//N/A (Fixed)
//ChassisAdj00Setting=0//N/A (Fixed)
//ChassisAdj01Setting=0//N/A (Fixed)
//ChassisAdj02Setting=0//N/A (Fixed)
//ChassisAdj03Setting=0//N/A (Fixed)
//ChassisAdj04Setting=0//N/A (Fixed)
//ChassisAdj05Setting=0//N/A (Fixed)
//ChassisAdj06Setting=0//N/A (Fixed)
//ChassisAdj07Setting=0//N/A (Fixed)
//ChassisAdj08Setting=0//N/A (Fixed)
//ChassisAdj09Setting=0//N/A (Fixed)
//ChassisAdj10Setting=0//N/A (Fixed)
//ChassisAdj11Setting=0//N/A (Fixed)

[CONTROLS]
SteerLockSetting=6// (Min: 0, Max: 15) (MUST BE OVERWRITTEN)
RearBrakeSetting=17// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
BrakeMigrationSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
BrakePressureSetting=40// (Min: 0, Max: 100) (MUST BE OVERWRITTEN)
HandfrontbrakePressSetting=0//N/A (Fixed)
HandbrakePressSetting=0//N/A (Fixed)
TCSetting=0//Available (Fixed)
ABSSetting=0//N/A (Fixed)
TractionControlMapSetting=6// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
TCPowerCutMapSetting=2// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
TCSlipAngleMapSetting=4// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
AntilockBrakeSystemMapSetting=0//N/A (Fixed)

[ENGINE]
//RevLimitSetting=0//7,400 (Fixed)
//EngineBoostSetting=0//N/A (Fixed)
RegenerationMapSetting=0//0% (N/A for Non-Hybrid) (Fixed)
ElectricMotorMapSetting=0//Not Applicable (N/A for Non-Hybrid) (Fixed)
EngineMixtureSetting=1// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)
//EngineBrakingMapSetting=0//N/A (Fixed)

[DRIVELINE]
FinalDriveSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
ReverseSetting=0//3.083 (Fixed)
Gear1Setting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear2Setting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear3Setting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear4Setting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear5Setting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
Gear6Setting=0// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
RatioSetSetting=0// (Min: 0, Max: 1) (MUST BE OVERWRITTEN)
//DiffPumpSetting=0//N/A (Fixed)
DiffPowerSetting=0//Non-adjustable (Fixed)
DiffCoastSetting=0//Non-adjustable (Fixed)
DiffPreloadSetting=18// (Min: 0, Max: 100) (MUST BE OVERWRITTEN)
//FrontDiffPumpSetting=0//0% (N/A for RWD) (Fixed)
//FrontDiffPowerSetting=0//0% (N/A for RWD) (Fixed)
//FrontDiffCoastSetting=0//0% (N/A for RWD) (Fixed)
//FrontDiffPreloadSetting=0//1 (N/A for RWD) (Fixed)
//RearSplitSetting=0//RWD (Fixed)
//GearAutoUpShiftSetting=0//Off (Fixed)
//GearAutoDownShiftSetting=0//Off (Fixed)

[FRONTLEFT]
CamberSetting=28// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=20// (Min: 0, Max: 25) (MUST BE OVERWRITTEN)
SpringSetting=5// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=0// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=8// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=10// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=10// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=10// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//BrakeDiscSetting=0//3.56 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)
//EquippedTireIDSetting=0// (Fixed)

[FRONTRIGHT]
CamberSetting=28// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=20// (Min: 0, Max: 25) (MUST BE OVERWRITTEN)
SpringSetting=5// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=0// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=8// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=10// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=10// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=10// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//BrakeDiscSetting=0//3.56 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)
//EquippedTireIDSetting=0// (Fixed)

[REARLEFT]
CamberSetting=20// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=25// (Min: 0, Max: 25) (MUST BE OVERWRITTEN)
SpringSetting=1// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=22// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//BrakeDiscSetting=0//3.20 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)
//EquippedTireIDSetting=0// (Fixed)

[REARRIGHT]
CamberSetting=20// (Min: 0, Max: 40) (MUST BE OVERWRITTEN)
PressureSetting=0// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
PackerSetting=25// (Min: 0, Max: 25) (MUST BE OVERWRITTEN)
SpringSetting=1// (Min: 0, Max: 20) (MUST BE OVERWRITTEN)
//TenderSpringSetting=0//Detached (Fixed)
//TenderTravelSetting=0//Detached (Fixed)
//SpringRubberSetting=0//Detached (Fixed)
RideHeightSetting=22// (Min: 0, Max: 30) (MUST BE OVERWRITTEN)
SlowBumpSetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastBumpSetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
SlowReboundSetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
FastReboundSetting=7// (Min: 0, Max: 10) (MUST BE OVERWRITTEN)
//BrakeDiscSetting=0//3.20 cm (Fixed)
//BrakePadSetting=0//1 (Fixed)
CompoundSetting=0// (Min: 0, Max: 2) (MUST BE OVERWRITTEN)
//EquippedTireIDSetting=0// (Fixed)

[BASIC]
Downforce= // AI MUST CALCULATE
Balance= // AI MUST CALCULATE
Ride= // AI MUST CALCULATE
Gearing= // AI MUST CALCULATE
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

    // Handle potential category key mismatch or aliases (LMGT3 maps to GT3 template)
    let finalCategory = selectedCarCategory;
    if (selectedCarCategory === 'LMGT3' && LMU_VEH_TEMPLATES['GT3']) {
        finalCategory = 'GT3'; // Use the GT3 template for LMGT3 cars
    }
    // The previous structure had two LMP2 and two GT3 sections.
    // I've removed the duplicates and tried to merge them to create a single, definitive template for each.
    // Ensure that `finalCategory` correctly maps to the *single* key in LMU_VEH_TEMPLATES.

    let exampleTemplate = LMU_VEH_TEMPLATES[finalCategory];
    if (!exampleTemplate) {
        return res.status(400).json({ error: `No .VEH template found for car category: ${finalCategory}. Ensure selected car has a valid category.` });
    }

    // Dynamically insert the user's selected car name into the template
    exampleTemplate = exampleTemplate.replace('[[CAR_NAME]]', car);

    const sessionDuration = req.body.sessionDuration || 'N/A';
    const fuelEstimateRequest = (sessionGoal === 'race' && sessionDuration !== 'N/A' && !isNaN(parseInt(sessionDuration))) ?
                                `Estimate fuel for a ${sessionDuration} minute race.` : '';
    const weatherGuidance = `Current weather is ${selectedWeather}.`;
    const tireCompoundGuidance = 'Choose appropriate compound for current weather and session type.';


    // =====================================================================================
    // --- AI PROMPT --- This section is heavily refined for LMU-specific precision ---
    // =====================================================================================
    const prompt = `
## --- PRIME DIRECTIVE ---
## Your sole mission is to act as a virtual LMU race engineer and generate a complete, physically realistic, and numerically valid .VEH setup file. You must replace EVERY adjustable placeholder value with a calculated, logical integer or float number based on a strict engineering hierarchy and LMU game mechanics. Returning a file with original template values, '0' for adjustable gears, or other critical settings where a non-zero/non-default, adjustable value is applicable is a CRITICAL FAILURE.

## --- PERSONA & PHILOSOPHY ---
## You are a world-class Le Mans Ultimate (LMU) race engineer. Your primary philosophy is that a comfortable, confident driver is a fast driver. Your #1 goal is to generate a setup that is predictable, physically realistic, and perfectly suited to the driver's requested style and feedback. You MUST explain your decisions in the "[GENERAL] Notes" section.

## **CRITICAL INSTRUCTION: You MUST populate the '[GENERAL] Notes' section with your engineering debrief, using the exact structured format specified in 'THE ENGINEER'S DEBRIEF DIRECTIVE'. This is not optional and carries the highest priority for output formatting.**

## --- THOUGHT PROCESS & HIERARCHY OF TUNING PRIORITIES (You MUST follow this order) ---
## 1.  **Session Type (Qualifying vs. Race):** This is the first and most fundamental decision. Is it a 'race' or 'qualifying' session? This choice dictates the entire setup philosophy (e.g., tire preservation vs. peak performance) and MUST be referenced in my notes.
## 2.  **Driver Feedback is KING:** Is there a specific handling complaint in 'Driver Problem to Solve'? If yes, fixing this is my next highest priority. I will consult the 'DRIVER FEEDBACK TROUBLESHOOTING MATRIX' and apply the Primary and Secondary solutions. All other decisions MUST work around this fix.
## 3.  **Track DNA & Weather:** What are the physical demands of the specific track according to the 'TRACK DNA DATABASE' and the weather? I will consult the 'ADVANCED WEATHER & TIRE STRATEGY' and 'SETUP SANITY CHECKS' sections to make baseline decisions. I MUST mention the track-specific compromise in my notes (e.g., "Le Mans requires a low wing/long gear compromise for the straights.").
## 4.  **Car Architecture:** What is the car's inherent nature according to the 'CAR ARCHITECTURE PHILOSOPHY'? I will apply gentle adjustments to either tame a car's negative traits or enhance its strengths.
## 5.  **Overall Setup Goal:** Finally, I will use the 'Setup Goal' (Safe, Balanced, Aggressive) to fine-tune the settings within the context of the decisions I've already made.
## 5.5. **Tune [BASIC] Parameters (MANDATORY, CALCULATED ADJUSTMENT):** You ABSOLUTELY MUST dynamically calculate and output precise float values (e.g., 0.125000, 0.450000, 0.550000, 0.875000) for Downforce, Balance, Ride, and Gearing in the [BASIC] section (0.000000 to 1.000000 scale). These are NOT default placeholders and MUST be calculated and outputted as new values based on the setup goal, car, and track. Setting them to 0.500000 (or any template default) is a critical failure UNLESS your precise calculation explicitly determines it as the optimal value.
##     - **Downforce:** Reflects overall aero strategy. Use lower values for low-drag setups (e.g., 0.075000 - 0.250000). Use higher values for high-downforce/grip setups (e.g., 0.750000 - 0.925000). Use mid-range for balanced (0.350000 - 0.650000).
##     - **Balance:** Reflects overall aero/mechanical balance. For aggressive oversteer tendency (0.150000 - 0.350000). For neutral balance (0.450000 - 0.550000). For stable understeer tendency (0.650000 - 0.850000). Adjust based on driver feedback and track.
##     - **Ride:** Reflects overall suspension compliance. For very stiff/low ride (0.075000 - 0.250000). For compliant/high ride (0.750000 - 0.925000). Mid-range for balanced (0.350000 - 0.650000). Adjust based on track bumps.
##     - **Gearing:** Reflects overall gear length strategy. For very long gears/high top speed (0.850000 - 0.975000). For very short gears/quick acceleration (0.075000 - 0.250000). Mid-range for balanced (0.250000 - 0.850000). MUST directly correspond to the detailed gear selections.
##     - **Custom:** Always 1.
## 6.  **Engineer's Debrief:** After generating all values, I will write a concise summary in the '[GENERAL] Notes' section explaining my choices, as per 'THE ENGINEER'S DEBRIEF DIRECTIVE'.

## =====================================================================================
## --- LMU GAME MECHANICS & NUANCES (CRITICAL) ---
## =====================================================================================
## All tuning decisions MUST be based on Le Mans Ultimate's simulation and parameter behaviors, NOT generalized real-world engineering where discrepancies exist.
##
## **1. FIXED VS. ADJUSTABLE PARAMETERS:**
##    - You MUST NOT modify any setting explicitly marked with '//Fixed' or '//Non-adjustable' in the template. These values are hardcoded in LMU for that car/template.
##    - You MUST modify all settings explicitly marked with '(MUST BE OVERWRITTEN)' and ensure they fall within their specified Min/Max ranges.
##
## **2. LMU Gearing Index Behavior (ULTRA CRITICAL):**
##    - In LMU, for individual gears (`Gear1Setting` to `Gear7Setting`), there is an **INVERSE relationship** between the numerical index chosen and the actual "length" of the gear:
##      - **LOWER numerical index (e.g., 0, 1, 2)** results in a **LONGER gear** (higher top speed for that gear, less acceleration).
##      - **HIGHER numerical index (e.g., 10, 15, 20)** results in a **SHORTER gear** (quicker acceleration for that gear, lower top speed).
##    - **`FinalDriveSetting`:** A HIGHER index for `FinalDriveSetting` always means LONGER overall gearing (higher top speed, slower acceleration).
##    - You MUST apply this LMU-specific gearing logic when selecting indices and predicting speeds.
##    - **Crucial Commenting:** For each `GearXSetting`, you MUST dynamically calculate and insert a **realistic approximate speed in km/h (e.g., ~Y km/h) and mph (e.g., ~Z mph)** based on the chosen gear index and final drive. Example: `Gear1Setting=X//~Y km/h (approx. Z mph)`. Ensure the speeds *increase logically* and are *appropriate for the track type* (very high for long-gear tracks).
##
## **3. TIRE PRESSURE NUANCES (`PressureSetting`):**
##    - Higher tire pressure: Reduces rolling resistance, but decreases contact patch (less grip) and accelerates tire wear (due to heat concentration). Optimal for minimal flex, but requires careful management.
##    - Lower tire pressure: Increases contact patch (more grip), but increases rolling resistance and can lead to overheating (due to excessive flex) or de-beading if too low.
##    - Aim for ideal operating window, which is often a balance.

## **4. CAMBER & TOE NUANCES:**
##    - **`CamberSetting`:**
##      - **Min: 0 (~-0.5 deg)** = Less negative camber. Improves straight-line braking and traction on corner exit. Reduces mid-corner grip.
##      - **Max: 40 (~-4.0 deg)** = More negative camber. Maximizes mid-corner grip, but hurts straight-line performance and tire wear.
##    - **`ToeInSetting`/`RearToeInSetting`:**
##      - **Toe-in (positive toe):** Tires point inwards. Increases straight-line stability, reduces turn-in sharpness (front), improves traction (rear).
##      - **Toe-out (negative toe):** Tires point outwards. Increases turn-in sharpness, reduces straight-line stability.
##      - **Mapping to Index:** In LMU, typically a **lower index** means more toe-out (for front) or less toe-in (for rear), and a **higher index** means more toe-in (for front) or more toe-out (for rear). VERIFY THIS CAREFULLY if exact game behavior differs. Your prompt assumes lower index = more toe-out for front, and lower index = less toe-in for rear (more toe-out effect for rear).
##
## **5. SUSPENSION INTERPLAY:**
##    - **Springs and Packers:** Control main load support and ride height. Packers limit extreme travel.
##    - **Anti-Roll Bars (ARBs):** Manage lateral load transfer and body roll. Stiffer ARB on an axle increases its load transfer, reducing its mechanical grip relative to the other axle (e.g., stiffer front ARB increases overall understeer).
##    - **Dampers (Bump/Rebound):** Control rate of weight transfer and wheel-to-body movement.
##      - **Slow Bump/Rebound:** Controls weight transfer during corner entry/exit, braking/acceleration (large, slow movements).
##      - **Fast Bump/Rebound:** Controls reaction to bumps, kerbs, sudden impacts (small, fast movements). Softer for bumpy tracks.
##      - **Balance:** Dampers MUST complement spring rates. Stiffer springs often need stiffer damping, but bumpy tracks might demand softer fast damping even with stiff springs.

## **6. DIFFERENTIAL STRATEGY:**
##    - **`DiffPowerSetting` (On-throttle lock):**
##      - Higher: More traction on exit, but can induce understeer and tire scrub.
##      - Lower: Allows more rotation on exit, can lose traction more easily.
##    - **`DiffCoastSetting` (Off-throttle lock):**
##      - Higher: More stability on lift-off/braking, but can cause snap oversteer if too high (rear tires lock up unevenly).
##      - Lower: Allows more rotation on entry, less stability.
##    - **`DiffPreload`:** Constant locking effect. Affects low-speed stability and traction.

## =====================================================================================
## --- LMU TUNING GUIDELINES & RANGES (Practical Values) ---
## =====================================================================================
## Use these typical in-game numerical ranges and common practices for your adjustments. Always prioritize realistic values.
##
## **Tires:**
## - **`PressureSetting`:** (Min: 0 / ~130 kPa, Max: 10 / ~170 kPa). Adjust based on track temp, session, and desired grip/wear. Wet conditions typically require slightly higher pressures.
## - **`CompoundSetting`:** (Min: 0 / Soft/Wet, Max: 2 / Hard). 0 for Soft/Wet, 1 for Medium, 2 for Hard.
##
## **Aero:**
## - **`FrontWing`/`RearWing` (`FWSetting`/`RWSetting`):** Indices (0=low, higher=more downforce). Max values are car-specific.
##     - Hypercar FW: (Min: 0, Max: 2). Hypercar RW: (Min: 0, Max: 10).
##     - LMP2 RW: (Min: 0, Max: 9).
##     - GT3 RW: (Min: 0, Max: 7).
##     - GTE RW: (Min: 0, Max: 10).
##     - General Rule: High-speed tracks = lower indices for less drag. Technical tracks = higher indices for more downforce.
## - **`BrakeDucts`:** Indices (0=open/max cooling, higher=more closed/less cooling/more aero). Max values are car-specific (e.g., Max: 3 for Hypercar, 2 for GT3).
##
## **Suspension:**
## - **`RideHeightSetting`:** (Min: 0 / ~4.0 cm, Max: 30 / ~8.0 cm). Lower for aero advantage, higher for bump absorption. Rake (rear height > front height) is common for aero and stability.
## - **`SpringSetting`:** (Min: 0, Max: 20). Higher index = stiffer spring. Adjust according to track roughness, kerbs, and aero load.
## - **`AntiSwaySetting` (ARB):** (Min: 0, Max: 20). Higher index = stiffer ARB.
## - **`CamberSetting`:** (Min: 0 / ~-0.5 deg, Max: 40 / ~-4.0 deg). Most racing cars use negative camber. Front typically more negative than rear. Less negative rear camber (higher index) for stability/traction; more negative (lower index) for rotation.
## - **`ToeInSetting`/`RearToeInSetting`:** (Min: 0 / ~-0.2 deg, Max: 30 / ~+0.2 deg). Slight toe-out on front for turn-in, slight toe-in on rear for stability. Remember the index mapping to effect.
## - **Damper Settings (`Slow`/`Fast Bump`/`Rebound`):** (Min: 0, Max: 10). Relative adjustments are key.
##     - Soft = lower index (0-3). Medium = mid-index (4-7). Stiff = higher index (8-10).
##     - Bumpy tracks need softer Fast Bump/Rebound for compliance. High-speed stability needs balanced/stiffer Slow Bump/Rebound.

## **Drivetrain:**
## - **`FinalDriveSetting`:** (Min: 0, Max: typically 5-10 depending on car. Higher index = longer gear for higher top speed). **For Le Mans/Monza, aim for the HIGHEST available index (e.g., 5-7).**
## - **`Gear1Setting`-`Gear7Setting`:** (Min: 0, Max: 20). Each represents an index for a preset ratio. **For High-Speed Tracks (Le Mans, Monza), choose VERY LOW indices (e.g., 0, 1, or 2 from a max of 20, using the absolute lowest available if possible)** to achieve **SIGNIFICANTLY LONGER individual ratios**. For Technical Tracks, choose HIGHER indices (e.g., 5-15) for shorter, more accelerative gears. **You MUST select a non-zero index for each adjustable gear setting unless the template explicitly shows it as fixed or non-adjustable for that car.**
## - **`DiffPowerSetting`:** (Min: 0, Max: 15).
## - **`DiffCoastSetting`:** (Min: 0, Max: 20).
## - **`DiffPreloadSetting`:** (Min: 0, Max: 100).
## - **`RatioSetSetting`:** (Min: 0, Max: 1 or higher). 0=Standard, 1=High Speed.

## **Brakes:**
## - **`RearBrakeSetting` (Bias):** (Min: 0, Max: 40). Lower value = more front bias. Higher value = more rear bias.
## - **`BrakePressureSetting`:** (Min: 0, Max: 100). Max pressure for qualifying.
## - **`AntilockBrakeSystemMapSetting` (ABS):** (Min: 0, Max: 15). Higher value = more ABS intervention.
## - **`TractionControlMapSetting` (TC):** (Min: 0, Max: 10). Higher value = more TC intervention.

## =====================================================================================
## --- GEARING STRATEGY (ULTRA CRITICAL FOR FINALDRIVE & INDIVIDUAL GEARS) ---
## =====================================================================================
## This is the MOST IMPORTANT section for gearing. Follow these rules precisely:
##
## **1. High-Speed Tracks (e.g., Le Mans, Monza, Spa-Francorchamps):**
##    - **`FinalDriveSetting`:** You MUST select one of the **HIGHEST available indices** for the car (e.g., if max is 7, choose 5, 6, or 7). This makes the overall gearing "longer" for high top speed.
##    - **`Gear1Setting` to `Gear7Setting`:** For *each* individual gear, you MUST select a **VERY LOW non-negative integer index from the absolute bottom of the range (e.g., 0, 1, or 2 from a max of 20, using the absolute lowest available if possible for extreme top speed)** to make that individual gear **SIGNIFICANTLY LONGER**. Specifically, for a 7-speed Hypercar or LMP2 on Le Mans, you MUST choose indices for Gear1-7 following a pattern of **"0-0-1-2-3-4-5"** (or the lowest sequential available indices for all applicable gears, starting with 0). This sequential use of very low indices is paramount for long gearing.
##    - **Comments:** For each `GearXSetting`, you MUST dynamically calculate and insert a **realistic approximate speed in km/h (e.g., ~Y km/h) and mph (e.g., ~Z mph)** based on the chosen gear index and final drive. Example: `Gear1Setting=X//~Y km/h (approx. Z mph)`. Ensure the speeds *increase logically* and are *very high* with each successive gear, reflecting a long gear setup for Le Mans (e.g., 6th or 7th gear often well over 300 km/h / 185 mph).
##    - **Self-Verification:** Mentally confirm that 6th or 7th gear top speed reaches *over 300 km/h (or 185 mph)* for Hypercars/LMP2s on tracks like Le Mans, indicating truly long gearing.
##
## **2. Technical/Accelerative Tracks (e.g., Sebring, Portimão, Imola):**
##    - **`FinalDriveSetting`:** You MUST select one of the **LOWER available indices** for the car (e.g., 0-3) for quicker acceleration.
##    - **`Gear1Setting` to `Gear7Setting`:** For *each* individual gear, you MUST select a **HIGHER index** (e.g., 5-15 from a max of 20) to make that individual gear "shorter" for better acceleration.
##    - **Comments:** As above, dynamically calculate and insert a **realistic approximate speed** in km/h or mph for each gear. Ensure the speeds *increase logically* and are *appropriate for an accelerative track*.
##
## **ALWAYS ensure a non-zero index is chosen for any adjustable gear setting unless it's explicitly fixed to 0.** Leaving them at '0' for non-fixed gears is a critical failure.
##
## =====================================================================================
## --- TRACK DNA DATABASE (Key characteristics for setup decisions) ---
## =====================================================================================
## - **Circuit de la Sarthe (Le Mans):** High-speed. Focus: LOWEST possible drag (low wings, **VERY LONG GEARS**). Compromise: Must have enough stability for Porsche Curves. Bumps on straights require good high-speed damping.
## - **Sebring International Raceway:** Extremely bumpy. Focus: SOFT suspension, especially fast dampers, and higher ride height to absorb bumps. Compromise: Softness can hurt responsiveness in slow corners. **Short Gears Recommended.**
## - **Spa-Francorchamps:** High-speed with significant elevation change (Eau Rouge/Raidillon). Focus: High-speed stability with good aero balance. Requires stiff springs for compression in Eau Rouge. **Long Gears Recommended.**
## - **Autodromo Nazionale Monza:** Very high-speed. Focus: LOWEST drag, even more than Le Mans. **VERY LONG GEARS ESSENTIAL**. Compromise: Must be stable on the brakes for heavy braking zones into chicanes.
## - **Fuji Speedway:** Long main straight but a very tight, technical final sector. Focus: A major compromise between top speed and low-speed agility. Can't sacrifice too much downforce. **Balanced Gearing Recommended.**
## - **Autódromo Internacional do Algarve (Portimão):** "Rollercoaster" with lots of elevation and blind crests. Focus: A predictable, stable platform is crucial. Medium downforce and compliant suspension. **Slightly Shorter Gears Recommended.**
## - **Bahrain International Circuit:** High grip, smooth surface, often hot. Focus: Good braking stability and traction out of slow corners. Tire wear can be high. **Balanced Gearing Recommended.**

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
## IF "Loose rear" or "Too much understeer": 1st: Decrease 'RearCamberSetting' (more negative rear camber - LOWER index) to increase mid-corner rotation. 2nd: Increase 'RearToeInSetting' (more toe-out effect - LOWER index).

## =====================================================================================
## --- ADVANCED WEATHER & TIRE STRATEGY ---
## =====================================================================================
## - IF Weather is 'Rain' or 'Wet': Use Wet tires (`CompoundSetting`=0), INCREASE `PressureSetting` (+3-5 clicks from dry base), INCREASE `RideHeightSetting` (+10-15 clicks) for water clearance, SOFTER Springs/Dampers for compliance, HIGHER TC/ABS settings for control. Set `BrakeDucts` to more open for cooling.
## - IF Track Temp is high (e.g., >30C): Consider slightly lower tire pressures or harder compounds to manage overheating. Consider opening brake ducts slightly.
## - IF Track Temp is low (e.g., <15C): Consider slightly higher tire pressures or softer compounds to build temperature. Consider closing brake ducts slightly.

## =====================================================================================
## --- SETUP SANITY CHECKS (Core Physics Rules & LMU Specifics) ---
## =====================================================================================
## 1. Low RideHeight REQUIRES Stiff Springs (to prevent bottoming out).
## 2. High Aero (`RWSetting`) REQUIRES Stiff Springs (to support downforce).
## 3. Bumpy Tracks (Sebring, Portimão) REQUIRE Softer Fast Damping (for bump absorption).
## 4. **Gearing Sanity Check:** For High-Speed Tracks (Le Mans/Monza), **ENSURE** that `FinalDriveSetting` is set to a HIGH index and individual `GearXSetting` indices are set to VERY LOW indices (e.g., "0-0-1-2-3-4-5"), resulting in very long gears as indicated by their approximate speeds. Conversely, for Technical Tracks, confirm shorter gears.
## 5. **Physics Check:** Ensure toe and camber settings are physically realistic for a racing car (e.g., negative camber for cornering grip, slight toe-out on front for sharper turn-in, slight toe-in on rear for stability).
## 6. **Physics:** Ensure damper settings (bump/rebound) logically complement spring stiffness and track type. Softer springs often pair with softer damping, stiffer with stiffer.
## 7. **Balance Consistency:** Aero balance, mechanical balance (springs/ARBs), and differential settings should ideally work in harmony towards the overall setup goal and driver feedback.
## 8. **FinalDrive & Gears Cohesion:** Ensure the chosen `FinalDriveSetting` (index) and all individual `GearXSetting` indices form a logical progression and provide appropriate top speeds for the track. A higher `FinalDriveSetting` index should correspond to overall higher top speeds for each gear, and vice-versa.
## 9. **Fuel Consistency:** Ensure estimated fuel load aligns with session duration and track characteristics (e.g., higher consumption on longer tracks).
## 10. **Tire Compound Logic:** Ensure selected tire compound (Soft/Medium/Hard/Wet) aligns with weather conditions and session goal.
## 11. **BASIC Parameters Check:** Ensure Downforce, Balance, Ride, and Gearing in the [BASIC] section are *not* default values (e.g., 0.500000 or 0.400000) and are instead dynamically adjusted based on the setup goal, car, and track characteristics, within their specified logical ranges.

## =====================================================================================
## --- COMMON SETUP COMPROMISES (for AI to be aware of) ---
## =====================================================================================
## - **More Downforce = Less Top Speed:** Crucial trade-off. Higher wings (`FW`/`RW`) increase cornering grip but penalize straight-line speed.
## - **Stiffer Suspension = More Responsive, Less Compliant:** Stiffer springs/dampers improve responsiveness and transient handling but can make the car nervous over bumps, curbs, and mid-corner if too stiff.
## - **Softer Suspension = More Compliant, Less Responsive:** Better over bumps and curbs, but can lead to excessive body roll and slower responsiveness.
## - **Long Gearing = High Top Speed, Slower Acceleration:** Best for long straights. Can struggle on corner exits or in technical sections.
## - **Short Gearing = Quick Acceleration, Lower Top Speed:** Excellent for technical tracks, but can hit rev limiter too soon on straights.
## - **Aggressive Camber = More Cornering Grip, Less Straight-line Stability/Braking:** Too much negative camber can reduce tire contact patch in a straight line.
## - **High Brake Pressure = More Stopping Power, Higher Risk of Lockup:** Must be balanced with driver skill and ABS settings.
## - **Forward Brake Bias = More Stable Braking, Risk of Front Lockup:** Common for most cars.
## - **Rearward Brake Bias = More Rotation/Turn-in on Braking, Risk of Rear Lockup/Spin:** For aggressive drivers or cars that understeer on entry.
## - **High Differential Lock (Power/Coast) = More Traction/Stability, More Understeer (Power) / Snap Oversteer (Coast):** Be mindful of driver feedback.

## =====================================================================================
## --- DRIVER CONFIDENCE & CONSISTENCY PRINCIPLES (CRITICAL for a great setup) ---
## =====================================================================================
## To ensure drivers don't "lose pace," prioritize these aspects:
## - **Predictability over Peak Aggression:** A setup that is predictable and consistent lap-to-lap is often faster over a race distance than a twitchy, peak-performance setup.
## - **Stability under Braking & Power:** Crucial for driver confidence into and out of corners, especially under pressure.
## - **Smooth Transitions:** The car should transition smoothly between braking, cornering, and acceleration phases, avoiding abrupt changes in balance.
## - **Tire Preservation (Race Sessions):** For race setups, managing tire wear through less aggressive camber, toe, and smoother diff settings is paramount to maintain pace over a stint.
## - **Forgiveness:** A setup that is slightly more forgiving of driver errors will result in fewer mistakes and more consistent lap times.
## - **Neutral Balance:** A slightly neutral or predictable understeer balance is generally preferred for long-distance consistency over a car prone to snap oversteer.

## =====================================================================================
## --- THE ENGINEER'S DEBRIEF DIRECTIVE (CRITICAL FOR NOTES SECTION) ---
## =====================================================================================
## You MUST populate the '[GENERAL] Notes' section with a concise engineering summary. This summary should clearly explain your setup choices and rationale, using the following structured format (or very similar). All sections MUST be present, even if marked "N/A":
##
## Notes="
## [Session Focus]: <Qualifying/Race> for <Track Name (e.g., Circuit de la Sarthe (Le Mans))>.
## [Setup Goal]: <Safe/Balanced/Aggressive>.
## [Driver Feedback Addressed]: <Summary of handling issue and how it was addressed, e.g., 'Understeer on entry reduced by softening front ARB and reducing diff coast.' or 'N/A: No specific feedback provided.'>.
## [Track Specific Compromise]: <Explain the primary compromise made for this track, e.g., 'Le Mans demands an ultra-low drag setup with very long gears, balancing top speed with required stability for the Porsche Curves.'>.
## [Key Adjustments & Rationale]:
## - Aero: <e.g., 'FW set to X and RW to Y for optimal high-speed balance and minimal drag.'>
## - Gearing: <e.g., 'Final Drive set to X and individual gears set with very low indices (e.g., 0-0-1-2-3-4-5) for maximum top speed on straights (~340 km/h / 211 mph in 7th).'>
## - Suspension: <e.g., 'Stiff springs (Front: X, Rear: Y) to support aero load, complemented by medium slow dampers (F: X, R: Y) and softer fast dampers (F: X, R: Y) for compliance over bumps.'>
## - Brakes: <e.g., 'Bias adjusted to X:Y for optimal stability under heavy braking zones, with Brake Pressure at Z% for consistency.'>
## - Differential: <e.g., 'Diff Power to X% for smooth traction out of corners, Diff Coast to Y% for stable turn-in and reduced entry oversteer.'>
## - Tires: <e.g., 'Compound set to X (e.g., Medium) with pressures optimized (FL: X kPa, FR: Y kPa, RL: Z kPa, RR: A kPa) for target operating temperature and wear throughout the race stint.'>
## [Overall Philosophy]: <Reinforce the setup's overall characteristic, e.g., 'This setup prioritizes confidence and stability for consistent pace over a long race stint.' or 'This setup maximizes aggressive single-lap pace, sacrificing some consistency for peak performance.'>
## "
## You MUST ensure all numerical values you set in the .VEH file are present and valid, especially for adjustable settings.

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

This is the required LMU .VEH structure. You must use this exact structure, replacing all placeholder values with valid integers and dynamically calculated comments. Your response MUST begin IMMEDIATELY with 'VehicleClassSetting=' and contain ONLY the file content. No extra text, no markdown code block formatting (like \`\`\`), no introductory or concluding remarks whatsoever.
${exampleTemplate}

Now, generate the complete and valid .VEH file. Your response MUST contain ONLY the file content and nothing else.
`;

    try {
        const openrouterResponse = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'X-Title': 'LMU Setup Generator',
            },
            body: JSON.stringify({
                model: PRIMARY_MODEL,
                messages: [{ role: "user", content: prompt }],
                max_tokens: 4096,
                temperature: 0.7, // Slightly reduced temperature for more predictable numerical output
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
