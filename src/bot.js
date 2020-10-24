require("dotenv/config")
const { Client } = require("discord.js")
const PHub = require("./PHub/PHub")

const pHub = new PHub()
const client = new Client()

client.login(process.env.DISCORD_TOKEN)

client.on("ready", () => {
    console.log("Loged In")
})

client.on("message", async (message) => {
    if(message.author.username === "Rooster") {
        return
    }

    const COMMANDS_REQUIRMENT = "$"

    if(message.content[0] === COMMANDS_REQUIRMENT) {
        const [COMMAND, ...COMMAND_PARAMS] = message.content.slice(1).split(" ")
        message.reply("Jesus is checking his collections... :face_with_monocle: ")
        switch(COMMAND) {
            case("blessmewithstar") :
                blessme(COMMAND_PARAMS, pHub.searchStarsInfo, message)
                break;
            
            case("blessmewithmodel"):
                    blessme(COMMAND_PARAMS, pHub.searchModelInfo, message)
                    break;
            case("giveatestdrive"):
                const gifUrl = await pHub.searchForGif(`${COMMAND_PARAMS[0]} ${COMMAND_PARAMS[1]}`.toLocaleLowerCase())
                console.log(gifUrl)
                message.reply(gifUrl)
            }  
    }
})


const blessme = async (COMMAND_PARAMS, searchStarsInfo, message) => {
    let StarsInfo =[]
                if(COMMAND_PARAMS[1] != null) {
                 StarsInfo = await searchStarsInfo(`${COMMAND_PARAMS[0]} ${COMMAND_PARAMS[1]}`.toLocaleLowerCase())
                } else {
                StarsInfo = await searchStarsInfo(`${COMMAND_PARAMS[0]}`.toLocaleLowerCase())  
                }

                
                if(Object.entries(StarsInfo).length === 0) {
                    message.reply("Sorry Jesus couldn't help you with this!! :weary:")
                    return
                }
                message.reply("You've been bleased son")
                message.reply(StarsInfo.img)
                message.reply(
                    `
                    Gender: ${StarsInfo.Gender}
                    City and Country: ${StarsInfo.CityandCountry}
                    Birthday: ${StarsInfo.Birthday}
                    BirthPlace: ${StarsInfo.BirthPlace}
                    Star Sign: ${StarsInfo.StarSign}
                    Measurements: ${StarsInfo.Measurements}
                    Height: ${StarsInfo.Height}
                    Weight: ${StarsInfo.Weight}
                    Ethnicity:: ${StarsInfo.Ethnicity}
                    HairColor: ${StarsInfo.HairColor}
                    Tattoos: ${StarsInfo.Tattoos}
                    Piercings: ${StarsInfo.Piercings}
                    Fake Tittes: ${StarsInfo.FakeBoobs}
                    Joined: ${StarsInfo.Joined}
                    Views: ${StarsInfo.PornstarProfileViews}
                    Interested In: ${StarsInfo.Interestedin}
                    RelationShip Status: ${StarsInfo.Relationshipstatus}
                    `
                )
}