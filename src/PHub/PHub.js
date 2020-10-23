const cheerio = require("cheerio")
const axios = require("axios")



class PHub {

    _searchingInfo(name, type="pornstar") {
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
    }

    searchStarsInfo = async (name) => {
        return await this._searchingInfo(name, "pornstar")
        
    }

    searchModelInfo = async (name) => {
        return await this._searchingInfo(name, "model")
    }
}

module.exports = PHub;