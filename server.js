// --- server.js (for OpenRouter API - Primary AI Service) ---

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
// The user has requested to use deepseek-ai/DeepSeek-R1-0528 as the primary model.
// This model is available through the OpenRouter API.
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
// CORRECT
const PRIMARY_MODEL = 'NousResearch/Hermes-2-Pro-Llama-3-8B';

// --- Define LMU .VEH Example Templates by Category ---
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
FuelSetting=95//1.00
FuelCapacitySetting=0//72.0L (11.5 laps)
VirtualEnergySetting=72//72% (10.0 laps)
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

[REARWING]
RWSetting=3//P4

[BODYAERO]
WaterRadiatorSetting=1//25%
OilRadiatorSetting=1//25%
BrakeDuctSetting=0//Open
BrakeDuctRearSetting=0//Open

[SUSPENSION]
FrontWheelTrackSetting=0//Non-adjustable
RearWheelTrackSetting=0//Non-adjustable
FrontAntiSwaySetting=16//D-P1
RearAntiSwaySetting=0//Detached
FrontToeInSetting=15//-0.06 deg
FrontToeOffsetSetting=0//N/A
RearToeInSetting=17//0.06 deg
RearToeOffsetSetting=0//N/A
LeftCasterSetting=0//Non-adjustable
RightCasterSetting=0//Non-adjustable
LeftTrackBarSetting=0//N/A
RightTrackBarSetting=0//N/A
Front3rdPackerSetting=8//0.8 cm
Front3rdSpringSetting=8//8
Front3rdTenderSpringSetting=0//Detached
Front3rdTenderTravelSetting=0//Detached
Front3rdSlowBumpSetting=0//1
Front3rdFastBumpSetting=2//3
Front3rdSlowReboundSetting=4//5
Front3rdFastReboundSetting=2//3
Rear3rdPackerSetting=10//1.0 cm
Rear3rdSpringSetting=7//7
Rear3rdTenderSpringSetting=0//Detached
Rear3rdTenderTravelSetting=0//Detached
Rear3rdSlowBumpSetting=0//1
Rear3rdFastBumpSetting=2//3
Rear3rdSlowReboundSetting=0//1
Rear3rdFastReboundSetting=2//3
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
RearBrakeSetting=10//MUST be changed for stability (e.g., 52:48 to 58:42)
BrakeMigrationSetting=0//0.0
BrakePressureSetting=50//MUST be changed for track/driver preference
HandfrontbrakePressSetting=0//0%
HandbrakePressSetting=0//N/A
TCSetting=0//Available
ABSSetting=0//N/A
TractionControlMapSetting=5//MUST be changed for track/driver preference
TCPowerCutMapSetting=5//MUST be changed for track/driver preference
TCSlipAngleMapSetting=5//MUST be changed for track/driver preference
AntilockBrakeSystemMapSetting=0//N/A

[ENGINE]
RevLimitSetting=0//8,500
EngineBoostSetting=0//N/A
RegenerationMapSetting=5//MUST be changed for session type (e.g., Quali vs Race)
ElectricMotorMapSetting=0//MUST be changed for track type
EngineMixtureSetting=1//MUST be changed for session type (e.g., 0=Full, 1=Race, 2=Lean)
EngineBrakingMapSetting=0//N/A

[DRIVELINE]
FinalDriveSetting=0//MUST be changed for the track
ReverseSetting=0//MUST be changed for the track
Gear1Setting=0//MUST be changed for the track
Gear2Setting=0//MUST be changed for the track
Gear3Setting=0//MUST be changed for the track
Gear4Setting=0//MUST be changed for the track
Gear5Setting=0//MUST be changed for the track
Gear6Setting=0//MUST be changed for the track
Gear7Setting=0//MUST be changed for the track
RatioSetSetting=0//MUST be changed for the track (e.g., 0=Standard, 1=Long)
DiffPumpSetting=0//N/A
DiffPowerSetting=0//MUST be changed for track (affects on-throttle stability)
DiffCoastSetting=0//MUST be changed for track (affects off-throttle stability)
DiffPreloadSetting=0//MUST be changed for track (affects overall stability)
FrontDiffPumpSetting=0//N/A
FrontDiffPowerSetting=0//MUST be changed for track
FrontDiffCoastSetting=0//MUST be changed for track
FrontDiffPreloadSetting=0//MUST be changed for track
RearSplitSetting=0// 0.0:100.0
GearAutoUpShiftSetting=0//Off
GearAutoDownShiftSetting=0//Off

