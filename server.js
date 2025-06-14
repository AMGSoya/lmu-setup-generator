// --- server.js (Final Version) ---

// 1. Load environment variables from .env file
require('dotenv').config();

// 2. Import necessary libraries
const express = require('express');
const path = require('path');
// 3. Initialize Express app and define port

const app = express();
const port = process.env.PORT || 3000;
// 4. Middleware to parse JSON bodies
app.use(express.json());

// 5. Serve static files
app.use(express.static(path.join(__dirname)));

// 6. Get API Keys from .env file
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY; // Loaded but not used in primary flow

// 7. API Key Validation
if (!OPENROUTER_API_KEY) {
    console.error("ERROR: OPENROUTER_API_KEY not found in your .env file.");
    process.exit(1);
}

// 8. Define OpenRouter API endpoint and Model
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
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
Front3rdTenderSpringSetting=0//Detache
Front3rdTenderTravelSetting=0//Detached
Front3rdSlowBumpSetting=0//1
Front3rdFastBumpSetting=2//3
Front3rdSlowReboundSetting=4//5
Front3rdFastReboundSetting=2//3
Rear3rdPackerSetting=10//1.0 cm
Rear3rdSpringSetting=7//7
Rear3rdTenderSpringSetting=0//Detached
Rear3rdTenderTravelSetting=0//Detached
Rear3rdSlowBumpSetting=0//
Rear3rdFastBumpSetting=2//3
Rear3rdSlowReboundSetting=0//1
Rear3rdFastReboundSetting=2//3
ChassisAdj00Setting=0//Alernative

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
RideHeightSetting=15//MUST be changed for tack (and rake)
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
RWSetting=0//P1-P9

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
Front3rdPackerSetting=6//0. cm
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

**CRITICAL INSTRUCTION: The template below uses OBVIOUS PLACEHOLDER values (e.g., 'Gear1Setting=0//MUST be changed for the track'). You MUST replace these placeholders with your new, calculated, and numerically valid values. A setup returned with placeholder values like 'Gear1Setting=0//MUST be changed for the track' is a complete failure and will be rejected. Remove ALL 'MUST be changed' comments and replace with actual calculations or 'N/A'/'Non-adjustable' where appropriate.**

Crucial LMU Setup Principles to Apply:

// --- NEW IMPROVEMENT TO MAKE SETUPS BETTER ---
Track-Type Philosophy: My entire setup approach must change based on the track. 
- For High-Speed tracks (e.g., Circuit de la Sarthe (Le Mans), Monza, Spa-Francorchamps), I must prioritize top speed by using low wing angles, longer gear ratios (higher FinalDriveSetting values, numerically lower individual gears like Gear1-7), and stiffer springs/dampers for high-speed stability.
- For Technical/Bumpy tracks (e.g., Sebring International Raceway, Autódromo Internacional do Algarve (Portimão)), I must prioritize braking stability and cornering grip by using higher wing angles (if beneficial for downforce balance), shorter gear ratios for acceleration (lower FinalDriveSetting values, numerically higher individual gears), and softer, more compliant suspension settings.

Driver-Centric Adjustments:
- For a 'Safe' or 'Stable' request, I will prioritize predictability: using slightly softer suspension settings, higher wing angles for stability (if appropriate for track type), and less aggressive differential locking.
- For an 'Aggressive' request, I will prioritize responsiveness and rotation: using stiffer springs and dampers, more negative front camber for sharp turn-in, and differential settings that allow the rear to rotate.
- If the driver reports 'understeer', I will focus on changes that increase front-end grip (e.g., soften front anti-roll bar, stiffen rear anti-roll bar, more negative front camber, slightly increase front ride height).
- If the driver reports 'oversteer', I will focus on changes that increase rear-end stability (e.g., stiffen front anti-roll bar, soften rear anti-roll bar, less negative rear camber, slightly reduce rear ride height).

Qualifying vs. Race Philosophy: For a race setup, I will prioritize stability and tire preservation over ultimate one-lap pace. For qualifying, maximize raw pace.

Engineer's Commentary in Notes: The [GENERAL] Notes section is critical. I must use it to briefly explain the setup's core philosophy (e.g., "Le Mans setup: Low wings for top speed, stiff springs for stability.") and include the fuel calculation.

**Specific Guidance for ENGINE and DRIVELINE (Crucial for fixing the issue):**
- **RegenerationMapSetting (for Hybrids like Hypercars):** For Race sessions, aim for `10` (max regen). For Qualifying, a lower value like `8` or `9` might be used. For non-hybrids, this should be `0//N/A`.
- **ElectricMotorMapSetting (for Hybrids like Hypercars):** For Race sessions, use `3` or `4` for usable electric power. For Qualifying, `4` for maximum boost. For non-hybrids (LMP2, GT3, GTE), this *must* be `0//Not Applicable`. Do NOT output "safety-car" or any other non-numerical value.
- **EngineMixtureSetting:** For Qualifying, use `0//Full`. For Race sessions, use `1//Race` unless fuel saving is a very specific request, then consider `2//Lean`.
- **FinalDriveSetting & Gears (Gear1Setting-Gear7Setting):** These are paramount for track type.
    - **High-Speed Tracks (e.g., Le Mans, Monza):** Choose a **longer** FinalDriveSetting (numerically higher values like 0-7, depending on car) and adjust individual gears to stretch them for top speed. The comments for individual gears should reflect the calculated speed.
    - **Technical Tracks (e.g., Sebring, Imola):** Choose a **shorter** FinalDriveSetting (numerically lower values, or 0 if default is short) and adjust individual gears for quicker acceleration out of corners.
- **DiffPowerSetting (on-throttle):** Higher for more traction, lower for more rotation. Adjust based on setup goal and driver feedback. (e.g., 0-15 typical range).
- **DiffCoastSetting (off-throttle):** Higher for more stability on lift-off, lower for more rotation. Adjust based on setup goal and driver feedback. (e.g., 0-20 typical range).
- **DiffPreloadSetting:** Affects low-speed stability. Higher for more stability, lower for more maneuverability. (e.g., 0-100 Nm typical range).
- **RatioSetSetting:** `0` for Standard, `1` for Long/High Speed, etc. Adjust based on track type.

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
        let text = chatCompletion.choices[0].message.content.trim();

        // Remove markdown code blocks if the AI still includes them
        if (text.startsWith('```') && text.endsWith('```')) {
            text = text.replace(/^```[a-zA-Z]*\n|\n```$/g, '').trim();
        }

        if (text && text.startsWith('VehicleClassSetting=')) {
            res.json({ setup: text });
        } else {
            console.error("AI generated an invalid setup format.");
            console.error("AI Raw Response (first 500 chars):", text ? text.substring(0, 500) : '[Empty Response]');
            res.status(500).json({ error: `AI generated an invalid setup format or incomplete response. Raw AI response snippet: ${text ? text.substring(0, 200) : '[Empty Response]'}` });
        }

    } catch (error) {
        console.error("Error communicating with OpenRouter:", error);
        res.status(500).json({ error: `Failed to connect to AI service. Error: ${error.message}` });
    }
});
