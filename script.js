// Declaring the variables
const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

// Declaring the functions and the event listeners

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQrText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);


const defaultURL = "https://www.example.com";
let colorLight = "#fff";
let colorDark = "#000";
let text = defaultURL;
let size = 300;


// Function to handle the light color of the QRCode
function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQRCode();
}

// Function to handle the darj color of the QRCode
function handleLightColor(e) {
    colorLight = e.target.value;
    generateQRCode();
}

// Function to handle the Text input and if the text is empty, set it to a default URL
function handleQrText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultURL;
    }
    generateQRCode();
}

// Function that generates the QRCode
async function generateQRCode() {
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await resolveDataUrl();
}


// Function that handles the Share button and its functionality
async function handleShare() {
    setTimeout(async () => {
        try {
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", { type: blob.type, lastModified: Date.now() });
            await navigator.share({
                files: [file],
                title: text,
            });
        } catch (error) {
            alert("Sharing is not supported in this browser");
        }
    }, 100);
}

// Function that handles the size of the QRCode
function handleSize(e) {
    size = e.target.value;
    generateQRCode();
}

// Function that resolves the data URL of the QRCode
function resolveDataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if (!img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}

generateQRCode();