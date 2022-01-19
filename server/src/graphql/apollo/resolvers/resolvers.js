const Movie = require('../../../models/movie.model');
const Clothe = require('../../../models/clothe.model');

module.exports = {

    Query: {


        // Tüm movies getir
        getMovies: (root) => {
            return new Promise((resolve, reject) => {
                Movie.find((err, movies) => {
                    if(err) reject(err);
                    else resolve(movies);
                })
            })
        },

        // Bir movie bul
        findMovie: (root, {_id}) => {
            return new Promise((resolve, reject) => {
                Movie.findOne({_id: _id}, (err, movie) => {
                    if(err) reject(err);
                    else resolve(movie);
                })
            })
        },

        // Tüm clothing getir
        getClothes: (root) => {
            return new Promise((resolve, reject) => {
                Clothe.find((err, clothes) => {
                    if(err) reject(err);
                    else resolve(clothes);
                })
            })
        },

        // Bir cloth bul
        findClothe: (root, {_id}) => {
            return new Promise((resolve, reject) => {
                Clothe.findOne({_id: _id}, (err, clothe) => {
                    if(err) reject(err);
                    else resolve(clothe);
                })
            })
        }

    },

    Mutation: {

        // Movie oluştur
        createMovie: (root, { input }) => {
            const newMovie = new Movie({
                topic: input.topic,
                title: input.title,
                price: input.price,
                imageUrl: input.imageUrl,
                stock: input.stock,
                shippingFee: input.shippingFee
            });

            newMovie._id = input._id;

            return new Promise((resolve, reject) => {
                newMovie.save((err) => {
                    if(err) reject(err);
                    else resolve(newMovie)
                })
            })
        },

        createClothe: (root, { input }) => {
            const newClothe = new Clothe({
                topic: input.topic,
                brand: input.brand,
                title: input.title,
                price: input.price,
                gender: input.gender,
                imageUrl: input.imageUrl,
                stock: input.stock,
                shippingFee: input.shippingFee
            });

            newClothe._id = input._id;

            return new Promise((resolve, reject) => {
                newClothe.save((err) => {
                    if(err) reject(err);
                    else resolve(newClothe)
                })
            })
        },

        // Bir cloth ekle
        addClothe: (root, { clothe }) => {
            const newClothe = new Clothe({
                topic: clothe.topic,
                brand: clothe.brand,
                title: clothe.title,
                price: clothe.price,
                gender: clothe.gender,
                imageUrl: clothe.imageUrl,
                stock: clothe.stock,
                shippingFee: clothe.shippingFee
            });

            newClothe._id = clothe._id;

            return new Promise((resolve, reject) => {
                newClothe.save(err => {
                    if(err) reject(err);
                    else resolve(newClothe)
                })
            })
        }
    }

}

