import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "..." });
  });

app.post("/submit", async (req,res) => {
    
    const jokeType = req.body.jokeCategory;
    const jokeBlacklist = req.body.categoryBlacklist || [];
    const jokeId = req.body.id;
    const reqURL = "https://v2.jokeapi.dev/joke/";

    try{
        const result = await axios.get(reqURL + jokeType + "?blacklistFlags="+ jokeBlacklist + "&type=single");
        res.render("index.ejs", { content: JSON.stringify(result.data.joke) });
        console.log(reqURL + jokeType + "?blacklistFlags="+ jokeBlacklist + "&type=single");
    }catch (error){
        res.render("index.ejs");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });