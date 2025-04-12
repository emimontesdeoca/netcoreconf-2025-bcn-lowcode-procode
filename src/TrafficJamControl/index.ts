import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class TrafficJamControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _value: string;
    private _notifyOutputChanged: () => void;
    private _container: HTMLDivElement;
    private _context: ComponentFramework.Context<IInputs>;
    private _refreshData: EventListenerOrEventListenerObject;
    private _entryDiv: HTMLDivElement | null = null; // Store reference to entry div

    private _defaultImage: string = "https://cic.tenerife.es/e-Traffic3/data/camara-2701002-541.jpg?d=1744130153095{NoCacheParam}";

    private getImageForTrafficJam(value: string): string {
        const imageMap: { [key: string]: string } = {
            "TV 5.8 Taco": "https://cic.tenerife.es/e-Traffic3/data/camara-2701001-30.jpg?d=1744132179263{NoCacheParam}",
            "TV 5.10 Los Majuelos": "https://cic.tenerife.es/e-Traffic3/data/camara-2701002-1020.jpg?d=1744132186609{NoCacheParam}",
            "TV 5.11 Chumberas": "https://cic.tenerife.es/e-Traffic3/data/camara-2701001-31.jpg?d=1744132193313{NoCacheParam}",
            "TV 5.13 Guajara": "https://cic.tenerife.es/e-Traffic3/data/camara-2701001-41.jpg?d=1744132200611{NoCacheParam}",
            "TV 5.26 Los Naranjeros": "https://cic.tenerife.es/e-Traffic3/data/camara-2701002-526.jpg?d=1744132207772{NoCacheParam}",
            "TV 5.28 Tacoronte": "https://cic.tenerife.es/e-Traffic3/data/camara-2701002-528.jpg?d=1744132214991{NoCacheParam}",
            "TV 5.42 Bomberos Orotava": "https://cic.tenerife.es/e-Traffic3/data/camara-2701002-542.jpg?d=1744132224697{NoCacheParam}",
            "TV 5.44 Cuesta la Villa": "https://cic.tenerife.es/e-Traffic3/data/camara-2701002-544.jpg?d=1744132239977{NoCacheParam}",
            "TV 5.46 Los Realejos": "https://cic.tenerife.es/e-Traffic3/data/camara-2701002-546.jpg?d=1744132247346{NoCacheParam}",
        };

        return imageMap[value] || this._defaultImage; // Return the mapped image or default image
    }

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._context = context;
        this._container = document.createElement("div");
        this._notifyOutputChanged = notifyOutputChanged;
        this._refreshData = this.refreshData.bind(this);

        // Inicializar la vista y generar la entrada
        this.updateView(context);
        container.appendChild(this._container);
    }

    private generateEntry(): void {
        // Limpiar el contenido previo
        if (this._entryDiv) {
            // this._container.removeChild(this._entryDiv);
            this._entryDiv = null; // Clear the reference
        }

        // Check for valid value before generating entry
        if (!this._value) {
            return; // No value available to display an entry
        }

        // Asegurarse de que camValue tenga un valor
        const currentTrafficJam = this._value || "No Value";
        const timestamp = new Date().toLocaleString(); // Timestamp

        // Obtener la imagen correspondiente
        const image = this.getImageForTrafficJam(this._value); // Obtener la imagen correspondiente

        // Crear y mostrar una única entrada
        this._entryDiv = document.createElement("div");
        this._entryDiv.className = "entry";

        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.alt = `Image for ${this._value}`;
        this._entryDiv.appendChild(imgElement);

        // Contenedor para el lado derecho
        const rightDiv = document.createElement("div");
        rightDiv.className = "entry-details";

        const titleElement = document.createElement("h1");
        titleElement.innerText = `${currentTrafficJam}`;
        rightDiv.appendChild(titleElement);

        const datetimeElement = document.createElement("p");
        datetimeElement.innerText = `${timestamp}`;
        rightDiv.appendChild(datetimeElement);

        const lastIterations = document.createElement("div");
        lastIterations.className = "iterations";

        for (let i = 0; i < 30; i++) {
            const iteration = document.createElement("div");

            // Generar un número aleatorio entre 0 y 100
            const rand = Math.random() * 100;

            // Asignar colores basados en la proporción definida
            if (rand < 20) { // 20% para "red"
                iteration.className = "iteration red";
            } else if (rand < 40) { // 20% para "orange"
                iteration.className = "iteration orange";
            } else { // 60% para "green"
                iteration.className = "iteration green";
            }

            lastIterations.appendChild(iteration);
        }

        rightDiv.appendChild(lastIterations);
        this._entryDiv.appendChild(rightDiv);
        
        this._container.appendChild(this._entryDiv);
    }

    private renderEntry(): void {
        // Clear any previous messages
        this._container.innerHTML = '';

        // Check for valid value
        const validImageUrl = this.getImageForTrafficJam(this._value) !== this._defaultImage;

        if (!this._value || !validImageUrl) {
            const notFoundMessage = document.createElement("p");
            notFoundMessage.innerText = "Traffic jam not found.";
            this._container.appendChild(notFoundMessage);
            this._entryDiv = null; // Clear the reference
        } else {
            this.generateEntry(); // Generate the entry
        }
    }

    public refreshData(evt: Event): void {
        this._notifyOutputChanged();
        this.renderEntry(); // Render new entry
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Update view with the latest context
        this._value = context.parameters.camValue.raw!;
        // Render entry only if there's a valid value
        this.renderEntry();
    }

    public getOutputs(): IOutputs {
        return {
            camValue: this._value,
        };
    }

    public destroy(): void {
        // Cleanup if necessary
    }
}