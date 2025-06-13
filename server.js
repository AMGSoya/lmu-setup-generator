// --- server.js (for OpenRouter API - Full .VEH Example in Prompt) ---

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

// 5. Serve static files
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
const OPENROUTER_MODEL = 'meta-llama/llama-3.3-8b-instruct:free'; // Using the Llama 3 model you chose

// 8. Define a route for AI setup requests
app.post('/generate-setup', async (req, res) => {
    const { car, track, request } = req.body; 

    if (!car || !track || !request) {
        return res.status(400).json({ error: "Please provide Car, Track, and Setup Request details." });
    }

    // Construct the prompt for the AI (UPDATED WITH COMPLETE .VEH EXAMPLE)
    const prompt = `You are a Le Mans Ultimate (LMU) car setup expert. Your task is to provide a detailed car setup 
IN THE EXACT LMU .VEH FILE FORMAT. 
Your response MUST start with 'VehicleClassSetting="...' and include ALL standard LMU sections and parameters as shown in the example below.
Ensure all parameters within sections are valid LMU parameters and are properly formatted as Setting=Value//Comment (even if the comment is "N/A" or "Non-adjustable").
DO NOT include any conversational text, explanations, or extra formatting like markdown code blocks (e.g., \`\`\`).
Only provide the complete and valid .VEH file content.

Here are the details for the setup:
Car: ${car}
Track: ${track}
Desired Setup Characteristics: ${request}

Your response MUST be the full, complete .VEH file, with no missing sections or parameters. Strict adherence to LMU .VEH structure and parameters is critical.

Example of expected LMU .VEH structure:
VehicleClassSetting="Ferrari_499P Hypercar WEC2024"
UpgradeSetting=(1,0,0,0)
//VEH=D:\\SteamLibrary\\steamapps\\common\\Le Mans Ultimate\\Installed\\Vehicles\\Ferrari_499P_2023\\1.37\\50_24_AFCO4AB4105B.VEH
//UpgradeClass=
//Tyre Restrictions=1
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
FuelSetting=81//0.86
FuelCapacitySetting=0//25.8L (0.0 laps)
VirtualEnergySetting=30//30%
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
WaterRadiatorSetting=0//No tape
OilRadiatorSetting=0//No tape
BrakeDuctSetting=3//75%
BrakeDuctRearSetting=0//Open

[SUSPENSION]
FrontWheelTrackSetting=0//Non-adjustable
RearWheelTrackSetting=0//Non-adjustable
FrontAntiSwaySetting=14//C-P4
RearAntiSwaySetting=2//A-P2
FrontToeInSetting=15//-0.06 deg
FrontToeOffsetSetting=0//N/A
RearToeInSetting=20//0.23 deg
RearToeOffsetSetting=0//N/A
LeftCasterSetting=0//Non-adjustable
RightCasterSetting=0//Non-adjustable
LeftTrackBarSetting=0//N/A
RightTrackBarSetting=0//N/A
Front3rdPackerSetting=9//0.9 cm
Front3rdSpringSetting=6//6
Front3rdTenderSpringSetting=0//Detached
Front3rdTenderTravelSetting=0//Detached
Front3rdSlowBumpSetting=5//6
Front3rdFastBumpSetting=6//7
Front3rdSlowReboundSetting=5//6
Front3rdFastReboundSetting=4//5
Rear3rdPackerSetting=12//1.2 cm
Rear3rdSpringSetting=6//6
Rear3rdTenderSpringSetting=0//Detached
Rear3rdTenderTravelSetting=0//Detached
Rear3rdSlowBumpSetting=3//4
Rear3rdFastBumpSetting=4//5
Rear3rdSlowReboundSetting=3//4
Rear3rdFastReboundSetting=4//5
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
RearBrakeSetting=16//52.8:47.2
BrakeMigrationSetting=0//2.5% F
BrakePressureSetting=80//120 kgf (100%)
HandfrontbrakePressSetting=0//0%
HandbrakePressSetting=0//N/A
TCSetting=0//Available
ABSSetting=0//N/A
TractionControlMapSetting=9//9
TCPowerCutMapSetting=8//8
TCSlipAngleMapSetting=8//8
AntilockBrakeSystemMapSetting=0//N/A

[ENGINE]
RevLimitSetting=0//8,500
EngineBoostSetting=0//N/A
RegenerationMapSetting=10//200kW
ElectricMotorMapSetting=3//60kW
EngineMixtureSetting=0//Full
EngineBrakingMapSetting=0//N/A

[DRIVELINE]
FinalDriveSetting=0//2.98:1
ReverseSetting=0//2.07 (6.18)
Gear1Setting=0//2.85 (8.49)
Gear2Setting=0//2.20 (6.56)
Gear3Setting=0//1.82 (5.44)
Gear4Setting=0//1.56 (4.64)
Gear5Setting=0//1.35 (4.02)
Gear6Setting=0//1.19 (3.55)
Gear7Setting=0//1.05 (3.14)
RatioSetSetting=0//Short
DiffPumpSetting=0//N/A
DiffPowerSetting=3//25%
DiffCoastSetting=10//60%
DiffPreloadSetting=24//120 Nm
FrontDiffPumpSetting=0//N/A
FrontDiffPowerSetting=0//10%
FrontDiffCoastSetting=0//10%
FrontDiffPreloadSetting=0//0 Nm
RearSplitSetting=0// 0.0:100.0
GearAutoUpShiftSetting=0//Off
GearAutoDownShiftSetting=0//Off

[FRONTLEFT]
CamberSetting=26//-1.4 deg
PressureSetting=0//135 kPa
PackerSetting=5//0.5 cm
SpringSetting=10//15.95mm
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=9//4.9 cm
SlowBumpSetting=5//6
FastBumpSetting=6//7
SlowReboundSetting=5//6
FastReboundSetting=4//5
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//82% Soft

[FRONTRIGHT]
CamberSetting=26//-1.4 deg
PressureSetting=0//135 kPa
PackerSetting=5//0.5 cm
SpringSetting=10//15.95mm
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=9//4.9 cm
SlowBumpSetting=5//6
FastBumpSetting=6//7
SlowReboundSetting=5//6
FastReboundSetting=4//5
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//76% Soft

[REARLEFT]
CamberSetting=35//-0.5 deg
PressureSetting=0//135 kPa
PackerSetting=12//1.2 cm
SpringSetting=0//13.33mm
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//7.5 cm
SlowBumpSetting=4//5
FastBumpSetting=4//5
SlowReboundSetting=6//7
FastReboundSetting=6//7
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//86% Soft

[REARRIGHT]
CamberSetting=35//-0.5 deg
PressureSetting=0//135 kPa
PackerSetting=12//1.2 cm
SpringSetting=0//13.33mm
TenderSpringSetting=0//Detached
TenderTravelSetting=0//Detached
SpringRubberSetting=0//Detached
RideHeightSetting=15//7.5 cm
SlowBumpSetting=4//5
FastBumpSetting=4//5
SlowReboundSetting=6//7
FastReboundSetting=6//7
BrakeDiscSetting=0//4.00 cm
BrakePadSetting=0//1
CompoundSetting=0//82% Soft

[BASIC]
Downforce=0.500000
Balance=0.500000
Ride=0.500000
Gearing=0.500000
Custom=1

Now generate the setup:
`;

    try {
        console.log("Sending prompt to OpenRouter AI for car:", car, "track:", track, "using model:", OPENROUTER_MODEL);
        
        const openrouterResponse = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'LMU Setup Generator',
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                messages: [
                    { role: "system", content: "You are a helpful assistant that generates LMU car setups. You must respond only with the .VEH file content and strictly adhere to the provided LMU .VEH format and section structure. DO NOT include markdown code blocks or any other extraneous text." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 4000, // Increased max_tokens
                temperature: 0.7, 
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
        
        // Trim leading/trailing whitespace AND markdown code blocks
        text = text.trim(); 
        if (text.startsWith('```') && text.endsWith('```')) {
            text = text.replace(/^```[a-zA-Z]*\n|\n```$/g, '').trim();
        }


        if (text && text.startsWith('VehicleClassSetting=')) {
            res.json({ setup: text });
        } else {
            console.error("AI generated an invalid setup format or empty response.");
            console.error("AI Raw Response:", text);
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