[FRONTLEFT]
CamberSetting=20//MUST be changed for track
PressureSetting=5//MUST be changed for weather and track
PackerSetting=10//MUST be changed for track
SpringSetting=8//MUST be changed for track
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//MUST be changed for track (and rake)
SlowBumpSetting=5//MUST be changed for track
FastBumpSetting=5//MUST be changed for track
SlowReboundSetting=5//MUST be changed for track
FastReboundSetting=5//MUST be changed for track
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=1//MUST be changed for session (0=Soft, 1=Med, 2=Hard)

[FRONTRIGHT]
CamberSetting=20//MUST be changed for track
PressureSetting=5//MUST be changed for weather and track
PackerSetting=10//MUST be changed for track
SpringSetting=8//MUST be changed for track
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//MUST be changed for track (and rake)
SlowBumpSetting=5//MUST be changed for track
FastBumpSetting=5//MUST be changed for track
SlowReboundSetting=5//MUST be changed for track
FastReboundSetting=5//MUST be changed for track
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=1//MUST be changed for session (0=Soft, 1=Med, 2=Hard)

[REARLEFT]
CamberSetting=20//MUST be changed for track
PressureSetting=5//MUST be changed for weather and track
PackerSetting=10//MUST be changed for track
SpringSetting=8//MUST be changed for track
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//MUST be changed for track (and rake)
SlowBumpSetting=5//MUST be changed for track
FastBumpSetting=5//MUST be changed for track
SlowReboundSetting=5//MUST be changed for track
FastReboundSetting=5//MUST be changed for track
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=1//MUST be changed for session (0=Soft, 1=Med, 2=Hard)

[REARRIGHT]
CamberSetting=20//MUST be changed for track
PressureSetting=5//MUST be changed for weather and track
PackerSetting=10//MUST be changed for track
SpringSetting=8//MUST be changed for track
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//MUST be changed for track (and rake)
SlowBumpSetting=5//MUST be changed for track
FastBumpSetting=5//MUST be changed for track
SlowReboundSetting=5//MUST be changed for track
FastReboundSetting=5//MUST be changed for track
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=1//MUST be changed for session (0=Soft, 1=Med, 2=Hard)

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
FuelSetting=11//16L (3laps)
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
RWSetting=0//P1

[BODYAERO]
WaterRadiatorSetting=2//50%
OilRadiatorSetting=2//50%
//BrakeDuctSetting=0//Open
BrakeDuctRearSetting=1//25%

[SUSPENSION]
//FrontWheelTrackSetting=0//Non-adjustable
//RearWheelTrackSetting=0//Non-adjustable
FrontAntiSwaySetting=9//D25 H-H
RearAntiSwaySetting=1//D7.5 S-S
FrontToeInSetting=13//-0.18 deg
//FrontToeOffsetSetting=0//N/A
RearToeInSetting=22//0.35 deg
//RearToeOffsetSetting=0//N/A
//LeftCasterSetting=0//Non-adjustable
//RightCasterSetting=0//Non-adjustable
//LeftTrackBarSetting=0//N/A
//RightTrackBarSetting=0//N/A
Front3rdPackerSetting=6//0.6 cm
Front3rdSpringSetting=0//N/A
//Front3rdTenderSpringSetting=0//Detached
//Front3rdTenderTravelSetting=0//Detached
//Front3rdSlowBumpSetting=0//1
//Front3rdFastBumpSetting=0//1
//Front3rdSlowReboundSetting=0//1
//Front3rdFastReboundSetting=0//1
Rear3rdPackerSetting=7//0.7 cm
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
RearBrakeSetting=10//MUST be changed for stability (e.g., 52:48 to 56:44)
//BrakeMigrationSetting=0// 0.0
BrakePressureSetting=50//MUST be changed for track/driver preference
//HandfrontbrakePressSetting=0//0%
//HandbrakePressSetting=0//N/A
//TCSetting=0//Available
//ABSSetting=0//N/A
TractionControlMapSetting=5//MUST be changed for track/driver preference
TCPowerCutMapSetting=5//MUST be changed for track/driver preference
TCSlipAngleMapSetting=5//MUST be changed for track/driver preference
//AntilockBrakeSystemMapSetting=0//N/A

