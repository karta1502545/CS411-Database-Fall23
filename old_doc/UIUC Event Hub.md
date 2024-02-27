## UIUC Event Hub: Connected Illini

## Project Summary
The UIUC Event Hub is a web application designed to streamline the organization and discovery of events and activities at the University of Illinois at Urbana-Champaign (UIUC). It will serve as a central platform for students and event organizers to post, find, and engage with campus events. This project aims to address the issue of scattered event information and the inconvenience of email-based event promotion.

## Description
The UIUC Event Hub serves as a aggregator of all event details in one accessible location, simplifying the event discovery process and ensuring students no longer miss out on exciting opportunities.

The UIUC Event Hub also streamlines event promotion process, providing organizers with user-friendly tools to effectively promote their events to a broader audience. This not only simplifies event logistics but also leads to increased attendance and overall event success.

Moreover, the platform goes beyond conventional event listings. It introduces users to personalized event recommendations, taking into account their preferences and availability. Students can receive event suggestions that align with their interests and schedules, ensuring that they have access to a curated selection of engaging activities.

## Usefulness
The UIUC Event Hub is a useful application for several reasons:

Centralized Information: It consolidates event information into a single platform, making it easier for students to discover and participate in activities of interest.

Efficient Event Promotion: Event organizers can efficiently promote their events to a wide audience, increasing attendance and engagement.

Customization: Users can tailor their event preferences and receive personalized event recommendations.

Ticketing and RSVP: The application will facilitate ticketing and RSVP management for event organizers, streamlining the registration process.

## Realness of Data
Data for the UIUC Event Hub will come from a combination of sources:

User-Generated Data: Event organizers and participants will create and manage event listings, including event names, descriptions, dates, times, locations, and ticketing details.

University Calendar: Integration with the university's official event calendar to provide accurate academic and administrative event information.

## Database Schema
### User

The table captures essential user details, including usernames, securely hashed passwords, and email addresses. These attributes enable secure account management and user authentication. The UserID, acting as the primary key, uniquely identifies each user, facilitating data association with other elements of the platform, such as events, comments, and subscriptions.

### Event

This table stores comprehensive event information. This includes event titles, descriptions, dates, times, locations, and registration particulars. Event organizers leverage this table to create and manage events, while users use it to discover, engage with, and register for events aligned with their interests. The EventID, functioning as the primary key, ensures the uniqueness of each event entry and enables seamless connections with related data.

### Comment Table

The Comment Table fosters user interaction and engagement by capturing user-generated comments related to specific events. Users can express opinions, seek clarifications, or offer feedback, contributing to event-related discussions. Each comment is linked to a user, an event, and a timestamp, facilitating organized and meaningful interactions while enhancing the overall user experience. Also, it serves as one of the data source for personal recommendation.

### Subscription Table

The table allows users to express preferences for event categories or interests. Our platform suggests events and provides updates that align with each user's individual interests. The SubscriptionID, serving as the primary key, ensures distinct subscription records for each user, enabling precise customization of their event discovery.

## Functionality
The UIUC Event Hub will offer the following functionalities:

User Registration and Profiles: Users can create accounts, set preferences, and manage their profiles.

Event Creation: Event organizers can create and manage event listings with details such as event name, description, date, time, location, and ticketing information.

Event Discovery: Users can browse and search for events based on categories, dates, locations, and their preferences.

RSVP and Ticketing: Event organizers can manage RSVPs and ticketing through the platform, and users can register for events.

Personalized Recommendations: The system will provide event recommendations based on user preferences, current location, and past activity.

<!-- Interactive Map: An interactive map will show event locations and distances, helping users plan their schedules. -->

Notification System: Users will receive notifications about upcoming events, changes to events they're attending, and event recommendations.

Feedback and Reviews: Users can leave feedback and reviews for attended events.

## Creative Component


## Low-Fidelity UI Mockup
UIUC Event Hub Mockup

## Project Work Distribution

Frontend Development: user experience (UX) design, user interfaces design, event listings, and user profiles

Backend Development: event registration, event creation, comment function, user authentication, event management, and notification system

Recommendation system: data preprocessing, model training, model deployment

Testing and Quality Assurance: unit testing, integration testing, manual testing