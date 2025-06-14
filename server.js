// --- server.js (Final Corrected & Fully Neutralized Version) ---

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

// 7. API Key Validation
if (!OPENROUTER_API_KEY) {
    console.error("ERROR: OPENROUTER_API_KEY not found in your .env file.");
    process.exit(1);
}

// 8. Define OpenRouter API endpoint and Model
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const PRIMARY_MODEL = 'NousResearch/Hermes-2-Pro-Llama-3-8B';

// --- Define LMU .VEH Example Templates by Category (Fully Neutralized) ---
const LMU_VEH_TEMPLATES = {
    'Hypercar': `VehicleClassSetting="Ferrari_499P Hypercar WEC2024"
[GENERAL]
Notes="[Engineer's Commentary and Fuel Notes Go Here]"
Symmetric=1
FuelSetting=10//MUST be calculated
[REARWING]
RWSetting=5//MUST be changed
[SUSPENSION]
FrontAntiSwaySetting=8//MUST be changed
RearAntiSwaySetting=4//MUST be changed
[CONTROLS]
RearBrakeSetting=15//MUST be changed
BrakePressureSetting=70//MUST be changed
TractionControlMapSetting=6//MUST be changed
TCPowerCutMapSetting=6//MUST be changed
TCSlipAngleMapSetting=6//MUST be changed
[ENGINE]
RegenerationMapSetting=5//MUST be changed
ElectricMotorMapSetting=4//MUST be changed
EngineMixtureSetting=1//MUST be changed
[DRIVELINE]
FinalDriveSetting=5//MUST be changed
Gear1Setting=5//MUST be changed
Gear2Setting=5//MUST be changed
Gear3Setting=5//MUST be changed
Gear4Setting=5//MUST be changed
Gear5Setting=5//MUST be changed
Gear6Setting=5//MUST be changed
Gear7Setting=5//MUST be changed
RatioSetSetting=1//MUST be changed
DiffPowerSetting=10//MUST be changed
DiffCoastSetting=10//MUST be changed
DiffPreloadSetting=15//MUST be changed
FrontDiffPowerSetting=10//MUST be changed
FrontDiffCoastSetting=10//MUST be changed
FrontDiffPreloadSetting=20//MUST be changed
[FRONTLEFT]
CamberSetting=20//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[FRONTRIGHT]
CamberSetting=20//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[REARLEFT]
CamberSetting=20//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[REARRIGHT]
CamberSetting=20//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[BASIC]
Downforce=0.500000
Balance=0.500000
Ride=0.500000
Gearing=0.500000
Custom=1`,

    'LMP2': `VehicleClassSetting="LMP2 Oreca_07"
[GENERAL]
Notes="[Engineer's Commentary and Fuel Notes Go Here]"
Symmetric=1
FuelSetting=10//MUST be calculated
[REARWING]
RWSetting=5//MUST be changed
[SUSPENSION]
FrontAntiSwaySetting=8//MUST be changed
RearAntiSwaySetting=4//MUST be changed
[CONTROLS]
RearBrakeSetting=15//MUST be changed
BrakePressureSetting=70//MUST be changed
TractionControlMapSetting=6//MUST be changed
TCPowerCutMapSetting=6//MUST be changed
TCSlipAngleMapSetting=6//MUST be changed
[ENGINE]
EngineMixtureSetting=1//MUST be changed
[DRIVELINE]
FinalDriveSetting=5//MUST be changed
Gear1Setting=5//MUST be changed
Gear2Setting=5//MUST be changed
Gear3Setting=5//MUST be changed
Gear4Setting=5//MUST be changed
Gear5Setting=5//MUST be changed
Gear6Setting=5//MUST be changed
RatioSetSetting=1//MUST be changed
DiffPowerSetting=10//MUST be changed
DiffCoastSetting=10//MUST be changed
DiffPreloadSetting=15//MUST be changed
[FRONTLEFT]
CamberSetting=15//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[FRONTRIGHT]
CamberSetting=15//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[REARLEFT]
CamberSetting=15//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[REARRIGHT]
CamberSetting=15//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[BASIC]
Downforce=0.500000
Balance=0.500000
Ride=0.500000
Gearing=0.500000
Custom=1`,

    'LMGT3': `VehicleClassSetting="GT3 Porsche_911_GT3_R_LMGT3 WEC2024"
[GENERAL]
Notes="[Engineer's Commentary and Fuel Notes Go Here]"
Symmetric=1
FuelSetting=10//MUST be calculated
[REARWING]
RWSetting=5//MUST be changed
[SUSPENSION]
FrontAntiSwaySetting=8//MUST be changed
RearAntiSwaySetting=4//MUST be changed
[CONTROLS]
RearBrakeSetting=15//MUST be changed
BrakePressureSetting=70//MUST be changed
TractionControlMapSetting=6//MUST be changed
TCPowerCutMapSetting=6//MUST be changed
AntilockBrakeSystemMapSetting=6//MUST be changed
[ENGINE]
EngineMixtureSetting=1//MUST be changed
[DRIVELINE]
DiffPreloadSetting=15//MUST be changed
[FRONTLEFT]
CamberSetting=20//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[FRONTRIGHT]
CamberSetting=20//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[REARLEFT]
CamberSetting=20//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[REARRIGHT]
CamberSetting=20//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[BASIC]
Downforce=0.500000
Balance=0.500000
Ride=0.500000
Gearing=0.500000
Custom=1`,

    'GTE': `VehicleClassSetting="Ferrari_488_GTE_EVO GTE"
[GENERAL]
Notes="[Engineer's Commentary and Fuel Notes Go Here]"
Symmetric=1
FuelSetting=10//MUST be calculated
[REARWING]
RWSetting=5//MUST be changed
[SUSPENSION]
FrontAntiSwaySetting=8//MUST be changed
RearAntiSwaySetting=4//MUST be changed
[CONTROLS]
RearBrakeSetting=15//MUST be changed
BrakePressureSetting=70//MUST be changed
TractionControlMapSetting=6//MUST be changed
TCPowerCutMapSetting=6//MUST be changed
TCSlipAngleMapSetting=6//MUST be changed
[ENGINE]
EngineMixtureSetting=1//MUST be changed
[DRIVELINE]
FinalDriveSetting=5//MUST be changed
Gear1Setting=5//MUST be changed
Gear2Setting=5//MUST be changed
Gear3Setting=5//MUST be changed
Gear4Setting=5//MUST be changed
Gear5Setting=5//MUST be changed
Gear6Setting=5//MUST be changed
RatioSetSetting=1//MUST be changed
DiffPowerSetting=10//MUST be changed
DiffCoastSetting=10//MUST be changed
DiffPreloadSetting=15//MUST be changed
[FRONTLEFT]
CamberSetting=20//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[FRONTRIGHT]
CamberSetting=20//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[REARLEFT]
CamberSetting=20//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[REARRIGHT]
CamberSetting=20//MUST be changed
PressureSetting=5//MUST be changed
PackerSetting=10//MUST be changed
SpringSetting=8//MUST be changed
RideHeightSetting=15//MUST be changed
SlowBumpSetting=5//MUST be changed
FastBumpSetting=5//MUST be changed
SlowReboundSetting=5//MUST be changed
FastReboundSetting=5//MUST be changed
CompoundSetting=1//MUST be changed
[BASIC]
Downforce=0.500000
Balance=0.500000
Ride=0.500000
Gearing=0.500000
Custom=1`
};

