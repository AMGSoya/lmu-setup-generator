// --- server.js (for OpenRouter API - Full .VEH Example with Category Templates) ---

// 1. Load environment variables from .env file
require('dotenv').config();

// 2. Import necessary libraries
const express = require('express');
const path = require('path');
// Node.js v18+ has a built-in fetch API, so node-fetch is no longer needed

// 3. Initialize Express app and define port
const app = express();
const port = 3000;

// 4. Middleware to parse JSON bodies
app.use(express.json());

// 5. Serve static files (assuming your index.html and client-side JS are in the same directory)
app.use(express.static(path.join(__dirname)));

// 6. Get your API key from the .env file
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Basic check for API key
if (!OPENROUTER_API_KEY) {
    console.error("ERROR: OPENROUTER_API_KEY not found in your .env file.");
    console.error("Please ensure you have a .env file in the same directory as server.js");
    console.error("And it contains the line: OPENROUTER_API_KEY=YOUR_ACTUAL_OPENROUTER_KEY_HERE");
    process.exit(1);
}

// 7. Define OpenRouter API endpoint and Model
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = 'deepseek/deepseek-chat-v3-0324:free'; // Verify this model is active and accessible

// --- Define LMU .VEH Example Templates by Category ---
const LMU_VEH_TEMPLATES = {
    'Hypercar': `VehicleClassSetting="Ferrari_499P Hypercar WEC2024"
UpgradeSetting=(2,0,0,0)
//VEH=C:\\Program Files (x86)\\Steam\\steamapps\\common\\Le Mans Ultimate\\Installed\\Vehicles\\Ferrari_499P_2023\\1.35\\50_24_AFCO4AB4105B.VEH
//UpgradeClass=
//Tyre Restrictions=2
//AI Tweaks=0
//Atmos Conditions=0
//Note: settings commented out if using the default

[GENERAL]
Notes="Quali 72% Energy 1.0 fuelÿ 0.90 fuel for drivingÿRace 100% Energy 1.1 fuelÿ0.95 while race"
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
RearBrakeSetting=14//53.7:46.3
BrakeMigrationSetting=3//1.0% F
BrakePressureSetting=70//110 kgf (92%)
HandfrontbrakePressSetting=0//0%
HandbrakePressSetting=0//N/A
TCSetting=0//Available
ABSSetting=0//N/A
TractionControlMapSetting=10//10
TCPowerCutMapSetting=7//7
TCSlipAngleMapSetting=10//10
AntilockBrakeSystemMapSetting=0//N/A

[ENGINE]
RevLimitSetting=0//8,500
EngineBoostSetting=0//N/A
RegenerationMapSetting=10//200kW
ElectricMotorMapSetting=1//20kW
EngineMixtureSetting=0//Full
EngineBrakingMapSetting=0//N/A

[DRIVELINE]
FinalDriveSetting=0//2.98:1
ReverseSetting=0//2.07 (6.18)
Gear1Setting=1//2.69 (8.03)
Gear2Setting=0//2.20 (6.56)
Gear3Setting=1//1.80 (5.37)
Gear4Setting=1//1.47 (4.39)
Gear5Setting=1//1.27 (3.79)
Gear6Setting=1//1.11 (3.30)
Gear7Setting=1//1.00 (2.98)
RatioSetSetting=1//Long
DiffPumpSetting=0//N/A
DiffPowerSetting=4//30%
DiffCoastSetting=6//40%
DiffPreloadSetting=11//55 Nm
FrontDiffPumpSetting=0//N/A
FrontDiffPowerSetting=8//50%
FrontDiffCoastSetting=0//10%
FrontDiffPreloadSetting=45//45 Nm
RearSplitSetting=0// 0.0:100.0
GearAutoUpShiftSetting=0//Off
GearAutoDownShiftSetting=0//Off

[FRONTLEFT]
CamberSetting=35//-0.5 deg
PressureSetting=0//135 kPa
PackerSetting=5//0.5 cm
SpringSetting=12//16.44mm
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=10//5.0 cm
SlowBumpSetting=7//8
FastBumpSetting=4//5
SlowReboundSetting=6//7
FastReboundSetting=4//5
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//Soft

[FRONTRIGHT]
CamberSetting=35//-0.5 deg
PressureSetting=0//135 kPa
PackerSetting=5//0.5 cm
SpringSetting=12//16.44mm
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=10//5.0 cm
SlowBumpSetting=7//8
FastBumpSetting=4//5
SlowReboundSetting=6//7
FastReboundSetting=4//5
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//Soft

[REARLEFT]
CamberSetting=35//-0.5 deg
PressureSetting=0//135 kPa
PackerSetting=8//0.8 cm
SpringSetting=0//13.33mm
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=5//6.5 cm
SlowBumpSetting=2//3
FastBumpSetting=1//2
SlowReboundSetting=3//4
FastReboundSetting=2//3
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//Soft

[REARRIGHT]
CamberSetting=35//-0.5 deg
PressureSetting=0//135 kPa
PackerSetting=8//0.8 cm
SpringSetting=0//13.33mm
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=5//6.5 cm
SlowBumpSetting=2//3
FastBumpSetting=1//2
SlowReboundSetting=3//4
FastReboundSetting=2//3
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//Soft

[BASIC]
Downforce=0.500000
Balance=0.500000
Ride=0.500000
Gearing=0.500000
Custom=1`,

    'LMP2': `VehicleClassSetting="LMP2 Oreca_07"
UpgradeSetting=(12,0,0,0)
//VEH=C:\\Program Files (x86)\\Steam\\steamapps\\common\\Le Mans Ultimate\\Installed\\Vehicles\\Oreca_07_LM_2023\\1.23\\14_NIELSENEC663C52.VEH
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
//RearBrakeSetting=13//54.1:45.9
//BrakeMigrationSetting=0// 0.0
//BrakePressureSetting=60//100 kgf (83%)
//HandfrontbrakePressSetting=0//0%
//HandbrakePressSetting=0//N/A
//TCSetting=0//Available
//ABSSetting=0//N/A
TractionControlMapSetting=7//7
TCPowerCutMapSetting=4//4
TCSlipAngleMapSetting=7//Linked
//AntilockBrakeSystemMapSetting=0//N/A

[ENGINE]
//RevLimitSetting=0//8000
//EngineBoostSetting=0//N/A
//RegenerationMapSetting=0//0%
//ElectricMotorMapSetting=0//
//EngineMixtureSetting=1//Race
//EngineBrakingMapSetting=0//N/A

[DRIVELINE]
//FinalDriveSetting=0//2.88:1
//ReverseSetting=0//2.85 (8.18)
Gear1Setting=0//2.85 (8.18)
Gear2Setting=0//2.20 (6.33)
Gear3Setting=1//1.88 (5.39)
Gear4Setting=1//1.62 (4.67)
Gear5Setting=1//1.42 (4.09)
Gear6Setting=1//1.27 (3.66)
//RatioSetSetting=1//High Speed
//DiffPumpSetting=0//N/A
DiffPowerSetting=0//FF6-60 deg
DiffCoastSetting=2//FF6-45 deg
DiffPreloadSetting=17//85 Nm
//FrontDiffPumpSetting=0//0%
//FrontDiffPowerSetting=0//0%
//FrontDiffCoastSetting=0//0%
//FrontDiffPreloadSetting=0//1
//RearSplitSetting=0// 0.0:100.0
//GearAutoUpShiftSetting=0//Off
//GearAutoDownShiftSetting=0//Off

[FRONTLEFT]
CamberSetting=11//-1.5 deg
//PressureSetting=0//140 kPa
PackerSetting=3//0.3 cm
SpringSetting=0//150N/mm
//TenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SpringRubberSetting=0//Detached
RideHeightSetting=10//4.5 cm
SlowBumpSetting=4//5
FastBumpSetting=1//2
SlowReboundSetting=2//3
FastReboundSetting=1//2
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Medium
//EquippedTireIDSetting=-1//None Available

[FRONTRIGHT]
CamberSetting=11//-1.5 deg
//PressureSetting=0//140 kPa
PackerSetting=3//0.3 cm
SpringSetting=0//150N/mm
//TenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SpringRubberSetting=0//Detached
RideHeightSetting=10//4.5 cm
SlowBumpSetting=4//5
FastBumpSetting=1//2
SlowReboundSetting=2//3
FastReboundSetting=1//2
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Medium
//EquippedTireIDSetting=-1//None Available

[REARLEFT]
CamberSetting=5//-1.0 deg
//PressureSetting=0//140 kPa
PackerSetting=1//0.1 cm
//SpringSetting=3//1100lbf/in
//TenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SpringRubberSetting=0//Detached
RideHeightSetting=24//7.0 cm
SlowBumpSetting=0//1 (soft)
FastBumpSetting=0//1 (soft)
SlowReboundSetting=1//2
FastReboundSetting=0//1 (soft)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Medium
//EquippedTireIDSetting=-1//None Available

[REARRIGHT]
CamberSetting=5//-1.0 deg
//PressureSetting=0//140 kPa
PackerSetting=1//0.1 cm
//SpringSetting=3//1100lbf/in
//TenderSpringSetting=0//Detached
//TenderTravelSetting=0//Detached
//SpringRubberSetting=0//Detached
RideHeightSetting=24//7.0 cm
SlowBumpSetting=0//1 (soft)
FastBumpSetting=0//1 (soft)
SlowReboundSetting=1//2
FastReboundSetting=0//1 (soft)
//BrakeDiscSetting=0//3.20 cm
//BrakePadSetting=0//1
//CompoundSetting=0//Medium
//EquippedTireIDSetting=-1//None Available

[BASIC]
Downforce=0.500000
Balance=0.500000
Ride=0.500000
Gearing=0.500000
Custom=1`,

    'GT3': `VehicleClassSetting="GT3 Lamborghini_Huracan_GT3_Evo2 WEC2024"
UpgradeSetting=(6342,0,0,0)

[GENERAL]
Notes="Quali Setup - REVISED for MAX High-Speed Stability (Raidillon fix). Expect understeer."
Symmetric=1
CGHeightSetting=0
CGRightSetting=0
CGRearSetting=0
WedgeSetting=0
FuelSetting=8
FuelCapacitySetting=0
VirtualEnergySetting=36
NumPitstopsSetting=0
Pitstop1Setting=50
Pitstop2Setting=50
Pitstop3Setting=50

[LEFTFENDER]
FenderFlareSetting=0

[RIGHTFENDER]
FenderFlareSetting=0

[FRONTWING]
FWSetting=0 // MIN Front downforce for max rear stability

[REARWING]
RWSetting=6 // MAX Rear downforce for high-speed stability (Raidillon)

[BODYAERO]
WaterRadiatorSetting=0
OilRadiatorSetting=0
BrakeDuctSetting=3
BrakeDuctRearSetting=5

[SUSPENSION]
FrontWheelTrackSetting=0
RearWheelTrackSetting=0
FrontAntiSwaySetting=2
RearAntiSwaySetting=0
FrontToeInSetting=15
FrontToeOffsetSetting=0
RearToeInSetting=25 // MAX Rear Toe-in for ultimate stability
RearToeOffsetSetting=0
LeftCasterSetting=0
RightCasterSetting=0
LeftTrackBarSetting=0
RightTrackBarSetting=0
Front3rdPackerSetting=0
Front3rdSpringSetting=0
Front3rdTenderSpringSetting=0
Front3rdTenderTravelSetting=0
Front3rdSlowBumpSetting=27 // Softer front dampers for compliance
Front3rdFastBumpSetting=29
Front3rdSlowReboundSetting=25
Front3rdFastReboundSetting=19
Rear3rdPackerSetting=0
Rear3rdSpringSetting=0
Rear3rdTenderSpringSetting=0
Rear3rdTenderTravelSetting=0
Rear3rdSlowBumpSetting=30 // Stiffer rear slow bump for platform control
Rear3rdFastBumpSetting=37 // Stiffer rear fast bump for platform control
Rear3rdSlowReboundSetting=30 // Stiffer rear slow rebound for controlled extension
Rear3rdFastReboundSetting=40 // Stiffer rear fast rebound for controlled extension
ChassisAdj00Setting=0
ChassisAdj01Setting=0
ChassisAdj02Setting=0
ChassisAdj03Setting=0
ChassisAdj04Setting=0
ChassisAdj05Setting=0
ChassisAdj06Setting=0
ChassisAdj07Setting=0
ChassisAdj08Setting=0
ChassisAdj09Setting=0
ChassisAdj10Setting=0
ChassisAdj11Setting=0

[CONTROLS]
SteerLockSetting=7
RearBrakeSetting=15 // Move brake bias forward
BrakeMigrationSetting=0
BrakePressureSetting=95
HandfrontbrakePressSetting=0
HandbrakePressSetting=0
TCSetting=0
ABSSetting=0
TractionControlMapSetting=10 // MAX TC
TCPowerCutMapSetting=10 // MAX TC power cut
TCSlipAngleMapSetting=10 // MAX TC slip angle
AntilockBrakeSystemMapSetting=8

[ENGINE]
RevLimitSetting=0
EngineBoostSetting=0
RegenerationMapSetting=0
ElectricMotorMapSetting=0
EngineMixtureSetting=1
EngineBrakingMapSetting=0

[DRIVELINE]
FinalDriveSetting=0
ReverseSetting=0
Gear1Setting=0
Gear2Setting=0
Gear3Setting=0
Gear4Setting=0
Gear5Setting=0
Gear6Setting=0
RatioSetSetting=0
DiffPumpSetting=0
DiffPowerSetting=0
DiffCoastSetting=0
DiffPreloadSetting=90 // MAX Diff Preload
FrontDiffPumpSetting=0
FrontDiffPowerSetting=0
FrontDiffCoastSetting=0
FrontDiffPreloadSetting=0
RearSplitSetting=0
GearAutoUpShiftSetting=0
GearAutoDownShiftSetting=0

[FRONTLEFT]
CamberSetting=18 // Less negative front camber
PressureSetting=2
PackerSetting=10
SpringSetting=5 // Slightly stiffer front springs
TenderSpringSetting=0
TenderTravelSetting=0
SpringRubberSetting=0
RideHeightSetting=5 // Slightly higher front ride height
SlowBumpSetting=27
FastBumpSetting=29
SlowReboundSetting=25
FastReboundSetting=19
BrakeDiscSetting=0
BrakePadSetting=0
CompoundSetting=0

[FRONTRIGHT]
CamberSetting=18
PressureSetting=2
PackerSetting=10
SpringSetting=5
TenderSpringSetting=0
TenderTravelSetting=0
SpringRubberSetting=0
RideHeightSetting=5
SlowBumpSetting=27
FastBumpSetting=29
SlowReboundSetting=25
FastReboundSetting=19
BrakeDiscSetting=0
BrakePadSetting=0
CompoundSetting=0

[REARLEFT]
CamberSetting=8 // Significantly less negative rear camber
PressureSetting=2
PackerSetting=25
SpringSetting=3 // Slightly stiffer rear springs
TenderSpringSetting=0
TenderTravelSetting=0
SpringRubberSetting=0
RideHeightSetting=20 // Higher rear ride height
SlowBumpSetting=25 // Reverted to default (slightly softer)
FastBumpSetting=32 // Reverted to default (slightly softer)
SlowReboundSetting=24 // Reverted to default (slightly softer)
FastReboundSetting=35 // Reverted to default (slightly softer)
BrakeDiscSetting=0
BrakePadSetting=0
CompoundSetting=0

[REARRIGHT]
CamberSetting=8
PressureSetting=2
PackerSetting=25
SpringSetting=3
TenderSpringSetting=0
TenderTravelSetting=0
SpringRubberSetting=0
RideHeightSetting=20
SlowBumpSetting=25
FastBumpSetting=32
SlowReboundSetting=24
FastReboundSetting=35
BrakeDiscSetting=0
BrakePadSetting=0
CompoundSetting=0

[BASIC]
Downforce=0.500000
Balance=0.500000
Ride=0.500000
Gearing=0.500000
Custom=1`,

    'GTE': `VehicleClassSetting="Ferrari_488_GTE_EVO GTE"
UpgradeSetting=(2,0,0,0)
//VEH=C:\\Program Files (x86)\\Steam\\steamapps\\common\\Le Mans Ultimate\\Installed\\Vehicles\\Ferrari_488GTE_LM_2023\\1.01\\21_AFCORSEFDF53F44.VEH
//UpgradeClass=
//Position lights=0
//Aero package=1
//Note: settings commented out if using the default

[GENERAL]
Notes="setup gara Ferrari 488 GTE"
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
RearBrakeSetting=20//52.0:48.0
//BrakeMigrationSetting=0// 0.0
BrakePressureSetting=27//67 kgf  (84%)
//HandfrontbrakePressSetting=0//N/A
//HandbrakePressSetting=0//N/A
//TCSetting=0//Disponibile
//ABSSetting=0//N/D
TractionControlMapSetting=7//7
TCPowerCutMapSetting=2//2
TCSlipAngleMapSetting=6//6
//AntilockBrakeSystemMapSetting=0//N/A

[ENGINE]
//RevLimitSetting=0//7,500
//EngineBoostSetting=0//N/A
//RegenerationMapSetting=0//0%
//ElectricMotorMapSetting=0//
EngineMixtureSetting=2//Gara
//EngineBrakingMapSetting=0//N/A

[DRIVELINE]
//FinalDriveSetting=1//2.682
//ReverseSetting=0//2.846
Gear1Setting=0//2.846
Gear2Setting=0//2.200
Gear3Setting=0//1.800
Gear4Setting=1//1.421
Gear5Setting=0//1.238
Gear6Setting=0//1.053
//RatioSetSetting=0//Le Mans
//DiffPumpSetting=0//N/A
//DiffPowerSetting=8//40%
//DiffCoastSetting=20//100%
DiffPreloadSetting=25//125 Nm
//FrontDiffPumpSetting=0//0%
//FrontDiffPowerSetting=0//0%
//FrontDiffCoastSetting=0//0%
//FrontDiffPreloadSetting=0//1
//RearSplitSetting=0//RWD
//GearAutoUpShiftSetting=0//Disattivati
//GearAutoDownShiftSetting=0//Disattivati

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
    const prompt = `You are a Le Mans Ultimate (LMU) car setup expert. Your task is to provide a detailed car setup 
IN THE EXACT LMU .VEH FILE FORMAT. 
Your response MUST start with 'VehicleClassSetting="...' and include ALL standard LMU sections and parameters as shown in the example below.
Ensure all parameters within sections are valid LMU parameters and are properly formatted as Setting=Value//Comment (even if the comment is "N/A" or "Non-adjustable").
DO NOT include any conversational text, explanations, or extra formatting like markdown code blocks (e.g., \`\`\`).
Only provide the complete and valid .VEH file content.

Here are the details for the setup request:
Car: ${selectedCarValue} (Display Name: ${selectedCarDisplay}, Category: ${selectedCarCategory})
Track: ${selectedTrackValue} (Display Name: ${selectedTrackDisplay})
Setup Goal: ${setupGoal}
Session Goal: ${sessionGoal}
Weather: ${selectedWeather} (${weatherGuidance})
Track Temperature: ${trackTemp}°C
Specific User Request: ${specificRequest}
${fuelEstimateRequest}

**Crucial LMU Setup Principles to Apply:**
- **Gear ratios (FinalDriveSetting, Gear1Setting-Gear7Setting) MUST be adjusted realistically for the specific track and car, NOT fixed or generic.**
- **For Circuit de la Sarthe (Le Mans) and its layouts, ensure a high top speed by selecting a LONG FinalDriveSetting and adjusting individual gears accordingly. Avoid short gearing.**
- **Engine settings like RegenerationMapSetting and ElectricMotorMapSetting (for hybrid cars) MUST be performance-oriented (e.g., 10 for regen, 3 or 4 for motor map if applicable), NOT "Safety-car" or "N/A".**
- **Tyre Compound (CompoundSetting) MUST be a numerical value (0 for Soft/Wet, 1 for Medium, 2 for Hard). ${tireCompoundGuidance}**
- **Tyre Pressure (PressureSetting) MUST be a numerical value (e.g., 0 for 135kPa, 1 for 136kPa, etc.) corresponding to realistic pressures, NOT "N/A" or a fixed kPa value in the setting itself.**
- **All Suspension settings (AntiSway, Toe, Camber, Spring, RideHeight, Bump, Rebound, Packers) must be adjusted for the car/track/goal.**
- **Brake settings (RearBrakeSetting, BrakePressureSetting) must be adjusted for the car/track/goal.**
- **Traction Control/ABS maps MUST be adjusted for the car/track/goal.**
- **Aerodynamic efficiency is crucial.** Balance downforce for cornering grip with minimal drag for top speed, especially on tracks with long straights (like Le Mans or Monza).
- **Front and Rear Wing settings MUST be proportional to the track's downforce demands.** High downforce for technical tracks (e.g., Imola, COTA), lower for high-speed tracks.
- **Brake Duct settings MUST be minimized for aero efficiency** (e.g., 0-3 for front, 0-5 for rear) unless brake temperatures are consistently overheating (check if track temp is high).
- **Overall Balance: The setup should aim for a neutral handling balance, avoiding extreme understeer or oversteer unless explicitly requested (e.g., 'aggressive' setup). Predictability is key for faster lap times.**
- **Weight Distribution: Settings should implicitly balance front-to-rear weight distribution for optimal grip. Higher front ride height or softer front springs can shift balance rearward, and vice-versa.**
- **Compliance: Ensure sufficient suspension compliance over bumps and curbs to maintain tire contact, especially on tracks like Sebring or Spa.**
- **Rake Angle: Adjust front and rear ride heights to create an optimal rake angle (rear ride height typically higher than front) for maximizing diffuser performance and overall downforce without excessive drag.**
- **Fender Flares (FenderFlareSetting): These are usually set to 0 ("N/A") unless specifically needed for tire clearance on a very aggressive setup, which is rare for performance.**
- **Anti-Sway Bars (FrontAntiSwaySetting, RearAntiSwaySetting) should be tuned for handling balance.** Stiffer front promotes understeer, softer front promotes oversteer. Stiffer rear promotes oversteer, softer rear promotes understeer. Adjust to achieve desired balance (e.g., softer for safe, stiffer for aggressive).
- **Ride Heights (FrontRideHeightSetting, RearRideHeightSetting) should be set low for maximum downforce** but ensure sufficient clearance for curbs and bumps. Maintain appropriate rake (rear higher than front) for diffuser efficiency.
- **Spring Rates (SpringSetting) should match track characteristics.** Softer springs for bumpy tracks (e.g., Sebring) or long-distance comfort/tire wear. Stiffer springs for smooth tracks and sharp responsiveness.
- **Dampers (Slow/Fast Bump/Rebound) are critical for weight transfer and tire contact.** Soft bump settings for better mechanical grip and compliance over bumps. Stiffer rebound settings for better body control and stability after compression.
- **Slow vs. Fast Damper Adjustments: Slow Bump/Rebound affects car behavior during slow weight transfers (braking, acceleration, corner entry/exit). Stiffer slow bump provides more initial support. Stiffer slow rebound helps the car settle. Fast Bump/Rebound affects car behavior over quick events (curbs, bumps). Softer fast bump provides better absorption. Softer fast rebound allows quicker wheel return after impacts. Tune Dampers for predictable handling through transitions and over track imperfections.**
- **Toe-in/Toe-out (FrontToeInSetting, RearToeInSetting) should be precise.** Front toe-out for sharper turn-in. Rear toe-in for stability. Rear toe-out (if allowed/used) for aggressive rotation.
- **Brake Bias (RearBrakeSetting) MUST be adjusted for stability under braking and turn-in.** Shift forward for stability, shift rearward for rotation. Common range 52-58%.
- **Brake Pressure (BrakePressureSetting) should be maximized for stopping power** without causing excessive lock-ups for the specific car/track/ABS setting.
- **Steer Lock (SteerLockSetting): Should be set to allow full lock without hitting mechanical limits and provide comfortable steering sensitivity for the track.**
- **Brake Migration (BrakeMigrationSetting): Typically set to 0.0 unless a specific dynamic brake bias change through the braking zone is desired.**
- **Handbrake settings (HandfrontbrakePressSetting, HandbrakePressSetting): Always '0' unless specified for very specific rally or drift scenarios (not applicable to LMU endurance racing).**
- **TC/ABS Mapping (TractionControlMapSetting, TCPowerCutMapSetting, TCSlipAngleMapSetting, AntilockBrakeSystemMapSetting): Tune these for the specific car's power delivery and driver preference. Lower values provide more direct control but require smoother input; higher values provide more assistance for stability.**
- **Engine Mixture (EngineMixtureSetting): Usually '0' (Full power) for qualifying and '1' (Race) for races, unless fuel saving is prioritized.**
- **Ratio Set (RatioSetSetting): Choose '0' (Standard) or '1' (Short/Long) based on the track and required acceleration/top speed balance.**
- **Differential Power (DiffPowerSetting) affects on-throttle stability.** Higher values provide more traction but can induce on-throttle oversteer. Lower values promote rotation but might lose traction.
- **Differential Coast (DiffCoastSetting) affects off-throttle stability.** Higher values increase stability on lift-off. Lower values promote lift-off oversteer.
- **Differential Preload (DiffPreloadSetting) affects low-speed and overall stability.** Higher values increase stability but can cause understeer on turn-in.
- **Differential Pump (DiffPumpSetting) & Split (RearSplitSetting, FrontDiff settings): For RWD cars, these are usually '0' or "N/A" unless the car has a specific AWD or active differential system that allows adjustment. Default to '0' or "N/A".**
- **Automatic Shifting (GearAutoUpShiftSetting, GearAutoDownShiftSetting): Always '0' (Off) for performance setups.**
- **Tender Springs/Travel (TenderSpringSetting, TenderTravelSetting): These are often '0' or 'Detached' in default LMU GT cars/Hypercars unless a specific progressive spring rate is needed. Default to '0' or 'Detached'.**
- **Tire Pressures (PressureSetting in [FRONTLEFT]/[FRONTRIGHT]/[REARLEFT]/[REARRIGHT]) should target optimal hot temperatures.** A common goal for hot pressure is around 180-200 kPa. Cold pressure settings like 0-5 are often common starting points in LMU. These values are highly car/track dependent.
- **Camber (CamberSetting in wheel sections) must be set for optimal cornering grip and even tire wear.** More negative camber increases cornering grip but can reduce straight-line traction and wear the inner edge.

Example of expected LMU .VEH structure (use this as the exact template to fill in values):
${exampleTemplate}

Now generate the setup:
`;

    try {
        console.log("Sending prompt to OpenRouter AI for car:", car, "track:", track, "category:", selectedCarCategory, "using model:", OPENROUTER_MODEL);

        const openrouterResponse = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://test-hrwc.onrender.com', // Your live Render URL, // Replace with your actual deployed URL if not local
                'X-Title': 'LMU Setup Generator',
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                messages: [
                    { role: "system", content: "You are a helpful assistant that generates LMU car setups. You must respond only with the .VEH file content and strictly adhere to the provided LMU .VEH format and section structure. DO NOT include markdown code blocks or any other extraneous text." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 4000, // Increased max_tokens to accommodate detailed setups
                temperature: 0.7, // Adjust temperature for creativity vs. consistency (0.7 is a good balance)
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
