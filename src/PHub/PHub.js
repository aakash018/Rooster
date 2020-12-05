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
        console.log(this)
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

    searchForFullVideo = async (params) => {
        try {
        return axios.get(`https://www.pornohd.sex/search/?text=${params[0]}%20${params[1]}`)
        .then(async (res) => {
            const $ = cheerio.load(res.data)
           
            const urlList = []

            $("#preview .preview_screen a").each((i, el) => {
                const eachLink = $(el).attr("href")
                urlList.push(eachLink)
            })

            // console.log(urlList[Math.floor((Math.random())*gifPageURL.length)]

            const url = urlList[Math.floor((Math.random())*urlList.length)]
            console.log("URL" + url)
        
                let video = await nightmare
                            .goto(url)
                            .wait("#videoplayer")
                            .evaluate(() => document.querySelector("#videoplayer video").getAttribute("src"))
                
                const videoQuality = ["720", "480", "1080"]
                if(params[2] != null && params[2] === "-q" && videoQuality.some(q => q === params[3])){
                    console.log(params)
                    video = video.replace("480p", `${params[3]}p`)
                }
                return video
         
})
        }catch (e){
            console.log(e)
            return("Sorry could not help you with that...")
        }
}
}

module.exports = PHub;