[ENGINE]
//RevLimitSetting=0//8000
//EngineBoostSetting=0//N/A
//RegenerationMapSetting=0//0%
ElectricMotorMapSetting=0//Not Applicable
EngineMixtureSetting=1//MUST be changed for session type (e.g., 0=Quali, 1=Race)
//EngineBrakingMapSetting=0//N/A

[DRIVELINE]
FinalDriveSetting=0//MUST be changed for the track
ReverseSetting=0//MUST be changed for the track
Gear1Setting=0//MUST be changed for the track
Gear2Setting=0//MUST be changed for the track
Gear3Setting=0//MUST be changed for the track
Gear4Setting=0//MUST be changed for the track
Gear5Setting=0//MUST be changed for the track
Gear6Setting=0//MUST be changed for the track
RatioSetSetting=0//MUST be changed for the track (e.g., 0=Standard, 1=High Speed)
//DiffPumpSetting=0//N/A
DiffPowerSetting=0//MUST be changed for track (affects on-throttle stability)
DiffCoastSetting=0//MUST be changed for track (affects off-throttle stability)
DiffPreloadSetting=10//MUST be changed for track (affects overall stability)
//FrontDiffPumpSetting=0//0%
//FrontDiffPowerSetting=0//0%
//FrontDiffCoastSetting=0//0%
//FrontDiffPreloadSetting=0//1
//RearSplitSetting=0// 0.0:100.0
//GearAutoUpShiftSetting=0//Off
//GearAutoDownShiftSetting=0//Off

[FRONTLEFT]
CamberSetting=15//MUST be changed for track
PressureSetting=5//MUST be changed for weather and track
PackerSetting=10//MUST be changed for track
SpringSetting=8//MUST be changed for track
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//MUST be changed for track (and rake)
SlowBumpSetting=5//MUST be changed for track
FastBumpSetting=5//MUST be changed for track
SlowReboundSetting=5//MUST be changed for track
FastReboundSetting=5//MUST be changed for track
BrakeDiscSetting=0//3.20 cm
BrakePadSetting=0//1
CompoundSetting=1//MUST be changed for session (0=Soft, 1=Med, 2=Hard)

[FRONTRIGHT]
CamberSetting=15//MUST be changed for track
PressureSetting=5//MUST be changed for weather and track
PackerSetting=10//MUST be changed for track
SpringSetting=8//MUST be changed for track
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//MUST be changed for track (and rake)
SlowBumpSetting=5//MUST be changed for track
FastBumpSetting=5//MUST be changed for track
SlowReboundSetting=5//MUST be changed for track
FastReboundSetting=5//MUST be changed for track
BrakeDiscSetting=0//3.20 cm
BrakePadSetting=0//1
CompoundSetting=1//MUST be changed for session (0=Soft, 1=Med, 2=Hard)

[REARLEFT]
CamberSetting=15//MUST be changed for track
PressureSetting=5//MUST be changed for weather and track
PackerSetting=10//MUST be changed for track
SpringSetting=8//MUST be changed for track
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//MUST be changed for track (and rake)
SlowBumpSetting=5//MUST be changed for track
FastBumpSetting=5//MUST be changed for track
SlowReboundSetting=5//MUST be changed for track
FastReboundSetting=5//MUST be changed for track
BrakeDiscSetting=0//3.20 cm
BrakePadSetting=0//1
CompoundSetting=1//MUST be changed for session (0=Soft, 1=Med, 2=Hard)

[REARRIGHT]
CamberSetting=15//MUST be changed for track
PressureSetting=5//MUST be changed for weather and track
PackerSetting=10//MUST be changed for track
SpringSetting=8//MUST be changed for track
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//MUST be changed for track (and rake)
SlowBumpSetting=5//MUST be changed for track
FastBumpSetting=5//MUST be changed for track
SlowReboundSetting=5//MUST be changed for track
FastReboundSetting=5//MUST be changed for track
BrakeDiscSetting=0//3.20 cm
BrakePadSetting=0//1
CompoundSetting=1//MUST be changed for session (0=Soft, 1=Med, 2=Hard)
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
FuelSetting=92//0.93
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
RWSetting=2//8.3 deg

[BODYAERO]
//WaterRadiatorSetting=0//No tape
//OilRadiatorSetting=0//No tape
BrakeDuctSetting=3//60mm
BrakeDuctRearSetting=2//40mm

