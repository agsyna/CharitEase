document.addEventListener("DOMContentLoaded", function() {
    const categorySelect = document.getElementById("category");
    const eventList = document.querySelector(".event-list");

    categorySelect.addEventListener("change", function() {
        const selectedCategory = categorySelect.value;
        filterEvents(selectedCategory);
    });

    function filterEvents(category) {
        const allEvents = document.querySelectorAll(".event");
        allEvents.forEach(event => {
            if (category === "all" || event.dataset.category === category) {
                event.style.display = "block";
            } else {
                event.style.display = "none";
            }
        });
    }
});
