# apex-n
###### A modern, simple and customisable ACT OverlayPlugin skin
- Clean design
- Easy to use config
- Customisable color schemes
- Class/job colors
- Limit break options
- Compact and mini version available

[Download here](https://github.com/nettyneets/apex-n/releases)

## preview
[nettyneets.github.io/apex-n](https://nettyneets.github.io/apex-n/)

###### DEFAULT
![Screenshot](https://nettyneets.github.io/apex-n/images/preview.png)
###### CLASS COLORS
![Screenshot](https://nettyneets.github.io/apex-n/images/classcolors.png)
###### MINI
![Screenshot](https://nettyneets.github.io/apex-n/images/mini.png)
###### COMPACT
![Screenshot](https://nettyneets.github.io/apex-n/images/compact.png)

## installation

Unzip the download and copy the contents (4 folders and 3 .html files) of the folder into the ACT installation location\build\resources. eg:
```
C:\Program Files (x86)\Advanced Combat Tracker\Build\resources
```
To enable the skin, open ACT and go to the Plugins tab. Select OverlayPlugin.dll, Mini Parse on the left and click the (...) 

apex-n.html for the default version, or

apex-n-compact.html for the smaller design.

## config 

Config file = js/apex-n-config.js

To edit the config, do so while ACT isn't running, or copy the config file onto your desktop, edit it there and paste it into the js folder with admin permissions, then simply press Reload overlay in ACT to view the changes.

###### GENERAL

`var yourname = "YOU";` - Changes your display name

`var headerOpacity = "0.87";` - Changes the encounter header background opacity

`var partyOpacity = "0.77";` - Changes the party list background opacity

`var classColors = false;` - If set to true, class colors are enabled (note: no "")

`var ignoreLimitBreak = true;` - If set to true, lb will not be shown as max hit (note: no "")

`var partyLimitBreak = true;` - If set to true, lb will be shown in the party list (note: no "")

###### IF CLASS COLORS ARE SET TO FALSE

`var colorOne = "#2994f7";` - First color / Default = #2994f7

`var colorTwo = "#eb318c";` - Second color / Default = #eb318c


###### IF CLASS COLORS ARE SET TO TRUE

`var classColorOne = "#928DAB";` - First color / Default = #928DAB / Changes "time"

`var classColorTwo = "#928DAB";` - Second color / Default = #928DAB / Changes "max hit"

By default, the two stats displayed (crit/dh or heal/oh) will have the same colors as your class gradients, you can override it here and set them to a uniform color

`var overrideStats = true;`
`var overrideColor = "#1c2023";`

Class colors and their default values

`var classTankOne = "#396afc";`
`var classTankTwo = "#36D1DC";`


`var classHealerOne = "#00b09b";`
`var classHealerTwo = "#96c93d";`


`var classDpsOne = "#4b134f";`
`var classDpsTwo = "#c94b4b";`


`var classOne = "grey";`
`var classTwo = "#928DAB";`


## bugs and suggestions

Please use the Issues tab to report any problems as well as request new features.

## license

Free for personal use. Non-commercial. No derivatives.

You may not use the material for commercial purposes.  If you remix, transform, or build upon the material, you may not distribute the modified material.

Do not re-upload this project, or claim it as your own. If you wish to share it please link to its [original page](https://nettyneets.github.io/apex-n/).
