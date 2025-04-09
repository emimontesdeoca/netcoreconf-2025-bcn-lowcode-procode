<p align="center">
<img align="center" src="https://imgur.com/5OdWAiz.png">
</p>

<h1 align="center">NetCoreConf Barcelona 2025</h1>


This repository contains source code and presentation slides for the NetCoreConf Barcelona 2025.


# Traffic Jam Control PCF Component

A custom PowerApps Component Framework (PCF) control that visualizes traffic jam information with live camera feeds from different locations in Tenerife. This control displays traffic camera images along with traffic status indicators.

## Project Overview

This PCF component allows users to:
- Display real-time traffic camera images for predefined locations
- Show traffic status using color-coded indicators (green, orange, red)
- Display timestamp information for each traffic jam entry

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended editor)
- PowerApps CLI (for building and deploying PCF components)
- A Power Platform environment to test the component

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/netcoreconf-2025-bcn-lowcode-procode.git
   cd netcoreconf-2025-bcn-lowcode-procode/src
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally

1. Build the control:
   ```bash
   npm run build
   ```

2. To start the control in watch mode (for development):
   ```bash
   npm start watch
   ```

This will start a local development server where you can test the component.

## Using the Component in PowerApps

The component supports the following predefined traffic jam locations:
- TV 5.8 Taco
- TV 5.10 Los Majuelos
- TV 5.11 Chumberas
- TV 5.13 Guajara
- TV 5.26 Los Naranjeros
- TV 5.28 Tacoronte
- TV 5.42 Bomberos Orotava
- TV 5.44 Cuesta la Villa
- TV 5.46 Los Realejos

## Project Structure

```
├── src/                        # Source directory
│   ├── TrafficJamControl/      # Control directory
│   │   ├── css/                # CSS styles
│   │   │   └── TrafficJamControl.css
│   │   ├── generated/          # Auto-generated files
│   │   │   └── ManifestTypes.d.ts
│   │   ├── ControlManifest.Input.xml  # Control manifest
│   │   └── index.ts            # Main control code
│   ├── package.json            # NPM package configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── pcfconfig.json          # PCF configuration
└── LICENSE                     # License file
```

## Customizing the Control

You can modify the control by:
1. Updating the list of supported traffic camera locations in `index.ts`
2. Changing the visual representation in `TrafficJamControl.css`
3. Modifying the control logic in `index.ts`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.