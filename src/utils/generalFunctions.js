const stripHtml = require('string-strip-html');

function sanitiseObj (obj) {
    if (obj === null || typeof(obj) !== 'object') return null;
    const newObj = Array.isArray(obj) ? [] : {};

    const objEntries = Object.entries(obj);
    objEntries.forEach( entry => {
        if (typeof(entry[1]) === 'string') {
            const sanitisedString = stripHtml(entry[1]).result;
            newObj[entry[0]] = sanitisedString;
        } else if (typeof(entry[1]) === 'object') {
            newObj[entry[0]] = sanitiseObj(entry[1]);
        }
        else {
            newObj[entry[0]] = entry[1];
        }
    });

    return newObj;
}

module.exports = { sanitiseObj };

