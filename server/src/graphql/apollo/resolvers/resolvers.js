const Category = require('../../../models/category');
const User = require('../../../models/user');


/*
    resolver: GraphQL query'sinden gelen response'u oluşturmak için yardımcı olan function'ların bir collection'ıdır.

    request'i alır ve geriye bir response döndürür.

    herbir query ve mutation isminin resolver function ile eşleşmesi gerekir. Eğer articles adında bir querymiz varsa, articles() resolver function'ımız olmalı.
*/

/*
    GraphQL schemamızda "articles" adında articles'tan oluşan bir array döndüren bir querymiz var. Dolayısıyla aynı isimde bir resolver'ımız olmalı.

    articles function mongoose'un oluşturduğu modeli kullanır, böylece ".find()" methoduna erişimimiz sağlanıyor.

    gelen data bir array, map ile dönerek herbir objecti alıyoruz, _id'yi mongoose ile override ederek createdAt alanını daha kullanıcı dostu bir tarihe çeviriyoruz.

    gelen datayı kaydetmek için "save()" helper methodu kullanıyoruz.
    MongoDB'den gelen response bazı metadata içeriyor, bu yüzden "_doc" property direkt olarak return edildi.

    Böylece schema ve resolvers GraphQL API için hazırlandı.
    Ardından server ve endpoint oluşturulacak.
 */

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
        users: async args => {
            try {
                console.log(args)
                const userFetched = await User.find()
                return userFetched.map(user => {
                    return {
                        ...user._doc,
                        name: user.name
                    }
                })
            } catch (error) {
                throw error
            }
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
        }
    }


}

