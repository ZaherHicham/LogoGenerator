async function loadFile(filePath) {
  const response = await fetch(filePath);
  return await response.text();
}

class LogoComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Shadow DOM
  }

  async connectedCallback() {
    const templateHTML = await loadFile("./component/logoComponent.html");

    // Charger le fichier CSS
    const style = document.createElement("style");
    style.textContent = await loadFile("./component/logoComponent.css");

    // Créer un div pour insérer le contenu HTML
    const wrapper = document.createElement("div");
    wrapper.innerHTML = templateHTML;

    // Ajouter le contenu HTML et CSS au Shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(wrapper);

    this.shadowRoot
      .querySelector("#text-selected")
      .addEventListener("input", (event) => {
        const newText = event.target.value;
        this.shadowRoot.querySelector("#logo").textContent = newText;
      });

    this.shadowRoot
      .querySelector("#colorPicker")
      .addEventListener("input", (event) => {
        const newColor = event.target.value;
        this.shadowRoot.querySelector("#logo").style.color = newColor;
      });

    this.shadowRoot
      .querySelector("#animation-selected")
      .addEventListener("change", (event) => {
        const logo = this.shadowRoot.querySelector("#logo");
        const animation = event.target.value;
        logo.classList.remove("flip-horizontal-bottom", "shake-horizontal");
        console.log("Removed existing animations");

        void logo.offsetWidth;
        console.log("Reflow triggered");

        // Appliquer l'animation sélectionnée
        if (animation) {
          logo.classList.add(animation);
          console.log("Added animation:", animation);
        }
      });

    this.shadowRoot
      .querySelector("#font-selected")
      .addEventListener("input", (event) => {
        const newSize = event.target.value + "px";
        this.shadowRoot.querySelector("#logo").style.fontSize = newSize;
        this.shadowRoot.querySelector("#font-size-display").textContent =
          newSize;
      });

    this.shadowRoot
      .querySelector("#orientation-selected")
      .addEventListener("change", (event) => {
        const orientation = event.target.value;
        const logoElement = this.shadowRoot.querySelector("#logo");

        if (orientation === "vertical") {
          logoElement.style.writingMode = "vertical-lr"; // Texte orienté verticalement
          logoElement.style.textOrientation = "upright";
        } else {
          logoElement.style.writingMode = "horizontal-tb"; // Texte orienté horizontalement
          logoElement.style.textOrientation = "unset";
        }
      });

    this.shadowRoot
      .querySelector("#position-selected")
      .addEventListener("change", (event) => {
        const position = event.target.value;
        const logoContainer = this.shadowRoot.querySelector("#background-logo"); // Assure-toi que ton span est dans ce conteneur
        const orientation = this.shadowRoot.querySelector(
          "#orientation-selected"
        ).value;

        if (orientation === "vertical") {
          // Gérer la position quand le texte est vertical
          if (position === "haut") {
            logoContainer.style.justifyContent = "flex-start";
            logoContainer.style.alignItems = "center";
          } else if (position === "centre") {
            logoContainer.style.justifyContent = "center";
            logoContainer.style.alignItems = "center";
          } else if (position === "bas") {
            logoContainer.style.justifyContent = "flex-end";
            logoContainer.style.alignItems = "center";
          } else if (position === "gauche") {
            logoContainer.style.justifyContent = "center";
            logoContainer.style.alignItems = "flex-start";
          } else if (position === "droite") {
            logoContainer.style.justifyContent = "center";
            logoContainer.style.alignItems = "flex-end";
          }
        } else {
          // Gérer la position quand le texte est horizontal
          if (position === "haut") {
            logoContainer.style.alignItems = "flex-start";
            logoContainer.style.justifyContent = "center";
          } else if (position === "centre") {
            logoContainer.style.alignItems = "center";
            logoContainer.style.justifyContent = "center";
          } else if (position === "bas") {
            logoContainer.style.alignItems = "flex-end";
            logoContainer.style.justifyContent = "center";
          } else if (position === "gauche") {
            logoContainer.style.justifyContent = "flex-start";
            logoContainer.style.alignItems = "center";
          } else if (position === "droite") {
            logoContainer.style.justifyContent = "flex-end";
            logoContainer.style.alignItems = "center";
          }
        }
      });

    this.shadowRoot
      .querySelector("#background-selected")
      .addEventListener("change", (event) => {
        const selectedBackground = event.target.value;
        const backgroundLogoDiv =
          this.shadowRoot.querySelector("#background-logo");

        // Appliquer l'image sélectionnée en tant que fond
        backgroundLogoDiv.style.backgroundImage = `url(${selectedBackground})`;
      });

    this.shadowRoot
      .querySelector("#texture-selected")
      .addEventListener("input", (event) => {
        const selectedTexture = event.target.value;
        const logo = this.shadowRoot.querySelector("#logo");

        // Retirer toutes les anciennes classes de texture
        logo.classList.remove(
          "texture1",
          "texture2",
          "texture3",
          "texture4",
          "texture5",
          "texture6",
          "apply-texture"
        );

        // Si "Aucune" texture n'est sélectionnée, revenir à la couleur par défaut
        if (selectedTexture === "none") {
          logo.style.color = "black"; // Texte visible en noir
        } else {
          // Appliquer la classe de texture sélectionnée
          logo.style.color = "transparent";
          logo.classList.add(selectedTexture, "apply-texture"); // Rendre le texte transparent et appliquer la texture
        }
      });

    const draggableImage = this.shadowRoot.querySelector("#draggable-image"); // L'image
    const draggableLogo = this.shadowRoot.querySelector("#draggable-logo");
    const container = this.shadowRoot.querySelector("#background-logo");

    dragMove(draggableLogo);
    dragMove(draggableImage);
    dragMove(this.shadowRoot.querySelector("#logo"));

    function dragMove(e) {
      let startX = 0,
        startY = 0,
        initialX = 0,
        initialY = 0;
      const dragStart = (event) => {
        event.preventDefault();

        startX = event.clientX;
        startY = event.clientY;

        // Calculer la transformation en cours de l'élément
        const style = window.getComputedStyle(e);
        const matrix = new WebKitCSSMatrix(style.transform);
        initialX = matrix.m41;
        initialY = matrix.m42;

        document.addEventListener("mousemove", dragMove);
        document.addEventListener("mouseup", dragEnd);
      };

      const dragMove = (event) => {
        event.preventDefault();

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const elementWidth = e.offsetWidth;
        const elementHeight = e.offsetHeight;

        let newX = initialX + deltaX;
        let newY = initialY + deltaY;

        if (newX < 0) {
          newX = 0;
        } else if (newX + elementWidth > containerWidth) {
          newX = containerWidth - elementWidth;
        }

        if (newY < 0) {
          newY = 0;
        } else if (newY + elementHeight > containerHeight) {
          newY = containerHeight - elementHeight;
        }

        e.style.transform = `translate(${newX}px, ${newY}px)`;
      };

      const dragEnd = () => {
        document.removeEventListener("mousemove", dragMove);
        document.removeEventListener("mouseup", dragEnd);
      };

      e.addEventListener("mousedown", dragStart);
    }

    this.shadowRoot
      .querySelector("#orientation-selected2")
      .addEventListener("change", (event) => {
        const orientation = event.target.value;
        const logo = this.shadowRoot.querySelector("#draggable-logo");

        if (orientation === "vertical") {
          logo.style.writingMode = "vertical-lr";
          logo.style.textOrientation = "upright";
        } else {
          logo.style.writingMode = "horizontal-tb";
          logo.style.textOrientation = "unset";
        }
      });

    this.shadowRoot
      .querySelector("#text-selected2")
      .addEventListener("input", (event) => {
        const newText = event.target.value;
        this.shadowRoot.querySelector("#draggable-logo").textContent = newText;
      });

    this.shadowRoot
      .querySelector("#font-selected2")
      .addEventListener("input", (event) => {
        const newSize = event.target.value + "px";
        this.shadowRoot.querySelector("#draggable-logo").style.fontSize =
          newSize;
        this.shadowRoot.querySelector("#font-size-display2").textContent =
          newSize;
      });

    this.shadowRoot
      .querySelector("#image-size-selected")
      .addEventListener("input", (event) => {
        const newSize = event.target.value + "px"; // Récupérer la valeur et l'ajouter en tant qu'unité "px"
        this.shadowRoot.querySelector("#resizable-image").style.width = newSize; // Mettre à jour la largeur de l'image
        this.shadowRoot.querySelector("#resizable-image").style.height =
          newSize; // Mettre à jour la hauteur de l'image (si vous souhaitez le garder carré)
        this.shadowRoot.querySelector("#image-size-display").textContent =
          newSize; // Afficher la nouvelle taille
      });

      this.shadowRoot.querySelector('#upload-image').addEventListener('change', function(event) {
        const file = event.target.files[0]; // Récupère le fichier sélectionné
        if (file) {
            const reader = new FileReader(); // Utilise FileReader pour lire le fichier
            reader.onload = function(e) {
                const imgElement = this.shadowRoot.querySelector('#resizable-image'); // L'image dans le logo
                imgElement.src = e.target.result; // Définit la source de l'image à partir du fichier chargé
            }.bind(this);
            reader.readAsDataURL(file); // Lit le fichier sous forme d'URL Data
        }
    });
    

    this.shadowRoot
      .querySelector("#backgroundColor")
      .addEventListener("input", (event) => {
        const newColor = event.target.value;
        this.shadowRoot.querySelector(
          "#background-logo"
        ).style.backgroundColor = newColor;
      });

    this.shadowRoot
      .querySelector("#background-size-width")
      .addEventListener("input", (event) => {
        const newWidth = event.target.value + "px";
        this.shadowRoot.querySelector("#background-logo").style.width =
          newWidth;
      });

    this.shadowRoot
      .querySelector("#background-size-height")
      .addEventListener("input", (event) => {
        const newHeight = event.target.value + "px";
        this.shadowRoot.querySelector("#background-logo").style.height =
          newHeight;
      });

    this.shadowRoot
      .querySelector("#border-color")
      .addEventListener("input", (event) => {
        const newColor = event.target.value;
        this.shadowRoot.querySelector("#background-logo").style.borderColor =
          newColor;
      });

    this.shadowRoot
      .querySelector("#shadow-selector")
      .addEventListener("change", (event) => {
        const isChecked = event.target.checked;
        const backgroundLogo =
          this.shadowRoot.querySelector("#background-logo");
        const shadowOptions = this.shadowRoot.querySelector("#shadow-options");

        if (isChecked) {
          backgroundLogo.style.boxShadow = "10px 10px 10px rgba(0, 0, 0, 0.5)";
          shadowOptions.style.display = "block";
        } else {
          backgroundLogo.style.boxShadow = "none";
          shadowOptions.style.display = "none";
        }
      });

    this.shadowRoot
      .querySelector("#shadow-color")
      .addEventListener("input", (event) => {
        const newColor = event.target.value;
        this.shadowRoot.querySelector("#background-logo").style.boxShadow =
          "10px 10px 10px " + newColor;
      });

    this.shadowRoot
      .querySelector("#shadow-distance")
      .addEventListener("input", (event) => {
        const newDistance = event.target.value + "px";
        this.shadowRoot.querySelector("#background-logo").style.boxShadow =
          newDistance + " 10px 10px rgba(0, 0, 0, 0.5)";
      });

    this.shadowRoot
      .querySelector("#animation-selected2")
      .addEventListener("change", (event) => {
        const animation = event.target.value;
        const backgroundLogo =
          this.shadowRoot.querySelector("#background-logo");
        backgroundLogo.classList.remove(
          "shake-animate",
          "jump-animate",
          "rotate-diagonal-2"
        );
        void backgroundLogo.offsetWidth;

        if (animation) {
          backgroundLogo.classList.add(animation);
        }
      });

    this.shadowRoot
      .querySelector("#downloadButton")
      .addEventListener("click", (event) => {
        const logoElement = this.shadowRoot.querySelector("#background-logo");

        console.log("Télécharger l'image");
        // Utilisation de html2canvas pour capturer la div contenant le logo
        html2canvas(logoElement).then((canvas) => {
          // Générer le lien pour télécharger l'image
          html2canvas(logoElement)
            .then((canvas) => {
              const link = document.createElement("a");
              link.href = canvas.toDataURL("image/png");
              link.download = "capture.png";
              link.click();
            })
            .catch((error) => {
              console.error("Erreur lors de la capture :", error);
            });
        });
      });
  }
}

const script = document.createElement("script");
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.head.appendChild(script);

customElements.define("logo-component", LogoComponent);
