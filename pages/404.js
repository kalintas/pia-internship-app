function NotFoundPage() {
    return String.raw`
        <div class="not-found-container">
            <div class="not-found-number">404</div>
            
            <h1 class="not-found-title">Page Not Found</h1>
            
            <p class="not-found-description">The page you're looking for doesn't exist or has been moved. Please check the URL and try again.</p>
            
            <button class="not-found-button" onclick="window.location.href='/pia-internship-app'">
                ← Go Back Home
            </button>
        </div>
    `;
}