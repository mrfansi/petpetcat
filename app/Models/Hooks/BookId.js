'use strict'
const BookId = exports = module.exports = {}

BookId.generate = (modelInstance) => {
    modelInstance.id = () => {
        // Alphanumeric
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        const uniqueId = function() {
            let text = ''
            for (let i = 0; i < 4; i++) {
                text += characters.charAt(Math.floor(Math.random() * characters.length))
            }
            return text
        }
        return uniqueId()
    };
}
