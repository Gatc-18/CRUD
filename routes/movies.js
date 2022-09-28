const { Router } = require("express");
const { v4: uuidv4 } = require('uuid');
const router = Router(); 
const fs = require("fs");
const moviesFile = fs.readFileSync("./movies.json", 'utf-8');
let movies = JSON.parse(moviesFile); 


router.get("/movie", (req, res) => {
    res.json(movies); 
})

router.post("/movie", (req, res) => {
    const { name, year, release_date, description, recaudation} = req.body; 

    if(!name || !year || !release_date || !description ||  !recaudation){
        res.status(400).json({error: "Bad request"})
    } else {
        
        let newMovie = {
            id: uuidv4(),
            name, 
            year, 
            release_date, 
            description, 
            recaudation
        };

        movies.push(newMovie);
        const jsonMovies = JSON.stringify(movies); 
        fs.writeFileSync("./movies.json", jsonMovies, 'utf-8');
        res.status(200).json(newMovie); 
    }
});

router.put("/movie/:id", (req, res) => {
    const { name, year, release_date, description, recaudation} = req.body; 
    const id = req.params.id;

    if(!name || !year || !release_date || !description ||  !recaudation || !id){
        res.status(400).json({error: "Bad request"})
    } else {
        movies.filter((movie) => {
            if(movie.id === id){
                movie.name = name;
                movie.year = year;
                movie.release_date = release_date;
                movie.description = description; 
                movie.recaudation = recaudation; 
            }
        });

        const jsonMovies = JSON.stringify(movies); 
        fs.writeFileSync("./movies.json", jsonMovies, 'utf-8');
        res.status(200).json(movies); 
    }

})

router.delete("/movie/:id", (req, res) => {

    const id = req.params.id;

    if(!id){
        res.status(400).json({error: "Bad request"});
    } else {
        const indexMovie = movies.findIndex((movie) => movie.id === id); 
        movies.splice(indexMovie, 1); 

        const jsonMovies = JSON.stringify(movies); 
        fs.writeFileSync("./movies.json", jsonMovies, 'utf-8');
        res.status(200).json(movies); 
    }


})

router.patch("/movie/:id", (req, res) => {
    const { name, year, release_date, description, recaudation} = req.body; 
    const id = req.params.id;

    if(!id){
        res.status(400).json({error: "Bad request"})
    } else {
        movies.filter((movie) => {
            if(movie.id === id){
                movie.name = name || movie.name;
                movie.year = year || movie.year;
                movie.release_date = release_date || movie.release_date ;
                movie.description = description || movie.description; 
                movie.recaudation = recaudation || movie.recaudation; 
            }
        });

        const jsonMovies = JSON.stringify(movies); 
        fs.writeFileSync("./movies.json", jsonMovies, 'utf-8');
        res.status(200).json(movies); 
    }

})






module.exports = router; 