[SUSPENSION]
//FrontWheelTrackSetting=0//Non-adjustable
//RearWheelTrackSetting=0//Non-adjustable
FrontAntiSwaySetting=7//P7 (dur)
RearAntiSwaySetting=4//P4
FrontToeInSetting=7//-0.117 deg
//FrontToeOffsetSetting=0//N/A
RearToeInSetting=8//0 deg
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
SteerLockSetting=4//380° (11.2°)
RearBrakeSetting=21//51.8:48.2
//BrakeMigrationSetting=0// 0.0
//BrakePressureSetting=80//120 kgf (100%)
//HandfrontbrakePressSetting=0//N/A
//HandbrakePressSetting=0//N/A
//TCSetting=0//Disponible
//ABSSetting=0//Disponible
//TractionControlMapSetting=8//8
TCPowerCutMapSetting=3//3
//TCSlipAngleMapSetting=10//10
AntilockBrakeSystemMapSetting=11//11

[ENGINE]
//RevLimitSetting=0//9,400
//EngineBoostSetting=0//N/A
//RegenerationMapSetting=0//0%
//ElectricMotorMapSetting=0//
//EngineMixtureSetting=1//Race
//EngineBrakingMapSetting=0//N/A

[DRIVELINE]
//FinalDriveSetting=0//Fixed
//ReverseSetting=0//Fixed
Gear1Setting=0//Fixed
Gear2Setting=0//Fixed
Gear3Setting=0//Fixed
Gear4Setting=0//Fixed
Gear5Setting=0//Fixed
Gear6Setting=0//Fixed
RatioSetSetting=0//Short
//DiffPumpSetting=0//N/A
//DiffPowerSetting=0//Non-adjustable
//DiffCoastSetting=0//Non-adjustable
DiffPreloadSetting=28//78 Nm
//FrontDiffPumpSetting=0//0%
//FrontDiffPowerSetting=0//0%
//FrontDiffCoastSetting=0//0%
//FrontDiffPreloadSetting=0//1
//RearSplitSetting=0//RWD
//GearAutoUpShiftSetting=0//Non
//GearAutoDownShiftSetting=0//Non

[FRONTLEFT]
CamberSetting=26//-1.80 deg
//PressureSetting=0//140 kPa
PackerSetting=9//0.9 cm
SpringSetting=3//4
//TenderSpringSetting=0//Standard
//TenderTravelSetting=0//Standard
//SpringRubberSetting=0//N/A
//RideHeightSetting=0//5.0 cm
SlowBumpSetting=11//7
FastBumpSetting=2//16
SlowReboundSetting=6//12
FastReboundSetting=4//14
//BrakeDiscSetting=0//3.56 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Medium

[FRONTRIGHT]
CamberSetting=26//-1.80 deg
//PressureSetting=0//140 kPa
PackerSetting=9//0.9 cm
SpringSetting=3//4
//TenderSpringSetting=0//Standard
//TenderTravelSetting=0//Standard
//SpringRubberSetting=0//N/A
//RideHeightSetting=0//5.0 cm
SlowBumpSetting=11//7
FastBumpSetting=2//16
SlowReboundSetting=6//12
FastReboundSetting=4//14
//BrakeDiscSetting=0//3.56 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Medium

[REARLEFT]
CamberSetting=30//-1.40 deg
//PressureSetting=0//140 kPa
PackerSetting=14//1.4 cm
SpringSetting=1//2
//TenderSpringSetting=0//Standard
//TenderTravelSetting=0//Standard
//SpringRubberSetting=0//N/A
//RideHeightSetting=16//6.6 cm
SlowBumpSetting=7//11
FastBumpSetting=4//14
SlowReboundSetting=11//7
FastReboundSetting=2//16
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Medium

[REARRIGHT]
CamberSetting=30//-1.40 deg
//PressureSetting=0//140 kPa
PackerSetting=14//1.4 cm
SpringSetting=1//2
//TenderSpringSetting=0//Standard
//TenderTravelSetting=0//Standard
//SpringRubberSetting=0//N/A
//RideHeightSetting=16//6.6 cm
SlowBumpSetting=7//11
FastBumpSetting=4//14
SlowReboundSetting=11//7
FastReboundSetting=2//16
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Medium

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
FuelSetting=85//86l (12giri)
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
RWSetting=1//P2

[BODYAERO]
WaterRadiatorSetting=2//50%
OilRadiatorSetting=2//50%
BrakeDuctSetting=2//66%
BrakeDuctRearSetting=2//66%

