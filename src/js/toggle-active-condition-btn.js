const toggleActive = () =>{
    const allLabels = document.querySelectorAll(".condition-btn");

    if (!allLabels) return;

    const activeBtn = (e) => {
        allLabels.forEach(item => {
            item.classList.remove("active")
        })

        e.target.classList.toggle("active")
    }

    allLabels.forEach(item => {
        item.addEventListener( "click", activeBtn )
    })


}

document.addEventListener('DOMContentLoaded', toggleActive);