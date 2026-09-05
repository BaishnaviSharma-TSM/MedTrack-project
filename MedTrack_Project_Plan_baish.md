**MedTrack**

Patient Health Data Collection App

June 2026

# 1\. What Are We Building?

Imagine a doctor who sees 50 patients every day. Today, when a patient walks in with fever, the doctor checks temperature, oxygen levels, blood pressure, and a few other things — writes them on paper or a scattered note, and that information often gets lost.

MedTrack changes that. It is an iPhone app that doctors use to record a patient's health measurements (called vitals) at every visit. Over time, as more and more data is collected from many patients, the app builds a database of patterns. In the future, a smart system can look at a new patient's vitals and say: "Based on thousands of similar cases, this person's condition is likely to go in this direction — here is what the doctor should watch for."

**In simple words:**

The app is like a very organized, digital health diary — one that gets smarter the more data goes into it.

## 1.1 Who Uses the App?

The primary users are doctors and nurses. Patients do NOT use the app themselves. The doctor opens MedTrack on an iPad or iPhone, searches for the patient (or creates a new record), selects the disease or condition being checked, fills in the relevant measurements, and saves. That's it.

## 1.2 Key Features

- Patient registration — name, age, contact, ID
- Flexible vital-sign forms that change based on the disease (fever shows different fields than a cardiac checkup)
- Record multiple visits for the same patient over time
- Secure cloud storage so data is never lost
- Automatic tagging of records for future analytics
- Simple, fast interface — designed for a busy clinic setting

## 1.3 The Bigger Picture — Health Prediction

Once thousands of patient records are collected and tagged, a data team can train a machine-learning model on this data. When a future patient arrives, the model will compare their vitals against past cases and give the doctor a prediction: "Patients with these vitals typically improved by day 3 after starting X treatment." This is Phase 2 of the product — the prediction engine is NOT part of the app we build now, but the app is designed so that the data it collects is ready to feed into that engine.

# 7\. Project Plan — Phase by Phase

We divide the project into phases so the team always has a working app at each stage — never stuck with half-built code.

**Golden rule:**

At the end of every phase, the app must be testable. Never move to the next phase until the current one works correctly.

## Phase 1 — Foundation

Goal: A working app that opens, lets a doctor log in, and shows a home screen.

| **#** | **Task**       | **Description**                                              |
| ----- | -------------- | ------------------------------------------------------------ |
| 1.1   | Project setup  | Create Expo project, connect to Git, set up folder structure |
| 1.2   | Firebase setup | Create Firebase project, add it to the app                   |
| 1.3   | Login screen   | Email + password login for doctors                           |
| 1.4   | Home screen    | Dashboard showing recent patients and quick-add button       |
| 1.5   | Navigation     | Set up the navigation between all main screens               |

Deliverable at end of Phase 1: A doctor can open the app, log in, and see a home screen.

## Phase 2 — Patient Records

Goal: Doctors can add new patients and view existing patient profiles.

| **#** | **Task**               | **Description**                                                      |
| ----- | ---------------------- | -------------------------------------------------------------------- |
| 2.1   | Add Patient screen     | Form to capture patient name, age, gender, contact number, unique ID |
| 2.2   | Patient List screen    | Scrollable list of all patients with search and filter               |
| 2.3   | Patient Profile screen | View all details and past visits for a patient                       |
| 2.4   | Edit Patient           | Update patient information if something changes                      |
| 2.5   | Firestore integration  | Save and retrieve patient records from Firebase                      |

Deliverable at end of Phase 2: A doctor can register a new patient and find them again later.

## Phase 3 — Vitals & Visit Recording

Goal: Doctors can log a visit with health measurements. This is the core of the app.

| **#** | **Task**                     | **Description**                                                   |
| ----- | ---------------------------- | ----------------------------------------------------------------- |
| 3.1   | Disease / Condition selector | A list of common conditions (Fever, Hypertension, Diabetes, etc.) |
| 3.2   | Dynamic vital-sign forms     | The form fields change based on selected condition (see below)    |
| 3.3   | Save visit record            | Store the entire visit (patient + date + vitals) to Firestore     |
| 3.4   | Visit history                | Show all past visits for a patient in chronological order         |
| 3.5   | Visit detail view            | See all the vitals recorded at a specific visit                   |

