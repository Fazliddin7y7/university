document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("university-search");
    const resultsContainer = document.getElementById("results");

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.trim();

        if (query.length > 2) { // Kamida 3 ta harf yozilganda qidiradi
            fetchUniversities(query);
        } else {
            resultsContainer.innerHTML = "";
        }
    });

    function fetchUniversities(query) {
        const apiUrl = `http://universities.hipolabs.com/search?name=${query}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayResults(data))
            .catch(error => console.error("Xatolik yuz berdi:", error));
    }

    function displayResults(universities) {
        resultsContainer.innerHTML = "";

        if (universities.length === 0) {
            resultsContainer.innerHTML = "<p>Hech narsa topilmadi.</p>";
            return;
        }

        universities.forEach(university => {
            const universityItem = document.createElement("div");
            universityItem.classList.add("university-item");

            universityItem.innerHTML = `
                <h3>${university.name}</h3>
                <p><strong>Mamlakat:</strong> ${university.country}</p>
                <a href="${university.web_pages[0]}" target="_blank">Saytga o‘tish</a>
            `;

            resultsContainer.appendChild(universityItem);
        });
    }
});
