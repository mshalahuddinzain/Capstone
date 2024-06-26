const Articles = require('../model/articlesModel');


//Mengambil semua artikel
const getAllArticles = async (req,res) =>{
    try {
        const articles = await Articles.find({});
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

const addArticles = async (req,res)=>{
    try {
        const articles = await Articles.find({});
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

module.exports = {getAllArticles,addArticles};