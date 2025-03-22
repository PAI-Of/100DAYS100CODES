//Today i am going only to build the NLP of the AM5 aka AM4 2.0
//I am going to build the NLP from scratch using thearaus, myph, soundex and Levenshtein Distance.
//First we need to clean that text
const natural = require('natural');
const wordnet = new natural.WordNet();

function cleanText(word){
    w = word.toLowerCase()
    // we are not using replace(/[^a-zA-Z0-9]/g, ''); becuase it will remove the special characters aka delimeters like space and it will be more harder to understand by the NLP
    // Now we have to Remove unnecessary characters (punctuation, extra spaces, etc.)
    w2 = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    return w2
}
function cleanToBaseForm(word){
    // We have to convert running to run
    word = word.replace(/ing\b/g, '');
    //Convert informal text → "gonna" → "going to"
    return word;
}
function informalToFormal(text) {
    if (!text) return '';
    
    const informalMap = {
        "lemme": "let me",
        "gimme": "give me", 
        "kinda": "kind of",
        "sorta": "sort of",
        "lotta": "lot of",
        "till": "until",
        "til": "until",
        "cuz": "because",
        "coz": "because",
        "cos": "because", 
        "tho": "though",
        "thru": "through",
        "nite": "night",
        "justa": "just a",
        "b4": "before",
        "gn": "good night",
        "gm": "good morning",
        "gd": "good",
        "gr8": "great"
    };

    return text
        .split(/\b/)
        .map(word => {
            return informalMap[word.toLowerCase()] || word;
        })
        .join('');
}
function removeStopWords(sentence){
    let stopwrddt = {
        "a": true,
        "about": true,
        "above": true,
        "after": true,
        "again": true,
        "against": true,
        "all": true,
        "am": true,
        "an": true,
        "and": true,
        "any": true,
        "are": true,
        "aren't": true,
        "as": true,
        "at": true,
        "be": true,
        "because": true,
        "been": true,
        "before": true,
        "being": true,
        "below": true,
        "between": true,
        "both": true,
        "but": true,
        "by": true,
        "can't": true,
        "cannot": true,
        "could": true,
        "couldn't": true,
        "did": true,
        "didn't": true,
        "do": true,
        "does": true,
        "doesn't": true,
        "doing": true,
        "don't": true,
        "down": true,
        "during": true,
        "each": true,
        "few": true,
        "for": true,
        "from": true,
        "further": true,
        "had": true,
        "hadn't": true,
        "has": true,
        "hasn't": true,
        "have": true,
        "haven't": true,
        "having": true,
        "he": true,
        "he'd": true,
        "he'll": true,
        "he's": true,
        "her": true,
        "here": true,
        "here's": true,
        "hers": true,
        "herself": true,
        "him": true,
        "himself": true,
        "his": true,
        "how": true,
        "how's": true,
        "i": true,
        "i'd": true,
        "i'll": true,
        "i'm": true,
        "i've": true,
        "if": true,
        "in": true,
        "into": true,
        "is": true,
        "isn't": true,
        "it": true,
        "it's": true,
        "its": true,
        "itself": true,
        "let's": true,
        "me": true,
        "more": true,
    };
    return sentence
        .split(/\b/) // Split by word boundaries to keep punctuation
        .map(word => stopwrddt[word.toLowerCase()] || word) // Replace if found
        .join('');
}
function remSyn(word, callback) {
    wordnet.lookup(word, function (results) {
        if (results.length > 0) {
            callback(results[0].lemma); // Return the base form (first lemma)
        } else {
            callback(word); // If no base form, return the original word
        }
    });
}

// Function to get the base form (root) of any word
function remSynSentence(sentence, callback) {
    let words = sentence.split(/\s+/);
    let baseWords = [];
    let processed = 0;

    words.forEach(word => {
        remSyn(word, (baseForm) => {
            baseWords.push(baseForm);
            processed++;

            if (processed === words.length) {
                callback(baseWords.join(" "));
            }
        });
    });
}

function nlp(sentence){
    nlp_a = remSynSentence(sentence, (baseSentence) => {
        console.log(baseSentence);
    });
    nlp_b = informalToFormal(nlp_a);
    nlp_c = removeStopWords(nlp_b);
    nlp_d = cleanText(nlp_c);
    nlp_e = cleanToBaseForm(nlp_d);
    return nlp_e;
}
nlp("I am going to the store to buy some milk");