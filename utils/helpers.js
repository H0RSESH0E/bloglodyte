module.exports = {
    dateHelper: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    pluralHelper: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }

        return word;
    },
    snippetHelper: (text, char_num) => {
        return text.slice(0, char_num);
    }
}