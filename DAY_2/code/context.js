function getContext(word){
    context = akaContextApi(word);
    return context;
}
function akaContextApi(sentence) {
    const CONTEXT_SEARCH = {
        ABOUT_HIM: ["i am", "am", "me"],
        ABOUT_SOMEONE: ["about him", "about her", "about them"],
        ABOUT_THING: ["this", "that", "it"],
        ABOUT_ME: ["are you", "u", "your", "ur", "you're", "you are"],
        PROBABILITY: ["will", "would", "could", "should", "can", "may", "might", "must"],
        QUESTION: ["what", "who", "where", "when", "why", "how"], 
        PERSONAL: ["i", "me", "my", "mine", "myself"],
        CONFIRMATION: ["yes", "yeah", "yep", "sure", "okay", "alright"],
        NEGATION: ["no", "nope", "nah", "never", "not"],
        COMMAND: ["do", "make", "create", "build", "run", "execute"],
        REQUEST: ["please", "can you", "could you", "would you"],
        HELP: ["help", "assist", "support", "guide", "aid"],
        GREETING: ["hi", "hello", "hey", "greetings", "yo"],
        FAREWELL: ["bye", "goodbye", "see ya", "later", "farewell"],
        EMOTION_POSITIVE: ["happy", "glad", "excited", "love", "awesome", "great"],
        EMOTION_NEGATIVE: ["sad", "angry", "hate", "upset", "bad", "terrible"],
        TIME: ["now", "today", "tomorrow", "yesterday", "soon", "later", "week", "month", "year"],
        NUMERIC: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "hundred", "thousand", "million"],
        LOCATION: ["here", "there", "somewhere", "anywhere", "near", "far", "above", "below", "left", "right"],
        OPINION: ["think", "believe", "opinion", "view", "better", "worse", "best", "worst"],
        WEATHER: ["rain", "sun", "snow", "storm", "hot", "cold", "windy", "temperature"],
        KNOWLEDGE: ["know", "learn", "understand", "explain", "teach"],
        CODE: ["code", "script", "program", "debug", "compile", "algorithm", "AI", "machine learning"]
    };
    

    const normalizedSentence = sentence.toLowerCase().trim().split(/\s+/); // Tokenizing input sentence

    let matchedContexts = [];

    for (const context in CONTEXT_SEARCH) {
        if (CONTEXT_SEARCH[context].some(term => normalizedSentence.includes(term))) {
            matchedContexts.push(context);
        }
    }

    return matchedContexts.length > 0 ? matchedContexts : ["UNKNOWN"];
}

// Example Test Cases
console.log(akaContextApi("I am Pawan"));  // ["ABOUT_HIM"]
console.log(akaContextApi("Are you an AI?"));  // ["ABOUT_ME"]
console.log(akaContextApi("Tell me about him"));  // ["ABOUT_HIM"]
console.log(akaContextApi("What is your purpose?"));  // ["UNKNOWN"]

