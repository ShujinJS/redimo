const express = require('express');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const typeDefs = require('./graphql/apollo/schema/schema');
const resolvers = require('./graphql/apollo/resolvers/resolvers');
const PORT = 4000;

// MongoDB
const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@redimodb.67se9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true }




async function startApolloServer(typeDefs, resolvers) {

    // Stripe
    const stripe = require('stripe')('sk_test_51IBJzvKzA4mHj1ehfNko8ISI2NCJUa5lfqCD6fzDF0YQR9omX48VyNIlKZOQNuSKgwiGPSsFqw3LfY0dqH0SjU1q00UnVXO6op');

    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await server.start();
    server.applyMiddleware({ app });

    app.use(express.static('public'));
    app.use(express.json());

    const calculateOrderAmount = (items) => {
        // Replace this constant with a calculation of the order's amount
        // Calculate the order total on the server to prevent
        // people from directly manipulating the amount on the client
        var cartTotal = 0;
        var shopTotal = 0;

        items.map(item => {
            
            let { price, discount } = item;
            
            let shopPrice = Number(price);
            let intPrice = Number(price).toFixed(2)
            // Decimal (xx,x)
            let newPrice = new Intl.NumberFormat().format(shopPrice);
            // İndirim varsa düşür
            let discountedPrice = Number(shopPrice - (shopPrice * (discount / 100))).toFixed(2);
            // Decimal (xx,x)
            let intDiscountedPrice = new Intl.NumberFormat().format(discountedPrice);
            let shopDiscountedPrice = Number(discountedPrice);
            // Virgülden sonra iki sayıya sabitle
            cartTotal = Number((cartTotal + shopDiscountedPrice).toFixed(2));
            // Noktayı virgüle çevir, virgülden sonra 2 sayıya sabitle
            shopTotal = Number((cartTotal + 9.90).toFixed(2))
        })

        console.log(shopTotal)

        if(shopTotal>1) {
            shopTotal = shopTotal*100;
            return shopTotal;
        } else {
            return 5000;
        }

    };

    app.post("/create-payment-intent", async (req, res) => {
        const { items } = req.body;
        console.log(items);

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "try",
            automatic_payment_methods: {
            enabled: false,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        })
    })

    await mongoose
    .connect(uri, options)
    .then(() => httpServer.listen(PORT, () => console.log(`Server is running on localhost:${PORT}${server.graphqlPath}`)))
}

startApolloServer(typeDefs, resolvers);