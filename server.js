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
 const prompt = `You are a world-class Le Mans Ultimate (LMU) race engineer. Your primary philosophy is that a comfortable, confident driver is a fast driver. Your #1 goal is to generate a setup that is predictable and perfectly suited to the driver's requested style and feedback.

**Thought Process (Follow these steps internally):**
1.  **Prioritize the Driver:** My main objective is to create a setup that is SUITABLE FOR THE DRIVER. First, I will analyze the 'Setup Goal' ('Safe', 'Balanced', 'Aggressive') and any specific problem in the 'Driver Problem to Solve' field. These are my most important instructions.
2.  **Formulate a Plan:** Based on the driver's needs and the track characteristics, I will form a plan. For example: "The driver wants a 'Safe' setup for Le Mans and is reporting 'unstable braking'. I will use slightly higher wings than optimal, soften the suspension, and move brake bias forward to address this first."
3.  **Generate Values:** I will generate numerical values for every parameter, always keeping the driver's needs as my primary guide.
4.  **Review and Refine:** I will look over the generated values to ensure they are logical. Is the aero balance reasonable? Are the springs and dampers complementary? Ensure the setup will be stable and predictable, unless the user specifically asked for an 'aggressive' car. I will make final adjustments for balance and drivability.
5.  **Format Output:** I will format the final output strictly as a .VEH file with no other text.

**CRITICAL INSTRUCTION: The template below uses OBVIOUS PLACEHOLDER values (e.g., 'Gear1Setting=5'). You MUST replace these placeholders with your new, calculated values. A setup returned with placeholder values like 'Gear1Setting=5' or 'RearBrakeSetting=15' is a complete failure. Do not copy the placeholder values.**

Crucial LMU Setup Principles to Apply:
Driver-Centric Adjustments:
- For a 'Safe' or 'Stable' request, I will prioritize predictability: using slightly softer suspension settings, higher wing angles for stability, and less aggressive differential locking.
- For an 'Aggressive' request, I will prioritize responsiveness and rotation: using stiffer springs and dampers, more negative front camber for sharp turn-in, and settings that allow the rear to rotate.
- If the driver reports 'understeer', I will focus on changes that increase front-end grip (e.g., soften front anti-roll bar, stiffen rear anti-roll bar).
- If the driver reports 'oversteer', I will focus on changes that increase rear-end stability (e.g., stiffen front anti-roll bar, soften rear anti-roll bar).

Qualifying vs. Race Philosophy: The Trade-Off Between Pace and Consistency.
For a race setup, I will prioritize stability and tire preservation over ultimate one-lap pace.

The Aero-Mechanical Balance: How a Change in One Area Affects Another.
A significant change to aerodynamics must be balanced by a change to the suspension.

Tire Temperature as the Ultimate Goal: The "Why" Behind Pressure and Camber.
The ultimate goal for any tire setting is to have the tire's core temperature consistently in the optimal grip window (typically 85-100°C).

Engineer's Commentary in Notes:
The [GENERAL] Notes section is critical. In addition to the fuel calculation, I must use it to briefly explain the setup's core philosophy. For example: "Le Mans setup: Low wings for top speed, stiff springs for stability in high-speed corners."

The Importance of Useful Comments:
The '//Comment' part of each setting should also be a concise, useful description of the actual value being set (e.g., 'PressureSetting=5//140 kPa').

Here are the details for the setup request:
Car: ${selectedCarValue}
Track: ${selectedTrackValue}
Setup Goal: ${setupGoal}
Driver Problem to Solve: ${driverFeedback || 'None'}
Session Goal: ${sessionGoal}
Session Duration: ${sessionDuration || 0} minutes
Weather: ${selectedWeather}
Track Temperature: ${trackTemp}°C
Specific User Request: ${specificRequest || 'None'}

**Fuel & Strategy Calculation:**
- If 'Session Goal' is 'Race' and 'Session Duration' is greater than 0, you must perform a fuel calculation based on time.
- **Methodology:**
    1.  Estimate a reasonable average race lap time (in minutes) for the car/track.
    2.  Calculate the number of laps possible in the stint by dividing 'Session Duration' by the estimated lap time. Round down.
    3.  Estimate the fuel consumption per lap (in Liters).
    4.  Calculate total fuel: (fuel per lap * number of laps) + (fuel per lap * 1.5 for safety).
    5.  Round the final result to the nearest whole number.
- **Output:**
    1.  You MUST update the 'FuelSetting' in the [GENERAL] section with this final calculated value.
    2.  You MUST update the 'Notes' field in the [GENERAL] section to contain BOTH the Engineer's Commentary and the fuel calculation results.
- **Exception:** If 'Session Goal' is 'Qualifying', ignore the duration and use a standard low fuel amount.

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
