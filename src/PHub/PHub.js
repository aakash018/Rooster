const cheerio = require("cheerio")
const axios = require("axios")

const Nightmare = require("nightmare")
const nightmare = Nightmare()


class PHub {

    _searchingInfo(name, type="pornstar") {
        try{
            const url = `https://www.pornhub.com/${type}/${name.replace(" ", "-")}`
            console.log(url)
        return axios.get(url)
        .then(res => {
            const $ = cheerio.load(res.data)
            const starsInfoList = []
            $(".detailedInfo div .infoPiece").each((i, el)=> {
                const items = $(el).text().replace(/\s\s+/g, "");
                starsInfoList.push(items)
    })
            const starsInfoObject = new Object()
            const profilePic = $(".previewAvatarPicture img").attr("src")
            if(profilePic != null){
                starsInfoObject.img = profilePic
                 starsInfoObject.url = url
            }
            starsInfoList.map(element => {
                const splitedData = element.split(":")
                starsInfoObject[splitedData[0].replace(/\s/g, "")] = splitedData[1]
            })
    
    return starsInfoObject;
    
})
    }catch (e){
        console.log(e)
        return {}
}
}

    searchStarsInfo = async (name) => {
        return await this._searchingInfo(name, "pornstar")
        
    }

    searchModelInfo = async (name) => {
        return await this._searchingInfo(name, "model")
    }

    searchForGif = async (name) => {
        try {
        const gifPageURL = await nightmare
                            .goto(`https://www.pornhub.com/pornstar/${name.replace(" ", "-")}/gifs`)
                            .wait(".gifsWrapperProfile")
                            .evaluate(() => Array.from( document.querySelectorAll(".gifsWrapperProfile li a")).map(a => a.href))
        
        const url = gifPageURL[Math.floor((Math.random())*gifPageURL.length)]
        const gif = await nightmare
                            .goto(url)
                            .wait("#gifWebmPlayer") 
                            .evaluate(() => document.querySelector("#gifWebmPlayer source").getAttribute("src"))
                                       

        return gif
        }catch (e) {
            console.log(e)
            return "Jesus couldn't help you with that...:pleading_face: "
        }
    }
}

module.exports = PHub;