### Dynamic Form Fields — Examples

Different conditions require different measurements. The app automatically shows the right fields:

| **Condition**    | **Fields Shown**                                                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fever            | Temperature (°F/°C), Oxygen saturation (SpO2 %), Pulse rate (bpm), Blood pressure (mmHg), Duration of fever (days), Any chills or sweating (Yes/No) |
| Hypertension     | Systolic BP, Diastolic BP, Pulse rate, Weight (kg), Any dizziness (Yes/No), Medications taken (text)                                                |
| Diabetes checkup | Blood glucose (fasting), Blood glucose (post-meal), HbA1c %, Weight, Any numbness/tingling (Yes/No)                                                 |
| General checkup  | Temperature, Blood pressure, Pulse, Weight, Height, Oxygen saturation, Chief complaint (text)                                                       |

Deliverable at end of Phase 3: A doctor can log a complete visit including vitals, and see the patient's visit history.

## Phase 4 — Tagging & Data Quality

Goal: Make the data clean and organized so it can be used for prediction later.

| **#** | **Task**               | **Description**                                                                             |
| ----- | ---------------------- | ------------------------------------------------------------------------------------------- |
| 4.1   | Auto-tagging           | Every record automatically gets tags: condition name, severity level, age group             |
| 4.2   | Severity flags         | If vitals are outside normal range, the record is tagged as 'Mild', 'Moderate', or 'Severe' |
| 4.3   | Normal range reference | Build a reference table of what is 'normal' for each vital sign                             |
| 4.4   | Data validation        | Prevent clearly wrong values (e.g., temperature of 200°F) from being saved                  |
| 4.5   | Export option          | Allow a CSV export of all records for the data science team                                 |

Deliverable at end of Phase 4: Every saved record has automatic tags that categorize its severity.

##

## Phase 5 — Polish & Offline Support

Goal: Make the app reliable and pleasant to use every day.

| **#** | **Task**       | **Description**                                                     |
| ----- | -------------- | ------------------------------------------------------------------- |
| 5.1   | Offline mode   | The app should work even without internet; sync when back online    |
| 5.2   | Error handling | Show friendly messages when something goes wrong instead of a crash |
| 5.3   | Loading states | Spinners and skeletons so doctors know the app is working           |
| 5.4   | UI polish      | Consistent colors, fonts, and spacing throughout the app            |
| 5.5   | Performance    | Large patient lists should scroll smoothly without lag              |

Deliverable at end of Phase 5: A polished, reliable app ready for real clinic testing.

## Phase 6 — Testing

Goal: Find and fix all bugs before publishing.

- User testing: Give the app to 2–3 doctors to use for a week. Collect their feedback.
- Data accuracy testing: Check that what the doctor enters is exactly what gets saved in the database.
- Edge case testing: What happens if the internet drops mid-save? What if the doctor enters letters in a number field?
- Device testing: Test on at least two different iPhone models (e.g., iPhone SE and iPhone 15).
- Security testing: Verify that one doctor cannot see another clinic's patients.

# 8\. How to Run and Test the App

## 8.1 Running on the iOS Simulator (No Phone Needed)

In Terminal, inside the MedTrack project folder:

npx expo start

Then press the i key. The iOS Simulator opens automatically and loads your app. Every time you save a file in VS Code, the app updates immediately on the Simulator (this is called 'hot reload').

## 8.2 Running on a Real iPhone

1. Download the Expo Go app from the iPhone App Store
2. Make sure your phone and Mac are on the same Wi-Fi
3. Run npx expo start in Terminal
4. Open the Expo Go app on your iPhone
5. Tap 'Scan QR Code' and scan the code that appeared in Terminal

Your app will open on the iPhone. Any code change you make on your Mac appears on the phone within seconds.

## 8.3 Running Without Expo Go (For Final Testing)

Before submitting to the App Store, you must test a 'standalone' build — a version of the app that works without Expo Go. Use this command:

eas build --platform ios --profile preview

