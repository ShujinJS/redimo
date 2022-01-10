const Article = require("../../../models/article");
const Category = require("../../../models/category");

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
    articles: async () => {
        try {
            const articlesFetched = await Article.find()
            return articlesFetched.map(article => {
                return {
                    ...article._doc,
                    _id: article.id,
                    createdAt: new Date(article._doc.createdAt).toISOString()
                }
            })
        } catch (error) {
            throw error
        }
    },

    categories: async () => {
        try {
            const categoriesFetched = await Category.find()
            return categoriesFetched.map(category => {
                return {
                    ...category._doc,
                }
            })
        } catch (error) {
            throw error
        }
    },

    createArticle: async args => {
        try {
            const { title, body } = args.article
            const article = new Article({
                title,
                body
            })
            const newArticle = await article.save()
            return { ...newArticle._doc, _id: newArticle.id }
        } catch (error) {
            throw error
        }
    },

    createCategory: async args => {
        try {
            const { title, url } = args.category
            const category = new Category({
                title,
                url
            })
            const newCategory = await category.save()
            return { ...newCategory._doc}

        } catch (error) {
            throw error
        }
    }
}

