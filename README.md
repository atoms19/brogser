# brogser

a fully customisable,redesigned new tab for chrome and other browsers

## installation
<hr>
download this code as zip ,extract files and load it in chrome by going to  chome:extensions and clicking on load unpacked select unzipped folder and activate extension (you need to enable developer options for this)

or in other browsers set hompage link as
```
https://atoms19.github.io/brogser/home/
``` 
>I'll be putting this up on chromewebstore soon so it will be much more easier

## features
<hr>
brogser is equipped with lots pf features many of which u can access straight out of the box

### custom commands
ever wanted to look something up on youtube , normally you would have to go to youtube.com first then click on searchbar and typewhat you want to search with brogser you can save time on this by using commands 

just type
```
!yt <what you want to search for>
```
on brogser searchbar and you'd instantly be redirected to yt search results
not just YouTube there's many more shortcuts inbuilt

| shortcut | action |
| -------- | ------ |
|`!r <search term>` | searches reddit |
|`!pin <search term>` | searches pinterest|
| `!g <search term>` | searches github |
| `!tw <search term>` | searches X(Twitter) |

quick paths is another feature that allows you to easily get to a specific section of webpages that you have shortcuts for
for example typing `!g/atoms19` would directly take you to my profile here !g acts as https://github.com saving us time typing
 it also works for reddit and twitter
wanna quickly jump into a subreddit just type `!r/r/<subreddit name>` and thats it

### customisation

brogser uses glasmorphic rounded ui design so it blends with the background image you use fitting with every asthetic ,its primary sturucture will stay how it is but rest everything else can be customised 

right in the config menu you'll be able to configure your preferred search engine and can choose what the title text of the brogser should be `by default its set to brogser` you can also change the background image of brogser from config screen you can select any photo from your files

higher order customisation requires the use commands with commands you'll be able to customise fonts, background color, icon size ,icon colour ,border radius etc etc
css variables are there for ease of customisation so just change theses variables
```css

--font(use @import to import font)
  --round
  --bgmode
  
  --searchbarround
  --searchbarbg
  --searchbarborder
  --searchbartext
  --searchbarprompttext
  
  
  --shortcutbg
  --shortcutround
  --shortcutsize
  --shortcuttext
  --shortcutseperation
  --shortcuthovereffect
  --shortcuttransform
  
  
  --shortcutboxbg
  --shortcutboxround
  --shortcutboxsize
  --shortcutboxtransform

  
  --iconbg
  --iconround
  --iconsize
  
  --btnbg
  --btntext

```


commands aren't difficult to get used to
theres a small text feild in the config menu thats where you'll be running your commands, commands are nothing but some javascript functions

here's a list of customisation commands
| command styntax |action |
| --------------- | ----- |
|`customStyle(string)` | takes in css as string allows you to set external css |
| `addCustomStyle(string)`| takes in css and adds it yo the external css |

### shortcuts

shortcuts can be added to shorcutbox by clicking on the obvious add button but they can neither be removed nor rearranged without the help of commands so go back to the textarea in config and these easy commands to reorder or remove shortcuts

| command styntax |action |
| --------------- | ----- |
| `removeShortcut('shortcutname')` | removes the shortcut from list |
| `reorderShortcut('shortcutname',new position)` | reorder the shortcut of the given name to the position mentioned 1 is foremost|

>i couldn't make proper drag and drop and delete option cause idk allright maybe someday

## beta
custom shortcut commands is the latest addition to commands is the ability to add a new custom command ,its mandatory that it starts with`!` and the linkname should include /search like `https://www.twitter.com/search`

run this on commands textarea,
example
```js

addCustomCommand('!anim',['https://anilist.co/search','&q='])

```


# thanks