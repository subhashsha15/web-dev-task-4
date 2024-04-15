// slider code
var swiper = new Swiper(".swiper", {

    slidesPerView: 4,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// APIs
document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

var movieImageData = [];
async function loadTasks() {
    movieImageData = JSON.parse(localStorage.getItem("movieImageData")) || [];
    if (movieImageData.length > 0) {
        popularMovieCard();
        console.log(movieImageData);
    }
    else {
        await popularMovieApiCall(); // Await the API call to ensure data is fetched before proceeding
        console.log("calling api");
    }
}
async function popularMovieApiCall() {
    console.log("movie api call");
    const url = 'https://imdb188.p.rapidapi.com/api/v1/getPopularMovies';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'a138ea03d5msh598cd13e1756925p16ce97jsn849f9a0ed81f',
            'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
        },
        body: JSON.stringify({
            country: {
                anyPrimaryCountries: ['IN']
            },
            limit: 200,
            releaseDate: {
                releaseDateRange: {
                    end: '2029-12-31',
                    start: '2020-01-01'
                }
            },
            userRatings: {
                aggregateRatingRange: { max: 10, min: 6 },
                ratingsCountRange: { min: 1000 }
            },
            genre: {
                allGenreIds: ['Action']
            },
            runtime: {
                runtimeRangeMinutes: { max: 120, min: 0 }
            }
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        localStorage.setItem('movieImageData', JSON.stringify(result.data.list));
        movieImageData = result.data.list; // Assign fetched data to the global variable
        popularMovieCard();
    } catch (error) {
        console.error(error);
    }
}

function popularMovieCard() {
    console.log("popular movie card");
    const swiperWrapper = document.querySelector('.swiper-wrapper'); // Select the swiper-wrapper element
    movieImageData.forEach((movieItem) => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        const img = document.createElement('img');
        img.src = movieItem.title.primaryImage.imageUrl || `${"../assets/defaultMovieCard.png"}`; // Adjust the property access based on your API response structure
        img.alt = '';

        swiperSlide.appendChild(img);
        swiperWrapper.appendChild(swiperSlide);
    });
}