[SUSPENSION]
//FrontWheelTrackSetting=0//Non-adjustable
//RearWheelTrackSetting=0//Non-adjustable
FrontAntiSwaySetting=4//P4
RearAntiSwaySetting=5//P5
FrontToeInSetting=16//-0.00 °
//FrontToeOffsetSetting=0//N/D
RearToeInSetting=16//-0.00 °
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
RearBrakeSetting=15//MUST be changed for stability
//BrakeMigrationSetting=0// 0.0
BrakePressureSetting=50//MUST be changed for preference
//HandfrontbrakePressSetting=0//N/A
//HandbrakePressSetting=0//N/A
//TCSetting=0//
//ABSSetting=0//N/D
TractionControlMapSetting=5//MUST be changed for track/driver preference
TCPowerCutMapSetting=5//MUST be changed for track/driver preference
TCSlipAngleMapSetting=5//MUST be changed for track/driver preference
//AntilockBrakeSystemMapSetting=0//N/A

[ENGINE]
//RevLimitSetting=0//7,500
//EngineBoostSetting=0//N/A
//RegenerationMapSetting=0//0%
ElectricMotorMapSetting=0//Not Applicable
EngineMixtureSetting=1//MUST be changed for session (e.g., 0=Quali, 1=Race, 2=Lean)
//EngineBrakingMapSetting=0//N/A

[DRIVELINE]
FinalDriveSetting=0//MUST be changed for the track
ReverseSetting=0//MUST be changed for the track
Gear1Setting=0//MUST be changed for the track
Gear2Setting=0//MUST be changed for the track
Gear3Setting=0//MUST be changed for the track
Gear4Setting=0//MUST be changed for the track
Gear5Setting=0//MUST be changed for the track
Gear6Setting=0//MUST be changed for the track
RatioSetSetting=0//MUST be changed for the track
//DiffPumpSetting=0//N/A
DiffPowerSetting=10//MUST be changed for track (on-throttle stability)
DiffCoastSetting=10//MUST be changed for track (off-throttle stability)
DiffPreloadSetting=15//MUST be changed for track (overall stability)
//FrontDiffPumpSetting=0//0%
//FrontDiffPowerSetting=0//0%
//FrontDiffCoastSetting=0//0%
//FrontDiffPreloadSetting=0//1
//RearSplitSetting=0//RWD
//GearAutoUpShiftSetting=0//
//GearAutoDownShiftSetting=0//

[FRONTLEFT]
CamberSetting=28//-2.2 °
PressureSetting=3//143 kPa
PackerSetting=26//2.6 cm
SpringSetting=2//160 N/mm
//TenderSpringSetting=0//Separata
//TenderTravelSetting=0//Separata
//SpringRubberSetting=0//Separata
RideHeightSetting=7//5.7 cm
SlowBumpSetting=3//3
FastBumpSetting=1//1
SlowReboundSetting=5//5
FastReboundSetting=8//8
//BrakeDiscSetting=0//3.50 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Morbida
EquippedTireIDSetting=-1//None Available

[FRONTRIGHT]
CamberSetting=28//-2.2 °
PressureSetting=3//143 kPa
PackerSetting=26//2.6 cm
SpringSetting=2//160 N/mm
//TenderSpringSetting=0//Separata
//TenderTravelSetting=0//Separata
//SpringRubberSetting=0//Separata
RideHeightSetting=7//5.7 cm
SlowBumpSetting=3//3
FastBumpSetting=1//1
SlowReboundSetting=5//5
FastReboundSetting=8//8
//BrakeDiscSetting=0//3.50 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Morbida
EquippedTireIDSetting=-1//None Available

[REARLEFT]
CamberSetting=29//-1.6 °
//PressureSetting=0//140 kPa
PackerSetting=24//2.4 cm
SpringSetting=1//140 N/mm
//TenderSpringSetting=0//Separata
//TenderTravelSetting=0//Separata
//SpringRubberSetting=0//Separata
RideHeightSetting=4//5.4 cm
SlowBumpSetting=1//1
FastBumpSetting=1//1
SlowReboundSetting=3//3
FastReboundSetting=4//4
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Morbida
EquippedTireIDSetting=-1//None Available

