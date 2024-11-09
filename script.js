const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const loadingElement = document.getElementById('loading');
const shareQuoteTwitter = document.getElementById('share-quote-twitter');
const shareQuoteFacebook = document.getElementById('share-quote-facebook');
const shareQuoteLinkedIn = document.getElementById('share-quote-linkedin');

// Function to fetch a random quote
async function fetchQuote() {
    loadingElement.style.display = 'block'; // Show loading message
    quoteElement.textContent = ''; // Clear the quote
    authorElement.textContent = ''; // Clear the author

    try {
        const response = await fetch('https://animechan.io/api/v1/quotes/random');
        const data = await response.json();~
        console.log(data); // Check the API response
        
        // Display the quote and author
        quoteElement.textContent = data.quote;
        authorElement.textContent = `— ${data.character} (${data.anime})`;
        
        // Set share links
        const quotedText = `"${encodeURIComponent(data.quote)}" — ${encodeURIComponent(data.character)} (${encodeURIComponent(data.anime)})`;
        shareQuoteTwitter.href = `https://twitter.com/intent/tweet?text=${quotedText}`;
        shareQuoteFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://animechan.io/api/v1/quotes/random`)}&quote=${quotedText}`;
        shareQuoteLinkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://animechan.io/api/v1/quotes/random`)}&title=${quotedText}`;
        
    } catch (error) {
        console.error('Error fetching the quote:', error);
        quoteElement.textContent = 'Failed to fetch a new quote.';
        authorElement.textContent = '';
    } finally {
        loadingElement.style.display = 'none'; // Hide loading message
    }
}

// Event listener for the button click
newQuoteButton.addEventListener('click', fetchQuote);

// Fetch a quote when the page loads
fetchQuote();