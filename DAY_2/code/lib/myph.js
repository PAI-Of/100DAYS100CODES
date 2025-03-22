/**
 * Enhanced Metaphone algorithm implementation
 * Converts a word to its metaphone representation for phonetic matching
 * @param {string} word - The word to convert
 * @param {number} maxLength - Maximum length of the result (optional)
 * @return {string} The metaphone code
 */
function metaphone(word, maxLength = 0) {
    // Handle edge cases
    if (!word || typeof word !== 'string') return '';
    
    // Convert to uppercase and remove non-alpha characters
    word = word.toUpperCase().replace(/[^A-Z]/g, '');
    if (word.length < 1) return '';
    
    const vowels = 'AEIOU';
    const frontv = 'EIY';
    const varson = 'CSPTG';
    const result = [];
    let i = 0;
    
    // Special cases for word beginnings
    if ((word[0] === 'K' && word[1] === 'N') || 
        (word[0] === 'G' && word[1] === 'N') || 
        (word[0] === 'P' && word[1] === 'N') || 
        (word[0] === 'A' && word[1] === 'E') || 
        (word[0] === 'W' && word[1] === 'R')) {
        i = 1;
    } else if (word[0] === 'X') {
        result.push('S');
        i = 1;
    } else if (word[0] === 'W' && word[1] === 'H') {
        result.push('W');
        i = 2;
    }
    
    // Helper function to check if a letter is a vowel
    const isVowel = (char) => vowels.includes(char);
    
    // Handle special slavo-germanic cases
    const isSlavoGermanic = word.match(/W|K|CZ|WITZ/) !== null;
    
    while (i < word.length) {
        const char = word[i];
        
        // Skip double letters except for 'C'
        if (char === word[i - 1] && char !== 'C') {
            i++;
            continue;
        }
        
        // Main switch block for phonetic transformations
        switch (char) {
            case 'B':
                // B silent if after M at the end of word
                if (word[i - 1] !== 'M' || i !== word.length - 1) {
                    result.push('B');
                }
                break;
                
            case 'C':
                if (word[i + 1] === 'I' && word[i + 2] === 'A' || word[i + 1] === 'H') {
                    result.push('X');
                } else if (frontv.includes(word[i + 1])) {
                    result.push('S');
                } else if (word[i + 1] === 'C') {
                    result.push('K');
                    i++;
                } else {
                    result.push('K');
                }
                break;
                
            case 'D':
                if (word[i + 1] === 'G' && frontv.includes(word[i + 2])) {
                    result.push('J');
                    i += 2;
                } else {
                    result.push('T');
                }
                break;
                
            case 'F':
                result.push('F');
                break;
                
            case 'G':
                if (word[i + 1] === 'H') {
                    // GH silent at end or before consonant
                    if (i === word.length - 2 || !isVowel(word[i + 2])) {
                        // Do nothing
                    } else {
                        result.push('K');
                    }
                    i++;
                } else if (word[i + 1] === 'N') {
                    // GN handling
                    if (i === word.length - 2 || word[i + 2] === 'S') {
                        // Do nothing
                    } else {
                        result.push('K');
                    }
                } else if (frontv.includes(word[i + 1])) {
                    result.push('J');
                } else {
                    result.push('K');
                }
                break;
                
            case 'H':
                // H is silent between vowels or at end after vowel
                if (isVowel(word[i - 1]) && isVowel(word[i + 1])) {
                    // Do nothing
                } else if (!isVowel(word[i - 1]) || !isVowel(word[i + 1])) {
                    result.push('H');
                }
                break;
                
            case 'J':
                if (word.slice(0, 4) === 'JOSE' || word.substring(0, 2) === 'SAN') {
                    // Special case for Spanish names
                    if (i === 0 && word[i + 1] === 'O' && word[i + 2] === 'S' && word[i + 3] === 'E') {
                        result.push('H');
                    } else {
                        result.push('J');
                    }
                } else {
                    if (i === 0) {
                        result.push('J');
                    } else {
                        result.push('J');
                    }
                }
                break;
                
            case 'K':
                if (word[i - 1] !== 'C') {
                    result.push('K');
                }
                break;
                
            case 'L':
                result.push('L');
                break;
                
            case 'M':
                result.push('M');
                break;
                
            case 'N':
                result.push('N');
                break;
                
            case 'P':
                if (word[i + 1] === 'H') {
                    result.push('F');
                    i++;
                } else {
                    result.push('P');
                }
                break;
                
            case 'Q':
                result.push('K');
                break;
                
            case 'R':
                result.push('R');
                break;
                
            case 'S':
                if (word[i + 1] === 'H') {
                    result.push('X');
                    i++;
                } else if (i > 0 && word[i + 1] === 'I' && (word[i + 2] === 'O' || word[i + 2] === 'A')) {
                    // Special case for -SIO and -SIA
                    result.push('X');
                } else {
                    result.push('S');
                }
                break;
                
            case 'T':
                if (word[i + 1] === 'H') {
                    result.push('0'); // Theta sound
                    i++;
                } else if (word[i + 1] === 'I' && (word[i + 2] === 'O' || word[i + 2] === 'A')) {
                    // Special case for -TIO and -TIA
                    result.push('X');
                    i += 2;
                } else if (word[i + 1] === 'C' && word[i + 2] === 'H') {
                    // Do nothing
                    i += 2;
                } else {
                    result.push('T');
                }
                break;
                
            case 'V':
                result.push('F');
                break;
                
            case 'W':
                if (isVowel(word[i + 1])) {
                    result.push('W');
                }
                break;
                
            case 'X':
                // X is KS, but at beginning use S
                if (i === 0) {
                    result.push('S');
                } else {
                    result.push('KS');
                }
                break;
                
            case 'Y':
                if (isVowel(word[i + 1])) {
                    result.push('Y');
                }
                break;
                
            case 'Z':
                // Special case for Slavic words
                if (isSlavoGermanic) {
                    result.push('S');
                } else {
                    result.push('S');
                }
                break;
                
            default:
                // Handle vowels and other characters
                if (isVowel(char)) {
                    if (i === 0) {
                        result.push(char);
                    }
                } else if (char !== ' ' && varson.includes(char)) {
                    result.push(char);
                }
        }
        
        i++;
    }
    
    // Limit the result length if specified
    const metaphoneCode = maxLength > 0 ? result.join('').slice(0, maxLength) : result.join('');
    
    return metaphoneCode;
}

/**
 * Process a full name or phrase by applying metaphone to each word
 * @param {string} phrase - The phrase to process
 * @param {number} maxLength - Maximum length for each word's metaphone code
 * @return {string} Space-separated metaphone codes
 */
function metaphonePhrase(phrase, maxLength = 0) {
    if (!phrase || typeof phrase !== 'string') return '';
    
    return phrase
        .split(/\s+/)
        .map(word => metaphone(word, maxLength))
        .filter(Boolean)
        .join(' ');
}
// Usage
/*
console.log(metaphonePhrase("Pawan Yadav"));
*/
// Output: PWN YTF