// 9. Define the main route for AI setup requests
app.post('/generate-setup', async (req, res) => {
    // Safely destructure all possible values from the request body
    const { 
        car, 
        track, 
        request, 
        selectedCarCategory,
        selectedCarDisplay,
        selectedTrackDisplay,
        sessionGoal,
        sessionDuration,
        selectedWeather,
        trackTemp,
        specificRequest,
        driverFeedback
    } = req.body;

    // Validate essential parameters
    if (!car || !track || !request || !selectedCarCategory) {
        return res.status(400).json({ error: "Please provide Car, Track, Setup Request, and Car Category details." });
    }

    const exampleTemplate = LMU_VEH_TEMPLATES[selectedCarCategory];
    if (!exampleTemplate) {
        // Corrected the key for the GT3 class to 'LMGT3'
        if (selectedCarCategory === 'GT3' && LMU_VEH_TEMPLATES['LMGT3']) {
             exampleTemplate = LMU_VEH_TEMPLATES['LMGT3'];
        } else {
            return res.status(400).json({ error: `No .VEH template found for car category: ${selectedCarCategory}` });
        }
    }
    
    // The final, complete prompt
    const prompt = `You are a world-class Le Mans Ultimate (LMU) race engineer. Your primary philosophy is that a comfortable, confident driver is a fast driver. Your #1 goal is to generate a setup that is predictable and perfectly suited to the driver's requested style and feedback.

**Thought Process (Follow these steps internally):**
1.  **Prioritize the Driver:** My main objective is to create a setup that is SUITABLE FOR THE DRIVER. First, I will analyze the 'Setup Goal' ('Safe', 'Balanced', 'Aggressive') and any specific problem in the 'Driver Problem to Solve' field. These are my most important instructions.
2.  **Formulate a Plan:** Based on the driver's needs and the track characteristics, I will form a plan. For example: "The driver wants a 'Safe' setup for Le Mans and is reporting 'unstable braking'. I will use slightly higher wings than optimal, soften the suspension, and move brake bias forward to address this first."
3.  **Generate Values:** I will generate numerical values for every parameter, always keeping the driver's needs as my primary guide.
4.  **Review and Refine:** I will look over the generated values to ensure they are logical and directly address the driver's request.
5.  **Format Output:** I will format the final output strictly as a .VEH file with no other text.

**CRITICAL INSTRUCTION: The template below uses OBVIOUS PLACEHOLDER values (e.g., 'Gear1Setting=5'). You MUST replace these placeholders with your new, calculated values. A setup returned with placeholder values like 'Gear1Setting=5' is a complete failure.**

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
Car: ${car}
Track: ${track}
Setup Goal: ${request}
Driver Problem to Solve: ${driverFeedback || 'None'}
Session Goal: ${sessionGoal || 'Optimal Lap Time'}
Session Duration: ${sessionDuration || 0} minutes
Weather: ${selectedWeather || 'Dry'}
Track Temperature: ${trackTemp || 25}°C
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

This is the required LMU .VEH structure and format. You must use this exact structure, replacing all placeholder values.
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
                temperature: 0.4,
            }),
        });

        if (!openrouterResponse.ok) {
            const errorData = await openrouterResponse.json();
            console.error("Error from OpenRouter API:", openrouterResponse.status, errorData);
            return res.status(openrouterResponse.status).json({
                error: `OpenRouter API Error: ${errorData.error ? errorData.error.message : 'Unknown API error'}`
            });
        }

        const chatCompletion = await openrouterResponse.json();
        let text = chatCompletion.choices[0].message.content.trim();

        if (text.startsWith('```') && text.endsWith('```')) {
            text = text.replace(/^```[a-zA-Z]*\n|\n```$/g, '').trim();
        }

        if (text && text.startsWith('VehicleClassSetting=')) {
            res.json({ setup: text });
        } else {
            console.error("AI generated an invalid setup format.");
            res.status(500).json({ error: 'AI generated an invalid setup format.' });
        }

    } catch (error) {
        console.error("Error communicating with OpenRouter:", error);
        res.status(500).json({ error: `Failed to connect to AI service. Error: ${error.message}` });
    }
});

// 10. Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
