const Category = require('../../../models/category');
const Movie = require('../../../models/movie.model');
const Clothe = require('../../../models/clothe.model');

module.exports = {
    
    Query: {
        categories: async () => {
            try {
                const categoriesFetched = await Category.find()
                return categoriesFetched.map(category => {
                    return {
                        ...category._doc
                    }
                })
            } catch (error) {
                throw error
            }
        },

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
        createCategory: async args => {
            console.log(args)
            try {
                const { title, url } = args.category
                const category = new Category({
                    title,
                    url
                })
                const newCategory = await category.save()
                return { ...newCategory._doc, _id: newCategory.id }
            } catch (error) {
                throw error
            }
        },

        // Movie oluştur
        createMovie: (root, { input }) => {
            const newMovie = new Movie({
                topic: input.topic,
                title: input.title,
                price: input.price,
                imageUrl: input.imageUrl,
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
        addClothe: (root, { cloth }) => {
            const newClothe = new Clothe({
                topic: cloth.topic,
                brand: cloth.brand,
                title: cloth.title,
                price: cloth.price,
                gender: cloth.gender,
                imageUrl: cloth.imageUrl,
                shippingFee: cloth.shippingFee
            });

            newClothe._id = cloth._id;

            return new Promise((resolve, reject) => {
                newClothe.save(err => {
                    if(err) reject(err);
                    else resolve(newClothe)
                })
            })
        }
    }

}