[REARRIGHT]
CamberSetting=28//-1.7 °
//PressureSetting=0//140 kPa
PackerSetting=24//2.4 cm
SpringSetting=1//140 N/mm
//TenderSpringSetting=0//Separata
//TenderTravelSetting=0//Separata
//SpringRubberSetting=0//Separata
RideHeightSetting=4//5.4 cm
SlowBumpSetting=1//1
FastBumpSetting=1//1
SlowReboundSetting=3//3
FastReboundSetting=4//4
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Morbida
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
    // Destructure initial required fields from the request body
    const { car, track, request, selectedCarCategory } = req.body; // Added selectedCarCategory

    // Validate essential parameters
    if (!car || !track || !request || !selectedCarCategory) {
        return res.status(400).json({ error: "Please provide Car, Track, Setup Request, and Car Category details." });
    }

    // Select the appropriate template based on selectedCarCategory
    const exampleTemplate = LMU_VEH_TEMPLATES[selectedCarCategory];

    if (!exampleTemplate) {
        return res.status(400).json({ error: `No .VEH template found for car category: ${selectedCarCategory}` });
    }

    // Capture or define additional prompt variables with defaults if not provided by client
     const sessionDuration = req.body.sessionDuration || 0;
    const selectedCarValue = car; // Using 'car' from request body
    const selectedCarDisplay = req.body.selectedCarDisplay || car; // Use client's display name or 'car' value
    // selectedCarCategory is already destructured
    const selectedTrackValue = track; // Using 'track' from request body
    const selectedTrackDisplay = req.body.selectedTrackDisplay || track; // Use client's display name or 'track' value
    const setupGoal = request; // Using 'request' from request body as the setup goal
    const sessionGoal = req.body.sessionGoal || 'Optimal Lap Time'; // Default or get from client
    const selectedWeather = req.body.selectedWeather || 'Dry'; // Default or get from client
    const weatherGuidance = req.body.weatherGuidance || `Track is ${selectedWeather.toLowerCase()}.`; // Basic guidance based on selection
    const trackTemp = req.body.trackTemp || 25; // Default to 25°C or get from client
    const specificRequest = req.body.specificRequest || 'None'; // Default or get from client
    const fuelEstimateRequest = req.body.fuelEstimateRequest || ''; // Default or get from client
    const tireCompoundGuidance = req.body.tireCompoundGuidance || 'Choose appropriate compound for dry conditions (e.g., 0 for Soft, 1 for Medium, 2 for Hard).'; // Default or get from client

    // Construct the prompt for the AI
    const prompt = `You are a world-class Le Mans Ultimate (LMU) car setup engineer. Your goal is to generate a complete and valid .VEH file based on a user's request.

1.  Analyze the user's request: car, track, goals (e.g., stability, qualifying pace), weather, and temperature.
2.  Based on the track, reason about the key settings needed for a fast and drivable car. For example: "This is Le Mans, so I need very long gear ratios, low wing settings for top speed, and stiff suspension for high-speed stability."
3.  Generate the numerical values for every single parameter in the .VEH file.
4.  **Review and Refine:** Look over the generated values. Is the setup logical? Is the aero balance reasonable? Are the springs and dampers complementary? Ensure the setup will be stable and predictable, unless the user specifically asked for an 'aggressive' car. Make final adjustments for balance and drivability.
5.  Format the final output strictly as a .VEH file, starting with 'VehicleClassSetting=...' and containing no other text.

// Insert this block into your main prompt variable

**Fuel & Strategy Calculation:**
- This is a CRITICAL task. If the 'Session Goal' is 'Race' and 'Session Duration' is greater than 0, you must perform a fuel calculation based on time.
- **Methodology:**
    1.  First, for the ${selectedCarValue} on ${selectedTrackValue}, estimate a reasonable average race lap time (in minutes).
    2.  Calculate the number of laps possible within the stint by dividing the 'Session Duration' (${sessionDuration} minutes) by your estimated lap time. Round this down to the nearest whole lap.
    3.  Next, estimate the fuel consumption per lap (in Liters) for the car.
    4.  Calculate the total fuel needed by multiplying the fuel-per-lap by the number of laps calculated in step 2.
    5.  Add a safety margin of **1.5 extra laps** worth of fuel to the total.
    6.  Round the final number to the nearest whole number (e.g., 85.7 becomes 86).
- **Output:**
    1.  You MUST update the `FuelSetting` in the [GENERAL] section with this final calculated value.
    2.  You MUST update the `Notes` field in the [GENERAL] section to state the calculation (e.g., "Race fuel for a ${sessionDuration} min stint").
- **Exception:** If the 'Session Goal' is 'Qualifying', ignore the duration and use a standard low fuel amount suitable for 2-3 fast laps.
**CRITICAL INSTRUCTION: The template below uses OBVIOUS PLACEHOLDER values (e.g., 'Gear1Setting=5'). You MUST replace these placeholders with your new, calculated values. A setup returned with placeholder values like 'Gear1Setting=5' or 'RearBrakeSetting=15' is a complete failure. Do not copy the placeholder values.**

Here are the details for the setup request:
Car: ${selectedCarValue} (Display Name: ${selectedCarDisplay}, Category: ${selectedCarCategory})
Track: ${selectedTrackValue} (Display Name: ${selectedTrackDisplay})
Setup Goal: ${setupGoal}
Session Goal: ${sessionGoal}
Weather: ${selectedWeather} (${weatherGuidance})
Track Temperature: ${trackTemp}°C
Specific User Request: ${specificRequest}
${fuelEstimateRequest}

**CRITICAL INSTRUCTION: The template below uses OBVIOUS PLACEHOLDER values (e.g., 'Gear1Setting=5'). You MUST replace these placeholders with your new, calculated values. A setup returned with placeholder values like 'Gear1Setting=5' or 'RearBrakeSetting=15' is a complete failure. Do not copy the placeholder values.**

Crucial LMU Setup Principles to Apply:
Qualifying vs. Race Philosophy: The Trade-Off Between Pace and Consistency.
A qualifying setup is for a single, perfect lap. It can be aggressive, unstable ("on a knife-edge"), and hard on tires. A race setup must be stable, predictable, and gentle on tires for an entire stint, even as fuel burns off and tires wear out. The AI should adjust its entire approach based on the Session Goal, not just the fuel load. For a race setup, it should prioritize stability and tire preservation over ultimate one-lap pace.

The Aero-Mechanical Balance: How a Change in One Area Affects Another.
A car's setup is a web of interconnected settings. A significant change to aerodynamics must be balanced by a change to the suspension. For example, adding a lot of rear wing ('[REARWING]') to increase rear downforce will shift the car's aero balance rearward, potentially creating understeer. A real engineer would then consider stiffening the front anti-sway bar ('FrontAntiSwaySetting') or softening the rear to bring the car's mechanical handling balance back to neutral. The AI should understand this relationship.

Gear ratios (FinalDriveSetting, Gear1Setting-Gear7Setting) MUST be adjusted realistically for the specific track and car, NOT fixed or generic.
For Circuit de la Sarthe (Le Mans) and its layouts, ensure a high top speed by selecting a LONG FinalDriveSetting and adjusting individual gears accordingly. Avoid short gearing.
Engine settings like RegenerationMapSetting and ElectricMotorMapSetting (for hybrid cars) MUST be performance-oriented (e.g., 10 for regen, 3 or 4 for motor map if applicable), NOT "Safety-car" or "N/A".

Tire Temperature as the Ultimate Goal: The "Why" Behind Pressure and Camber.
The ultimate goal for any tire setting (Pressure, Camber, Toe) is to have the tire's core temperature consistently in the optimal grip window (typically 85-100°C for GTs and prototypes) during a run. The AI should see pressure and camber not as independent settings, but as tools to achieve this critical temperature target across the tire's surface.

Tire Pressures (PressureSetting in [FRONTLEFT]/[FRONTRIGHT]/[REARLEFT]/[REARRIGHT]) should target optimal hot temperatures. A common goal for hot pressure is around 180-200 kPa. Cold pressure settings like 0-5 are often common starting points in LMU. These values are highly car/track dependent.
Tyre Compound (CompoundSetting) MUST be a numerical value (0 for Soft/Wet, 1 for Medium, 2 for Hard). ${tireCompoundGuidance}
Tyre Pressure (PressureSetting) MUST be a numerical value (e.g., 0 for 135kPa, 1 for 136kPa, etc.) corresponding to realistic pressures, NOT "N/A" or a fixed kPa value in the setting itself.
Camber (CamberSetting in wheel sections) must be set for optimal cornering grip and even tire wear. More negative camber increases cornering grip but can reduce straight-line traction and wear the inner edge.

All Suspension settings (AntiSway, Toe, Camber, Spring, RideHeight, Bump, Rebound, Packers) must be adjusted for the car/track/goal.
Brake settings (RearBrakeSetting, BrakePressureSetting) must be adjusted for the car/track/goal.
Traction Control/ABS maps MUST be adjusted for the car/track/goal.
Aerodynamic efficiency is crucial. Balance downforce for cornering grip with minimal drag for top speed, especially on tracks with long straights (like Le Mans or Monza).
Front and Rear Wing settings MUST be proportional to the track's downforce demands. High downforce for technical tracks (e.g., Imola, COTA), lower for high-speed tracks.
Brake Duct settings MUST be minimized for aero efficiency (e.g., 0-3 for front, 0-5 for rear) unless brake temperatures are consistently overheating (check if track temp is high).
Overall Balance: The setup should aim for a neutral handling balance, avoiding extreme understeer or oversteer unless explicitly requested (e.g., 'aggressive' setup). Predictability is key for faster lap times.
Compliance: Ensure sufficient suspension compliance over bumps and curbs to maintain tire contact, especially on tracks like Sebring or Spa.
Rake Angle: Adjust front and rear ride heights to create an optimal rake angle (rear ride height typically higher than front) for maximizing diffuser performance and overall downforce without excessive drag.
Anti-Sway Bars (FrontAntiSwaySetting, RearAntiSwaySetting) should be tuned for handling balance. Stiffer front promotes understeer, softer front promotes oversteer. Stiffer rear promotes oversteer, softer rear promotes understeer. Adjust to achieve desired balance (e.g., softer for safe, stiffer for aggressive).
Ride Heights (FrontRideHeightSetting, RearRideHeightSetting) should be set low for maximum downforce but ensure sufficient clearance for curbs and bumps. Maintain appropriate rake (rear higher than front) for diffuser efficiency.
Spring Rates (SpringSetting) should match track characteristics. Softer springs for bumpy tracks (e.g., Sebring) or long-distance comfort/tire wear. Stiffer springs for smooth tracks and sharp responsiveness.
Dampers (Slow/Fast Bump/Rebound) are critical for weight transfer and tire contact. Soft bump settings for better mechanical grip and compliance over bumps. Stiffer rebound settings for better body control and stability after compression.
Toe-in/Toe-out (FrontToeInSetting, RearToeInSetting) should be precise. Front toe-out for sharper turn-in. Rear toe-in for stability. Rear toe-out (if allowed/used) for aggressive rotation.
Brake Bias (RearBrakeSetting) MUST be adjusted for stability under braking and turn-in. Shift forward for stability, shift rearward for rotation. Common range 52-58%.
Brake Pressure (BrakePressureSetting) should be maximized for stopping power without causing excessive lock-ups for the specific car/track/ABS setting.
Engine Mixture (EngineMixtureSetting): Usually '0' (Full power) for qualifying and '1' (Race) for races, unless fuel saving is prioritized.
Differential Power (DiffPowerSetting) affects on-throttle stability. Higher values provide more traction but can induce on-throttle oversteer. Lower values promote rotation but might lose traction.
Differential Coast (DiffCoastSetting) affects off-throttle stability. Higher values increase stability on lift-off. Lower values promote lift-off oversteer.
Differential Preload (DiffPreloadSetting) affects low-speed and overall stability. Higher values increase stability but can cause understeer on turn-in.
Automatic Shifting (GearAutoUpShiftSetting, GearAutoDownShiftSetting): Always '0' (Off) for performance setups.

The Importance of Useful Comments: Explaining the "What".
The AI should be instructed that the '//Comment' part of each setting is not just for show. It should be a concise, useful description of the actual value being set (e.g., 'PressureSetting=5//140 kPa', 'RWSetting=3//P4', 'FrontAntiSwaySetting=16//D-P1'). This makes the generated '.VEH' file much more human-readable and useful for the end-user, reinforcing the AI's role as an expert.

Example of expected LMU .VEH structure (use this as the exact template to fill in values):
${exampleTemplate}

Now generate the setup:
`;

    try {
        // --- CORRECTED API CALL SECTION ---
        console.log("Sending prompt to OpenRouter AI for car:", car, "track:", track, "category:", selectedCarCategory, "using model:", PRIMARY_MODEL);

        const openrouterResponse = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                // Recommended headers for OpenRouter
                'HTTP-Referer': 'https://test-hrwc.onrender.com', // Your app's URL
                'X-Title': 'LMU Setup Generator', // Your app's name
            },
            body: JSON.stringify({
                model: PRIMARY_MODEL,
                messages: [
                    { role: "system", content: "You are a helpful assistant that generates LMU car setups. You must respond only with the .VEH file content and strictly adhere to the provided LMU .VEH format and section structure. DO NOT include markdown code blocks or any other extraneous text." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 4096,
                temperature: 0.4,
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

        // Trim leading/trailing whitespace AND markdown code blocks (if present)
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
