## About

🚀 **Desk Pad Picker Widget** is a versatile tool designed for seamless integration into your website. Empower your users to effortlessly select the perfect desk pad for their workspace, enhancing their overall desk experience.

## Features

- **Easy Integration:** Implement Desk Pad Picker Widget into your website with just a few lines of code.

- **Customizable Experience:** Tailor the widget to match the look and feel of your website, ensuring a cohesive user experience.

- **Size Recommendations:** Provide users with personalized recommendations based on their desk space, helping them choose the ideal desk pad size.

- **Enhanced Productivity:** Elevate your users' workspace setup, promoting productivity and comfort.

## Getting Started

Integrating Desk Pad Picker Widget into your website is a breeze:

1. **Clone the repository first:**
   ```bash
    git clone https://github.com/Edga380/desk-pad-picker.git

2. **Include the Widget button in your HTML where you want it to appear:**
   ```html
    <button class="open-desk-configurator-button" onclick="ToggleMainPage(0)">
        Desk Pad Configurator
    </button>

3. **Include the rest of HTML into your page:**
   ```html    
   <section class="main-page-desk-configurator" id="main-page-desk-config">
        <!--Page close button-->
        <button class="close-main-page-desk-configurator" onclick="ToggleMainPage()">X</button>
        <!--Desk section-->
        <div class="desk">
        </div>
        <!--Deskpad section-->
        <div class="deskpad" title="Press and hold to move."></div>
        <!--Configurator section-->
        <div class="configurator-container">
            <div class="open-close-config-button-container">
                <button id="config-button" class="close-main-page-desk-configurator-nav" onclick="ToggleConfiguratorPage('menu')">=</button>
                <button class="close-main-page-desk-configurator-nav" onclick="ToggleConfiguratorPage('close')">X</button>
            </div>
            <h2 id="deskpad-name">Deskpad name</h2>
            <form class="deskpad-form" id="choose-deskpad-form">
                <select id="choose-deskpad" name="choose-deskpad">
                </select>
            </form>
            <form class="deskpad-form" id="choose-units-form">
                <select id="choose-units" name="choose-units">
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="in">inch</option>
                </select>
            </form>
            <h2 class="desk-size-text">Desk size:</h2>
            <input type="number" id="desk-width" class="input-field-deskpad-config" value="" placeholder="width">
            <input type="number" id="desk-height" class="input-field-deskpad-config" value="" placeholder="height">
            <button class="apply-button-deskpad-config" onclick="ApplyOptions()">Apply</button>
            <!--Desk options-->
            <div class="desk-options">
            </div>
        </div>
    </section>

4. **Include javascript file at the bottom:**
   ```html
    <script src="./deskpad.js"></script>

5. **Adjust CSS styling to your own liking:**
   ```css
   :root {
     --open-config-button-background-color: rgb(30, 30, 30);
     --open-config-button-font-color: antiquewhite;
     --border-color: rgb(62, 11, 0);
     --configurator-bg-color: rgba(0, 0, 0, 0.6);
     --configurator-container-bg-color: rgb(230, 230, 230);
     --config-buttons-bg-color: rgb(230, 230, 230);
     --hover-border-color: rgb(146, 27, 0);
     --focus-border-color: rgb(215, 39, 0);
     --focus-border-box-shadow-color: rgb(255, 47, 0);
   }
