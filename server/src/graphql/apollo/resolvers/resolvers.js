const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Movie = require('../../../models/movie.model');
const Book = require('../../../models/book.model');
const Clothe = require('../../../models/clothe.model');
const User = require('../../../models/user')
const Message = require('../../../models/message')
const SiteLanguage = require('../../../models/site-language')
const Collections = require('../../../models/collections')

module.exports = {

    Query: {

        message: (_, {_id}) => Message.findById(_id),
        findUser: (_, {_id}) => User.findById(_id),

        // Get Site Languages 
        getSiteLanguages: (root) => {
            return new Promise((resolve, reject) => {
                SiteLanguage.find((err, sitelanguages) => {
                    if(err) reject(err);
                    else resolve(sitelanguages);
                })
            })
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

        // Tüm books getir
        getBooks: (root) => {
            return new Promise((resolve, reject) => {
                Book.find((err, books) => {
                    if(err) reject(err);
                    else resolve(books);
                })
            })
        },

        // Bir book getir
        findBook: (root, {_id}) => {
            return new Promise((resolve, reject) => {
                Book.findOne({_id: _id}, (err, book) => {
                    if(err) reject(err);
                    else resolve(book);
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
        },

        // Get Collections
        getCollections: (root) => {
            return new Promise((resolve, reject) => {
                Collections.find((err, collections) => {
                    if(err) reject(err);
                    else resolve(collections);
                })
            })
        }

    },

    Mutation: {

        // Register User
        async registerUser(_, { input: {username, email, password, name, lastname, birthdate} }) {
            // See if an old user exist with email attempting to register
            const oldUser = await User.findOne({ email });

            // Throw error if that user exists
            if (oldUser) {
                throw new ApolloError('A user is already registered with the email' + email, 'USER_ALREADY_EXISTS')
            }
            // Encrypt password
            var encryptedPassword = await bcrypt.hash(password, 10)

            // Build out mongoose model
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword,
                name: name,
                lastname: lastname,
                birthdate: birthdate
            })
            // Create our JWT (attach to our User model)
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
            )

            newUser.token = token;
            // Save our user in mongodb
            const res = await newUser.save();

            return {
                _id: res._id,
                ...res._doc
            }
        },

        // Login User
        async loginUser(_, { input: { email, password } }) {
            // See if a user exist with the email
            const user = await User.findOne({ email });
            // Check if the entered password equals the encrypted password
            if (user && (await bcrypt.compare(password, user.password))){
            // Create a NEW token
            const token = jwt.sign(
                { user_id: user._id, email },
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
            );
            
            // Attach token o user model that we found above
            user.token = token;

            return {
                _id: user._id,
                ...user._doc
            }
            } else {
                // If user doesn't exist return error
                throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD')
            }


        },

        // Movie oluştur
        createMovie: (root, { input }) => {
            const newMovie = new Movie({
                topic: input.topic,
                title: input.title,
                genre: input.genre,
                director: input.director,
                duration: input.duration,
                year: input.year,
                price: input.price,
                imageUrl: input.imageUrl,
                stock: input.stock,
                shippingFee: input.shippingFee,
                discount: input.discount
            });

            newMovie._id = input._id;

            return new Promise((resolve, reject) => {
                newMovie.save((err) => {
                    if(err) reject(err);
                    else resolve(newMovie)
                })
            })
        },

        // Book oluştur
        createBook: (root, { input }) => {
            const newBook = new Book({
                author: input.author,
                title: input.title,
                pages: input.pages,
                genre: input.genre,
                publisher: input.publisher,
                publishDate: input.publishDate,
                binding: input.binding,
                price: input.price,
                imageUrl: input.imageUrl,
                stock: input.stock,
                shippingFee: input.shippingFee,
                discount: input.discount
            });

            newBook._id = input._id;

            return new Promise((resolve, reject) => {
                newBook.save((err) => {
                    if(err) reject(err);
                    else resolve(newBook)
                })
            })
        },

        createClothe: (root, { input }) => {
            const newClothe = new Clothe({
                topic: input.topic,
                brand: input.brand,
                title: input.title,
                color: input.color,
                size: input.size,
                price: input.price,
                gender: input.gender,
                imageUrl: input.imageUrl,
                images: input.images,
                shippingFee: input.shippingFee,
                discount: input.discount
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
                shippingFee: clothe.shippingFee,
                discount: input.discount
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

