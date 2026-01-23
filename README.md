# Wayfare

**Wayfare** is a comprehensive travel planning platform designed for travel enthusiasts. It simplifies the trip planning process by allowing users to compare agencies, book trips, generate AI-powered itineraries, and connect with fellow travelers.

![Wayfare Banner](https://via.placeholder.com/1200x400?text=Wayfare+Travel+Platform)

## 🚀 Overview

Wayfare aims to solve the fragmentation in travel planning. Whether you wanted a structured package from an agency or a custom self-planned short trip, Wayfare covers it all. The platform stands out with its social connectivity features, enabling users traveling to the same destination on the same dates to connect via chat or video call.

## ✨ Key Features

- **🌍 Agency Comparison & Booking**: Browse a carefully curated list of travel agencies, compare their packages, and book your perfect trip directly.
- **🤖 AI-Powered Itineraries**: Planning a short trip? Let our AI generate a personalized day-by-day itinerary tailored to your preferences.
- **🤝 Social Connectivity**:
  - **Traveler Matching**: Find people traveling to the same location on the same dates.
  - **Real-time Chat**: Connect instantly using Socket.io.
  - **Video Calls**: Plan together face-to-face with integrated WebRTC video calling.
- **💳 Secure Payments**: Integrated Stripe payments for seamless booking experiences.
- **🎨 Modern Turn-key UI**: Built with a responsive, accessible, and beautiful design system.

## 🛠️ Tech Stack

This project is built with a modern frontend stack ensuring performance, scalability, and developer experience.

- **Framework**: [Next.js 15](https://nextjs.org/) (App Directory)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Real-time & Media**:
  - [Socket.io Client](https://socket.io/) (Chat)
  - [Simple Peer](https://github.com/feross/simple-peer) (WebRTC Video Calls)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) / [Clerk](https://clerk.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Utilities**: `axios`, `dayjs`, `sonner`

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/wayfare-frontend.git
    cd wayfare-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory. You can start by copying the example (if available) or adding the following keys:

    ```env
    # Example .env variables
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
    # Add other necessary keys from your backend configuration
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
/app          # Next.js App Router pages and layouts
/components   # Reusable UI components (shadcn/ui, etc.)
/constants    # Static data and configuration constants
/lib          # Utility functions and libraries (axios setup, utils)
/modules      # Feature-specific modules (business logic separation)
/public       # Static assets (images, fonts)
/shared       # Shared types, hooks, and services
/store        # Zustand global state stores
/types        # TypeScript type definitions
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.