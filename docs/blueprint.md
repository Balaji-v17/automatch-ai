# **App Name**: AutoMatch AI

## Core Features:

- AI-Guided Preference Collection: Collect user preferences regarding budget, vehicle type, usage, fuel, mileage/performance, and maintenance sensitivity using structured questions. Convert responses into a structured preference object for downstream processing.
- Deterministic Recommendation Engine: Implement a weighted scoring system to score each vehicle against user preferences. Rank vehicles and return the top 3 recommended vehicles based on deterministic scoring.
- Explainable AI Output: Compute and display budget match, usage match, fuel compatibility, maintenance suitability, and overall match scores. The LLM will convert these scores into clear, natural-language explanations and human-readable summaries using prompt engineering to ensure correctness.
- Prompt Template System: Create a prompt module with reusable templates for preference interpretation, recommendation explanation, and vehicle comparison summary. Prompts are versioned and explicitly designed with constrained outputs. Allow users to select from existing prompt versions in order to change the 'reasoning tool' being used.
- Vehicle Listings & Comparison: Display vehicles with specifications (price, mileage, engine details, safety, maintenance). Enable comparison of 2-3 vehicles with LLM-generated concise summaries from structured comparison data.
- Personalization via Recent Searches: Track recent searches, viewed vehicles and favorites/liked vehicles in order to make vehicle recommendations and personalize user experience.
- Trending Vehicle Insights: Identify trending vehicles based on search frequency. Categorize trends (EV, SUV, budget, performance) and display new vehicle releases using static datasets.

## Style Guidelines:

- Primary color: Deep Blue (#1A237E) for trust and reliability.
- Background color: Very light desaturated blue (#E8EAF6).
- Accent color: Muted Purple (#7B1FA2) to create contrast and call attention to key UI elements.
- Body and headline font: 'Inter', a grotesque-style sans-serif font to lend a neutral and modern look.
- Use simple, modern icons to represent vehicle types, features, and preferences.
- A clean, minimal, and mobile-friendly layout.
- Subtle transitions and animations to enhance user experience when loading recommendations or switching between vehicle views.