This requires an Expo account and EAS (Expo Application Services) to be set up. The build is created in the cloud and sent to your device via a TestFlight link (Apple's testing platform).

## 8.4 TestFlight — Beta Testing with Real Doctors

TestFlight is Apple's free tool for sending your app to testers before it goes live on the App Store.

1. Build the app using: eas build --platform ios --profile production
2. Log in to App Store Connect at appstoreconnect.apple.com
3. Upload the build (EAS does this automatically with: eas submit --platform ios)
4. In App Store Connect, go to TestFlight → Add testers (enter their Apple ID email addresses)
5. Testers receive an email, download TestFlight from the App Store, and install your app

**Best practice:**

Run TestFlight with at least 5 doctors for 2 weeks before publishing to the App Store. Their real-world feedback will reveal issues that lab testing misses.

# 9\. Database Design — How Data Is Organized

| **Collection** | **What It Stores**                                                                            |
| -------------- | --------------------------------------------------------------------------------------------- |
| patients       | One document per patient. Contains name, age, gender, contact, doctor ID.                     |
| visits         | One document per visit. Links to a patient. Contains date, condition, vitals, tags, severity. |
| conditions     | The list of supported diseases with their required vital-sign fields.                         |
| users          | One document per doctor. Contains name, clinic, role.                                         |

Example: A single visit record in the 'visits' collection looks like this:

patientId: 'PT-001'

doctorId: 'DR-007'

condition: 'Fever'

date: 2026-06-15T09:30:00

vitals: {

temperature: 102.4,

oxygen: 96,

pulse: 98,

bloodPressure: '120/80'

}

tags: \['fever', 'moderate', 'adult'\]

severity: 'Moderate'

# 10\. Security & Patient Privacy

Medical data is extremely sensitive. Indian law (DPDP Act 2023) and international standards require that patient data be protected. Here is what MedTrack does:

- Authentication: Every user (doctor) must log in with a verified email and password. No one can access the app without an account.
- Role-based access: A doctor from Clinic A cannot see patients from Clinic B. Firebase security rules enforce this automatically.
- Encrypted in transit: All data travels between the app and Firebase using HTTPS — so nobody can intercept it.
- Encrypted at rest: Firebase encrypts all stored data on Google's servers.
- No patient login: Patients never touch the app. Only registered healthcare providers can log in.
- Audit trail: Every record has a timestamp and the doctor's ID, so there is always a record of who entered what.

**Important:**

Before deploying to any real clinic, have a legal advisor review your data handling practices and ensure you have patient consent forms in place.

| **Term**          | **What It Means**                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| React Native      | A framework (toolkit) for building mobile apps using JavaScript. One codebase works on both iOS and Android.                    |
| Expo              | A set of tools that makes React Native much easier to start with. Think of it as training wheels for React Native.              |
| Component         | A reusable piece of the screen — like a button, a text box, or a patient card. You build the whole app by combining components. |
| Firebase          | Google's cloud platform. It provides a database, authentication (login), and file storage — all in one.                         |
| Firestore         | The database part of Firebase. Stores data as documents organized in collections (like folders).                                |
| Simulator         | A fake iPhone that runs on your Mac. Useful for testing without needing a physical phone.                                       |
| TestFlight        | Apple's free tool for sending your app to beta testers before it is published.                                                  |
| App Store Connect | Apple's web portal for managing your published apps.                                                                            |
| Bundle ID         | A unique name for your app in reverse-domain format, e.g., com.yourname.medtrack.                                               |
| Hot Reload        | When you save a code change, the app on the Simulator or phone updates instantly without restarting.                            |
| npm               | Node Package Manager. A tool that downloads and installs JavaScript libraries.                                                  |
| Git               | A tool that tracks every change you make to your code. Like a time machine for your project.                                    |
| EAS               | Expo Application Services. A cloud service that builds your app for you without needing to configure Xcode manually.            |
| Vitals            | Health measurements like temperature, blood pressure, oxygen level, and pulse rate.                                             |
| Tagging           | Adding labels to a record so it can be found and grouped later. E.g., tagging a record as 'Fever + Moderate + Adult'.           |

# 17\. Final Words

MedTrack is a meaningful project — it has the potential to genuinely improve how doctors capture patient information and, in the long run, help predict and prevent deteriorating health conditions.

If you are starting from zero coding experience, the most important thing is to not rush. Follow the learning path in Section 2 before writing a single line of app code. The investment in learning will pay off because you will understand what you are building, not just copy-paste code.

Use this document as your anchor. Whenever you feel lost, come back here and find where you are in the plan. Every big app was built one small step at a time.

**Good luck — and build something that helps people.**